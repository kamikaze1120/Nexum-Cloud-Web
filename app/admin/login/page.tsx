"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HomeButton from "@/components/ui/home-button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeButton />
      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <TeamLoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

function TeamLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const [requiresMfa, setRequiresMfa] = useState(false)
  const [mfaCode, setMfaCode] = useState("")
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null)
  const [mfaLoading, setMfaLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError(signInError.message)
        return
      }

      // RBAC: only admins allowed
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Login failed. Please try again.")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin, full_name")
        .eq("id", user.id)
        .single()

      const adminWhitelist = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
      const isAdminEmail = adminWhitelist.includes((user.email || "").toLowerCase())

      if (!profile?.is_admin && !isAdminEmail) {
        setError("This account is not authorized for Team Admin access.")
        await supabase.auth.signOut()
        return
      }

      // MFA check: enforce AAL2 if available
      const mfaApi: any = (supabase as any).auth?.mfa
      if (mfaApi && typeof mfaApi.getAuthenticatorAssuranceLevel === "function") {
        const { data: aalData, error: aalErr } = await mfaApi.getAuthenticatorAssuranceLevel()
        if (aalErr) {
          setError(aalErr.message)
          return
        }

        const nextLevel = aalData?.nextLevel
        if (nextLevel === "aal2") {
          const { data: factorsData, error: factorsErr } = await mfaApi.listFactors()
          if (factorsErr) {
            setError(factorsErr.message)
            return
          }

          const totpFactor = (factorsData?.totp ?? []).find((f: any) => f?.status === "verified") ?? null
          if (!totpFactor) {
            router.push("/admin")
            router.refresh()
            return
          }

          const { error: challengeErr } = await mfaApi.challenge({ factorId: totpFactor.id })
          if (challengeErr) {
            setError(challengeErr.message)
            return
          }

          setRequiresMfa(true)
          setMfaFactorId(totpFactor.id)
          return
        }
      }

      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mfaFactorId) {
      setError("MFA factor not found. Please try signing in again.")
      return
    }
    setMfaLoading(true)
    setError(null)

    try {
      const mfaApi: any = (supabase as any).auth?.mfa
      if (!mfaApi || typeof mfaApi.verify !== "function") {
        setError("MFA is not available. Please contact support.")
        return
      }
      const { error: verifyErr } = await mfaApi.verify({ factorId: mfaFactorId, code: mfaCode })
      if (verifyErr) {
        setError(verifyErr.message)
        return
      }
      router.push("/admin")
      router.refresh()
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setMfaLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Nexum Team Login</CardTitle>
        <CardDescription>Admins only. Sign in to manage the site.</CardDescription>
      </CardHeader>
      <CardContent>
        {!requiresMfa ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyMfa} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="mfacode">MFA Code</Label>
              <Input
                id="mfacode"
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit code"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={mfaLoading}>
              {mfaLoading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}