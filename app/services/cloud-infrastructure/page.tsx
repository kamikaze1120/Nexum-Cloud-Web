"use client"

import { HomeButton } from "@/components/ui/home-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Server, Shield, Zap, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CloudInfrastructurePage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full animate-float hover-lift">
              <Cloud className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Cloud <span className="text-primary">Infrastructure</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Scalable, secure, and intelligent cloud infrastructure solutions that grow with your business needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Server,
              title: "Auto-Scaling Infrastructure",
              description: "Automatically scale resources based on demand with AI-powered optimization.",
              delay: "delay-100",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description: "Military-grade encryption and compliance with industry standards.",
              delay: "delay-200",
            },
            {
              icon: Zap,
              title: "Lightning Performance",
              description: "Global CDN and edge computing for ultra-fast response times.",
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
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Cloud Infrastructure?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "99.99% uptime guarantee",
              "24/7 monitoring and support",
              "Automated backup and disaster recovery",
              "Cost optimization with AI insights",
              "Seamless integration with existing systems",
              "Compliance with SOC 2, HIPAA, and GDPR",
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
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Infrastructure?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that trust Nexum Cloud for their infrastructure needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="hover-lift group">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
