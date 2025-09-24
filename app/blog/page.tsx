"use client"

import { HomeButton } from "@/components/ui/home-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of AI in Small Business Automation",
      excerpt:
        "Discover how artificial intelligence is revolutionizing the way small businesses operate and compete in today's market.",
      author: "Alice Johnson",
      date: "March 15, 2024",
      category: "AI & Automation",
      readTime: "5 min read",
    },
    {
      title: "5 Ways Cloud Infrastructure Can Scale Your Business",
      excerpt:
        "Learn about the key benefits of cloud infrastructure and how it can help your business grow without limits.",
      author: "Bob Smith",
      date: "March 10, 2024",
      category: "Cloud Solutions",
      readTime: "7 min read",
    },
    {
      title: "Data Security Best Practices for Modern Businesses",
      excerpt:
        "Essential security measures every business should implement to protect their data and maintain customer trust.",
      author: "Carol Davis",
      date: "March 5, 2024",
      category: "Security",
      readTime: "6 min read",
    },
    {
      title: "Maximizing ROI with Intelligent Data Management",
      excerpt: "How smart data management strategies can drive better business decisions and improve your bottom line.",
      author: "David Wilson",
      date: "February 28, 2024",
      category: "Data Management",
      readTime: "8 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-background particles-bg">
      <HomeButton />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 perspective-2000">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full animate-float hover-lift">
              <BookOpen className="h-16 w-16 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-balance mb-6 animate-fadeInUp3d">
            Nexum Cloud <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto animate-fadeInUp3d delay-200">
            Insights, tips, and industry trends to help you leverage AI and automation for business success.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-16 hover-lift animate-fadeInUp3d delay-300 transform-3d">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary" className="animate-pulse3d">
                Featured
              </Badge>
              <Badge variant="outline">{blogPosts[0].category}</Badge>
            </div>
            <CardTitle className="text-3xl mb-4">{blogPosts[0].title}</CardTitle>
            <CardDescription className="text-lg leading-relaxed">{blogPosts[0].excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {blogPosts[0].date}
                </div>
                <span>{blogPosts[0].readTime}</span>
              </div>
              <Button className="hover-lift group">
                Read More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post, index) => (
            <Card key={index} className={`hover-lift animate-fadeInUp3d delay-${400 + index * 100} transform-3d`}>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <Button size="sm" variant="ghost" className="hover-lift">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="text-center hover-lift animate-fadeInUp3d delay-700 transform-3d">
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
                className="flex-1 px-4 py-2 border border-border rounded-md bg-background hover-lift"
              />
              <Button className="hover-lift">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
