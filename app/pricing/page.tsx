import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing - Nexum Cloud",
  description: "Simple, transparent pricing for all your cloud needs",
}

// Compute Cash App URL from environment variables
const cashAppUrl = process.env.NEXT_PUBLIC_CASHAPP_URL ||
  (process.env.NEXT_PUBLIC_CASHAPP_CASHTAG
    ? `https://cash.app/$${process.env.NEXT_PUBLIC_CASHAPP_CASHTAG.replace(/^\$/,'')}`
    : undefined)

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small projects and startups",
    features: [
      { name: "10 GB Storage", included: true },
      { name: "100 GB Bandwidth", included: true },
      { name: "Basic Support", included: true },
      { name: "99.9% Uptime SLA", included: true },
      { name: "SSL Certificate", included: true },
      { name: "Advanced Analytics", included: false },
      { name: "Priority Support", included: false },
      { name: "Custom Integrations", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || undefined,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "Ideal for growing businesses and teams",
    features: [
      { name: "100 GB Storage", included: true },
      { name: "1 TB Bandwidth", included: true },
      { name: "Priority Support", included: true },
      { name: "99.95% Uptime SLA", included: true },
      { name: "SSL Certificate", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "API Access", included: true },
      { name: "Custom Integrations", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || undefined,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with specific needs",
    features: [
      { name: "Unlimited Storage", included: true },
      { name: "Unlimited Bandwidth", included: true },
      { name: "24/7 Dedicated Support", included: true },
      { name: "99.99% Uptime SLA", included: true },
      { name: "SSL Certificate", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "Full API Access", included: true },
      { name: "Custom Integrations", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial available?",
    answer: "We offer a 14-day free trial for all our paid plans. No credit card required to get started.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee for all new subscriptions.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg" asChild>
                      {plan.name !== "Enterprise" ? (
                        <a
                          href={cashAppUrl || "/contact"}
                          target={cashAppUrl ? "_blank" : undefined}
                          rel={cashAppUrl ? "noopener noreferrer" : undefined}
                          title={cashAppUrl ? "Pay with Cash App" : "Contact Sales"}
                        >
                          {plan.cta}
                        </a>
                      ) : (
                        <Link href="/contact">
                          {plan.cta}
                        </Link>
                      )}
                    </Button>
                    {plan.name !== "Enterprise" && (
                      <Button variant="outline" className="bg-transparent" asChild>
                        <Link href="/payment/confirm">Already paid?</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Contact Sales
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
