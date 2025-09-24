"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cloud, Shield, Zap } from "lucide-react"

interface WelcomeStepProps {
  user: any
  onNext: () => void
}

export function WelcomeStep({ user, onNext }: WelcomeStepProps) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <Cloud className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold">Welcome to Nexum Cloud!</h1>
        <p className="text-lg text-muted-foreground">
          Hi {user.email}! Let's get your account set up in just a few quick steps.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Secure</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Enterprise-grade security with end-to-end encryption</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Zap className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Lightning-fast performance with global CDN</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Cloud className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Scalable</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Grows with your business from startup to enterprise</CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground">This setup will take about 3 minutes to complete.</p>
        <Button onClick={onNext} size="lg" className="px-8">
          Get Started
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
