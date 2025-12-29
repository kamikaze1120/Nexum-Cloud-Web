import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default async function TemplatesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) redirect("/dashboard")

  const { data: templates = [] } = await supabase
    .from("contract_templates")
    .select("id, name, description, template_body, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Contract Templates</CardTitle>
          <CardDescription>Create and manage text-based templates</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/contracts/templates" method="POST" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template_body">Template Body</Label>
              <Textarea id="template_body" name="template_body" rows={12} required placeholder="Use placeholders like {{customer_name}}, {{company_name}}, {{start_date}}, {{end_date}}, {{payment_amount}}" />
            </div>
            <Button type="submit">Save Template</Button>
          </form>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Existing Templates</h3>
            <div className="space-y-3">
              {templates.map((t) => (
                <div key={t.id} className="border p-3 rounded">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.description}</div>
                </div>
              ))}
              {templates.length === 0 && <p className="text-muted-foreground">No templates yet.</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}