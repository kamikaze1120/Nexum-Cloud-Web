"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function PaymentConfirmationPage() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState<string>("")
  const [memo, setMemo] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.email) setEmail(user.email)
    }
    loadUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMsg(null)
    if (!email || !amount) {
      setStatusMsg("Email and amount are required")
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.from("manual_invoices").insert({
        customer_email: email,
        amount_cents: Math.round(Number(amount) * 100),
        currency,
        memo,
        status: "pending",
      })
      setStatusMsg(error ? `Error: ${error.message}` : "Payment confirmation submitted. We'll review and activate your access.")
      if (!error) {
        setAmount("")
        setMemo("")
      }
    } catch (err: any) {
      setStatusMsg(`Error: ${err?.message || "Unexpected error"}`)
    } finally {
      setLoading(false)
    }
  }

  const cashAppUrl =
    process.env.NEXT_PUBLIC_CASHAPP_URL ||
    (process.env.NEXT_PUBLIC_CASHAPP_CASHTAG
      ? `https://cash.app/$${process.env.NEXT_PUBLIC_CASHAPP_CASHTAG.replace(/^\$/,'')}`
      : undefined)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Confirm Cash App Payment</CardTitle>
            <CardDescription>
              If you already paid via Cash App, submit the details below so we can verify and activate your subscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <p className="text-sm text-muted-foreground">
                1) Send payment using Cash App
                {cashAppUrl ? (
                  <>
                    :
                    <a href={cashAppUrl} className="underline ml-1" target="_blank" rel="noopener noreferrer">
                      {cashAppUrl}
                    </a>
                  </>
                ) : (
                  <>. If you need the payment link, please <Link href="/contact" className="underline">contact us</Link>.</>
                )}
              </p>
              <p className="text-sm text-muted-foreground">2) Submit the amount and any transaction note or reference below.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <Label>Amount (USD)</Label>
                <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="79.99" />
              </div>
              <div className="space-y-2">
                <Label>Transaction Note or Reference</Label>
                <Textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="Cash App note, date, or reference" />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Confirmation"}</Button>
                {statusMsg && <span className="text-sm text-muted-foreground">{statusMsg}</span>}
              </div>
            </form>

            <div className="mt-6 text-sm text-muted-foreground">
              Once approved, you can activate your plan from the Plans page.
            </div>
            <div className="mt-3">
              <Link href="/plans">
                <Button variant="outline" className="bg-transparent">Go to Plans</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}