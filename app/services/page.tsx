import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cloud, Shield, Database, Globe, BarChart3, Headphones, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Services - Nexum Cloud",
  description: "Comprehensive cloud solutions for modern businesses",
}

const services = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable and reliable cloud infrastructure solutions",
    features: [
      "Auto-scaling compute resources",
      "Global CDN distribution",
      "99.9% uptime guarantee",
      "Load balancing & failover",
    ],
    badge: "Popular",
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Managed database solutions with automated backups",
    features: ["Multi-region replication", "Automated backups", "Performance optimization", "Real-time monitoring"],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security for your applications",
    features: ["End-to-end encryption", "SOC 2 compliance", "DDoS protection", "Security auditing"],
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Lightning-fast content delivery worldwide",
    features: ["200+ edge locations", "Smart routing", "Edge computing", "Real-time analytics"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Monitoring",
    description: "Comprehensive insights into your applications",
    features: ["Real-time metrics", "Custom dashboards", "Alert management", "Performance insights"],
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert support whenever you need it",
    features: [
      "Round-the-clock availability",
      "Expert technical team",
      "Priority response",
      "Dedicated account manager",
    ],
    badge: "Premium",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive cloud solutions designed to scale with your business. From infrastructure to support, we've
            got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="relative group hover:shadow-lg transition-shadow">
                {service.badge && <Badge className="absolute -top-2 -right-2 z-10">{service.badge}</Badge>}
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group bg-transparent">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how our services can help accelerate your business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Contact Sales
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
