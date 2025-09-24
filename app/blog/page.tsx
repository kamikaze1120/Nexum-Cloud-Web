import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Nexum Cloud",
  description: "Insights, tips, and industry trends to help you leverage AI and automation for business success",
}

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  author_name: string
  published_at: string
  tags: string[]
  featured: boolean
  featured_image_url?: string
}

export default async function BlogPage() {
  const supabase = await createClient()

  // Fetch published blog posts
  const { data: blogPosts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
  }

  const posts = blogPosts || []
  const featuredPost = posts.find((post) => post.featured) || posts[0]
  const regularPosts = posts.filter((post) => post.id !== featuredPost?.id)

  // Calculate read time (rough estimate: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full">
              <BookOpen className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Nexum Cloud <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Insights, tips, and industry trends to help you leverage AI and automation for business success.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-16 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-primary">Featured</Badge>
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <Badge variant="outline">{featuredPost.tags[0]}</Badge>
                )}
              </div>
              <CardTitle className="text-3xl mb-4">{featuredPost.title}</CardTitle>
              <CardDescription className="text-lg leading-relaxed">{featuredPost.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {featuredPost.author_name}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(featuredPost.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <span>5 min read</span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button className="group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts Grid */}
        {regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {regularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {post.tags && post.tags.length > 0 && (
                    <Badge variant="outline" className="w-fit mb-2">
                      {post.tags[0]}
                    </Badge>
                  )}
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author_name}
                    </div>
                    <span>5 min read</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button size="sm" variant="ghost">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground">Check back soon for insights and updates!</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="text-center mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Stay Updated</CardTitle>
            <CardDescription>
              Subscribe to our newsletter for the latest insights on AI, automation, and business growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-md bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
