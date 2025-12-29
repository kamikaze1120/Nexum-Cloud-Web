"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Plan {
  id: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: string[]
  max_users: number | null
  max_storage_gb: number
}

interface PlanSelectorProps {
  plans: Plan[]
  currentPlan?: any
  billingCycle: "monthly" | "yearly"
  onBillingCycleChange: (cycle: "monthly" | "yearly") => void
}

export function PlanSelector({ plans, currentPlan, billingCycle, onBillingCycleChange }: PlanSelectorProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSelectPlan = async (planId: string) => {
    setIsLoading(planId)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      // Require payment confirmation before activation
      const { data: invoices } = await supabase
        .from("manual_invoices")
        .select("*")
        .eq("customer_email", user.email)
        .eq("status", "paid")
        .order("created_at", { ascending: false })
        .limit(1)

      if (!invoices || invoices.length === 0) {
        router.push("/payment/confirm")
        return
      }

      const currentPeriodStart = new Date()
      const currentPeriodEnd = new Date()
      if (billingCycle === "yearly") {
        currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1)
      } else {
        currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)
      }

      if (currentPlan) {
        // Update existing subscription
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            plan_id: planId,
            billing_cycle: billingCycle,
            current_period_start: currentPeriodStart.toISOString(),
            current_period_end: currentPeriodEnd.toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("status", "active")

        if (error) throw error
      } else {
        // Create new subscription
        const { error } = await supabase.from("user_subscriptions").insert({
          user_id: user.id,
          plan_id: planId,
          status: "active",
          billing_cycle: billingCycle,
          current_period_start: currentPeriodStart.toISOString(),
          current_period_end: currentPeriodEnd.toISOString(),
        })

        if (error) throw error
      }

      router.refresh()
    } catch (error) {
      console.error("Error selecting plan:", error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={billingCycle === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => onBillingCycleChange("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === "yearly" ? "default" : "ghost"}
            size="sm"
            onClick={() => onBillingCycleChange("yearly")}
          >
            Yearly
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan?.subscription_plans?.id === plan.id
          const price = billingCycle === "yearly" ? plan.price_yearly : plan.price_monthly
          const features = Array.isArray(plan.features) ? plan.features : []

          return (
            <Card key={plan.id} className={isCurrentPlan ? "border-emerald-500 bg-emerald-50/50" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {isCurrentPlan && <Badge>Current Plan</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    ${price}
                    <span className="text-base font-normal text-muted-foreground">
                      /{billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-muted-foreground">
                      ${(plan.price_monthly * 12).toFixed(2)} billed annually
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full"
                  variant={isCurrentPlan ? "outline" : "default"}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan || isLoading === plan.id}
                >
                  {isLoading === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isCurrentPlan ? (
                    "Current Plan"
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
