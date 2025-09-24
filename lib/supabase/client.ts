import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = "https://begmdbvdiegyqwfbnysv.supabase.co"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ21kYnZkaWVneXF3ZmJueXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzQ0NjQsImV4cCI6MjA3NDMxMDQ2NH0.p4amcQCkPGAflPGVX90PrVcyUDUQDkaUWKCtDu4nkfI"

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
