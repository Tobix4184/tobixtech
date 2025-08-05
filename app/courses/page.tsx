import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Clock, Award } from "lucide-react"

const courses = [
  {
    id: "meta-facebook-ads",
    title: "Meta Facebook Ads Mastery",
    description: "Complete guide to Facebook advertising, from setup to advanced optimization strategies.",
    price: "$97",
    duration: "6 weeks",
    students: "1,200+",
    level: "Beginner to Advanced",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "Campaign setup and optimization",
      "Audience targeting strategies",
      "Ad creative best practices",
      "Analytics and reporting",
      "Advanced scaling techniques",
    ],
  },
  {
    id: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, JavaScript, and modern web development practices from scratch.",
    price: "$127",
    duration: "8 weeks",
    students: "800+",
    level: "Beginner",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "HTML5 & CSS3 mastery",
      "JavaScript fundamentals",
      "Responsive design",
      "Git version control",
      "Project deployment",
    ],
  },
  {
    id: "react-nextjs-bootcamp",
    title: "React & Next.js Bootcamp",
    description: "Build modern web applications with React and Next.js framework.",
    price: "$197",
    duration: "10 weeks",
    students: "600+",
    level: "Intermediate",
    image: "/placeholder.svg?height=300&width=400",
    features: [
      "React fundamentals & hooks",
      "Next.js app router",
      "State management",
      "API integration",
      "Full-stack development",
    ],
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional <span className="text-blue-500">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master web development and digital marketing with our comprehensive courses. Learn from industry experience
            and build real-world projects.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">2,600+</div>
            <div className="text-gray-600 dark:text-gray-300">Students</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-gray-600 dark:text-gray-300">Courses</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Hours</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">95%</div>
            <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-50 dark:bg-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of students who have transformed their careers with our courses.
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  )
}
