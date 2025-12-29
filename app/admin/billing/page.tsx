"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminBillingPage() {
  const supabase = createClient()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        setIsAdmin(false)
        router.push("/login")
        return
      }
      const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
      const ok = !!profile?.is_admin
      setIsAdmin(ok)
      if (!ok) router.push("/dashboard")
    }
    checkAdmin()
  }, [])

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground">Loading…</span>
      </div>
    )
  }

  if (isAdmin === false) return null
  // Manual Invoice Form
  const [invoiceEmail, setInvoiceEmail] = useState("")
  const [invoiceAmount, setInvoiceAmount] = useState<number | "">("")
  const [invoiceCurrency, setInvoiceCurrency] = useState("USD")
  const [invoiceMemo, setInvoiceMemo] = useState("")
  const [invoiceStatus, setInvoiceStatus] = useState<string | null>(null)

  const createManualInvoice = async () => {
    setInvoiceStatus(null)
    if (!invoiceEmail || !invoiceAmount) {
      setInvoiceStatus("Email and amount are required")
      return
    }
    const { error } = await supabase.from("manual_invoices").insert({
      customer_email: invoiceEmail,
      amount_cents: Math.round(Number(invoiceAmount) * 100),
      currency: invoiceCurrency,
      memo: invoiceMemo,
      status: "draft",
    })
    setInvoiceStatus(error ? `Error: ${error.message}` : "Queued invoice (draft)")
  }

  // Contract Send Form (BoldSign queue)
  const [contractEmail, setContractEmail] = useState("")
  const [contractTitle, setContractTitle] = useState("")
  const [contractAmount, setContractAmount] = useState<number | "">("")
  const [contractBody, setContractBody] = useState("")
  const [contractStatus, setContractStatus] = useState<string | null>(null)

  const queueContractSend = async () => {
    setContractStatus(null)
    if (!contractEmail || !contractTitle) {
      setContractStatus("Recipient email and contract title are required")
      return
    }
    const { error } = await supabase.from("contracts_to_send").insert({
      recipient_email: contractEmail,
      title: contractTitle,
      amount_cents: contractAmount ? Math.round(Number(contractAmount) * 100) : null,
      content_markdown: contractBody,
      status: "pending",
    })
    setContractStatus(error ? `Error: ${error.message}` : "Queued contract for sending")
  }

  const [invoiceList, setInvoiceList] = useState<any[]>([])

  const loadInvoices = async () => {
    const { data } = await supabase.from("manual_invoices").select("*").order("created_at", { ascending: false }).limit(50)
    setInvoiceList(data || [])
  }

  useEffect(() => {
    loadInvoices()
  }, [])

  const markInvoicePaid = async (id: string) => {
    const { error } = await supabase.from("manual_invoices").update({ status: "paid" }).eq("id", id)
    if (!error) {
      setInvoiceList((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)))
    }
  }

  const approveAndActivateSubscription = async (invoice: any) => {
    // Find user by email
    const { data: profile } = await supabase.from("profiles").select("id").eq("email", invoice.customer_email).single()
    if (!profile?.id) {
      setInvoiceStatus("No user found for this email")
      return
    }

    // Find a plan by amount (basic heuristic: match monthly price)
    const { data: plans } = await supabase.from("subscription_plans").select("id, price_monthly").order("price_monthly")
    const cents = Number(invoice.amount_cents)
    const plan = (plans || []).find((p) => Math.round(Number(p.price_monthly) * 100) === cents)
    if (!plan) {
      setInvoiceStatus("Could not match an existing plan to this amount")
      return
    }

    const currentPeriodStart = new Date()
    const currentPeriodEnd = new Date()
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)

    // Upsert subscription for the user
    const { data: existing } = await supabase
      .from("user_subscriptions")
      .select("id")
      .eq("user_id", profile.id)
      .eq("status", "active")
      .maybeSingle()

    if (existing?.id) {
      await supabase
        .from("user_subscriptions")
        .update({
          plan_id: plan.id,
          billing_cycle: "monthly",
          current_period_start: currentPeriodStart.toISOString(),
          current_period_end: currentPeriodEnd.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
    } else {
      await supabase.from("user_subscriptions").insert({
        user_id: profile.id,
        plan_id: plan.id,
        status: "active",
        billing_cycle: "monthly",
        current_period_start: currentPeriodStart.toISOString(),
        current_period_end: currentPeriodEnd.toISOString(),
      })
    }

    // Mark invoice paid
    await markInvoicePaid(invoice.id)
    setInvoiceStatus("Subscription activated and invoice marked paid")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="outline">Back to Admin</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover-lift animate-fadeInUp3d">
            <CardHeader>
              <CardTitle>Manual Invoice</CardTitle>
              <CardDescription>Queue custom charge to process later</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Customer Email</Label>
                <Input type="email" value={invoiceEmail} onChange={(e) => setInvoiceEmail(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1 space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" min="0" step="0.01" value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value as any)} />
                </div>
                <div className="w-32 space-y-2">
                  <Label>Currency</Label>
                  <Input value={invoiceCurrency} onChange={(e) => setInvoiceCurrency(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Memo</Label>
                <Textarea value={invoiceMemo} onChange={(e) => setInvoiceMemo(e.target.value)} />
              </div>
              <div className="flex gap-3">
                <Button onClick={createManualInvoice}>Queue Invoice</Button>
                {invoiceStatus && <span className="text-muted-foreground">{invoiceStatus}</span>}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d">
            <CardHeader>
              <CardTitle>Manual Payments Queue</CardTitle>
              <CardDescription>Approve confirmations and activate subscriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">Recent submissions</div>
              <div className="space-y-2">
                {invoiceList.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between border rounded p-3">
                    <div>
                      <div className="font-medium">{inv.customer_email}</div>
                      <div className="text-sm text-muted-foreground">
                        ${(inv.amount_cents / 100).toFixed(2)} {inv.currency} • {inv.status} • {new Date(inv.created_at).toLocaleString()}
                      </div>
                      {inv.memo && <div className="text-xs text-muted-foreground">Note: {inv.memo}</div>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="bg-transparent" onClick={() => markInvoicePaid(inv.id)}>Mark Paid</Button>
                      <Button onClick={() => approveAndActivateSubscription(inv)}>Approve & Activate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d">
            <CardHeader>
              <CardTitle>Contracts (BoldSign)</CardTitle>
              <CardDescription>Queue contract send for later processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Recipient Email</Label>
                <Input type="email" value={contractEmail} onChange={(e) => setContractEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Contract Title</Label>
                <Input value={contractTitle} onChange={(e) => setContractTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Optional Amount</Label>
                <Input type="number" min="0" step="0.01" value={contractAmount} onChange={(e) => setContractAmount(e.target.value as any)} />
              </div>
              <div className="space-y-2">
                <Label>Details (Markdown)</Label>
                <Textarea value={contractBody} onChange={(e) => setContractBody(e.target.value)} rows={6} />
              </div>
              <div className="flex gap-3">
                <Button onClick={queueContractSend}>Queue Contract</Button>
                {contractStatus && <span className="text-muted-foreground">{contractStatus}</span>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}