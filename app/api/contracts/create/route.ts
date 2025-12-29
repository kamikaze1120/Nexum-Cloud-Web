import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import nodemailer from "nodemailer"

function generateId() {
  return `NC-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { templateId, customerName, companyName, customerEmail, startDate, endDate, paymentAmount } = body
    if (!templateId || !customerName || !companyName || !customerEmail || !startDate || !endDate || !paymentAmount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: template, error: tmplErr } = await supabase
      .from("contract_templates")
      .select("template_body, name")
      .eq("id", templateId)
      .single()
    if (tmplErr || !template?.template_body) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Simple merge of placeholders
    const merged = template.template_body
      .replace(/{{\s*customer_name\s*}}/g, customerName)
      .replace(/{{\s*company_name\s*}}/g, companyName)
      .replace(/{{\s*start_date\s*}}/g, startDate)
      .replace(/{{\s*end_date\s*}}/g, endDate)
      .replace(/{{\s*payment_amount\s*}}/g, String(paymentAmount))

    const contractId = generateId()
    const { data: insertRes, error: insErr } = await supabase.from("contracts").insert({
      contract_id: contractId,
      customer_name: customerName,
      company_name: companyName,
      customer_email: customerEmail,
      start_date: startDate,
      end_date: endDate,
      payment_amount: paymentAmount,
      status: "sent",
      contract_text: merged,
      template_id: templateId,
    }).select("id").single()
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 })

    await supabase.from("audit_logs").insert({
      action: "contract.create",
      entity_id: insertRes.id,
      entity_type: "contract",
      details: { contract_id: contractId },
    })

    const signatureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/sign/${contractId}`

    // Send email to customer with CC to admin
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      cc: process.env.ADMIN_EMAIL,
      subject: `Nexum Cloud Service Agreement - ${contractId}`,
      text: `Dear ${customerName},\n\nPlease review and sign your contract: ${signatureUrl}\n\nRegards,\nNexum Cloud`,
      html: `<p>Dear ${customerName},</p><p>Please review and sign your contract: <a href="${signatureUrl}">${signatureUrl}</a></p><p>Regards,<br/>Nexum Cloud</p>`,
    })

    await supabase.from("audit_logs").insert({
      action: "contract.send",
      entity_id: insertRes.id,
      entity_type: "contract",
      details: { to: customerEmail, cc: process.env.ADMIN_EMAIL, signatureUrl },
    })

    return NextResponse.json({ contractId, signatureUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 })
  }
}