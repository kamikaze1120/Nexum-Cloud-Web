"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function PaymentSettingsPage() {
  const supabase = createClient()
  const [paymentApiKey, setPaymentApiKey] = useState("")
  const [boldsignApiKey, setBoldsignApiKey] = useState("")
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("admin_settings").select("*").limit(1000)
      const paymentKey = data?.find((r) => r.key === "payment_provider_api_key")?.value || ""
      const boldsignKey = data?.find((r) => r.key === "boldsign_api_key")?.value || ""
      setPaymentApiKey(paymentKey)
      setBoldsignApiKey(boldsignKey)
    }
    load()
  }, [supabase])

  const saveKeys = async () => {
    setSaving(true)
    setStatus(null)
    const upserts = [
      { key: "payment_provider_api_key", value: paymentApiKey },
      { key: "boldsign_api_key", value: boldsignApiKey },
    ]
    const { error } = await supabase.from("admin_settings").upsert(upserts, { onConflict: "key" })
    setSaving(false)
    setStatus(error ? `Error: ${error.message}` : "Saved")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="outline">Back to Admin</Button>
          </Link>
        </div>

        <Card className="hover-lift animate-fadeInUp3d">
          <CardHeader>
            <CardTitle>Payment & BoldSign Settings</CardTitle>
            <CardDescription>Paste API keys later—stored securely in Supabase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Payment Provider API Key</Label>
              <Input
                type="password"
                placeholder="sk_live_..."
                value={paymentApiKey}
                onChange={(e) => setPaymentApiKey(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>BoldSign API Key</Label>
              <Input
                type="password"
                placeholder="boldsign_api_key..."
                value={boldsignApiKey}
                onChange={(e) => setBoldsignApiKey(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={saveKeys} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              {status && <span className="text-muted-foreground">{status}</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}