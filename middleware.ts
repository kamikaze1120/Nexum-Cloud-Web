import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Enforce HTTPS in production
  const proto = request.headers.get("x-forwarded-proto")
  if (process.env.NODE_ENV === "production" && proto === "http") {
    const url = request.nextUrl.clone()
    url.protocol = "https"
    return NextResponse.redirect(url)
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  // CSRF token management
  const method = request.method
  const pathname = request.nextUrl.pathname
  const protectedPost =
    method === "POST" && (pathname.startsWith("/api/contracts") || pathname.startsWith("/api/payments"))

  const existingCsrf = request.cookies.get("csrf-token")?.value
  if (!existingCsrf) {
    const token = crypto.randomUUID()
    supabaseResponse.cookies.set("csrf-token", token, { httpOnly: false, sameSite: "lax", secure: process.env.NODE_ENV === "production" })
  }

  if (protectedPost) {
    const headerToken = request.headers.get("x-csrf-token")
    const cookieToken = request.cookies.get("csrf-token")?.value
    if (!headerToken || !cookieToken || headerToken !== cookieToken) {
      return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 })
    }
  }

  // If Supabase credentials are not available, skip authentication entirely
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Middleware - Supabase not configured, skipping auth checks")
    return NextResponse.next()
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (
      !user &&
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/signup") &&
      !request.nextUrl.pathname.startsWith("/auth") &&
      (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/onboarding"))
    ) {
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    console.log("[v0] Middleware - Supabase error, continuing without auth:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
