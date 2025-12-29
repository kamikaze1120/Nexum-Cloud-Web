import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function ContractsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) redirect("/dashboard")

  const { data: contracts } = await supabase
    .from("contracts")
    .select("id, contract_id, customer_name, company_name, customer_email, start_date, end_date, payment_amount, status, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Contracts</h1>
        <div className="flex gap-2">
          <Link href="/admin/contracts/templates"><Button variant="outline">Manage Templates</Button></Link>
          <Link href="/admin/contracts/new"><Button>Create New</Button></Link>
          <a href="/api/contracts/export?download=1"><Button variant="outline">Download CSV</Button></a>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contracts</CardTitle>
          <CardDescription>Track status and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contracts?.map((c) => (
              <div key={c.id} className="border p-3 rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">#{c.contract_id} — {c.customer_name} ({c.company_name})</div>
                  <div className="text-sm text-muted-foreground">Status: {c.status} • Amount: ${c.payment_amount}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/sign/${c.contract_id}`}><Button variant="outline" size="sm">Open Signature Link</Button></Link>
                  <Link href={`/checkout/${c.contract_id}`}><Button variant="outline" size="sm">Checkout (later)</Button></Link>
                </div>
              </div>
            )) ?? <p className="text-muted-foreground">No contracts yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}