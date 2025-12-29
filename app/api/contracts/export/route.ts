import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
  if (!profile?.is_admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { data: contracts, error } = await supabase
    .from("contracts")
    .select("contract_id, customer_name, company_name, customer_email, start_date, end_date, payment_amount, status, created_at, updated_at")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const headers = ["contract_id","customer_name","company_name","customer_email","start_date","end_date","payment_amount","status","created_at","updated_at"]
  const rows = (contracts ?? []).map((c) =>
    headers.map((h) => String((c as any)[h] ?? "")).map((v) => `"${v.replace(/"/g, '""')}"`).join(",")
  )
  const csv = [headers.join(","), ...rows].join("\n")

  const url = new URL(req.url)
  const download = url.searchParams.get("download")
  const response = new Response(csv, { status: 200, headers: { "Content-Type": "text/csv; charset=utf-8" } })
  if (download) {
    response.headers.set("Content-Disposition", `attachment; filename="contracts.csv"`)
  }
  return response
}