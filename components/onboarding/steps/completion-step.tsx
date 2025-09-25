export function CompletionStep({ formData, user }: CompletionStepProps) {
  useEffect(() => {
    if (formData.selectedPlan && formData.paymentMethod === "connected") {
      createSubscription()
    } else {
      // No free plan assignment; complete onboarding without creating a subscription
      setSubscriptionCreated(true)
    }
  }, [])
  const createDefaultFreeAiSubscription = async () => {
    setIsCreatingSubscription(true)
    try {
      const { data: freePlan } = await supabase
        .from("subscription_plans")
        .select("id, name")
        .eq("name", "Nexum AI Free")
        .single()

      if (!freePlan) {
        console.warn("Free plan not found. Seed 'Nexum AI Free' first.")
        setSubscriptionCreated(true)
        return
      }

      const currentPeriodStart = new Date()
      const currentPeriodEnd = new Date()
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)

      const { error } = await supabase.from("user_subscriptions").insert({
        user_id: user.id,
        plan_id: freePlan.id,
        status: "active",
        billing_cycle: "monthly",
        current_period_start: currentPeriodStart.toISOString(),
        current_period_end: currentPeriodEnd.toISOString(),
      })

      if (error) throw error
      setSubscriptionCreated(true)
    } catch (error) {
      console.error("Error assigning free AI subscription:", error)
    } finally {
      setIsCreatingSubscription(false)
    }
  }
}
