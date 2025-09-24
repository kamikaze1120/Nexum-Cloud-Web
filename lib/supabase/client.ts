import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = "https://kbrzdilnrnnrgkobnaxf.supabase.co"
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticnpkaWxucm5ucmdrb2JuYXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzY3MjQsImV4cCI6MjA3NDMxMjcyNH0.8Dryi0SAUFkkmv5DaZe8iGjFn_JCaACmXVGuZNI6yGY"

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
