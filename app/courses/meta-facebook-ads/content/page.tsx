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
    title: "Facebook Ads Manager Setup",
    completed: false,
    content: {
      title: "Getting Started with Facebook Ads Manager",
      description:
        "Welcome to the complete Facebook Ads Mastery course! In this first module, we'll set up your Facebook Ads Manager account and understand the interface.",
      learningObjectives: [
        "Creating your Business Manager account",
        "Setting up payment methods",
        "Understanding the Ads Manager interface",
        "Installing Facebook Pixel",
      ],
      steps: [
        {
          title: "Step 1: Create Your Business Manager Account",
          content:
            "Go to business.facebook.com and click 'Create Account'. This is essential for managing your ads professionally and keeping your personal and business accounts separate.",
          tips: "Always use Business Manager instead of your personal Facebook account for advertising. This provides better organization, security, and professional credibility.",
        },
        {
          title: "Step 2: Add Your Facebook Page",
          content:
            "In Business Manager, go to Business Settings → Pages → Add. You can either add an existing page or create a new one for your business.",
          tips: "Make sure your Facebook page is complete with profile picture, cover photo, and business information before running ads.",
        },
        {
          title: "Step 3: Set Up Payment Method",
          content:
            "Navigate to Business Settings → Payments → Payment Methods. Add your credit card or PayPal account to fund your advertising campaigns.",
          tips: "Set up automatic payments to ensure your ads don't stop running due to payment issues.",
        },
        {
          title: "Step 4: Install Facebook Pixel",
          content:
            "The Facebook Pixel is crucial for tracking conversions and optimizing your ads. Go to Events Manager → Connect Data Sources → Web → Facebook Pixel.",
          tips: "Install the pixel on every page of your website, not just landing pages. This helps with better audience targeting and optimization.",
        },
      ],
    },
    survey: [
      {
        question: "What is the main benefit of using Business Manager instead of a personal Facebook account?",
        options: [
          "It's free to use",
          "Better organization, security, and professional credibility",
          "You can create more ads",
          "It has better customer support",
        ],
        correct: 1,
      },
      {
        question: "Where do you install the Facebook Pixel?",
        options: [
          "Only on landing pages",
          "Only on the homepage",
          "On every page of your website",
          "Only on product pages",
        ],
        correct: 2,
      },
      {
        question: "What should you set up to ensure your ads don't stop running?",
        options: ["Manual payments only", "Automatic payments", "Daily budget limits", "Campaign schedules"],
        correct: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Audience Targeting Strategies",
    completed: false,
    content: {
      title: "Mastering Facebook Audience Targeting",
      description:
        "Learn how to identify and target your ideal customers using Facebook's powerful audience targeting tools.",
      learningObjectives: [
        "Understanding audience types",
        "Creating custom audiences",
        "Using lookalike audiences",
        "Demographic and interest targeting",
      ],
      steps: [
        {
          title: "Step 1: Define Your Target Audience",
          content:
            "Before creating ads, clearly define who your ideal customer is. Consider demographics, interests, behaviors, and pain points.",
          tips: "Create detailed buyer personas to guide your targeting decisions. The more specific you are, the better your ad performance will be.",
        },
        {
          title: "Step 2: Use Core Audiences",
          content:
            "Core audiences allow you to target people based on demographics, interests, behaviors, and connections. Start broad and narrow down based on performance.",
          tips: "Don't over-narrow your audience initially. Facebook's algorithm works best with some room to optimize.",
        },
        {
          title: "Step 3: Create Custom Audiences",
          content:
            "Upload your customer list, target website visitors, or engage with people who interacted with your content on Facebook or Instagram.",
          tips: "Custom audiences typically have higher conversion rates since they're already familiar with your brand.",
        },
        {
          title: "Step 4: Build Lookalike Audiences",
          content:
            "Create lookalike audiences based on your best customers to find new people who are similar to your existing audience.",
          tips: "Use your highest-value customers as the source for lookalike audiences for better quality prospects.",
        },
      ],
    },
    survey: [
      {
        question: "What is the main advantage of custom audiences?",
        options: [
          "They're cheaper to target",
          "They have higher conversion rates",
          "They're easier to create",
          "They reach more people",
        ],
        correct: 1,
      },
      {
        question: "When starting with core audiences, you should:",
        options: [
          "Make them as narrow as possible",
          "Start broad and narrow down based on performance",
          "Only target demographics",
          "Avoid interest targeting",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Ad Creative Best Practices",
    completed: false,
    content: {
      title: "Creating High-Converting Ad Creatives",
      description: "Master the art of creating compelling ad creatives that capture attention and drive conversions.",
      learningObjectives: [
        "Understanding ad creative formats",
        "Writing compelling ad copy",
        "Designing effective visuals",
        "A/B testing creatives",
      ],
      steps: [
        {
          title: "Step 1: Choose the Right Ad Format",
          content:
            "Select from single image, carousel, video, or collection ads based on your campaign objective and audience preferences.",
          tips: "Video ads typically have higher engagement rates, but static images can be more cost-effective for certain objectives.",
        },
        {
          title: "Step 2: Write Compelling Headlines",
          content:
            "Your headline should grab attention and clearly communicate your value proposition. Keep it concise and benefit-focused.",
          tips: "Use numbers, questions, or power words to make your headlines more compelling. Test different approaches.",
        },
        {
          title: "Step 3: Create Engaging Visuals",
          content:
            "Use high-quality images or videos that are relevant to your audience and message. Ensure they look good on mobile devices.",
          tips: "Follow the 20% text rule for images and use bright, contrasting colors to stand out in the news feed.",
        },
        {
          title: "Step 4: Test Multiple Variations",
          content:
            "Create multiple versions of your ads with different headlines, images, and copy to see what resonates best with your audience.",
          tips: "Test one element at a time to clearly identify what's driving performance improvements.",
        },
      ],
    },
    survey: [
      {
        question: "What type of ads typically have higher engagement rates?",
        options: ["Static images", "Video ads", "Text-only ads", "Carousel ads"],
        correct: 1,
      },
      {
        question: "When A/B testing ad creatives, you should:",
        options: [
          "Test multiple elements at once",
          "Test one element at a time",
          "Only test headlines",
          "Never test creatives",
        ],
        correct: 1,
      },
    ],
  },
]

const finalSurveyQuestions = [
  {
    question: "What is the main benefit of using Facebook Business Manager?",
    options: [
      "It's free to use",
      "Better organization, security, and professional credibility",
      "You can create unlimited ads",
      "It provides free advertising credits",
    ],
    correct: 1,
  },
  {
    question: "Which audience type typically has the highest conversion rates?",
    options: ["Core audiences", "Custom audiences", "Lookalike audiences", "Interest-based audiences"],
    correct: 1,
  },
  {
    question: "What should you test when A/B testing ad creatives?",
    options: ["Multiple elements at once", "One element at a time", "Only headlines", "Only images"],
    correct: 1,
  },
  {
    question: "What percentage of text is recommended for Facebook ad images?",
    options: ["50% or less", "30% or less", "20% or less", "No text at all"],
    correct: 2,
  },
  {
    question: "When should you use lookalike audiences?",
    options: [
      "For retargeting existing customers",
      "To find new people similar to your best customers",
      "Only for brand awareness campaigns",
      "When you have a small budget",
    ],
    correct: 1,
  },
]

const certificateData = {
  studentName: "John Doe", // This would come from user session
  courseName: "Meta Facebook Ads Mastery",
  completionDate: new Date().toLocaleDateString(),
  certificateId: `CERT-FB-${Date.now()}`,
  instructorName: "Tobix Technology",
  courseHours: 12,
  grade: "A+",
}

export default function MetaFacebookAdsContent() {
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
      // Handle final assessment
      setIsLoadingFinalAssessment(true)

      // Simulate loading time for better UX
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
      // User can retry the module
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
              You have successfully completed the Meta Facebook Ads Mastery course.
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
        courseId="meta-facebook-ads"
        courseName="Meta Facebook Ads Mastery"
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
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-500 animate-pulse">Access Granted</Badge>
          <h1 className="text-4xl font-bold mb-4">Meta Facebook Ads Mastery</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Complete Tutorial & Resources</p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Course Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Tutorial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
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

                {/* Navigation Buttons */}
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

          {/* Sidebar */}
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
                  Course Workbook
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <Download className="h-4 w-4 mr-2" />
                  Ad Templates
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Facebook Ads Manager
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent btn-hover">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Business Manager
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
