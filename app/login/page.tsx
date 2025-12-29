import { LoginForm } from "@/components/auth/login-form"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HomeButton from "@/components/ui/home-button"

export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeButton />
      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <LoginForm />
          {/* Admin login quick access */}
          <div className="mt-4 text-center">
            <a href="/admin/login" className="text-sm text-primary hover:underline">
              Login as Admin
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
