import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard } from "lucide-react"
import Link from "next/link"

interface SubscriptionCardProps {
  subscription: any
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>Choose a plan to get started with Nexum Cloud</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/plans">
            <Button className="w-full">Choose a Plan</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  const plan = subscription.subscription_plans
  const features = Array.isArray(plan.features) ? plan.features : []

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{plan.name} Plan</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </div>
          <Badge variant={subscription.status === "active" ? "default" : "secondary"}>{subscription.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Price</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              ${subscription.billing_cycle === "yearly" ? plan.price_yearly : plan.price_monthly}
            </div>
            <div className="text-sm text-muted-foreground">
              per {subscription.billing_cycle === "yearly" ? "year" : "month"}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Next billing</span>
          </div>
          <span className="text-sm font-medium">{new Date(subscription.current_period_end).toLocaleDateString()}</span>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Plan Features</h4>
          <div className="grid gap-2">
            {features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1 bg-transparent">
            Change Plan
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
