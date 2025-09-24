"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cloud, Database, Lock, Cpu, Globe, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable and reliable cloud infrastructure solutions tailored to your business needs.",
    link: "/services/cloud-infrastructure",
    color: "primary",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Secure data storage, backup, and analytics solutions for informed decision-making.",
    link: "/services/data-management",
    color: "accent",
  },
  {
    icon: Lock,
    title: "Security Solutions",
    description: "Enterprise-grade security measures to protect your digital assets and customer data.",
    link: "/services/security-solutions",
    color: "primary",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Harness the power of AI to automate processes and gain competitive insights.",
    link: "/services/ai-ml",
    color: "accent",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast content delivery worldwide with our distributed network infrastructure.",
    link: "/services/cloud-infrastructure",
    color: "primary",
  },
  {
    icon: BarChart3,
    title: "Analytics & Monitoring",
    description: "Real-time monitoring and comprehensive analytics to optimize your operations.",
    link: "/services/data-management",
    color: "accent",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background particles-bg perspective-2000">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float delay-100"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-float delay-500"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/3 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-accent/4 rounded-full blur-2xl animate-float delay-700"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fadeInUp3d transform-3d">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance mb-4">
            Our <span className="text-primary">SaaS Suite</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Five innovative automation-driven products designed to empower small businesses and streamline operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group hover-lift animate-fadeInUp3d delay-${(index + 1) * 100} transform-3d border-border/50 hover:border-${service.color}/30 transition-all duration-500 hover:shadow-2xl`}
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 bg-${service.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${service.color}/20 transition-all duration-300 animate-pulse3d hover-rotate`}
                >
                  <service.icon className={`h-8 w-8 text-${service.color}`} />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                <Link href={service.link}>
                  <Button variant="ghost" size="sm" className="group/btn hover-lift p-0 h-auto">
                    Learn More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 animate-fadeInUp3d delay-800 transform-3d">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 hover-lift">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Discover how our AI-first SaaS solutions can automate your operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="hover-lift group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
