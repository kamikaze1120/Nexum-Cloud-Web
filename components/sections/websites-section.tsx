"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

type AccentTheme = "violet" | "teal" | "rose" | "amber" | "blue" | "emerald"

const mockSites: { id: number; theme: AccentTheme; label: string; hero: string; gallery: { src: string; title: string }[] }[] = [
  {
    id: 1,
    theme: "violet",
    label: "SaaS Dashboard",
    hero: "/gallery/saas/hero.svg",
    gallery: [
      { src: "/gallery/saas/1.svg", title: "Analytics" },
      { src: "/gallery/saas/2.svg", title: "Users" },
      { src: "/gallery/saas/3.svg", title: "Billing" },
    ],
  },
  {
    id: 2,
    theme: "teal",
    label: "E-commerce Home",
    hero: "/gallery/ecommerce/hero.svg",
    gallery: [
      { src: "/gallery/ecommerce/1.svg", title: "Featured" },
      { src: "/gallery/ecommerce/2.svg", title: "Products" },
      { src: "/gallery/ecommerce/3.svg", title: "Collections" },
    ],
  },
  {
    id: 3,
    theme: "rose",
    label: "Agency Portfolio",
    hero: "/gallery/agency/hero.svg",
    gallery: [
      { src: "/gallery/agency/1.svg", title: "Showcase" },
      { src: "/gallery/agency/2.svg", title: "Case Study" },
      { src: "/gallery/agency/3.svg", title: "Services" },
    ],
  },
  {
    id: 4,
    theme: "amber",
    label: "Restaurant Menu",
    hero: "/gallery/restaurant/hero.svg",
    gallery: [
      { src: "/gallery/restaurant/1.svg", title: "Appetizers" },
      { src: "/gallery/restaurant/2.svg", title: "Mains" },
      { src: "/gallery/restaurant/3.svg", title: "Desserts" },
    ],
  },
  {
    id: 5,
    theme: "blue",
    label: "Fintech Landing",
    hero: "/gallery/fintech/hero.svg",
    gallery: [
      { src: "/gallery/fintech/1.svg", title: "Cards" },
      { src: "/gallery/fintech/2.svg", title: "Mobile" },
      { src: "/gallery/fintech/3.svg", title: "Dashboard" },
    ],
  },
  {
    id: 6,
    theme: "emerald",
    label: "Fitness Studio",
    hero: "/gallery/fitness/hero.svg",
    gallery: [
      { src: "/gallery/fitness/1.svg", title: "Classes" },
      { src: "/gallery/fitness/2.svg", title: "Trainers" },
      { src: "/gallery/fitness/3.svg", title: "Facility" },
    ],
  },
]

type ExampleCardData = { id: number; title: string; subtitle: string; category: string; src: string }

const exampleCards: ExampleCardData[] = [
  { id: 1, title: "Lily’s Hair Studio", subtitle: "Where Beauty Meets Style", category: "Salon", src: "/examples/screenshots/hair-ss.svg" },
  { id: 2, title: "Decorated Green", subtitle: "Transforming your outdoor spaces", category: "Landscaping", src: "/examples/screenshots/green-ss.svg" },
  { id: 3, title: "Federico’s Food", subtitle: "Experience authentic Italian cuisine", category: "Restaurant", src: "/examples/screenshots/food-ss.svg" },
  { id: 4, title: "Serenity Haven", subtitle: "Escape the ordinary, indulge in luxury", category: "Hospitality", src: "/examples/screenshots/serenity-ss.svg" },
  { id: 5, title: "Fleet & Vans", subtitle: "Reliable trucks and cargo vans for hire", category: "Transport", src: "/examples/screenshots/trucks-ss.svg" },
  { id: 6, title: "ByteSphere", subtitle: "Cybersecurity beyond limits", category: "Tech", src: "/examples/photos/cyber-photo.svg" },
]

function MockUIDesign({ theme, label, hero, gallery }: { theme: AccentTheme; label: string; hero: string; gallery: { src: string; title: string }[] }) {
  const accentMap: Record<AccentTheme, string> = {
    violet: "bg-violet-500",
    teal: "bg-teal-500",
    rose: "bg-rose-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
  }
  const accent = accentMap[theme]

  return (
    <div className="rounded-xl border border-border overflow-hidden hover-lift group bg-card">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${accent}`} />
          <div className="h-3 w-3 rounded-full bg-muted" />
          <div className="h-3 w-3 rounded-full bg-muted" />
        </div>
        <div className="h-4 w-24 bg-muted rounded" />
      </div>

      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-muted rounded" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-12 bg-muted rounded" />
            <div className="h-4 w-12 bg-muted rounded" />
            <div className="h-4 w-12 bg-muted rounded" />
          </div>
        </div>

        <div className="relative h-40 rounded-lg overflow-hidden border border-border">
          <Image src={hero || "/snips/hero-generic.svg"} alt="Hero" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" priority />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(gallery || []).map((g, idx) => (
            <div key={idx} className="rounded-lg border border-border overflow-hidden">
              <div className="relative h-24">
                <Image src={g.src} alt={g.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className="p-2 text-sm">
                <div className="font-medium">{g.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">Sample UI</div>
      </div>
    </div>
  )
}

function ExampleCard({ item }: { item: ExampleCardData }) {
  return (
    <div className="group rounded-xl overflow-hidden border border-border hover-lift bg-card">
      <div className="relative h-52">
        <Image src={item.src} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-white/20 backdrop-blur-sm">{item.category}</span>
            <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">Sample UI</span>
          </div>
          <div className="text-lg font-semibold leading-tight">{item.title}</div>
          <div className="text-xs opacity-80">{item.subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export function WebsitesSection() {
  return (
    <section id="websites" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeInUp3d">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance mb-4">Custom Websites</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            We design and deliver modern, performant websites. Here are sample UIs from recent builds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exampleCards.map((ex, i) => (
            <div key={ex.id} className={`animate-fadeInUp3d delay-${(i + 1) * 100}`}>
              <ExampleCard item={ex} />
            </div>
          ))}
        </div>

        <Card className="mt-12 hover-lift animate-fadeInUp3d">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Starting at $499.99</CardTitle>
            <CardDescription>New custom‑built website — design, build, and launch</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="hover-lift">Get a Quote</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="hover-lift bg-transparent">Start a Project</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default WebsitesSection