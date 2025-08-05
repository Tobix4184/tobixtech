"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Lock, CheckCircle, Play } from "lucide-react"

const courseData = {
  "meta-facebook-ads": {
    title: "Meta Facebook Ads Mastery",
    description: "Complete guide to Facebook advertising, from setup to advanced optimization strategies.",
    price: "$97",
    modules: [
      "Facebook Ads Manager Setup",
      "Campaign Structure & Objectives",
      "Audience Targeting Mastery",
      "Creative Strategy & Testing",
      "Budget Optimization",
      "Analytics & Reporting",
    ],
  },
  "web-development-fundamentals": {
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, JavaScript, and modern web development practices from scratch.",
    price: "$127",
    modules: [
      "HTML5 Fundamentals",
      "CSS3 & Responsive Design",
      "JavaScript Basics",
      "DOM Manipulation",
      "Git & Version Control",
      "Project Deployment",
    ],
  },
  "react-nextjs-bootcamp": {
    title: "React & Next.js Bootcamp",
    description: "Build modern web applications with React and Next.js framework.",
    price: "$197",
    modules: [
      "React Fundamentals",
      "Component Architecture",
      "State Management",
      "Next.js App Router",
      "API Integration",
      "Full-Stack Development",
    ],
  },
}

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [pin, setPin] = useState("")
  const [isValidating, setIsValidating] = useState(false)

  const courseId = params.courseId as string
  const course = courseData[courseId as keyof typeof courseData]

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => router.push("/courses")}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  const handlePinValidation = async () => {
    if (!pin || pin.length !== 5) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 5-digit PIN",
        variant: "destructive",
      })
      return
    }

    setIsValidating(true)

    try {
      const response = await fetch("/api/validate-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          pin,
        }),
      })

      const data = await response.json()

      if (data.valid) {
        // Set a secure cookie for course access
        document.cookie = `course-access=${courseId}-${pin}; path=/; max-age=86400; secure; samesite=strict`

        toast({
          title: "Access Granted!",
          description: "Redirecting to course content...",
        })

        // Small delay for better UX
        setTimeout(() => {
          router.push(`/courses/${courseId}/content`)
        }, 1000)
      } else {
        toast({
          title: "Invalid PIN",
          description: "The PIN you entered is incorrect. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {course.price}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Modules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                Course Modules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {course.modules.map((module, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Access Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Course Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="pin" className="block text-sm font-medium mb-2">
                  Enter your 5-digit PIN
                </label>
                <Input
                  id="pin"
                  type="text"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  maxLength={5}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <div className="space-y-3">
                <Button onClick={handlePinValidation} disabled={isValidating || pin.length !== 5} className="w-full">
                  {isValidating ? "Validating..." : "Validate PIN"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open("mailto:tobixtech@gmail.com?subject=Course PIN Request", "_blank")}
                >
                  Buy PIN
                </Button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Don't have a PIN? Contact us to purchase course access.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
