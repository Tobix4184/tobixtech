"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ModuleSurvey } from "@/components/module-survey"
import { FinalSurvey } from "@/components/final-survey"
import { CertificateGenerator } from "@/components/certificate-generator"
import { CheckCircle, Play, Lock, BookOpen, Award, Loader2 } from "lucide-react"

const courseModules = [
  {
    id: 1,
    title: "React Fundamentals",
    content:
      "Learn the core concepts of React including components, JSX, props, and state. Understand the React component lifecycle and hooks.",
    videoUrl: "https://example.com/video1",
    duration: "90 minutes",
    resources: ["React Cheat Sheet", "Component Examples", "Hooks Reference"],
  },
  {
    id: 2,
    title: "Component Architecture",
    content: "Master component design patterns, composition vs inheritance, and building reusable component libraries.",
    videoUrl: "https://example.com/video2",
    duration: "75 minutes",
    resources: ["Design Patterns Guide", "Component Library Template", "Best Practices"],
  },
  {
    id: 3,
    title: "State Management",
    content:
      "Explore different state management solutions including Context API, Redux, and Zustand for complex applications.",
    videoUrl: "https://example.com/video3",
    duration: "100 minutes",
    resources: ["State Management Comparison", "Redux Toolkit Guide", "Context Examples"],
  },
  {
    id: 4,
    title: "Next.js App Router",
    content: "Deep dive into Next.js 13+ App Router, server components, client components, and the new routing system.",
    videoUrl: "https://example.com/video4",
    duration: "85 minutes",
    resources: ["App Router Migration Guide", "Routing Examples", "Performance Tips"],
  },
  {
    id: 5,
    title: "API Integration",
    content:
      "Learn to integrate APIs using fetch, SWR, React Query, and handle loading states, error handling, and caching.",
    videoUrl: "https://example.com/video5",
    duration: "70 minutes",
    resources: ["API Integration Patterns", "Error Handling Guide", "Caching Strategies"],
  },
  {
    id: 6,
    title: "Full-Stack Development",
    content:
      "Build complete applications with Next.js API routes, database integration, authentication, and deployment strategies.",
    videoUrl: "https://example.com/video6",
    duration: "120 minutes",
    resources: ["Full-Stack Template", "Database Setup Guide", "Deployment Checklist"],
  },
]

export default function ReactNextjsBootcampContent() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentModule, setCurrentModule] = useState(1)
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [showModuleSurvey, setShowModuleSurvey] = useState(false)
  const [showFinalSurvey, setShowFinalSurvey] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [finalSurveyPassed, setFinalSurveyPassed] = useState(false)
  const [isValidatingAccess, setIsValidatingAccess] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoadingAssessment, setIsLoadingAssessment] = useState(false)

  useEffect(() => {
    validateCourseAccess()
  }, [])

  const validateCourseAccess = async () => {
    try {
      const deviceId = localStorage.getItem("tobixtech_device_id")
      if (!deviceId) {
        toast({
          title: "Access Denied",
          description: "Device ID not found. Please re-enter your PIN.",
          variant: "destructive",
        })
        router.push("/courses/react-nextjs-bootcamp")
        return
      }

      const cookies = document.cookie.split(";")
      const accessCookie = cookies.find(
        (cookie) =>
          cookie.trim().startsWith("course-access=") &&
          cookie.includes("react-nextjs-bootcamp") &&
          cookie.includes(deviceId),
      )

      if (!accessCookie) {
        toast({
          title: "Access Denied",
          description: "Course access not found. Please re-enter your PIN.",
          variant: "destructive",
        })
        router.push("/courses/react-nextjs-bootcamp")
        return
      }

      const response = await fetch("/api/courses/react-nextjs-bootcamp/content", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${deviceId}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        setHasAccess(true)
      } else {
        const data = await response.json()
        toast({
          title: "Access Denied",
          description: data.message || "Invalid course access",
          variant: "destructive",
        })
        router.push("/courses/react-nextjs-bootcamp")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate course access",
        variant: "destructive",
      })
      router.push("/courses/react-nextjs-bootcamp")
    } finally {
      setIsValidatingAccess(false)
    }
  }

  const handleCompleteModule = () => {
    if (!completedModules.includes(currentModule)) {
      setCompletedModules([...completedModules, currentModule])
    }
    setShowModuleSurvey(true)
  }

  const handleModuleSurveyComplete = () => {
    setShowModuleSurvey(false)

    if (currentModule < courseModules.length) {
      setCurrentModule(currentModule + 1)
    } else {
      setShowFinalSurvey(true)
    }
  }

  const handleFinalSurveyComplete = (passed: boolean) => {
    setFinalSurveyPassed(passed)
    setShowFinalSurvey(false)

    if (passed) {
      setShowCertificate(true)
      toast({
        title: "Congratulations!",
        description: "You have successfully completed the course and passed the final assessment!",
      })
    } else {
      toast({
        title: "Assessment Not Passed",
        description: "Please review the course materials and try again.",
        variant: "destructive",
      })
    }
  }

  const handleTakeFinalAssessment = () => {
    setIsLoadingAssessment(true)
    setTimeout(() => {
      setIsLoadingAssessment(false)
      setShowFinalSurvey(true)
    }, 2000)
  }

  const progress = (completedModules.length / courseModules.length) * 100
  const allModulesCompleted = completedModules.length === courseModules.length

  if (isValidatingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Validating course access...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have access to this course content.</p>
          <Button onClick={() => router.push("/courses/react-nextjs-bootcamp")}>Go Back</Button>
        </div>
      </div>
    )
  }

  if (showCertificate) {
    return (
      <CertificateGenerator
        courseName="React & Next.js Bootcamp"
        studentName="Student"
        completionDate={new Date().toLocaleDateString()}
        onClose={() => setShowCertificate(false)}
      />
    )
  }

  if (showFinalSurvey) {
    return (
      <FinalSurvey
        courseTitle="React & Next.js Bootcamp"
        onComplete={handleFinalSurveyComplete}
        onClose={() => setShowFinalSurvey(false)}
      />
    )
  }

  if (showModuleSurvey) {
    return (
      <ModuleSurvey
        moduleTitle={courseModules[currentModule - 1].title}
        onComplete={handleModuleSurveyComplete}
        onClose={() => setShowModuleSurvey(false)}
      />
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">React & Next.js Bootcamp</h1>
            <Badge variant="secondary" className="text-sm">
              <BookOpen className="h-4 w-4 mr-1" />
              {completedModules.length}/{courseModules.length} Modules
            </Badge>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Course Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {courseModules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentModule === module.id
                        ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setCurrentModule(module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {completedModules.includes(module.id) ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : currentModule === module.id ? (
                          <Play className="h-4 w-4 text-blue-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className="text-sm font-medium">Module {module.id}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-6">{module.title}</p>
                  </div>
                ))}

                <div
                  className={`p-3 rounded-lg border ${
                    allModulesCompleted
                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                      : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {finalSurveyPassed ? (
                      <Award className="h-4 w-4 text-yellow-500" />
                    ) : allModulesCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium">Final Assessment</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 ml-6">
                    {finalSurveyPassed ? "Completed" : allModulesCompleted ? "Available" : "Complete all modules first"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Module {currentModule}: {courseModules[currentModule - 1].title}
                  </span>
                  <Badge variant="outline">{courseModules[currentModule - 1].duration}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-6">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-300">Video Player</p>
                        <p className="text-sm text-gray-500">{courseModules[currentModule - 1].videoUrl}</p>
                      </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                      <p>{courseModules[currentModule - 1].content}</p>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentModule(Math.max(1, currentModule - 1))}
                          disabled={currentModule === 1}
                        >
                          Previous Module
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentModule(Math.min(courseModules.length, currentModule + 1))}
                          disabled={currentModule === courseModules.length}
                        >
                          Next Module
                        </Button>
                      </div>

                      {!completedModules.includes(currentModule) && (
                        <Button onClick={handleCompleteModule}>Complete Module</Button>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="resources">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Module Resources</h3>
                      <div className="grid gap-3">
                        {courseModules[currentModule - 1].resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <span>{resource}</span>
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {allModulesCompleted && !finalSurveyPassed && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Final Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Congratulations on completing all modules! Take the final assessment to receive your certificate.
                  </p>
                  <Button onClick={handleTakeFinalAssessment} disabled={isLoadingAssessment} className="w-full">
                    {isLoadingAssessment ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading Assessment...
                      </>
                    ) : (
                      "Take Final Assessment"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
