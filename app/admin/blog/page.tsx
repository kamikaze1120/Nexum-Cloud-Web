import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye, Edit, Trash2, Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog Management - Admin Dashboard",
  description: "Manage blog posts and content",
}

export default async function BlogManagement() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  // Fetch all blog posts
  const { data: posts, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
  }

  const blogPosts = posts || []

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
                <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
                <p className="text-muted-foreground">Manage your blog posts and content</p>
              </div>
            </div>
            <Link href="/admin/blog/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
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
                <Input placeholder="Search blog posts..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts ({blogPosts.length})</CardTitle>
            <CardDescription>Manage your published and draft blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            {blogPosts.length > 0 ? (
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        {post.featured && <Badge variant="outline">Featured</Badge>}
                      </div>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.excerpt}</p>

                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author_name}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Created: {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        {post.published_at && (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Published: {new Date(post.published_at).toLocaleDateString()}
                          </div>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <span>Tags:</span>
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-muted-foreground">+{post.tags.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {post.published && (
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" title="View Post">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="ghost" size="sm" title="Edit Post">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" title="Delete Post" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-muted rounded-full w-fit mx-auto mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
                <p className="text-muted-foreground mb-4">Get started by creating your first blog post.</p>
                <Link href="/admin/blog/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
