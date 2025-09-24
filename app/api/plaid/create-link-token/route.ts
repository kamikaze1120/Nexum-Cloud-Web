import { type NextRequest, NextResponse } from "next/server"
import { PlaidApi, Configuration, PlaidEnvironments, type LinkTokenCreateRequest, CountryCode, Products } from "plaid"
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

    const linkTokenRequest: LinkTokenCreateRequest = {
      user: {
        client_user_id: user.id,
      },
      client_name: "Nexum Cloud",
      products: [Products.Auth, Products.Identity],
      country_codes: [CountryCode.Us],
      language: "en",
    }

    const response = await client.linkTokenCreate(linkTokenRequest)

    return NextResponse.json({ link_token: response.data.link_token })
  } catch (error) {
    console.error("Error creating link token:", error)
    return NextResponse.json({ error: "Failed to create link token" }, { status: 500 })
  }
}
