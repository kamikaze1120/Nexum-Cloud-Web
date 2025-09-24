"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Check, CreditCard } from "lucide-react"

interface PlanStepProps {
  plans: any[]
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function PlanStep({ plans, formData, updateFormData, onNext, onPrev }: PlanStepProps) {
  const handlePlanSelect = (plan: any) => {
    updateFormData({ selectedPlan: plan })
  }

  const handleBillingCycleChange = (cycle: "monthly" | "yearly") => {
    updateFormData({ billingCycle: cycle })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold">Choose your plan</h2>
        <p className="text-muted-foreground mt-2">Select the plan that best fits your needs</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={formData.billingCycle === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleBillingCycleChange("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={formData.billingCycle === "yearly" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleBillingCycleChange("yearly")}
          >
            Yearly
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {plans.map((plan) => {
          const isSelected = formData.selectedPlan?.id === plan.id
          const price = formData.billingCycle === "yearly" ? plan.price_yearly : plan.price_monthly
          const features = Array.isArray(plan.features) ? plan.features : []

          return (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all ${
                isSelected ? "border-emerald-500 bg-emerald-50/50 shadow-md" : "hover:shadow-md"
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {isSelected && <Badge>Selected</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    ${price}
                    <span className="text-base font-normal text-muted-foreground">
                      /{formData.billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                  {formData.billingCycle === "yearly" && (
                    <p className="text-sm text-muted-foreground">
                      ${(plan.price_monthly * 12).toFixed(2)} billed annually
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!formData.selectedPlan}>
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
