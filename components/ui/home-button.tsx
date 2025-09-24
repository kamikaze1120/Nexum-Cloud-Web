"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeButton() {
  return (
    <Link href="/">
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 right-20 z-40 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover-lift"
      >
        <Home className="h-4 w-4 mr-2" />
        Home
      </Button>
    </Link>
  )
}

export default HomeButton
