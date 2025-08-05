"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Play, Download, ExternalLink, ArrowRight, ArrowLeft, Mail, Award, Loader2 } from "lucide-react"
import { ModuleSurvey } from "@/components/module-survey"
import CertificateGenerator from "@/components/certificate-generator"
import { FinalSurvey } from "@/components/final-survey"

const modules = [
  {
    id: 1,
    title: "React Fundamentals",
    completed: false,
    content: {
      title: "Getting Started with React",
      description: "Learn the core concepts of React including components, JSX, props, and state management.",
      learningObjectives: [
        "Understanding React components and JSX",
        "Working with props and state",
        "Event handling in React",
        "Component lifecycle methods",
      ],
      steps: [
        {
          title: "Step 1: React Components",
          content:
            "React applications are built using components - reusable pieces of UI that can manage their own state and logic.",
          tips: "Start with functional components and hooks rather than class components for modern React development.",
        },
        {
          title: "Step 2: JSX Syntax",
          content:
            "JSX allows you to write HTML-like syntax in JavaScript, making it easier to create and visualize component structures.",
          tips: "Remember that JSX is JavaScript, so use camelCase for attributes (className instead of class).",
        },
        {
          title: "Step 3: Props and State",
          content:
            "Props pass data from parent to child components, while state manages data that can change within a component.",
          tips: "Use the useState hook for managing local component state in functional components.",
        },
        {
          title: "Step 4: Event Handling",
          content:
            "Handle user interactions like clicks, form submissions, and input changes using event handlers in React.",
          tips: "Always use arrow functions or bind methods to maintain the correct 'this' context in event handlers.",
        },
      ],
    },
    survey: [
      {
        question: "What is JSX in React?",
        options: [
          "A separate templating language",
          "HTML-like syntax that can be used in JavaScript",
          "A CSS framework",
          "A database query language",
        ],
        correct: 1,
      },
      {
        question: "Which hook is used for managing local component state?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Component Architecture",
    completed: false,
    content: {
      title: "Building Scalable Component Architecture",
      description: "Learn how to structure and organize React components for maintainable and scalable applications.",
      learningObjectives: [
        "Component composition patterns",
        "Higher-order components (HOCs)",
        "Render props pattern",
        "Custom hooks creation",
      ],
      steps: [
        {
          title: "Step 1: Component Composition",
          content:
            "Build complex UIs by composing smaller, focused components together rather than creating monolithic components.",
          tips: "Follow the single responsibility principle - each component should have one clear purpose.",
        },
        {
          title: "Step 2: Higher-Order Components",
          content: "HOCs are functions that take a component and return a new component with additional functionality.",
          tips: "Use HOCs for cross-cutting concerns like authentication, logging, or data fetching.",
        },
        {
          title: "Step 3: Render Props",
          content: "The render props pattern allows components to share code using a prop whose value is a function.",
          tips: "Render props are great for sharing stateful logic between components without using HOCs.",
        },
        {
          title: "Step 4: Custom Hooks",
          content: "Extract component logic into custom hooks to reuse stateful logic across multiple components.",
          tips: "Custom hooks must start with 'use' and can call other hooks inside them.",
        },
      ],
    },
    survey: [
      {
        question: "What is the main benefit of component composition?",
        options: [
          "Faster rendering",
          "Building complex UIs from smaller, focused components",
          "Smaller bundle size",
          "Better SEO",
        ],
        correct: 1,
      },
      {
        question: "Custom hooks must start with which prefix?",
        options: ["hook", "custom", "use", "react"],
        correct: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Next.js App Router",
    completed: false,
    content: {
      title: "Modern Routing with Next.js App Router",
      description: "Master the new App Router in Next.js 13+ for building full-stack React applications.",
      learningObjectives: [
        "File-based routing system",
        "Server and client components",
        "Data fetching strategies",
        "Route handlers and API routes",
      ],
      steps: [
        {
          title: "Step 1: File-based Routing",
          content:
            "Next.js uses a file-based routing system where the folder structure in the app directory defines your routes.",
          tips: "Use page.tsx for route pages and layout.tsx for shared layouts across routes.",
        },
        {
          title: "Step 2: Server vs Client Components",
          content:
            "Next.js 13+ introduces Server Components that render on the server and Client Components that run in the browser.",
          tips: "Use Server Components by default and only add 'use client' when you need browser-specific features.",
        },
        {
          title: "Step 3: Data Fetching",
          content: "Fetch data using async/await in Server Components or use hooks like useSWR in Client Components.",
          tips: "Server Components can fetch data directly without loading states, improving user experience.",
        },
        {
          title: "Step 4: API Routes",
          content: "Create API endpoints using route handlers in the app directory for full-stack functionality.",
          tips: "Use route.ts files to create GET, POST, PUT, DELETE endpoints for your application.",
        },
      ],
    },
    survey: [
      {
        question: "What defines routes in Next.js App Router?",
        options: [
          "A routes.js configuration file",
          "The folder structure in the app directory",
          "URL parameters only",
          "A separate routing library",
        ],
        correct: 1,
      },
      {
        question: "When should you use Client Components?",
        options: [
          "Always, for better performance",
          "Only when you need browser-specific features",
          "Never, Server Components are always better",
          "Only for API calls",
        ],
        correct: 1,
      },
    ],
  },
]

const finalSurveyQuestions = [
  {
    question: "What is JSX in React?",
    options: [
      "A separate templating language",
      "HTML-like syntax that can be used in JavaScript",
      "A CSS framework",
      "A database query language",
    ],
    correct: 1,
  },
  {
    question: "What is the main benefit of component composition?",
    options: [
      "Faster rendering",
      "Building complex UIs from smaller, focused components",
      "Smaller bundle size",
      "Better SEO",
    ],
    correct: 1,
  },
  {
    question: "How does Next.js App Router define routes?",
    options: [
      "Configuration files",
      "Folder structure in the app directory",
      "URL parameters",
      "Separate routing library",
    ],
    correct: 1,
  },
  {
    question: "When should you use Server Components in Next.js?",
    options: [
      "Never",
      "By default, unless you need browser-specific features",
      "Only for API calls",
      "Only for styling",
    ],
    correct: 1,
  },
  {
    question: "Custom hooks in React must start with which prefix?",
    options: ["hook", "custom", "use", "react"],
    correct: 2,
  },
]

const certificateData = {
  studentName: "Student Name",
  courseName: "React & Next.js Bootcamp",
  completionDate: new Date().toLocaleDateString(),
  certificateId: `CERT-RNB-${Date.now()}`,
  instructorName: "Tobix Technology",
  courseHours: 60,
  grade: "A+",
}

export default function ReactNextjsBootcampContent() {
  const [currentModule, setCurrentModule] = useState(1)
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveyCompleted, setSurveyCompleted] = useState<number[]>([])
  const [showCertificate, setShowCertificate] = useState(false)
  const [showFinalSurvey, setShowFinalSurvey] = useState(false)
  const [isLoadingFinalAssessment, setIsLoadingFinalAssessment] = useState(false)

  const currentModuleData = modules.find((m) => m.id === currentModule)
  const progress = (completedModules.length / modules.length) * 100
  const allModulesCompleted = completedModules.length === modules.length

  const handleNextModule = async () => {
    if (currentModule < modules.length) {
      setShowSurvey(true)
    } else if (allModulesCompleted) {
      setIsLoadingFinalAssessment(true)

      setTimeout(() => {
        setIsLoadingFinalAssessment(false)
        setShowFinalSurvey(true)
      }, 1500)
    }
  }

  const handleSurveyComplete = (passed: boolean) => {
    if (passed) {
      setCompletedModules((prev) => [...prev, currentModule])
      setSurveyCompleted((prev) => [...prev, currentModule])
      setShowSurvey(false)
      if (currentModule < modules.length) {
        setCurrentModule((prev) => prev + 1)
      }
    } else {
      setShowSurvey(false)
    }
  }

  const handlePreviousModule = () => {
    if (currentModule > 1) {
      setCurrentModule((prev) => prev - 1)
      setShowSurvey(false)
    }
  }

  const handleFinalSurveyComplete = () => {
    setShowFinalSurvey(false)
    setShowCertificate(true)
  }

  if (showCertificate) {
    return (
      <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-green-500">Course Completed!</Badge>
            <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              You have successfully completed the React & Next.js Bootcamp.
            </p>
          </div>
          <CertificateGenerator certificateData={certificateData} />
          <div className="text-center mt-8">
            <Button onClick={() => setShowCertificate(false)} variant="outline" className="bg-transparent">
              Back to Course
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showFinalSurvey) {
    return (
      <FinalSurvey
        courseId="react-nextjs-bootcamp"
        courseName="React & Next.js Bootcamp"
        questions={finalSurveyQuestions}
        onBack={() => setShowFinalSurvey(false)}
        onComplete={handleFinalSurveyComplete}
      />
    )
  }

  if (showSurvey && currentModuleData) {
    return (
      <ModuleSurvey module={currentModuleData} onComplete={handleSurveyComplete} onBack={() => setShowSurvey(false)} />
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-500 animate-pulse">Access Granted</Badge>
          <h1 className="text-4xl font-bold mb-4">React & Next.js Bootcamp</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Complete Tutorial & Resources</p>

          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Course Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Module {currentModule}: {currentModuleData?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{currentModuleData?.content.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{currentModuleData?.content.description}</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="space-y-1 text-sm">
                    {currentModuleData?.content.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  {currentModuleData?.content.steps.map((step, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{step.content}</p>
                      {step.tips && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                          <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">💡 Pro Tip:</h5>
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm">{step.tips}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePreviousModule}
                    disabled={currentModule === 1}
                    className="btn-hover bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous Module
                  </Button>

                  <Button
                    onClick={handleNextModule}
                    disabled={isLoadingFinalAssessment || (currentModule === modules.length && !allModulesCompleted)}
                    className="btn-primary btn-hover"
                  >
                    {isLoadingFinalAssessment ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : currentModule === modules.length && allModulesCompleted ? (
                      "Take Final Assessment"
                    ) : (
                      "Next Module"
                    )}
                    {!isLoadingFinalAssessment && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {modules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          setCurrentModule(module.id)
                          setShowSurvey(false)
                        }}
                        className={`text-sm text-left hover:text-blue-500 transition-colors ${
                          currentModule === module.id ? "text-blue-500 font-medium" : ""
                        }`}
                      >
                        Module {module.id}: {module.title}
                      </button>
                      {completedModules.includes(module.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : currentModule === module.id ? (
                        <div className="w-4 h-4 border-2 border-blue-500 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <Download className="h-4 w-4 mr-2" />
                  React Documentation
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <Download className="h-4 w-4 mr-2" />
                  Next.js Guide
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  React DevTools
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Next.js Examples
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Have questions about this course?</p>
                <Button size="sm" className="w-full btn-hover">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {allModulesCompleted && (
              <Card className="card-hover border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-600 dark:text-green-400">Ready for Assessment!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    You've completed all modules. Take the final assessment to get your certificate!
                  </p>
                  <Button
                    onClick={() => {
                      setIsLoadingFinalAssessment(true)
                      setTimeout(() => {
                        setIsLoadingFinalAssessment(false)
                        setShowFinalSurvey(true)
                      }, 1500)
                    }}
                    disabled={isLoadingFinalAssessment}
                    size="sm"
                    className="w-full btn-hover"
                  >
                    {isLoadingFinalAssessment ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Take Final Assessment
                      </>
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
