import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mail, Phone, Calendar, ArrowLeft, Eye, Archive } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Management - Admin Dashboard",
  description: "Manage contact form submissions and inquiries",
}

export default async function ContactManagement() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // Fetch all contact submissions
  const { data: contacts, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contacts:", error)
  }

  const contactSubmissions = contacts || []

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "default"
      case "in-progress":
        return "secondary"
      case "resolved":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Contact Management</h1>
                <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-10" />
              </div>
              <Button variant="outline">Filter by Status</Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Submissions ({contactSubmissions.length})</CardTitle>
            <CardDescription>Manage customer inquiries and contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {contactSubmissions.length > 0 ? (
              <div className="space-y-4">
                {contactSubmissions.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <Badge variant={getStatusColor(contact.status)}>{contact.status || "New"}</Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="h-4 w-4 mr-1" />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-muted-foreground">
                              <Phone className="h-4 w-4 mr-1" />
                              {contact.phone}
                            </div>
                          )}
                          {contact.company && <div className="text-muted-foreground">Company: {contact.company}</div>}
                        </div>

                        {contact.subject && (
                          <div className="text-sm">
                            <span className="font-medium">Subject:</span> {contact.subject}
                          </div>
                        )}

                        {contact.service_interest && (
                          <div className="text-sm">
                            <span className="font-medium">Service Interest:</span> {contact.service_interest}
                          </div>
                        )}

                        {contact.message && (
                          <div className="text-sm">
                            <span className="font-medium">Message:</span>
                            <p className="text-muted-foreground mt-1 line-clamp-2">{contact.message}</p>
                          </div>
                        )}

                        {contact.budget_range && (
                          <div className="text-sm">
                            <span className="font-medium">Budget:</span> {contact.budget_range}
                          </div>
                        )}

                        {contact.timeline && (
                          <div className="text-sm">
                            <span className="font-medium">Timeline:</span> {contact.timeline}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        Submitted:{" "}
                        {new Date(contact.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Reply">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Archive">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-muted rounded-full w-fit mx-auto mb-4">
                  <Mail className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No contact submissions yet</h3>
                <p className="text-muted-foreground">
                  Contact form submissions will appear here when customers reach out.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
