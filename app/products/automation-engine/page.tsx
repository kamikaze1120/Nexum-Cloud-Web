"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, GitBranch, Eye, ListChecks } from "lucide-react"

export default function AutomationEnginePage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fadeInUp3d">
          <h1 className="text-5xl font-black mb-4">Automation Engine</h1>
          <p className="text-xl text-muted-foreground">
            Build rules, design visual workflows, and track logs & audit trail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="hover-lift animate-fadeInUp3d">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-3 animate-pulse3d">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rule Builder</CardTitle>
              <CardDescription>Event → Action templates</CardDescription>
            </CardHeader>
            <CardContent>“Send email when new client signs up”, “Onboarding complete → kick off tasks”.</CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-100">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 animate-pulse3d">
                <GitBranch className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Visual Workflow Designer</CardTitle>
              <CardDescription>Drag-and-drop with react-flow (planned)</CardDescription>
            </CardHeader>
            <CardContent>Compose automations, publish, and iterate.</CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-200">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-3 animate-pulse3d">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Logs & Audit Trail</CardTitle>
              <CardDescription>Visibility across runs</CardDescription>
            </CardHeader>
            <CardContent>Run history, errors, retries, and metrics.</CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-300">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-full w-fit mb-3 animate-pulse3d">
                <ListChecks className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Triggers</CardTitle>
              <CardDescription>Onboarding complete, payment success, schedule booked</CardDescription>
            </CardHeader>
            <CardContent>Built-in trigger types; more coming.</CardContent>
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