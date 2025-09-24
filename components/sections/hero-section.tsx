"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const BotIcon = () => (
  <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V7C3 8.1 3.9 9 5 9H8V11C8 12.1 8.9 13 10 13H14C15.1 13 16 12.1 16 11V9H21ZM7 11V9H5V11H7ZM19 11V9H17V11H19Z" />
  </svg>
)

const CogIcon = () => (
  <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22,21H2V3H4V19H6V17H10V19H12V16H16V19H18V17H22V21Z" />
  </svg>
)

const CloudIcon = () => (
  <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.35,10.04C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.04C2.34,8.36 0,10.91 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.04Z" />
  </svg>
)

const ZapIcon = () => (
  <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7,2V13H10V22L17,10H14L17,2H7Z" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9,11H7L9,9V7L11,9H13L11,11V13L9,11M13,2L15.39,6.42L20,7L15.39,7.58L13,12L10.61,7.58L6,7L10.61,6.42L13,2M3.5,17.5L4.5,15.5L6.5,16.5L4.5,17.5L3.5,19.5L2.5,17.5L0.5,16.5L2.5,15.5L3.5,17.5Z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
  </svg>
)

export function HeroSection() {
  return (
    <section className="relative overflow-hidden particles-bg py-20 lg:py-32 perspective-2000">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float animate-glow"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-reverse animate-glow delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl animate-pulse3d animate-morphing delay-300"></div>

        {/* Enhanced floating particles with more variety */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-primary/30 rounded-full animate-particle delay-100"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-accent/25 rounded-full animate-particle delay-700"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary/35 rounded-full animate-particle delay-400"></div>
        <div className="absolute bottom-20 right-1/3 w-7 h-7 bg-accent/30 rounded-full animate-particle delay-900"></div>
        <div className="absolute top-1/3 left-1/5 w-5 h-5 bg-chart-3/20 rounded-full animate-particle delay-600"></div>
        <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-chart-4/25 rounded-full animate-particle delay-300"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-6 animate-fadeInUp3d transform-3d">
              <div className="p-4 bg-primary/15 rounded-full hover-lift hover-glow animate-pulse3d delay-100">
                <BotIcon />
              </div>
              <div className="p-4 bg-accent/15 rounded-full hover-lift hover-glow animate-pulse3d delay-200">
                <CogIcon />
              </div>
              <div className="p-4 bg-primary/15 rounded-full hover-lift hover-glow animate-pulse3d delay-300">
                <ChartIcon />
              </div>
              <div className="p-4 bg-accent/15 rounded-full hover-lift hover-glow animate-pulse3d delay-400">
                <CloudIcon />
              </div>
              <div className="p-4 bg-primary/15 rounded-full hover-lift hover-glow animate-pulse3d delay-500">
                <ZapIcon />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-balance mb-6 animate-fadeInUp3d transform-3d">
            One Company. <span className="gradient-text">Five SaaS Engines.</span>
            <br />
            <span className="text-accent animate-glow">Endless Automations.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 animate-fadeInUp3d delay-200 transform-3d">
            Nexum Cloud Solutions is an AI-first SaaS company offering five innovative automation-driven products
            designed to empower small businesses and streamline operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp3d delay-400 transform-3d">
            <Link href="/signup">
              <Button
                size="lg"
                className="group hover-lift hover-glow px-8 py-4 text-lg btn-primary relative overflow-hidden"
              >
                <SparklesIcon />
                Explore Our Solutions
                <ArrowRightIcon />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="hover-lift hover-glow px-8 py-4 text-lg bg-transparent border-primary/30 hover:border-primary"
              >
                Schedule a Consultation
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 animate-fadeInUp3d delay-600 transform-3d">
            <div className="text-center hover-lift hover-scale">
              <div className="text-5xl font-black gradient-text mb-2 animate-pulse3d">5</div>
              <div className="text-muted-foreground font-medium">SaaS Products</div>
            </div>
            <div className="text-center hover-lift hover-scale">
              <div className="text-4xl font-black text-accent mb-2 animate-glow">AI-First</div>
              <div className="text-muted-foreground font-medium">Automation</div>
            </div>
            <div className="text-center hover-lift hover-scale">
              <div className="text-5xl font-black gradient-text mb-2 animate-pulse3d delay-200">24/7</div>
              <div className="text-muted-foreground font-medium">Support</div>
            </div>
            <div className="text-center hover-lift hover-scale">
              <div className="text-5xl font-black text-accent mb-2 animate-rotate3d">∞</div>
              <div className="text-muted-foreground font-medium">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
