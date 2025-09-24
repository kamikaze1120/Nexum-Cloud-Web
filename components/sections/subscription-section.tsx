"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  </svg>
)

const StarIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
  </svg>
)

const ZapIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7,2V13H10V22L17,10H14L17,2H7Z" />
  </svg>
)

const CrownIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5,16L3,5L8.5,12L12,4L15.5,12L21,5L19,16H5M19,19A1,1 0 0,1 18,20H6A1,1 0 0,1 5,19V18H19V19Z" />
  </svg>
)

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses getting started with automation.",
    icon: ZapIcon,
    features: [
      "1 SaaS Product Access",
      "Basic AI Automation",
      "Email Support",
      "99.5% Uptime SLA",
      "Standard Analytics",
    ],
    popular: false,
    color: "accent",
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing businesses that need advanced automation features.",
    icon: StarIcon,
    features: [
      "3 SaaS Products Access",
      "Advanced AI Automation",
      "Priority Support",
      "99.9% Uptime SLA",
      "Advanced Analytics",
      "Custom Integrations",
      "API Access",
    ],
    popular: true,
    color: "primary",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Complete SaaS suite for large organizations with unlimited automation.",
    icon: CrownIcon,
    features: [
      "All 5 SaaS Products",
      "Unlimited AI Automation",
      "24/7 Dedicated Support",
      "99.99% Uptime SLA",
      "Custom Analytics Dashboard",
      "White-label Solutions",
      "Dedicated Account Manager",
      "Custom AI Model Training",
    ],
    popular: false,
    color: "accent",
  },
]

export function SubscriptionSection() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30 particles-bg perspective-2000">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float delay-200"></div>
        <div className="absolute top-60 right-32 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float delay-600"></div>
        <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-primary/8 rounded-full blur-2xl animate-float delay-400"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp3d transform-3d">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance mb-4">
            Choose Your <span className="text-primary">Automation</span> Plan
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Flexible pricing for our five SaaS engines. Scale your automation as your business grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative group hover-lift animate-fadeInUp3d delay-${(index + 1) * 150} transform-3d transition-all duration-500 hover:shadow-2xl ${
                plan.popular
                  ? "border-primary shadow-lg scale-105 bg-gradient-to-b from-primary/5 to-transparent"
                  : "border-border/50 hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground animate-pulse3d">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <div
                  className={`w-16 h-16 bg-${plan.color}/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-${plan.color}/20 transition-all duration-300 animate-pulse3d hover-rotate`}
                >
                  <plan.icon />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-4 text-base leading-relaxed">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={feature} className={`flex items-center hover-lift delay-${featureIndex * 50}`}>
                      <CheckIcon />
                      <span className="text-sm ml-3">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="block">
                  <Button
                    className={`w-full hover-lift group ${
                      plan.popular ? "bg-primary hover:bg-primary/90 shadow-lg" : "bg-secondary hover:bg-secondary/90"
                    }`}
                    size="lg"
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    {plan.name !== "Enterprise" && <ZapIcon />}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fadeInUp3d delay-600 transform-3d">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 hover-lift border border-border/50">
            <p className="text-muted-foreground">
              <span className="font-semibold text-primary">30-day money-back guarantee</span> • No setup fees •
              <span className="font-semibold text-accent"> Cancel anytime</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
