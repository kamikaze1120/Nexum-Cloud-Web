"use client"

import { HomeButton } from "@/components/ui/home-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Brain, Zap, Target, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AiMlPage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-accent/10 rounded-full animate-float hover-lift">
              <Bot className="h-16 w-16 text-accent" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            AI & <span className="text-accent">Machine Learning</span>
          </h1>

          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Harness the power of artificial intelligence to automate processes and drive intelligent business decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Brain,
              title: "Intelligent Automation",
              description:
                "Automate complex business processes with AI-powered decision making and workflow optimization.",
              delay: "delay-100",
            },
            {
              icon: Target,
              title: "Predictive Analytics",
              description: "Forecast trends and outcomes with advanced machine learning algorithms and data modeling.",
              delay: "delay-200",
            },
            {
              icon: Zap,
              title: "Real-time Processing",
              description: "Process and analyze data in real-time with high-performance AI infrastructure.",
              delay: "delay-300",
            },
          ].map((feature, index) => (
            <Card key={index} className={`hover-lift animate-fadeInUp3d ${feature.delay} transform-3d`}>
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-full w-fit mb-4 animate-pulse3d">
                  <feature.icon className="h-8 w-8 text-accent" />
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
          <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Business Transformation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Custom AI model development",
              "Natural language processing",
              "Computer vision solutions",
              "Automated decision systems",
              "Intelligent chatbots and assistants",
              "Machine learning model deployment",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 hover-lift">
                <CheckCircle className="h-5 w-5 text-primary animate-pulse3d" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fadeInUp3d delay-600">
          <h2 className="text-3xl font-bold mb-4">Ready for AI Transformation?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the AI revolution and transform your business with intelligent automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="hover-lift group">
                Start AI Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                AI Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
