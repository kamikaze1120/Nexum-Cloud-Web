"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Cloud, Zap, Bot, Cog, BarChart3 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden particles-bg py-20 lg:py-32 perspective-2000">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse3d delay-300"></div>

        {/* Floating 3D elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-float delay-100"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-float delay-700"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/30 rounded-full animate-float delay-400"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-accent/25 rounded-full animate-float delay-900"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-6 animate-fadeInUp3d transform-3d">
              <div className="p-4 bg-primary/10 rounded-full hover-lift animate-pulse3d delay-100">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <div className="p-4 bg-accent/10 rounded-full hover-lift animate-pulse3d delay-200">
                <Cog className="h-10 w-10 text-accent" />
              </div>
              <div className="p-4 bg-primary/10 rounded-full hover-lift animate-pulse3d delay-300">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <div className="p-4 bg-accent/10 rounded-full hover-lift animate-pulse3d delay-400">
                <Cloud className="h-10 w-10 text-accent" />
              </div>
              <div className="p-4 bg-primary/10 rounded-full hover-lift animate-pulse3d delay-500">
                <Zap className="h-10 w-10 text-primary" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-balance mb-6 animate-fadeInUp3d transform-3d">
            One Company. <span className="text-primary">Five SaaS Engines.</span>
            <br />
            <span className="text-accent">Endless Automations.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 animate-fadeInUp3d delay-200 transform-3d">
            Nexum Cloud Solutions is an AI-first SaaS company offering five innovative automation-driven products
            designed to empower small businesses and streamline operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp3d delay-400 transform-3d">
            <Link href="/signup">
              <Button size="lg" className="group hover-lift px-8 py-4 text-lg">
                Explore Our Solutions
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="hover-lift px-8 py-4 text-lg bg-transparent">
                Schedule a Consultation
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 animate-fadeInUp3d delay-600 transform-3d">
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-primary mb-2">5</div>
              <div className="text-muted-foreground font-medium">SaaS Products</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-accent mb-2">AI-First</div>
              <div className="text-muted-foreground font-medium">Automation</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-primary mb-2">24/7</div>
              <div className="text-muted-foreground font-medium">Support</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-4xl font-black text-accent mb-2">∞</div>
              <div className="text-muted-foreground font-medium">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
