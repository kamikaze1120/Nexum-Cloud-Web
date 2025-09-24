import { type NextRequest, NextResponse } from "next/server"
import { PlaidApi, Configuration, PlaidEnvironments, type ItemPublicTokenExchangeRequest } from "plaid"
import { createClient } from "@/lib/supabase/server"

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments] || PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID!,
      "PLAID-SECRET": process.env.PLAID_SECRET!,
    },
  },
})

const client = new PlaidApi(configuration)

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { public_token, metadata } = await request.json()

    const exchangeRequest: ItemPublicTokenExchangeRequest = {
      public_token,
    }

    const response = await client.itemPublicTokenExchange(exchangeRequest)
    const access_token = response.data.access_token
    const item_id = response.data.item_id

    // Store the access token and account info in the database
    const { error: dbError } = await supabase.from("payment_methods").insert({
      user_id: user.id,
      plaid_access_token: access_token,
      plaid_item_id: item_id,
      institution_name: metadata.institution.name,
      account_mask: metadata.accounts[0]?.mask || "",
      account_name: metadata.accounts[0]?.name || "",
      account_type: metadata.accounts[0]?.type || "",
      status: "active",
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Failed to save payment method" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error exchanging public token:", error)
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 })
  }
}
