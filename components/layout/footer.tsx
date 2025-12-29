import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 hover-lift">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center animate-pulse3d">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl">Nexum Cloud</span>
            </div>
            <p className="text-muted-foreground">
              Empowering businesses with secure, scalable, and intelligent cloud solutions.
            </p>
          </div>

  <div>
    <h3 className="font-semibold mb-4">Services</h3>
    <ul className="space-y-2 text-muted-foreground">
      <li>
        <Link href="/websites" className="hover:text-primary transition-colors hover-lift">
          Custom Websites
        </Link>
      </li>
      <li>
        <Link href="/services/cloud-infrastructure" className="hover:text-primary transition-colors hover-lift">
          Cloud Infrastructure
        </Link>
      </li>
              <li>
                <Link href="/services/data-management" className="hover:text-primary transition-colors hover-lift">
                  Data Management
                </Link>
              </li>
              <li>
                <Link href="/services/security-solutions" className="hover:text-primary transition-colors hover-lift">
                  Security Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/ai-ml" className="hover:text-primary transition-colors hover-lift">
                  AI & ML
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors hover-lift">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors hover-lift">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors hover-lift">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors hover-lift">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors hover-lift">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors hover-lift">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-primary transition-colors hover-lift">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary transition-colors hover-lift">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-muted-foreground space-y-2">
          <p>&copy; 2025 Nexum Cloud LLC. All rights reserved.</p>
          <p>
            New: <a href="https://rtail.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">rtail.vercel.app</a> — created by Nexum Cloud
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
