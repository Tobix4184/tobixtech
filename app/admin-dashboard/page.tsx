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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Users, Key, BookOpen, FileText, Plus, Edit, Trash2, Eye, Shield, Loader2, LogOut, Copy } from 'lucide-react'

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

  const [users, setUsers] = useState<User[]>([])
  const [pins, setPins] = useState<Pin[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

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

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_expires")
    toast({ title: "Logged Out", description: "You have been logged out successfully" })
    router.push("/admin-login")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: "Copied", description: "PIN copied to clipboard" })
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

        <Tabs defaultValue="pins" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pins" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              PINs
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
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
                        <SelectItem value="web-development-fundamentals">Web Development Fundamentals</SelectItem>
                        <SelectItem value="react-nextjs-bootcamp">React & Next.js Bootcamp</SelectItem>
                        <SelectItem value="meta-facebook-ads">Meta Facebook Ads Mastery</SelectItem>
                        <SelectItem value="mobile-app-development">Mobile App Development</SelectItem>
                        <SelectItem value="full-stack-javascript">Full-Stack JavaScript</SelectItem>
                        <SelectItem value="digital-marketing-complete">Complete Digital Marketing</SelectItem>
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
                    {pins.map((pin) => (
                      <TableRow key={pin._id}>
                        <TableCell className="font-mono">
                          <div className="flex items-center space-x-2">
                            <span>{pin.pin}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(pin.pin)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{pin.courseId}</TableCell>
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
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Users Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management features will be available when backend is connected.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Courses Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Course management features will be available when backend is connected.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blog Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Blog management features will be available when backend is connected.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
