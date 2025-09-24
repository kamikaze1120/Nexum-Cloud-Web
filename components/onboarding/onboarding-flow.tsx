"use client"

import { useState } from "react"
import { WelcomeStep } from "./steps/welcome-step"
import { ProfileStep } from "./steps/profile-step"
import { PlanStep } from "./steps/plan-step"
import { PaymentStep } from "./steps/payment-step"
import { CompletionStep } from "./steps/completion-step"
import { OnboardingProgress } from "./onboarding-progress"

interface OnboardingFlowProps {
  user: any
  profile: any
  plans: any[]
}

export function OnboardingFlow({ user, profile, plans }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || "",
    companyName: profile?.company_name || "",
    selectedPlan: null as any,
    billingCycle: "monthly" as "monthly" | "yearly",
    paymentMethod: null as any,
  })

  const steps = [
    { id: 1, title: "Welcome", description: "Get started with Nexum Cloud" },
    { id: 2, title: "Profile", description: "Tell us about yourself" },
    { id: 3, title: "Choose Plan", description: "Select your subscription" },
    { id: 4, title: "Payment", description: "Set up billing" },
    { id: 5, title: "Complete", description: "You're all set!" },
  ]

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep user={user} onNext={nextStep} />
      case 2:
        return (
          <ProfileStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            user={user}
          />
        )
      case 3:
        return (
          <PlanStep
            plans={plans}
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <PaymentStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            user={user}
          />
        )
      case 5:
        return <CompletionStep formData={formData} user={user} />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <OnboardingProgress steps={steps} currentStep={currentStep} />
      <div className="mt-8">{renderStep()}</div>
    </div>
  )
}
