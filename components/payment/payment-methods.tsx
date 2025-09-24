"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaidLink } from "./plaid-link"
import { CreditCard, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface PaymentMethodsProps {
  paymentMethods: any[]
}

export function PaymentMethods({ paymentMethods: initialMethods }: PaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] = useState(initialMethods)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSuccess = () => {
    router.refresh()
  }

  const handleRemoveMethod = async (methodId: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("payment_methods").delete().eq("id", methodId)

      if (error) throw error

      setPaymentMethods((methods) => methods.filter((method) => method.id !== methodId))
    } catch (error) {
      console.error("Error removing payment method:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetPrimary = async (methodId: string) => {
    setIsLoading(true)
    try {
      // First, set all methods to non-primary
      await supabase
        .from("payment_methods")
        .update({ is_primary: false })
        .neq("id", "00000000-0000-0000-0000-000000000000")

      // Then set the selected method as primary
      const { error } = await supabase.from("payment_methods").update({ is_primary: true }).eq("id", methodId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error setting primary method:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your connected bank accounts and payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No payment methods connected</p>
            <PlaidLink onSuccess={handleSuccess} />
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{method.institution_name}</span>
                        {method.is_primary && <Badge variant="default">Primary</Badge>}
                        <Badge variant={method.status === "active" ? "default" : "secondary"}>{method.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {method.account_name} ••••{method.account_mask}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!method.is_primary && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetPrimary(method.id)}
                        disabled={isLoading}
                      >
                        Set Primary
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMethod(method.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <PlaidLink onSuccess={handleSuccess} />
          </>
        )}
      </CardContent>
    </Card>
  )
}
