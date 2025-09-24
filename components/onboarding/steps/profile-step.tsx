"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ProfileStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  user: any
}

export function ProfileStep({ formData, updateFormData, onNext, onPrev, user }: ProfileStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleNext = async () => {
    if (!formData.fullName.trim()) return

    setIsLoading(true)
    try {
      // Update or create profile
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: user.email,
          full_name: formData.fullName,
          company_name: formData.companyName,
          updated_at: new Date().toISOString(),
        })
        .select()

      if (error) throw error

      onNext()
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
          <CardDescription>Help us personalize your Nexum Cloud experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name (Optional)</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => updateFormData({ companyName: e.target.value })}
              placeholder="Enter your company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled className="bg-muted" />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrev}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!formData.fullName.trim() || isLoading}>
              {isLoading ? "Saving..." : "Continue"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
