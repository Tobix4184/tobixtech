"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Users, BookOpen, MessageSquare, Award, Eye, Trash2, Plus, Edit } from "lucide-react"

// Reset all stats to 0
const mockStats = {
  totalStudents: 0,
  totalCourses: 0,
  totalReviews: 0,
  totalCertificates: 0,
}

// Empty arrays for all data
const mockReviews: any[] = []
const mockApplications: any[] = []
const mockBlogPosts: any[] = []

export default function AdminPage() {
  const [reviews, setReviews] = useState(mockReviews)
  const [applications, setApplications] = useState(mockApplications)
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleReviewAction = (reviewId: number, action: "approve" | "reject") => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, status: action === "approve" ? "approved" : "rejected" } : review,
      ),
    )
    toast({
      title: `Review ${action}d`,
      description: `The review has been ${action}d successfully.`,
    })
  }

  const handleDeleteReview = (reviewId: number) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId))
    toast({
      title: "Review deleted",
      description: "The review has been deleted successfully.",
    })
  }

  const handleApplicationAction = (applicationId: number, action: "approve" | "reject") => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: action === "approve" ? "approved" : "rejected" } : app,
      ),
    )
    toast({
      title: `Application ${action}d`,
      description: `The tutor application has been ${action}d successfully.`,
    })
  }

  const handleDeleteApplication = (applicationId: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== applicationId))
    toast({
      title: "Application deleted",
      description: "The application has been deleted successfully.",
    })
  }

  const handleCreateBlogPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      author: "Admin",
      date: new Date().toISOString().split("T")[0],
      status: "draft" as const,
      views: 0,
    }

    setBlogPosts((prev) => [newPost, ...prev])
    setNewPostTitle("")
    setNewPostContent("")
    setIsNewPostDialogOpen(false)
    toast({
      title: "Blog post created",
      description: "The blog post has been created successfully.",
    })
  }

  const handleDeleteBlogPost = (postId: number) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== postId))
    toast({
      title: "Blog post deleted",
      description: "The blog post has been deleted successfully.",
    })
  }

  const handlePublishBlogPost = (postId: number) => {
    setBlogPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, status: "published" as const } : post)))
    toast({
      title: "Blog post published",
      description: "The blog post has been published successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your platform content and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Students</p>
                  <p className="text-2xl font-bold">{mockStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Courses</p>
                  <p className="text-2xl font-bold">{mockStats.totalCourses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Reviews</p>
                  <p className="text-2xl font-bold">{mockStats.totalReviews}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Certificates Issued</p>
                  <p className="text-2xl font-bold">{mockStats.totalCertificates}</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="applications">Tutor Applications</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Course Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Course reviews will appear here once students start submitting them.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Tutor Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tutor applications will appear here when people apply to become instructors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Blog Posts</CardTitle>
                  <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Blog Post</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="Enter post title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="Enter post content"
                            rows={6}
                          />
                        </div>
                        <Button onClick={handleCreateBlogPost} className="w-full">
                          Create Post
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {blogPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Blog Posts Yet</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Create your first blog post to start sharing content with your audience.
                    </p>
                    <Button onClick={() => setIsNewPostDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Post
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{post.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">By {post.author}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{post.date}</span>
                          <div className="flex space-x-2">
                            {post.status === "draft" && (
                              <Button
                                size="sm"
                                onClick={() => handlePublishBlogPost(post.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                Publish
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteBlogPost(post.id)}
                              className="bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Certificates Issued Yet</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Certificate analytics and management will appear here once students start completing courses.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-500">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Issued</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-500">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Course Types</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
