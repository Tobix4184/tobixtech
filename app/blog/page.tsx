"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Search, Filter, Eye, ArrowRight } from 'lucide-react'
import Link from "next/link"
import { formatDate, calculateReadTime } from "@/lib/utils"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const blogPosts = [
    {
      id: "getting-started-web-development",
      title: "Getting Started with Web Development in 2024",
      excerpt: "A comprehensive guide for beginners looking to start their journey in web development. Learn about the essential tools, technologies, and roadmap.",
      content: "Web development has evolved significantly over the years...",
      author: "Ikeh Dominion",
      publishedAt: "2024-01-15",
      category: "Web Development",
      tags: ["Beginner", "HTML", "CSS", "JavaScript"],
      image: "/placeholder.svg?height=200&width=400&text=Web+Dev+Guide",
      featured: true,
      views: 1250
    },
    {
      id: "facebook-ads-strategy-2024",
      title: "Facebook Ads Strategy That Actually Works in 2024",
      excerpt: "Discover the latest Facebook advertising strategies that are driving real results. Learn about audience targeting, ad creatives, and optimization techniques.",
      content: "Facebook advertising continues to be one of the most effective...",
      author: "Ikeh Dominion",
      publishedAt: "2024-01-10",
      category: "Digital Marketing",
      tags: ["Facebook Ads", "Marketing", "Strategy"],
      image: "/placeholder.svg?height=200&width=400&text=Facebook+Ads",
      featured: true,
      views: 890
    },
    {
      id: "react-vs-vue-comparison",
      title: "React vs Vue.js: Which Framework Should You Choose?",
      excerpt: "An in-depth comparison of React and Vue.js, covering performance, learning curve, ecosystem, and use cases to help you make the right choice.",
      content: "Choosing the right JavaScript framework is crucial...",
      author: "Ikeh Dominion",
      publishedAt: "2024-01-05",
      category: "Web Development",
      tags: ["React", "Vue.js", "JavaScript", "Frameworks"],
      image: "/placeholder.svg?height=200&width=400&text=React+vs+Vue",
      featured: false,
      views: 650
    },
    {
      id: "mobile-first-design-principles",
      title: "Mobile-First Design: Principles and Best Practices",
      excerpt: "Learn how to design and develop websites with a mobile-first approach. Understand the principles, benefits, and implementation strategies.",
      content: "Mobile-first design has become essential in today's world...",
      author: "Ikeh Dominion",
      publishedAt: "2024-01-01",
      category: "Design",
      tags: ["Mobile", "Design", "UX", "Responsive"],
      image: "/placeholder.svg?height=200&width=400&text=Mobile+First",
      featured: false,
      views: 420
    },
    {
      id: "seo-fundamentals-2024",
      title: "SEO Fundamentals: A Complete Guide for Beginners",
      excerpt: "Master the basics of Search Engine Optimization with this comprehensive guide. Learn about on-page SEO, technical SEO, and content optimization.",
      content: "Search Engine Optimization is the foundation of digital marketing...",
      author: "Ikeh Dominion",
      publishedAt: "2023-12-28",
      category: "Digital Marketing",
      tags: ["SEO", "Marketing", "Content", "Google"],
      image: "/placeholder.svg?height=200&width=400&text=SEO+Guide",
      featured: false,
      views: 780
    },
    {
      id: "javascript-es6-features",
      title: "Essential ES6 Features Every Developer Should Know",
      excerpt: "Explore the most important ES6 features that have revolutionized JavaScript development. From arrow functions to destructuring and beyond.",
      content: "ES6 introduced many powerful features to JavaScript...",
      author: "Ikeh Dominion",
      publishedAt: "2023-12-25",
      category: "Web Development",
      tags: ["JavaScript", "ES6", "Programming"],
      image: "/placeholder.svg?height=200&width=400&text=ES6+Features",
      featured: false,
      views: 920
    }
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Web Development", label: "Web Development" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Design", label: "Design" },
    { value: "Programming", label: "Programming" }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.slice(0, 5)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            TobixTech{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay updated with the latest trends, tutorials, and insights in web development, 
            digital marketing, and technology. Learn from industry experts and grow your skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Articles</h2>
              <p className="text-xl text-muted-foreground">
                Our most popular and trending content
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">
                      Featured
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {calculateReadTime(post.content)} min read
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Latest Articles</h2>
                <p className="text-muted-foreground">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or browse all articles
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Eye className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                            <Link href={`/blog/${post.id}`}>
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {post.author}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(post.publishedAt)}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {calculateReadTime(post.content)} min read
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/blog/${post.id}`}>
                                Read More
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex space-x-3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(post.publishedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => {
                      const count = blogPosts.filter(post => post.category === category.value).length
                      return (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value)}
                          className="flex items-center justify-between w-full text-left text-sm hover:text-primary transition-colors"
                        >
                          <span>{category.label}</span>
                          <Badge variant="secondary" className="text-xs">
                            {count}
                          </Badge>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 10).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Stay Updated</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Subscribe to our newsletter for the latest articles and updates.
                  </p>
                  <div className="space-y-2">
                    <Input placeholder="Your email address" />
                    <Button size="sm" className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
