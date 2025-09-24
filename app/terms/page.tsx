import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HomeButton from "@/components/ui/home-button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeButton />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Nexum Cloud LLC's services ("Service"), you accept and agree to be bound by the
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                  this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nexum Cloud provides cloud infrastructure, data management, security solutions, and AI/ML services
                  through our platform. Our services include but are not limited to cloud hosting, data storage,
                  analytics, and various business intelligence tools.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    To access certain features of our Service, you must register for an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">You agree not to use the Service to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Distribute malware, viruses, or other harmful code</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Interfere with or disrupt the service or servers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Payment and Billing</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Subscription fees are billed in advance on a monthly or annual basis. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Pay all fees associated with your subscription plan</li>
                    <li>Provide current and accurate billing information</li>
                    <li>Notify us of any changes to your payment information</li>
                    <li>Accept that fees are non-refundable except as required by law</li>
                  </ul>

                  <h3 className="text-xl font-medium mt-6">PCI Compliance and Payment Security</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Nexum Cloud is committed to maintaining PCI DSS (Payment Card Industry Data Security Standard)
                      compliance for all payment processing activities. We implement industry-standard security measures
                      to protect payment card data and financial information.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Our payment processing is handled through secure, PCI-compliant third-party providers including
                      Plaid for bank account connections. We do not store sensitive payment card data on our servers and
                      follow strict data handling procedures in accordance with PCI DSS requirements.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">You agree to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Provide only legitimate payment information that you are authorized to use</li>
                      <li>Immediately report any suspected unauthorized use of your payment methods</li>
                      <li>Comply with all applicable payment card network rules and regulations</li>
                      <li>Not attempt to circumvent our payment security measures</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data and Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy. By using our Service, you consent to the collection and use of your information as
                  outlined in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to maintain high availability, we do not guarantee that the Service will be
                  uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue the Service at
                  any time with reasonable notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Nexum Cloud LLC shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                  incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate this agreement at any time. Upon termination, your right to use the Service
                  will cease immediately. We reserve the right to terminate accounts that violate these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of significant changes
                  via email or through our Service. Continued use of the Service after changes constitutes acceptance of
                  the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at info@nexumcloud.co.site.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
