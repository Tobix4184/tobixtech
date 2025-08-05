import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  price: string
  duration: string
  students: string
  level: string
  image: string
  features: string[]
}

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <Badge className="absolute top-4 left-4 bg-blue-500">{course.level}</Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {course.students}
          </div>
        </div>

        <ul className="space-y-1 text-sm">
          {course.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-500">{course.price}</div>
        <Button asChild>
          <Link href={`/courses/${course.id}`}>Access Course</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
