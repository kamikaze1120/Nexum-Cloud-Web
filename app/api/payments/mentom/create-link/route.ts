import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const { contractId, amount } = await req.json()
    if (!contractId || !amount) {
      return NextResponse.json({ error: "Missing contractId or amount" }, { status: 400 })
    }

    const supabase = await createClient()

    const MENTOM_API_BASE = process.env.MENTOM_API_BASE_URL
    const MENTOM_API_KEY = process.env.MENTOM_API_KEY

    if (!MENTOM_API_BASE || !MENTOM_API_KEY) {
      return NextResponse.json({ error: "Mentom API not configured" }, { status: 500 })
    }

    // Create a payment link with Mentom (placeholder request; replace with actual API spec)
    const resp = await fetch(`${MENTOM_API_BASE}/payments/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MENTOM_API_KEY}`,
      },
      body: JSON.stringify({ amount, currency: "USD", reference: contractId }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ error: "Mentom API error", details: text }, { status: 502 })
    }

    const data = await resp.json()
    const paymentLinkUrl = data?.url ?? data?.payment_link_url ?? null
    const externalPaymentId = data?.id ?? null

    // Log transaction
    const { error: txErr } = await supabase.from("mentom_transactions").insert({
      contract_id: contractId,
      external_payment_id: externalPaymentId,
      payment_link_url: paymentLinkUrl,
      amount,
      status: "created",
    })
    if (txErr) {
      return NextResponse.json({ error: "Failed to log transaction", details: txErr.message }, { status: 500 })
    }

    // Audit
    await supabase.from("audit_logs").insert({
      action: "payment.link.create",
      entity_id: contractId,
      entity_type: "contract",
      details: { externalPaymentId, paymentLinkUrl, amount },
    })

    return NextResponse.json({ url: paymentLinkUrl, externalPaymentId })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 })
  }
}