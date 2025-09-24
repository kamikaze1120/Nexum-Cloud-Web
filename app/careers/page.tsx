"use client"

import { HomeButton } from "@/components/ui/home-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, Zap, Heart, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  const jobOpenings = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Lead the development of our AI-powered automation solutions and machine learning models.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Cheyenne, WY",
      type: "Full-time",
      description:
        "Drive product strategy and roadmap for our SaaS suite, working closely with engineering and design teams.",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help our customers achieve success with our products and drive adoption across our SaaS platform.",
    },
  ]

  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full animate-float hover-lift">
              <Briefcase className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Join Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Be part of a revolutionary team that's transforming how small businesses operate through AI-powered
            automation solutions.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp3d">Why Nexum Cloud?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Innovation",
                description: "Work on cutting-edge AI and automation technologies that shape the future.",
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Join a diverse, talented team that values creativity and teamwork.",
              },
              {
                icon: Heart,
                title: "Impact",
                description: "Make a real difference in the lives of small business owners worldwide.",
              },
              {
                icon: Briefcase,
                title: "Growth",
                description: "Accelerate your career with learning opportunities and professional development.",
              },
            ].map((benefit, index) => (
              <Card key={index} className={`hover-lift animate-fadeInUp3d delay-${(index + 1) * 100} transform-3d`}>
                <CardHeader className="text-center">
                  <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4 animate-pulse3d">
                    <benefit.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fadeInUp3d delay-400">Open Positions</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <Card key={index} className={`hover-lift animate-fadeInUp3d delay-${500 + index * 100} transform-3d`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4 md:mt-0 hover-lift">Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{job.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fadeInUp3d delay-800">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and customer success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="hover-lift group">
                Send Us Your Resume
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="hover-lift bg-transparent">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
