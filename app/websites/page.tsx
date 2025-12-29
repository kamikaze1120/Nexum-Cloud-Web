import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { WebsitesSection } from "@/components/sections/websites-section"

export default function WebsitesPage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <Header />
      <main>
        <WebsitesSection />
      </main>
      <Footer />
    </div>
  )
}