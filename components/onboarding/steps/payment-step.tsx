"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react"
import { PlaidLink } from "@/components/payment/plaid-link"

interface PaymentStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  user: any
}

export function PaymentStep({ formData, updateFormData, onNext, onPrev, user }: PaymentStepProps) {
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false)

  const handlePaymentSuccess = () => {
    setHasPaymentMethod(true)
    updateFormData({ paymentMethod: "connected" })
  }

  const handleSkip = () => {
    updateFormData({ paymentMethod: "skipped" })
    onNext()
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-6 h-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Set up payment</CardTitle>
          <CardDescription>Connect your bank account to start your subscription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Selected Plan: {formData.selectedPlan?.name}</h3>
            <p className="text-2xl font-bold">
              $
              {formData.billingCycle === "yearly"
                ? formData.selectedPlan?.price_yearly
                : formData.selectedPlan?.price_monthly}
              <span className="text-base font-normal text-muted-foreground">
                /{formData.billingCycle === "yearly" ? "year" : "month"}
              </span>
            </p>
          </div>

          {!hasPaymentMethod ? (
            <div className="space-y-4">
              <PlaidLink onSuccess={handlePaymentSuccess} />
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Your payment information is secured with bank-level encryption
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-emerald-600">Payment method connected!</h3>
                <p className="text-sm text-muted-foreground">You're ready to start your subscription</p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            <div className="space-x-2">
              <Button variant="ghost" onClick={handleSkip}>
                Skip for now
              </Button>
              <Button onClick={onNext} disabled={!hasPaymentMethod && !formData.paymentMethod}>
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
