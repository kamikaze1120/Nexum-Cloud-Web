// Fix imports: Header and Footer are default exports
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { SubscriptionSection } from "@/components/sections/subscription-section"
import { WebsitesSection } from "@/components/sections/websites-section"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WebsitesSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  )
}
