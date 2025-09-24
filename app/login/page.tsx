import { LoginForm } from "@/components/auth/login-form"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HomeButton from "@/components/ui/home-button"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeButton />
      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
