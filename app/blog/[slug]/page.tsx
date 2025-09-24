import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author_name: string
  author_email: string
  published_at: string
  tags: string[]
  featured_image_url?: string
  meta_title?: string
  meta_description?: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, meta_title, excerpt, meta_description")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (!post) {
    return {
      title: "Post Not Found - Nexum Cloud",
    }
  }

  return {
    title: post.meta_title || `${post.title} - Nexum Cloud Blog`,
    description: post.meta_description || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch the blog post
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !post) {
    notFound()
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, author_name, published_at, tags")
    .eq("published", true)
    .neq("id", post.id)
    .limit(3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate read time (rough estimate: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          {post.featured_image_url && (
            <div className="aspect-video mb-8 rounded-lg overflow-hidden">
              <img
                src={post.featured_image_url || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags &&
              post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>

          <p className="text-xl text-muted-foreground mb-6 text-pretty">{post.excerpt}</p>

          <div className="flex items-center justify-between border-b border-border pb-6">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author_name}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.published_at)}
              </div>
              <span>{calculateReadTime(post.content)} min read</span>
            </div>

            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
          />
        </div>

        {/* Author Bio */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-lg">About the Author</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{post.author_name}</h4>
                <p className="text-muted-foreground text-sm">
                  Expert in AI and automation solutions for small businesses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {relatedPost.tags && relatedPost.tags.length > 0 && (
                      <Badge variant="outline" className="w-fit mb-2">
                        {relatedPost.tags[0]}
                      </Badge>
                    )}
                    <CardTitle className="text-lg line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary">
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      {relatedPost.author_name}
                      <span className="mx-2">•</span>
                      {formatDate(relatedPost.published_at)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get the latest insights on AI and automation delivered to your inbox.
            </p>
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
      </article>
    </div>
  )
}
