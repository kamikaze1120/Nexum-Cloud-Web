import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function CheckoutPage({ params }: { params: { contractId: string } }) {
  const supabase = await createClient()
  const { data: contract } = await supabase
    .from("contracts")
    .select("*")
    .eq("contract_id", params.contractId)
    .single()

  if (!contract) redirect("/")

  async function createPaymentLink() {
    "use server"
    const { cookies } = await import("next/headers")
    const csrf = cookies().get("csrf-token")?.value ?? ""
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/mentom/create-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
      body: JSON.stringify({ contractId: contract.id, amount: contract.payment_amount }),
    })
    if (!res.ok) {
      return null
    }
    const { url } = await res.json()
    return url
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Contract {contract.contract_id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>Customer: {contract.customer_name} ({contract.company_name})</div>
            <div>Email: {contract.customer_email}</div>
            <div>Amount: ${contract.payment_amount}</div>
            <div>Status: {contract.status}</div>
          </div>
          <form action={createPaymentLink}>
            <Button type="submit" className="mt-4">Proceed to Payment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}