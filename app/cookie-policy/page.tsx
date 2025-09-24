"use client"

import { HomeButton } from "@/components/ui/home-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Shield, Settings, Eye } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full animate-float hover-lift">
              <Cookie className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Cookie <span className="text-primary">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Learn how Nexum Cloud LLC uses cookies and similar technologies to enhance your browsing experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="hover-lift animate-fadeInUp3d delay-300 transform-3d">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-full animate-pulse3d">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">What Are Cookies?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit our
                website. They help us provide you with a better experience by remembering your preferences and
                understanding how you use our services.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-400 transform-3d">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-full animate-pulse3d">
                  <Settings className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Types of Cookies We Use</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="hover-lift">
                  <h3 className="text-lg font-semibold text-primary mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies are necessary for the website to function properly. They enable core functionality
                    such as security, network management, and accessibility. You cannot opt-out of these cookies.
                  </p>
                </div>

                <div className="hover-lift">
                  <h3 className="text-lg font-semibold text-accent mb-2">Performance Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously. This helps us improve our website's performance and user experience.
                  </p>
                </div>

                <div className="hover-lift">
                  <h3 className="text-lg font-semibold text-primary mb-2">Functional Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies enable the website to provide enhanced functionality and personalization. They may be
                    set by us or by third-party providers whose services we have added to our pages.
                  </p>
                </div>

                <div className="hover-lift">
                  <h3 className="text-lg font-semibold text-accent mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies are used to track visitors across websites. The intention is to display ads that are
                    relevant and engaging for the individual user and thereby more valuable for publishers and
                    third-party advertisers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-500 transform-3d">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-full animate-pulse3d">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Managing Your Cookie Preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
                setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select
                which categories of cookies you accept or reject.
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold">Browser Settings</h4>
                <p className="text-muted-foreground text-sm">
                  You can also set or amend your web browser controls to accept or refuse cookies. If you choose to
                  reject cookies, you may still use our website though your access to some functionality and areas of
                  our website may be restricted.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Third-Party Cookies</h4>
                <p className="text-muted-foreground text-sm">
                  Some cookies are placed by third-party services that appear on our pages. We do not control these
                  cookies and you should check the relevant third party's website for more information.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-600 transform-3d">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our use of cookies or other technologies, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> info@nexumcloud.co.site
                </p>
                <p>
                  <strong>Address:</strong> 1600 Central Ave, Cheyenne, WY
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-fadeInUp3d delay-700 transform-3d">
            <CardHeader>
              <CardTitle className="text-2xl">Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
                Cookie Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Last Updated:</strong> March 15, 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
