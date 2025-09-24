import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, Mail, BarChart3, Plus, Eye, Edit, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Nexum Cloud",
  description: "Manage your Nexum Cloud website content and analytics",
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Check if user is authenticated (basic check - in production you'd want role-based auth)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // Fetch dashboard statistics
  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: contactSubmissions },
    { count: newsletterSubscriptions },
    { data: recentPosts },
    { data: recentContacts },
  ] = await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    supabase.from("newsletter_subscriptions").select("*", { count: "exact", head: true }).eq("subscribed", true),
    supabase
      .from("blog_posts")
      .select("id, title, published, created_at, author_name")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_submissions")
      .select("id, name, email, subject, created_at, status")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  const stats = [
    {
      title: "Total Blog Posts",
      value: totalPosts || 0,
      description: `${publishedPosts || 0} published`,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Contact Submissions",
      value: contactSubmissions || 0,
      description: "New inquiries",
      icon: Mail,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Newsletter Subscribers",
      value: newsletterSubscriptions || 0,
      description: "Active subscribers",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Monthly Growth",
      value: "12%",
      description: "vs last month",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your Nexum Cloud website</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">View Site</Button>
              </Link>
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Blog Posts</CardTitle>
                  <CardDescription>Latest posts and their status</CardDescription>
                </div>
                <Link href="/admin/blog">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts && recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{post.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">by {post.author_name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No blog posts yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Contact Submissions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Contacts</CardTitle>
                  <CardDescription>Latest contact form submissions</CardDescription>
                </div>
                <Link href="/admin/contacts">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts && recentContacts.length > 0 ? (
                  recentContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{contact.subject || "No subject"}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={contact.status === "new" ? "default" : "secondary"}>
                            {contact.status || "New"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No contact submissions yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/blog/new">
                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Create Blog Post</div>
                      <div className="text-sm text-muted-foreground">Write a new article</div>
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/admin/contacts">
                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-full">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Review Contacts</div>
                      <div className="text-sm text-muted-foreground">Manage inquiries</div>
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-full">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">View Analytics</div>
                      <div className="text-sm text-muted-foreground">Site performance</div>
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
