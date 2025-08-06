"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Star, Search, Filter, BookOpen, Code, Smartphone, Globe, Database } from 'lucide-react'
import Link from "next/link"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const courses = [
    {
      id: "web-development-fundamentals",
      title: "Web Development Fundamentals",
      description: "Master the basics of HTML, CSS, and JavaScript to build modern websites",
      instructor: "Ikeh Dominion",
      duration: "8 weeks",
      level: "Beginner",
      price: "$299",
      originalPrice: "$399",
      image: "/placeholder.svg?height=200&width=300&text=Web+Dev",
      category: "Web Development",
      rating: 4.9,
      students: 1250,
      skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      featured: true
    },
    {
      id: "react-nextjs-bootcamp",
      title: "React & Next.js Bootcamp",
      description: "Build modern web applications with React and Next.js framework",
      instructor: "Ikeh Dominion",
      duration: "12 weeks",
      level: "Intermediate",
      price: "$499",
      originalPrice: "$699",
      image: "/placeholder.svg?height=200&width=300&text=React+Next",
      category: "Web Development",
      rating: 4.8,
      students: 890,
      skills: ["React", "Next.js", "TypeScript", "API Integration"],
      featured: true
    },
    {
      id: "meta-facebook-ads",
      title: "Meta Facebook Ads Mastery",
      description: "Learn to create high-converting Facebook and Instagram ad campaigns",
      instructor: "Ikeh Dominion",
      duration: "6 weeks",
      level: "Beginner",
      price: "$199",
      originalPrice: "$299",
      image: "/placeholder.svg?height=200&width=300&text=Facebook+Ads",
      category: "Digital Marketing",
      rating: 4.9,
      students: 2100,
      skills: ["Facebook Ads", "Instagram Ads", "Audience Targeting", "Analytics"],
      featured: false
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development with React Native",
      description: "Create cross-platform mobile apps for iOS and Android",
      instructor: "Ikeh Dominion",
      duration: "10 weeks",
      level: "Intermediate",
      price: "$399",
      originalPrice: "$549",
      image: "/placeholder.svg?height=200&width=300&text=Mobile+Dev",
      category: "Mobile Development",
      rating: 4.7,
      students: 650,
      skills: ["React Native", "Mobile UI", "App Store", "Push Notifications"],
      featured: false
    },
    {
      id: "full-stack-javascript",
      title: "Full-Stack JavaScript Developer",
      description: "Complete full-stack development with Node.js, Express, and MongoDB",
      instructor: "Ikeh Dominion",
      duration: "16 weeks",
      level: "Advanced",
      price: "$699",
      originalPrice: "$899",
      image: "/placeholder.svg?height=200&width=300&text=Full+Stack",
      category: "Web Development",
      rating: 4.8,
      students: 420,
      skills: ["Node.js", "Express", "MongoDB", "REST APIs"],
      featured: true
    },
    {
      id: "digital-marketing-complete",
      title: "Complete Digital Marketing Course",
      description: "Master SEO, PPC, Social Media, and Content Marketing strategies",
      instructor: "Ikeh Dominion",
      duration: "14 weeks",
      level: "Beginner",
      price: "$449",
      originalPrice: "$599",
      image: "/placeholder.svg?height=200&width=300&text=Digital+Marketing",
      category: "Digital Marketing",
      rating: 4.9,
      students: 1800,
      skills: ["SEO", "Google Ads", "Social Media", "Content Marketing"],
      featured: false
    }
  ]

  const categories = [
    { value: "all", label: "All Categories", icon: <BookOpen className="h-4 w-4" /> },
    { value: "Web Development", label: "Web Development", icon: <Code className="h-4 w-4" /> },
    { value: "Mobile Development", label: "Mobile Development", icon: <Smartphone className="h-4 w-4" /> },
    { value: "Digital Marketing", label: "Digital Marketing", icon: <Globe className="h-4 w-4" /> },
    { value: "Database", label: "Database", icon: <Database className="h-4 w-4" /> }
  ]

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const featuredCourses = courses.filter(course => course.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Transform Your Career with{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Expert-Led Courses
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose from our comprehensive collection of courses designed by industry experts. 
            From beginner-friendly introductions to advanced masterclasses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
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
                    <div className="flex items-center">
                      {category.icon}
                      <span className="ml-2">{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Courses</h2>
              <p className="text-xl text-muted-foreground">
                Our most popular and highly-rated courses
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">
                      Featured
                    </Badge>
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      {course.level}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button asChild>
                        <Link href={`/courses/${course.id}`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Courses */}
      <section className="py-20 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">All Courses</h2>
              <p className="text-muted-foreground">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full sm:w-48 mt-4 sm:mt-0">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all courses
              </p>
              <Button onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLevel("all")
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge variant="secondary" className="absolute top-4 right-4">
                      {course.level}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button asChild>
                        <Link href={`/courses/${course.id}`}>
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
