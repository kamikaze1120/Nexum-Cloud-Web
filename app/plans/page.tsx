"use client"

import { useState, useEffect } from "react"
import { HomeButton } from "@/components/ui/home-button"
import { PlanSelector } from "@/components/subscription/plan-selector"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PlansPage() {
  const [plans, setPlans] = useState([])
  const [currentSubscription, setCurrentSubscription] = useState(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState(true)
  const [plansErrorMsg, setPlansErrorMsg] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        // Check if user is authenticated
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/login")
          return
        }

        // Load subscription plans
        const { data: plansData, error: plansError } = await supabase
          .from("subscription_plans")
          .select("*")
          .order("price_monthly", { ascending: true })

        if (plansError && (plansError.message || (plansError as any).code)) {
          setPlansErrorMsg(plansError.message ?? "Failed to load plans.")
          console.warn("Error loading plans:", plansError)
        } else {
          setPlans(plansData || [])
        }

        // Load current subscription
        const { data: subscriptionData } = await supabase
          .from("user_subscriptions")
          .select(`
            *,
            subscription_plans (*)
          `)
          .eq("user_id", user.id)
          .eq("status", "active")
          .single()

        setCurrentSubscription(subscriptionData)
      } catch (error) {
        console.warn("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background particles-bg">
        <Header />
        <HomeButton />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading plans...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background particles-bg">
      <Header />
      <HomeButton />
      {/* Show a non-blocking alert instead of throwing an overlay error */}
      {plansErrorMsg && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <Alert variant="destructive">
            <AlertDescription>{plansErrorMsg}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Choose Your <span className="text-primary">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Select the perfect plan for your business needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Plan Selector */}
        <div className="animate-fadeInUp3d delay-400">
          <PlanSelector
            plans={plans}
            currentPlan={currentSubscription}
            billingCycle={billingCycle}
            onBillingCycleChange={setBillingCycle}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
