"use client"

import { HomeButton } from "@/components/ui/home-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, AlertTriangle, Lock, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SecuritySolutionsPage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full animate-float hover-lift">
              <Shield className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Security <span className="text-primary">Solutions</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Comprehensive AI-driven security solutions to protect your business from evolving cyber threats.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Eye,
              title: "Threat Detection",
              description: "AI-powered threat detection that identifies and responds to security risks in real-time.",
              delay: "delay-100",
            },
            {
              icon: AlertTriangle,
              title: "Incident Response",
              description: "Automated incident response workflows to minimize damage and recovery time.",
              delay: "delay-200",
            },
            {
              icon: Lock,
              title: "Access Control",
              description: "Advanced identity and access management with zero-trust architecture.",
              delay: "delay-300",
            },
          ].map((feature, index) => (
            <Card key={index} className={`hover-lift animate-fadeInUp3d ${feature.delay} transform-3d`}>
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 animate-pulse3d">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-card rounded-2xl p-8 mb-16 hover-lift animate-fadeInUp3d delay-400">
          <h2 className="text-3xl font-bold text-center mb-8">Complete Security Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "24/7 security monitoring",
              "Advanced malware protection",
              "Data encryption at rest and in transit",
              "Compliance management (SOC 2, HIPAA)",
              "Vulnerability assessments",
              "Security awareness training",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 hover-lift">
                <CheckCircle className="h-5 w-5 text-accent animate-pulse3d" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fadeInUp3d delay-600">
          <h2 className="text-3xl font-bold mb-4">Secure Your Business Today</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait for a security breach. Protect your business with our comprehensive security solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="hover-lift group">
                Get Protected Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                Security Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
