"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { HomeButton } from "@/components/ui/home-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Lightbulb, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <Header />
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            About <span className="text-primary">Nexum Cloud</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-4xl mx-auto animate-fadeInUp3d delay-200">
            We are an AI-first SaaS company dedicated to empowering small businesses through innovative
            automation-driven products that streamline operations and unlock endless possibilities.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="hover-lift animate-slideInLeft3d transform-3d">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4 animate-pulse3d">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To democratize advanced technology by providing small businesses with enterprise-grade AI and automation
                solutions that were previously only accessible to large corporations. We believe every business deserves
                the power to compete and thrive in the digital age.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slideInRight3d transform-3d">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-full w-fit mb-4 animate-pulse3d">
                <Lightbulb className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To create a world where intelligent automation empowers every small business to operate with the
                efficiency and capabilities of industry giants, fostering innovation, growth, and success across all
                sectors of the economy.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Company Stats */}
        <div className="bg-card rounded-2xl p-8 mb-16 hover-lift animate-fadeInUp3d delay-400">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-primary mb-2">5</div>
              <div className="text-muted-foreground font-medium">SaaS Products</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-accent mb-2">1000+</div>
              <div className="text-muted-foreground font-medium">Businesses Served</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground font-medium">Uptime</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-accent mb-2">24/7</div>
              <div className="text-muted-foreground font-medium">Support</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp3d">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Customer-Centric",
                description: "Every decision we make is guided by what's best for our customers and their success.",
              },
              {
                icon: Lightbulb,
                title: "Innovation First",
                description:
                  "We continuously push the boundaries of what's possible with AI and automation technology.",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "We maintain the highest standards in everything we do, from product quality to customer service.",
              },
            ].map((value, index) => (
              <Card key={index} className={`hover-lift animate-fadeInUp3d delay-${(index + 1) * 200} transform-3d`}>
                <CardHeader className="text-center">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4 animate-pulse3d">
                    <value.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fadeInUp3d delay-600">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how Nexum Cloud can transform your business with our innovative SaaS solutions.
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
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
