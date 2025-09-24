"use client"

import { HomeButton } from "@/components/ui/home-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Ready to transform your business with AI-powered automation? Let's discuss how Nexum Cloud can help you
            achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover-lift animate-slideInLeft3d transform-3d">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="hover-lift" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="hover-lift" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" className="hover-lift" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Your Company" className="hover-lift" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project and how we can help..."
                  rows={5}
                  className="hover-lift"
                />
              </div>
              <Button className="w-full hover-lift group">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 animate-slideInRight3d">
            <Card className="hover-lift transform-3d">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription>Reach out to us through any of these channels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4 hover-lift">
                  <div className="p-2 bg-primary/10 rounded-full animate-pulse3d">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground">1600 Central Ave, Cheyenne, WY</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 hover-lift">
                  <div className="p-2 bg-accent/10 rounded-full animate-pulse3d">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">630-812-9169</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 hover-lift">
                  <div className="p-2 bg-primary/10 rounded-full animate-pulse3d">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">info@nexumcloud.co.site</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 hover-lift">
                  <div className="p-2 bg-accent/10 rounded-full animate-pulse3d">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-muted-foreground">
                      Mon-Fri: 9 AM to 6 PM
                      <br />
                      Sat: 9 AM to 2 PM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift transform-3d">
              <CardHeader>
                <CardTitle className="text-xl">Schedule a Consultation</CardTitle>
                <CardDescription>
                  Book a free 30-minute consultation to discuss your business needs. Contact us at
                  contact@nexumcloud.co.site for sales inquiries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full hover-lift">Book a Call</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
