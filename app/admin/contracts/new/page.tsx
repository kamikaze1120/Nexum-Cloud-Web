"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewContractPage() {
  const [templates, setTemplates] = useState<any[]>([])
  const [templateId, setTemplateId] = useState<string>("")
  const [customerName, setCustomerName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/contracts/templates")
      const data = await res.json()
      setTemplates(data.templates ?? [])
    })()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const csrf = document.cookie.split("; ").find((c) => c.startsWith("csrf-token="))?.split("=")[1] ?? ""
      const res = await fetch("/api/contracts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({
          templateId,
          customerName,
          companyName,
          customerEmail,
          startDate,
          endDate,
          paymentAmount: Number(paymentAmount),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? "Failed to create contract")
      } else {
        setSuccess(`Contract created. ID: ${data.contractId}. Signature link: ${data.signatureUrl}`)
      }
    } catch {
      setError("Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Contract</CardTitle>
          <CardDescription>Auto-fill details and generate a unique contract</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert><AlertDescription>{success}</AlertDescription></Alert>}
            <div className="space-y-2">
              <Label>Template</Label>
              <select className="border rounded p-2 w-full" value={templateId} onChange={(e) => setTemplateId(e.target.value)} required>
                <option value="" disabled>Select a template</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Customer Email</Label>
              <Input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Payment Amount (USD)</Label>
              <Input type="number" step="0.01" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create & Send"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}