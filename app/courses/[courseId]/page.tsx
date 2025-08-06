"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star, Play, CheckCircle, Lock, Award, BookOpen, Target, MessageCircle, Share2, AlertCircle, Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { generateDeviceId } from "@/lib/utils"

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { toast } = useToast()
  
  const [pin, setPin] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [deviceId] = useState(() => generateDeviceId())

  // Mock course data - in real app, this would come from API
  const course = {
    id: courseId,
    title: "Web Development Fundamentals",
    description: "Master the basics of HTML, CSS, and JavaScript to build modern websites",
    longDescription: "This comprehensive course will take you from complete beginner to confident web developer. You'll learn the fundamental technologies that power the modern web: HTML for structure, CSS for styling, and JavaScript for interactivity. Through hands-on projects and real-world examples, you'll build a solid foundation in web development.",
    instructor: "Ikeh Dominion",
    duration: "8 weeks",
    level: "Beginner",
    price: "$299",
    originalPrice: "$399",
    image: "/placeholder.svg?height=400&width=600&text=Course+Hero",
    category: "Web Development",
    rating: 4.9,
    students: 1250,
    reviews: 342,
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "Git", "VS Code"],
    requirements: [
      "Basic computer skills",
      "No prior programming experience required",
      "A computer with internet connection",
      "Willingness to learn and practice"
    ],
    outcomes: [
      "Build responsive websites from scratch",
      "Understand HTML5 semantic elements",
      "Style websites with modern CSS techniques",
      "Add interactivity with JavaScript",
      "Use Git for version control",
      "Deploy websites to the web"
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Web Development",
        duration: "2 hours",
        lessons: 8,
        description: "Overview of web technologies and setting up your development environment"
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        duration: "3 hours",
        lessons: 12,
        description: "Learn HTML structure, elements, and semantic markup"
      },
      {
        id: 3,
        title: "CSS Styling",
        duration: "4 hours",
        lessons: 15,
        description: "Master CSS selectors, properties, and layout techniques"
      },
      {
        id: 4,
        title: "Responsive Design",
        duration: "3 hours",
        lessons: 10,
        description: "Create websites that work on all devices"
      },
      {
        id: 5,
        title: "JavaScript Basics",
        duration: "5 hours",
        lessons: 18,
        description: "Add interactivity and dynamic behavior to your websites"
      },
      {
        id: 6,
        title: "Final Project",
        duration: "4 hours",
        lessons: 6,
        description: "Build a complete portfolio website showcasing your skills"
      }
    ]
  }

  const handlePinSubmit = async () => {
    if (!pin || pin.length !== 5) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 5-digit PIN",
        variant: "destructive"
      })
      return
    }

    setIsValidating(true)

    try {
      const response = await fetch('/api/validate-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          pin: pin,
          deviceId: deviceId
        })
      })

      const data = await response.json()

      if (data.valid) {
        setHasAccess(true)
        toast({
          title: "Access Granted!",
          description: "You now have access to this course content."
        })
      } else {
        toast({
          title: "Invalid PIN",
          description: data.message || "The PIN you entered is not valid for this course.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to validate PIN. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsValidating(false)
    }
  }

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons, 0)
  const totalDuration = course.modules.reduce((total, module) => {
    const hours = parseInt(module.duration.split(' ')[0])
    return total + hours
  }, 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                {course.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {course.description}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{course.students.toLocaleString()} students</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">{course.price}</span>
                {course.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {course.originalPrice}
                  </span>
                )}
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  25% OFF
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="rounded-full w-16 h-16">
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Course Preview</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Course preview video would play here</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.longDescription}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>What You'll Learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {course.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Course Curriculum</h3>
                      <p className="text-muted-foreground">
                        {course.modules.length} modules • {totalLessons} lessons • {totalDuration} hours total
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {course.modules.map((module, index) => (
                      <Card key={module.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">{index + 1}</span>
                              </div>
                              <div>
                                <CardTitle className="text-lg">{module.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {module.lessons} lessons • {module.duration}
                                </p>
                              </div>
                            </div>
                            {hasAccess ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{module.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src="/placeholder.svg?height=80&width=80&text=ID"
                          alt={course.instructor}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                          <p className="text-muted-foreground mb-4">
                            Senior Full-Stack Developer & Digital Marketing Expert with 8+ years of experience. 
                            Passionate about teaching and helping students achieve their career goals.
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>5,000+ students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen className="h-4 w-4" />
                              <span>15 courses</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4" />
                              <span>4.9 rating</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Student Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <Card key={review}>
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={`/placeholder-u.png?height=40&width=40&text=U${review}`}
                              alt="User"
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold">Student {review}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">
                                Excellent course! The instructor explains everything clearly and the projects 
                                are very practical. I learned so much and feel confident building websites now.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  {!hasAccess ? (
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Enter your 5-digit PIN to access this course content.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-3">
                        <Input
                          placeholder="Enter 5-digit PIN"
                          value={pin}
                          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 5))}
                          maxLength={5}
                          className="text-center text-lg tracking-widest"
                        />
                        <Button 
                          onClick={handlePinSubmit}
                          disabled={isValidating || pin.length !== 5}
                          className="w-full"
                        >
                          {isValidating ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Validating...
                            </>
                          ) : (
                            'Access Course'
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800 dark:text-green-200">
                          You have access to this course! Start learning now.
                        </AlertDescription>
                      </Alert>
                      
                      <Button className="w-full" size="lg" asChild>
                        <a href={`/courses/${courseId}/content`}>
                          <Play className="h-4 w-4 mr-2" />
                          Start Course
                        </a>
                      </Button>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t space-y-4">
                    <h4 className="font-semibold">This course includes:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{totalDuration} hours of content</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <span>Q&A support</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Button variant="outline" className="w-full" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Course
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills You'll Gain</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
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
