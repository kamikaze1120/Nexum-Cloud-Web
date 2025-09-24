import { Check } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
}

interface OnboardingProgressProps {
  steps: Step[]
  currentStep: number
}

export function OnboardingProgress({ steps, currentStep }: OnboardingProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  step.id < currentStep
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : step.id === currentStep
                      ? "border-emerald-500 text-emerald-500"
                      : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    step.id <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${step.id < currentStep ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
