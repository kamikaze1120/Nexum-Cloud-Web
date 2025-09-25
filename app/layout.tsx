import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import { ChatBot } from "@/components/ui/chat-bot"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "Nexum Cloud - Enterprise Cloud Solutions",
  description:
    "Transform your business with our comprehensive cloud infrastructure, data management, and AI/ML solutions.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <ChatBot />
        <Analytics />
      </body>
    </html>
  )
}
