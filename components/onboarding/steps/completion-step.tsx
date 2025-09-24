"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CompletionStepProps {
  formData: any
  user: any
}

export function CompletionStep({ formData, user }: CompletionStepProps) {
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false)
  const [subscriptionCreated, setSubscriptionCreated] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (formData.selectedPlan && formData.paymentMethod === "connected") {
      createSubscription()
    } else {
      setSubscriptionCreated(true)
    }
  }, [])

  const createSubscription = async () => {
    setIsCreatingSubscription(true)
    try {
      const currentPeriodStart = new Date()
      const currentPeriodEnd = new Date()
      if (formData.billingCycle === "yearly") {
        currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1)
      } else {
        currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)
      }

      const { error } = await supabase.from("user_subscriptions").insert({
        user_id: user.id,
        plan_id: formData.selectedPlan.id,
        status: "active",
        billing_cycle: formData.billingCycle,
        current_period_start: currentPeriodStart.toISOString(),
        current_period_end: currentPeriodEnd.toISOString(),
      })

      if (error) throw error

      setSubscriptionCreated(true)
    } catch (error) {
      console.error("Error creating subscription:", error)
    } finally {
      setIsCreatingSubscription(false)
    }
  }

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="max-w-xl mx-auto text-center">
      <Card>
        <CardHeader>
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {isCreatingSubscription ? (
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            ) : (
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isCreatingSubscription ? "Setting up your account..." : "Welcome to Nexum Cloud!"}
          </CardTitle>
          <CardDescription>
            {isCreatingSubscription
              ? "We're finalizing your subscription and setting up your account."
              : "Your account is ready and you're all set to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {subscriptionCreated && (
            <>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg text-left">
                  <h3 className="font-medium mb-2">Account Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span>{formData.fullName}</span>
                    </div>
                    {formData.companyName && (
                      <div className="flex justify-between">
                        <span>Company:</span>
                        <span>{formData.companyName}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span>{formData.selectedPlan?.name || "None selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Billing:</span>
                      <span className="capitalize">{formData.billingCycle}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">What's next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Explore your dashboard and account settings</li>
                    <li>• Set up your team and invite members</li>
                    <li>• Configure your cloud resources</li>
                    <li>• Access our documentation and support</li>
                  </ul>
                </div>
              </div>

              <Button onClick={handleGoToDashboard} size="lg" className="w-full">
                Go to Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
