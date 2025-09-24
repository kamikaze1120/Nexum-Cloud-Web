import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HomeButton from "@/components/ui/home-button"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeButton />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nexum Cloud LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our cloud services
                  platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us, such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Company information and job title</li>
                    <li>Account credentials and authentication information</li>
                    <li>Payment and billing information</li>
                    <li>Communications with our support team</li>
                  </ul>

                  <h3 className="text-xl font-medium mt-6">Usage Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We automatically collect certain information about your use of our services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Log data (IP addresses, browser type, operating system)</li>
                    <li>Usage patterns and feature interactions</li>
                    <li>Performance metrics and error reports</li>
                    <li>Device information and network data</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments, questions, and customer service requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, investigate, and prevent fraudulent transactions</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except in
                    the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>With your explicit consent</li>
                    <li>To service providers who assist in our operations</li>
                    <li>To comply with legal obligations or court orders</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>In connection with a business transfer or acquisition</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and audits</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on data protection practices</li>
                    <li>Incident response and breach notification procedures</li>
                  </ul>

                  <h3 className="text-xl font-medium mt-6">PCI DSS Compliance and Payment Card Data Protection</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Nexum Cloud maintains PCI DSS (Payment Card Industry Data Security Standard) compliance to ensure
                      the secure handling of payment card information. Our payment card data protection measures
                      include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      <li>Secure network architecture with firewalls and network segmentation</li>
                      <li>Strong encryption for cardholder data transmission and storage</li>
                      <li>Regular vulnerability assessments and penetration testing</li>
                      <li>Restricted access to cardholder data on a need-to-know basis</li>
                      <li>Comprehensive logging and monitoring of payment processing activities</li>
                      <li>Regular security awareness training for all personnel</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                      We use PCI-compliant third-party payment processors, including Plaid for secure bank account
                      connections. We do not store sensitive authentication data such as CVV codes, and we minimize the
                      collection and retention of cardholder data in accordance with PCI DSS requirements.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your information for as long as necessary to provide our services, comply with legal
                    obligations, resolve disputes, and enforce our agreements. When we no longer need your information,
                    we will securely delete or anonymize it.
                  </p>

                  <h3 className="text-xl font-medium mt-4">Payment Data Retention</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Payment card data is retained only as long as necessary for business purposes and in compliance with
                    PCI DSS requirements. We implement secure deletion procedures for payment data that is no longer
                    required, and we conduct regular audits to ensure compliance with data retention policies.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Depending on your location, you may have the following rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate information</li>
                    <li>Deletion of your personal information</li>
                    <li>Portability of your data</li>
                    <li>Restriction of processing</li>
                    <li>Objection to processing</li>
                    <li>Withdrawal of consent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place to protect your information in accordance with applicable data
                  protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and
                  provide personalized content. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If we become aware of such collection, we will take steps to
                  delete the information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this
                  Privacy Policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                  <p>
                    <strong>Email:</strong> info@nexumcloud.co.site
                  </p>
                  <p>
                    <strong>Address:</strong> Nexum Cloud LLC, Privacy Department
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Payment Data Breach Notification</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    In the event of a security incident involving payment card data, we will:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Immediately investigate and contain the incident</li>
                    <li>Notify affected users within 72 hours of discovery</li>
                    <li>Report the incident to relevant payment card networks and regulatory authorities</li>
                    <li>Provide detailed information about the incident and remediation steps</li>
                    <li>Offer appropriate support and monitoring services to affected users</li>
                  </ul>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
