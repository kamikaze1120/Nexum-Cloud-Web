"use client"

import { useState, useCallback } from "react"
import { usePlaidLink } from "react-plaid-link"
import { Button } from "@/components/ui/button"
import { CreditCard, Loader2 } from "lucide-react"
import axios from "axios"

interface PlaidLinkProps {
  onSuccess?: () => void
}

export function PlaidLink({ onSuccess }: PlaidLinkProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onPlaidSuccess = useCallback(
    async (public_token: string, metadata: any) => {
      setIsLoading(true)
      try {
        await axios.post("/api/plaid/exchange-public-token", {
          public_token,
          metadata,
        })
        onSuccess?.()
      } catch (error) {
        console.error("Error exchanging token:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [onSuccess],
  )

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
  })

  const handleGetLinkToken = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post("/api/plaid/create-link-token")
      setLinkToken(response.data.link_token)
    } catch (error) {
      console.error("Error getting link token:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = () => {
    if (linkToken && ready) {
      open()
    } else {
      handleGetLinkToken()
    }
  }

  return (
    <Button onClick={handleConnect} disabled={isLoading} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Connect Bank Account
        </>
      )}
    </Button>
  )
}
