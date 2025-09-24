import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HomeButton from "@/components/ui/home-button"

export default async function OnboardingPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login")
  }

  // Check if user has already completed onboarding
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single()

  // If user has profile and subscription, redirect to dashboard
  if (profile?.full_name && subscription) {
    redirect("/dashboard")
  }

  // Get available subscription plans
  const { data: plans } = await supabase
    .from("subscription_plans")
    .select("*")
    .order("price_monthly", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeButton />
      <OnboardingFlow user={user} profile={profile} plans={plans || []} />
      <Footer />
    </div>
  )
}
