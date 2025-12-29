import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export async function POST(req: Request) {
  try {
    const { contractId, signatureDataUrl } = await req.json()
    if (!contractId || !signatureDataUrl) {
      return NextResponse.json({ error: "Missing contractId or signature" }, { status: 400 })
    }
    const supabase = await createClient()

    const { data: contract, error: cErr } = await supabase
      .from("contracts")
      .select("*")
      .eq("contract_id", contractId)
      .single()
    if (cErr || !contract) return NextResponse.json({ error: "Contract not found" }, { status: 404 })

    const now = new Date().toISOString()

    // Generate a simple PDF from contract_text and stamp signature (inline prototype)
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 800])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontSize = 12

    const lines = (contract.contract_text || "").split("\n")
    let y = 780
    for (const line of lines) {
      page.drawText(line, { x: 40, y, size: fontSize, font, color: rgb(0, 0, 0) })
      y -= 16
      if (y < 120) {
        // add new page when we run out of space
        const p = pdfDoc.addPage([600, 800])
        y = 780
      }
    }

    // Add signature block
    page.drawText(`Signed by: ${contract.customer_name}`, { x: 40, y: 100, size: fontSize, font })
    page.drawText(`Date: ${now}`, { x: 40, y: 84, size: fontSize, font })

    // Embed the signature image
    const sigBytes = Buffer.from(signatureDataUrl.split(",")[1], "base64")
    const sigImage = await pdfDoc.embedPng(sigBytes)
    const sigDims = sigImage.scale(0.5)
    page.drawImage(sigImage, { x: 300, y: 60, width: sigDims.width, height: sigDims.height })

    const pdfBytes = await pdfDoc.save()
    const fileName = `signed/${contractId}.pdf`

    // Try to upload to Supabase storage bucket "contracts"
    let pdfUrl: string | null = null
    const { data: uploadRes, error: uploadErr } = await supabase.storage
      .from("contracts")
      .upload(fileName, pdfBytes, { contentType: "application/pdf", upsert: true })

    if (!uploadErr && uploadRes?.path) {
      const { data: pubUrl } = await supabase.storage.from("contracts").getPublicUrl(uploadRes.path)
      pdfUrl = pubUrl?.publicUrl ?? null
    }

    // Update contract status and PDF info
    const updates: any = { status: "signed", updated_at: now, signature_id: "native", contract_pdf_url: pdfUrl }
    if (!pdfUrl) {
      updates.contract_pdf_base64 = Buffer.from(pdfBytes).toString("base64")
    }

    const { error: upErr } = await supabase.from("contracts").update(updates).eq("id", contract.id)
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 })

    await supabase.from("audit_logs").insert({
      action: "contract.sign",
      entity_id: contract.id,
      entity_type: "contract",
      details: { contract_id: contractId, when: now },
    })

    // Send email confirmation (if SMTP configured and pdfUrl available)
    try {
      if (pdfUrl && contract.customer_email) {
        const nodemailerMod = await import("nodemailer")
        const transporter = nodemailerMod.default.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        })
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: contract.customer_email,
          cc: process.env.ADMIN_EMAIL,
          subject: `Contract Signed - ${contractId}`,
          text: `Dear ${contract.customer_name},\n\nYour contract has been signed. You can download it here: ${pdfUrl}\n\nRegards,\nNexum Cloud`,
          html: `<p>Dear ${contract.customer_name},</p><p>Your contract has been signed. You can download it here: <a href="${pdfUrl}">${pdfUrl}</a></p><p>Regards,<br/>Nexum Cloud</p>`,
        })
      }
    } catch (e) {
      // Non-fatal: email failure should not block signing
      console.warn("Email send after sign failed:", e)
    }

    return NextResponse.json({ ok: true, pdfUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 })
  }
}