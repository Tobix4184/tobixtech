"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Users, Key, BookOpen, FileText, Plus, Edit, Trash2, Eye, Shield, Loader2, LogOut } from "lucide-react"

interface User {
  _id: string
  email: string
  courses: string[]
  createdAt: string
  status: string
}

interface Pin {
  _id: string
  pin: string
  courseId: string
  usageLimit: number
  usedCount: number
  deviceId: string | null
  expirationDate: string
  createdAt: string
  status: string
}

interface Course {
  _id: string
  id: string
  title: string
  description: string
  price: string
  thumbnail: string
  modules: string[]
  status: string
  createdAt: string
  updatedAt: string
}

interface BlogPost {
  _id: string
  title: string
  slug: string
  content: string
  thumbnail: string
  tags: string[]
  author: string
  status: string
  views: number
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()

  // State for all data
  const [users, setUsers] = useState<User[]>([])
  const [pins, setPins] = useState<Pin[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  // Loading states
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Form states
  const [userForm, setUserForm] = useState({ email: "", courses: [] as string[] })
  const [pinForm, setPinForm] = useState({ courseId: "", usageLimit: 1, expirationDate: "" })
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    modules: [""],
    status: "draft",
  })
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    thumbnail: "",
    tags: "",
    status: "draft",
  })

  // Check admin authentication and load data
  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const expires = localStorage.getItem("admin_expires")

      if (!token || !expires || new Date(expires) < new Date()) {
        toast({
          title: "Session Expired",
          description: "Please login again",
          variant: "destructive",
        })
        router.push("/admin-login")
        return
      }

      // Load all data
      await Promise.all([loadUsers(), loadPins(), loadCourses(), loadBlogPosts()])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setInitialLoading(false)
    }
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem("admin_token")
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  // Load functions
  const loadUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to load users")

      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("Error loading users:", error)
    }
  }

  const loadPins = async () => {
    try {
      const response = await fetch("/api/admin/pins", {
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to load pins")

      const data = await response.json()
      setPins(data.pins || [])
    } catch (error) {
      console.error("Error loading pins:", error)
    }
  }

  const loadCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses", {
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to load courses")

      const data = await response.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error("Error loading courses:", error)
    }
  }

  const loadBlogPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog-posts", {
        headers: getAuthHeaders(),
      })

      if (!response.ok) throw new Error("Failed to load blog posts")

      const data = await response.json()
      setBlogPosts(data.posts || [])
    } catch (error) {
      console.error("Error loading blog posts:", error)
    }
  }

  // User management functions
  const handleCreateUser = async () => {
    if (!userForm.email) {
      toast({ title: "Error", description: "Email is required", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(userForm),
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: "Success", description: "User created successfully" })
        setUserForm({ email: "", courses: [] })
        loadUsers()
      } else {
        toast({ title: "Error", description: data.message || "Failed to create user", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create user", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        toast({ title: "Success", description: "User deleted successfully" })
        loadUsers()
      } else {
        const data = await response.json()
        toast({ title: "Error", description: data.message || "Failed to delete user", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete user", variant: "destructive" })
    }
  }

  // PIN management functions
  const handleCreatePin = async () => {
    if (!pinForm.courseId || !pinForm.expirationDate) {
      toast({ title: "Error", description: "Course and expiration date are required", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/admin/pins", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(pinForm),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `PIN created: ${data.pin.pin}`,
        })
        setPinForm({ courseId: "", usageLimit: 1, expirationDate: "" })
        loadPins()
      } else {
        toast({ title: "Error", description: data.message || "Failed to create PIN", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create PIN", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleRevokePin = async (pinId: string) => {
    try {
      const response = await fetch(`/api/admin/pins/${pinId}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: "revoked" }),
      })

      if (response.ok) {
        toast({ title: "Success", description: "PIN revoked successfully" })
        loadPins()
      } else {
        const data = await response.json()
        toast({ title: "Error", description: data.message || "Failed to revoke PIN", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to revoke PIN", variant: "destructive" })
    }
  }

  // Course management functions
  const handleCreateCourse = async () => {
    if (!courseForm.title || !courseForm.description) {
      toast({ title: "Error", description: "Title and description are required", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...courseForm,
          modules: courseForm.modules.filter((m) => m.trim()),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: "Success", description: "Course created successfully" })
        setCourseForm({
          title: "",
          description: "",
          price: "",
          thumbnail: "",
          modules: [""],
          status: "draft",
        })
        loadCourses()
      } else {
        toast({ title: "Error", description: data.message || "Failed to create course", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create course", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Course deleted successfully" })
        loadCourses()
      } else {
        const data = await response.json()
        toast({ title: "Error", description: data.message || "Failed to delete course", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete course", variant: "destructive" })
    }
  }

  // Blog management functions
  const handleCreateBlogPost = async () => {
    if (!blogForm.title || !blogForm.content) {
      toast({ title: "Error", description: "Title and content are required", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/admin/blog-posts", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...blogForm,
          tags: blogForm.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({ title: "Success", description: "Blog post created successfully" })
        setBlogForm({
          title: "",
          content: "",
          thumbnail: "",
          tags: "",
          status: "draft",
        })
        loadBlogPosts()
      } else {
        toast({ title: "Error", description: data.message || "Failed to create blog post", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create blog post", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBlogPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/admin/blog-posts/${postId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        toast({ title: "Success", description: "Blog post deleted successfully" })
        loadBlogPosts()
      } else {
        const data = await response.json()
        toast({ title: "Error", description: data.message || "Failed to delete blog post", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_expires")
    toast({ title: "Logged Out", description: "You have been logged out successfully" })
    router.push("/admin-login")
  }

  const addModuleField = () => {
    setCourseForm((prev) => ({
      ...prev,
      modules: [...prev.modules, ""],
    }))
  }

  const updateModule = (index: number, value: string) => {
    setCourseForm((prev) => ({
      ...prev,
      modules: prev.modules.map((module, i) => (i === index ? value : module)),
    }))
  }

  const removeModule = (index: number) => {
    setCourseForm((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }))
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active PINs</p>
                  <p className="text-2xl font-bold">{pins.filter((p) => p.status === "active").length}</p>
                </div>
                <Key className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Courses</p>
                  <p className="text-2xl font-bold">{courses.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Blog Posts</p>
                  <p className="text-2xl font-bold">{blogPosts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="pins" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              PINs
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog
            </TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      value={userForm.email}
                      onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Assign Courses</label>
                    <Select
                      onValueChange={(value) => {
                        if (!userForm.courses.includes(value)) {
                          setUserForm((prev) => ({ ...prev, courses: [...prev.courses, value] }))
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select courses" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course._id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {userForm.courses.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {userForm.courses.map((courseId) => {
                      const course = courses.find((c) => c.id === courseId)
                      return (
                        <Badge
                          key={courseId}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => {
                            setUserForm((prev) => ({ ...prev, courses: prev.courses.filter((c) => c !== courseId) }))
                          }}
                        >
                          {course?.title} ×
                        </Badge>
                      )
                    })}
                  </div>
                )}

                <Button onClick={handleCreateUser} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.courses.map((courseId) => {
                              const course = courses.find((c) => c.id === courseId)
                              return (
                                <Badge key={courseId} variant="outline" className="text-xs">
                                  {course?.title || courseId}
                                </Badge>
                              )
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete User</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this user? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteUser(user._id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PINs Management */}
          <TabsContent value="pins" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New PIN</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Course</label>
                    <Select onValueChange={(value) => setPinForm((prev) => ({ ...prev, courseId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course._id} value={course.id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Usage Limit</label>
                    <Input
                      type="number"
                      min="1"
                      value={pinForm.usageLimit}
                      onChange={(e) =>
                        setPinForm((prev) => ({ ...prev, usageLimit: Number.parseInt(e.target.value) || 1 }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiration Date</label>
                    <Input
                      type="datetime-local"
                      value={pinForm.expirationDate}
                      onChange={(e) => setPinForm((prev) => ({ ...prev, expirationDate: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={handleCreatePin} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create PIN
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PINs List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PIN</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pins.map((pin) => {
                      const course = courses.find((c) => c.id === pin.courseId)
                      return (
                        <TableRow key={pin._id}>
                          <TableCell className="font-mono">{pin.pin}</TableCell>
                          <TableCell>{course?.title || pin.courseId}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {pin.usedCount}/{pin.usageLimit}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {pin.deviceId ? (
                              <Badge variant="secondary" className="font-mono text-xs">
                                <Shield className="h-3 w-3 mr-1" />
                                {pin.deviceId.slice(0, 8)}...
                              </Badge>
                            ) : (
                              <span className="text-gray-400">Not linked</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={pin.status === "active" ? "default" : "destructive"}>{pin.status}</Badge>
                          </TableCell>
                          <TableCell>{new Date(pin.expirationDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              {pin.status === "active" && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive">
                                      Revoke
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Revoke PIN</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to revoke this PIN? Users will no longer be able to access
                                        the course with this PIN.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleRevokePin(pin._id)}>
                                        Revoke
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Management */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      placeholder="Course title"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <Input
                      placeholder="$99"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm((prev) => ({ ...prev, price: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Course description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={courseForm.thumbnail}
                    onChange={(e) => setCourseForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
                  />
                  {courseForm.thumbnail && (
                    <div className="mt-2">
                      <img
                        src={courseForm.thumbnail || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        className="w-32 h-20 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Modules</label>
                  {courseForm.modules.map((module, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        placeholder={`Module ${index + 1}`}
                        value={module}
                        onChange={(e) => updateModule(index, e.target.value)}
                      />
                      {courseForm.modules.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeModule(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addModuleField}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select onValueChange={(value) => setCourseForm((prev) => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleCreateCourse} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Course
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Courses List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Modules</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {course.thumbnail && (
                              <img
                                src={course.thumbnail || "/placeholder.svg"}
                                alt={course.title}
                                className="w-12 h-8 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-gray-500">{course.description.slice(0, 50)}...</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{course.price}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.modules.length} modules</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={course.status === "published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Course</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this course? This action cannot be undone and will
                                    affect all associated PINs.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteCourse(course._id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Management */}
          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      placeholder="Blog post title"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      placeholder="web-development, tutorial, beginner"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm((prev) => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={blogForm.thumbnail}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, thumbnail: e.target.value }))}
                  />
                  {blogForm.thumbnail && (
                    <div className="mt-2">
                      <img
                        src={blogForm.thumbnail || "/placeholder.svg"}
                        alt="Thumbnail preview"
                        className="w-32 h-20 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    placeholder="Write your blog post content here..."
                    value={blogForm.content}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                    rows={10}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select onValueChange={(value) => setBlogForm((prev) => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleCreateBlogPost} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Blog Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Posts List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {post.thumbnail && (
                              <img
                                src={post.thumbnail || "/placeholder.svg"}
                                alt={post.title}
                                className="w-12 h-8 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium">{post.title}</div>
                              <div className="text-sm text-gray-500">{post.slug}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this blog post? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteBlogPost(post._id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
