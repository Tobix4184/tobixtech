"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, ThumbsUp, Twitter, Facebook, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
}

const mockBlogPost: BlogPost = {
  id: "1",
  title: "The Future of Web Development: Trends to Watch in 2024",
  excerpt:
    "Explore the latest trends shaping the web development landscape, from AI integration to new frameworks and tools.",
  content: `
    <h2>Introduction</h2>
    <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will shape how we build and interact with web applications. In this comprehensive guide, we'll explore the most significant trends that developers should be aware of.</p>

    <h2>1. AI-Powered Development Tools</h2>
    <p>Artificial Intelligence is revolutionizing the way we write code. From GitHub Copilot to ChatGPT, AI tools are becoming indispensable for developers. These tools can:</p>
    <ul>
      <li>Generate code snippets and complete functions</li>
      <li>Debug and optimize existing code</li>
      <li>Provide intelligent code suggestions</li>
      <li>Automate repetitive tasks</li>
    </ul>

    <h2>2. WebAssembly (WASM) Adoption</h2>
    <p>WebAssembly continues to gain traction as a way to run high-performance applications in the browser. It enables developers to use languages like Rust, C++, and Go for web development, opening up new possibilities for complex applications.</p>

    <h2>3. Edge Computing and Serverless</h2>
    <p>Edge computing is bringing computation closer to users, reducing latency and improving performance. Combined with serverless architectures, this trend is enabling more responsive and scalable web applications.</p>

    <h2>4. Progressive Web Apps (PWAs) Evolution</h2>
    <p>PWAs continue to bridge the gap between web and native applications. New capabilities and improved browser support are making PWAs more powerful and user-friendly than ever before.</p>

    <h2>5. Web3 and Blockchain Integration</h2>
    <p>While still emerging, Web3 technologies are beginning to influence web development. Decentralized applications (dApps) and blockchain integration are creating new opportunities for developers.</p>

    <h2>Conclusion</h2>
    <p>The future of web development is bright and full of exciting possibilities. By staying informed about these trends and continuously learning new technologies, developers can position themselves for success in the evolving digital landscape.</p>
  `,
  author: "Tobix Technology Team",
  date: "2024-01-15",
  readTime: "5 min read",
  category: "Web Development",
  tags: ["JavaScript", "React", "AI", "Trends", "WebAssembly", "PWA"],
  featured: true,
}

const relatedPosts = [
  {
    id: "2",
    title: "Mastering Facebook Ads: A Complete Guide for Beginners",
    category: "Digital Marketing",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "Building Responsive Websites with Modern CSS",
    category: "Design",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "JavaScript ES2024: New Features You Should Know",
    category: "Programming",
    readTime: "7 min read",
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [likes, setLikes] = useState(42)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    // Simulate loading blog post
    const timer = setTimeout(() => {
      setPost(mockBlogPost)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1)
      setHasLiked(false)
      toast({
        title: "Like removed",
        description: "You've unliked this article.",
      })
    } else {
      setLikes((prev) => prev + 1)
      setHasLiked(true)
      toast({
        title: "Thanks for liking!",
        description: "Your feedback helps us create better content.",
      })
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post?.title || ""

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        })
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <article className="mb-12">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.featured && <Badge className="bg-yellow-500 text-yellow-900">Featured</Badge>}
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-user.jpg" alt={post.author} />
                    <AvatarFallback>
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`${hasLiked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
                >
                  <ThumbsUp className={`h-4 w-4 mr-1 ${hasLiked ? "fill-current" : ""}`} />
                  {likes}
                </Button>

                <Button variant="ghost" size="sm" onClick={() => handleShare("copy")}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" onClick={() => handleShare("twitter")} className="bg-transparent">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("facebook")} className="bg-transparent">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")} className="bg-transparent">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="card-hover group">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {relatedPost.category}
                  </Badge>
                  <h3 className="font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                    <Link href={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {relatedPost.readTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
