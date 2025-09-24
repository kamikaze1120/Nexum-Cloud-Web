"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover-lift">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover-lift group">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center animate-pulse3d">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl group-hover:text-primary transition-colors">Nexum Cloud</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors hover-lift">
                Services
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/services/cloud-infrastructure" className="hover-lift">
                    Cloud Infrastructure
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/data-management" className="hover-lift">
                    Data Management
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/security-solutions" className="hover-lift">
                    Security Solutions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/ai-ml" className="hover-lift">
                    AI & ML
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors hover-lift">
                Company
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/about" className="hover-lift">
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/careers" className="hover-lift">
                    Careers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="hover-lift">
                    Contact
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog" className="hover-lift">
                    Blog
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/support" className="text-foreground hover:text-primary transition-colors hover-lift">
              Support
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="hover-lift">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="hover-lift">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden hover-lift" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fadeInUp3d">
            <nav className="flex flex-col space-y-4">
              <div className="space-y-2">
                <div className="font-semibold text-primary">Services</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/services/cloud-infrastructure"
                    className="block text-foreground hover:text-primary transition-colors hover-lift"
                  >
                    Cloud Infrastructure
                  </Link>
                  <Link
                    href="/services/data-management"
                    className="block text-foreground hover:text-primary transition-colors hover-lift"
                  >
                    Data Management
                  </Link>
                  <Link
                    href="/services/security-solutions"
                    className="block text-foreground hover:text-primary transition-colors hover-lift"
                  >
                    Security Solutions
                  </Link>
                  <Link
                    href="/services/ai-ml"
                    className="block text-foreground hover:text-primary transition-colors hover-lift"
                  >
                    AI & ML
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-primary">Company</div>
                <div className="pl-4 space-y-2">
                  <Link href="/about" className="block text-foreground hover:text-primary transition-colors hover-lift">
                    About Us
                  </Link>
                  <Link
                    href="/careers"
                    className="block text-foreground hover:text-primary transition-colors hover-lift"
                  >
                    Careers
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-foreground hover:text-primary transition-colors hover-lift"
                  >
                    Contact
                  </Link>
                  <Link href="/blog" className="block text-foreground hover:text-primary transition-colors hover-lift">
                    Blog
                  </Link>
                </div>
              </div>

              <Link href="/support" className="text-foreground hover:text-primary transition-colors hover-lift">
                Support
              </Link>

              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/login">
                  <Button variant="ghost" className="w-full hover-lift">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full hover-lift">Get Started</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
