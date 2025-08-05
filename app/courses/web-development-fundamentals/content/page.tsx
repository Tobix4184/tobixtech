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
    title: "HTML5 Fundamentals",
    completed: false,
    content: {
      title: "Building the Foundation with HTML5",
      description: "Learn the building blocks of web development with modern HTML5 elements and semantic markup.",
      learningObjectives: [
        "Understanding HTML5 document structure",
        "Working with semantic elements",
        "Forms and input validation",
        "Accessibility best practices",
      ],
      steps: [
        {
          title: "Step 1: HTML5 Document Structure",
          content:
            "Every HTML5 document starts with a DOCTYPE declaration and follows a specific structure with html, head, and body elements.",
          tips: "Always use semantic HTML5 elements like header, nav, main, section, article, and footer for better accessibility and SEO.",
        },
        {
          title: "Step 2: Semantic Elements",
          content:
            "HTML5 introduces semantic elements that give meaning to your content structure, making it more accessible to screen readers and search engines.",
          tips: "Use header for page/section headers, nav for navigation menus, main for primary content, and aside for sidebar content.",
        },
        {
          title: "Step 3: Forms and Validation",
          content:
            "HTML5 provides built-in form validation with new input types like email, url, number, and date, along with validation attributes.",
          tips: "Use the 'required' attribute for mandatory fields and 'pattern' for custom validation rules.",
        },
        {
          title: "Step 4: Accessibility Features",
          content:
            "Implement ARIA labels, alt text for images, and proper heading hierarchy to make your websites accessible to all users.",
          tips: "Test your website with screen readers and keyboard navigation to ensure it's truly accessible.",
        },
      ],
    },
    survey: [
      {
        question: "What is the purpose of semantic HTML5 elements?",
        options: [
          "To make websites load faster",
          "To give meaning to content structure for accessibility and SEO",
          "To reduce code size",
          "To add styling to elements",
        ],
        correct: 1,
      },
      {
        question: "Which HTML5 input type is best for email addresses?",
        options: ["text", "email", "url", "string"],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    title: "CSS3 & Responsive Design",
    completed: false,
    content: {
      title: "Styling and Layout with CSS3",
      description: "Master modern CSS3 features including Flexbox, Grid, and responsive design principles.",
      learningObjectives: [
        "CSS3 selectors and properties",
        "Flexbox and Grid layouts",
        "Responsive design with media queries",
        "CSS animations and transitions",
      ],
      steps: [
        {
          title: "Step 1: CSS3 Fundamentals",
          content:
            "Learn advanced CSS3 selectors, pseudo-classes, and modern properties for styling web elements effectively.",
          tips: "Use CSS custom properties (variables) to maintain consistent styling across your website.",
        },
        {
          title: "Step 2: Flexbox Layout",
          content:
            "Master Flexbox for one-dimensional layouts, perfect for navigation bars, card layouts, and centering content.",
          tips: "Use 'justify-content' for horizontal alignment and 'align-items' for vertical alignment in flex containers.",
        },
        {
          title: "Step 3: CSS Grid",
          content:
            "Learn CSS Grid for complex two-dimensional layouts, ideal for page layouts and component positioning.",
          tips: "Start with simple grid templates and gradually add complexity as you become more comfortable.",
        },
        {
          title: "Step 4: Responsive Design",
          content:
            "Implement mobile-first responsive design using media queries, flexible units, and responsive images.",
          tips: "Always design for mobile first, then enhance for larger screens using min-width media queries.",
        },
      ],
    },
    survey: [
      {
        question: "What is the mobile-first approach in responsive design?",
        options: [
          "Designing for desktop first",
          "Designing for mobile devices first, then enhancing for larger screens",
          "Only designing for mobile devices",
          "Using only mobile-specific CSS",
        ],
        correct: 1,
      },
      {
        question: "Which CSS layout method is best for two-dimensional layouts?",
        options: ["Flexbox", "CSS Grid", "Float", "Position"],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    title: "JavaScript Fundamentals",
    completed: false,
    content: {
      title: "Interactive Web Development with JavaScript",
      description:
        "Learn JavaScript fundamentals including variables, functions, DOM manipulation, and modern ES6+ features.",
      learningObjectives: [
        "JavaScript syntax and data types",
        "Functions and scope",
        "DOM manipulation",
        "Event handling and async programming",
      ],
      steps: [
        {
          title: "Step 1: JavaScript Basics",
          content: "Understand variables, data types, operators, and control structures in JavaScript.",
          tips: "Use 'const' for values that won't change, 'let' for variables that will change, and avoid 'var' in modern JavaScript.",
        },
        {
          title: "Step 2: Functions and Scope",
          content:
            "Learn about function declarations, expressions, arrow functions, and how scope works in JavaScript.",
          tips: "Arrow functions are great for short functions and maintain the 'this' context from their surrounding scope.",
        },
        {
          title: "Step 3: DOM Manipulation",
          content: "Master selecting elements, modifying content, and dynamically updating the webpage structure.",
          tips: "Use querySelector() and querySelectorAll() for modern element selection instead of older methods.",
        },
        {
          title: "Step 4: Events and Async Programming",
          content:
            "Handle user interactions with event listeners and work with asynchronous code using promises and async/await.",
          tips: "Always handle errors in async operations using try/catch blocks or .catch() methods.",
        },
      ],
    },
    survey: [
      {
        question: "Which keyword should you use for variables that won't change?",
        options: ["var", "let", "const", "static"],
        correct: 2,
      },
      {
        question: "What is the modern way to select elements in the DOM?",
        options: ["getElementById()", "querySelector()", "getElementsByClassName()", "getElementsByTagName()"],
        correct: 1,
      },
    ],
  },
]

const finalSurveyQuestions = [
  {
    question: "What is the main benefit of using semantic HTML5 elements?",
    options: ["Faster loading times", "Better accessibility and SEO", "Smaller file sizes", "Automatic styling"],
    correct: 1,
  },
  {
    question: "Which CSS layout method is best for one-dimensional layouts?",
    options: ["CSS Grid", "Flexbox", "Float", "Position"],
    correct: 1,
  },
  {
    question: "What is the recommended approach for responsive design?",
    options: ["Desktop-first", "Mobile-first", "Tablet-first", "No specific approach"],
    correct: 1,
  },
  {
    question: "Which JavaScript keyword should be used for constants?",
    options: ["var", "let", "const", "final"],
    correct: 2,
  },
  {
    question: "What is the modern method for selecting DOM elements?",
    options: ["getElementById", "querySelector", "getElementsByClass", "getElement"],
    correct: 1,
  },
]

const certificateData = {
  studentName: "Student Name",
  courseName: "Web Development Fundamentals",
  completionDate: new Date().toLocaleDateString(),
  certificateId: `CERT-WDF-${Date.now()}`,
  instructorName: "Tobix Technology",
  courseHours: 40,
  grade: "A+",
}

export default function WebDevelopmentFundamentalsContent() {
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
              You have successfully completed the Web Development Fundamentals course.
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
        courseId="web-development-fundamentals"
        courseName="Web Development Fundamentals"
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
          <h1 className="text-4xl font-bold mb-4">Web Development Fundamentals</h1>
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
                  HTML5 Cheat Sheet
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <Download className="h-4 w-4 mr-2" />
                  CSS3 Reference
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  MDN Web Docs
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Can I Use
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
