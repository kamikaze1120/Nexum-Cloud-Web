"use client"

import { HomeButton } from "@/components/ui/home-button"
import { ChatBot } from "@/components/ui/chat-bot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, Phone, Mail, Clock, ArrowRight, CheckCircle } from "lucide-react"

export default function SupportPage() {
  const faqItems = [
    {
      question: "How do I get started with Nexum Cloud services?",
      answer:
        "Simply sign up for an account, choose your preferred plan, and follow our guided onboarding process. Our team will help you set up your first automation within 24 hours.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/7 technical support via chat, email, and phone. Our enterprise customers also get dedicated account managers and priority support.",
    },
    {
      question: "Can I integrate Nexum Cloud with my existing systems?",
      answer:
        "Yes! Our platform offers robust APIs and pre-built integrations with popular business tools. Our technical team can assist with custom integrations if needed.",
    },
    {
      question: "What security measures do you have in place?",
      answer:
        "We implement enterprise-grade security including SOC 2 compliance, end-to-end encryption, regular security audits, and 24/7 monitoring to protect your data.",
    },
  ]

  const handlePhoneCall = () => {
    window.location.href = "tel:630-812-9169"
  }

  const handleEmailSupport = () => {
    window.location.href = "mailto:info@nexumcloud.co.site?subject=Support Request"
  }

  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />
      <ChatBot />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full animate-float hover-lift">
              <HelpCircle className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Support <span className="text-primary">Center</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Get the help you need to make the most of your Nexum Cloud experience. We're here to support your success.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: MessageSquare,
              title: "AI Support Bot",
              description: "Get instant help with baseline technical issues",
              action: "Chat Now",
              delay: "delay-100",
              onClick: () => {}, // Bot is always available via floating button
            },
            {
              icon: Phone,
              title: "Direct Phone Support",
              description: "Speak directly with our founder",
              action: "Call 630-812-9169",
              delay: "delay-200",
              onClick: handlePhoneCall,
            },
            {
              icon: Mail,
              title: "Email Support",
              description: "Send us a detailed message",
              action: "Email Us",
              delay: "delay-300",
              onClick: handleEmailSupport,
            },
          ].map((option, index) => (
            <Card key={index} className={`hover-lift animate-fadeInUp3d ${option.delay} transform-3d text-center`}>
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4 animate-pulse3d">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription className="text-sm">{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="hover-lift" onClick={option.onClick}>
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="hover-lift animate-slideInLeft3d transform-3d">
            <CardHeader>
              <CardTitle className="text-2xl">Submit a Support Request</CardTitle>
              <CardDescription>
                Fill out the form below and our support team will get back to you within 4 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="hover-lift" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" className="hover-lift" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select>
                  <SelectTrigger className="hover-lift">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General Question</SelectItem>
                    <SelectItem value="medium">Medium - Feature Request</SelectItem>
                    <SelectItem value="high">High - Technical Issue</SelectItem>
                    <SelectItem value="urgent">Urgent - Service Down</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" className="hover-lift" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Detailed Description</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide as much detail as possible about your issue or question..."
                  rows={5}
                  className="hover-lift"
                />
              </div>

              <Button className="w-full hover-lift group" onClick={handleEmailSupport}>
                Submit Request
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Support Information */}
          <div className="space-y-8 animate-slideInRight3d">
            <Card className="hover-lift transform-3d">
              <CardHeader>
                <CardTitle className="text-2xl">Support Hours</CardTitle>
                <CardDescription>We're here when you need us most.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 hover-lift">
                  <div className="p-2 bg-primary/10 rounded-full animate-pulse3d">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">24/7 Emergency Support</div>
                    <div className="text-sm text-muted-foreground">For critical issues and service outages</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 hover-lift">
                  <div className="p-2 bg-accent/10 rounded-full animate-pulse3d">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">Business Hours Support</div>
                    <div className="text-sm text-muted-foreground">Mon-Fri: 9 AM - 6 PM MST</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift transform-3d">
              <CardHeader>
                <CardTitle className="text-xl">Response Times</CardTitle>
                <CardDescription>Our commitment to quick resolution.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { level: "Urgent", time: "< 1 hour", color: "text-destructive" },
                  { level: "High", time: "< 4 hours", color: "text-orange-500" },
                  { level: "Medium", time: "< 24 hours", color: "text-primary" },
                  { level: "Low", time: "< 48 hours", color: "text-accent" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between hover-lift">
                    <span className="font-medium">{item.level}</span>
                    <span className={`text-sm ${item.color}`}>{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Direct Contact */}
            <Card className="hover-lift transform-3d">
              <CardHeader>
                <CardTitle className="text-xl">Direct Contact</CardTitle>
                <CardDescription>Reach us directly for immediate assistance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 hover-lift group cursor-pointer" onClick={handlePhoneCall}>
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="group-hover:text-primary transition-colors">630-812-9169</span>
                </div>
                <div
                  className="flex items-center space-x-3 hover-lift group cursor-pointer"
                  onClick={handleEmailSupport}
                >
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="group-hover:text-accent transition-colors">info@nexumcloud.co.site</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="hover-lift animate-fadeInUp3d delay-600 transform-3d">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Frequently Asked Questions</CardTitle>
            <CardDescription className="text-center">
              Quick answers to common questions about our services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0 hover-lift">
                <h3 className="font-semibold text-lg mb-2 flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 animate-pulse3d" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground ml-7">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
