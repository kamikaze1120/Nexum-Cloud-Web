import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const contractId = url.searchParams.get("contractId")
  if (!contractId) return NextResponse.json({ error: "Missing contractId" }, { status: 400 })
  const supabase = await createClient()
  const { data: contract, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("contract_id", contractId)
    .single()
  if (error || !contract) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ contract })
}