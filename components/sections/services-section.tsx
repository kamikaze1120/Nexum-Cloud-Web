"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CloudIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z" />
  </svg>
)

const DatabaseIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
  </svg>
)

const LockIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
  </svg>
)

const CpuIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16,18H8A2,2 0 0,1 6,16V8A2,2 0 0,1 8,6H16A2,2 0 0,1 18,8V16A2,2 0 0,1 16,18M8,8V16H16V8H8M4,10V14H2V10H4M22,10V14H20V10H22M10,4H14V2H10V4M10,22H14V20H10V22Z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
  </svg>
)

const services = [
  {
    icon: CloudIcon,
    title: "Cloud Infrastructure",
    description: "Scalable and reliable cloud infrastructure solutions tailored to your business needs.",
    link: "/services/cloud-infrastructure",
    color: "primary",
  },
  {
    icon: DatabaseIcon,
    title: "Data Management",
    description: "Secure data storage, backup, and analytics solutions for informed decision-making.",
    link: "/services/data-management",
    color: "accent",
  },
  {
    icon: LockIcon,
    title: "Security Solutions",
    description: "Enterprise-grade security measures to protect your digital assets and customer data.",
    link: "/services/security-solutions",
    color: "primary",
  },
  {
    icon: CpuIcon,
    title: "AI & Machine Learning",
    description: "Harness the power of AI to automate processes and gain competitive insights.",
    link: "/services/ai-ml",
    color: "accent",
  },
  {
    icon: GlobeIcon,
    title: "Global CDN",
    description: "Lightning-fast content delivery worldwide with our distributed network infrastructure.",
    link: "/services/cloud-infrastructure",
    color: "primary",
  },
  {
    icon: ChartIcon,
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
                  <service.icon />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                <Link href={service.link}>
                  <Button variant="ghost" size="sm" className="group/btn hover-lift p-0 h-auto">
                    Learn More
                    <ArrowRightIcon />
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
                  <ArrowRightIcon />
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
