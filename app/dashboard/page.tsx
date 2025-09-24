import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SubscriptionCard } from "@/components/dashboard/subscription-card"
import { BillingHistory } from "@/components/dashboard/billing-history"
import { ProfileSettings } from "@/components/dashboard/profile-settings"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HomeButton from "@/components/ui/home-button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get current subscription
  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select(`
      *,
      subscription_plans (*)
    `)
    .eq("user_id", user.id)
    .eq("status", "active")
    .single()

  // Get billing history
  const { data: billingHistory } = await supabase
    .from("billing_history")
    .select("*")
    .eq("user_id", user.id)
    .order("billing_date", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeButton />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {profile?.full_name || user.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Current Subscription */}
          <div className="lg:col-span-2">
            <SubscriptionCard subscription={subscription} />
          </div>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={subscription?.status === "active" ? "default" : "secondary"}>
                  {subscription?.status || "No subscription"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plan</span>
                <span className="text-sm font-medium">{subscription?.subscription_plans?.name || "None"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Billing</span>
                <span className="text-sm font-medium capitalize">{subscription?.billing_cycle || "N/A"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 mt-8 lg:grid-cols-2">
          {/* Billing History */}
          <BillingHistory history={billingHistory || []} />

          {/* Profile Settings */}
          <ProfileSettings profile={profile} user={user} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
