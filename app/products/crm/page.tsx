"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, CreditCard, Settings } from "lucide-react"

export default function CRMSuitePage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fadeInUp3d">
          <h1 className="text-5xl font-black mb-4">CRM Suite</h1>
          <p className="text-xl text-muted-foreground">
            Client onboarding, profiles, scheduling, subscription integration, and a powerful dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="hover-lift animate-fadeInUp3d">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-3 animate-pulse3d">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Client Profiles</CardTitle>
              <CardDescription>Organize customer data with rich profiles</CardDescription>
            </CardHeader>
            <CardContent>Onboarding forms, notes, and lifecycle stages.</CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-100">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 animate-pulse3d">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Scheduler & Calendar</CardTitle>
              <CardDescription>Book meetings and automate reminders</CardDescription>
            </CardHeader>
            <CardContent>Integrates with automation triggers for booked events.</CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-200">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-3 animate-pulse3d">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription>Cash App payments supported</CardDescription>
            </CardHeader>
            <CardContent>Manage plan changes and invoices from one place.</CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-300">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 animate-pulse3d">
                <Settings className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Client Dashboard</CardTitle>
              <CardDescription>Clear insights and controls</CardDescription>
            </CardHeader>
            <CardContent>CRUD operations, activity feed, and support links.</CardContent>
          </Card>
        </div>

        <div className="text-center animate-fadeInUp3d">
          <Button className="px-8">View Plans</Button>
          <Button className="px-8 bg-transparent" variant="outline">Schedule Demo</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}