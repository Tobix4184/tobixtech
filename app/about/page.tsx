import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, MapPin, Calendar, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-blue-500">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate web developer and digital marketing expert dedicated to creating exceptional digital experiences
            and helping businesses grow online.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Hi, I'm Ikeh Dominion</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I'm a passionate web developer with over 5 years of experience in creating modern, responsive, and
                user-friendly websites and applications. My journey in web development began when I built my first
                website in high school, and since then I've been constantly learning and growing in this ever-evolving
                field.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Beyond web development, I specialize in digital marketing, particularly Facebook advertising. I help
                businesses reach their target audience and achieve their marketing goals through strategic ad campaigns
                and data-driven optimization.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                When I'm not coding or managing ad campaigns, you can find me exploring new technologies, reading tech
                blogs, or sharing my knowledge through online courses and tutorials.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Nigeria</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                <span>5+ Years Experience</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Award className="h-4 w-4 mr-2" />
                <span>50+ Projects Completed</span>
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-blue-500 hover:bg-blue-600 mr-4">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Ikeh Dominion working at a modern workspace"
                width={400}
                height={500}
                className="rounded-xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>

        {/* Values & Approach */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-500 font-bold">1</span>
                </div>
                Quality First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                I believe in delivering high-quality work that exceeds expectations. Every project is crafted with
                attention to detail and best practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-500 font-bold">2</span>
                </div>
                Continuous Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Technology evolves rapidly, and I stay updated with the latest trends, tools, and best practices to
                provide cutting-edge solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-500 font-bold">3</span>
                </div>
                Client Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Your success is my success. I work closely with clients to understand their goals and deliver solutions
                that drive real business results.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">What I Do</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Web Development</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Custom website development</li>
                  <li>• E-commerce solutions</li>
                  <li>• Web application development</li>
                  <li>• API development and integration</li>
                  <li>• Performance optimization</li>
                  <li>• Maintenance and support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Digital Marketing</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Facebook & Instagram advertising</li>
                  <li>• Campaign strategy and optimization</li>
                  <li>• Audience research and targeting</li>
                  <li>• Ad creative development</li>
                  <li>• Analytics and reporting</li>
                  <li>• Marketing consultation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Fun Facts About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2">☕</div>
                <div className="font-semibold">Coffee Lover</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">5+ cups per day</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌙</div>
                <div className="font-semibold">Night Owl</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Best code at midnight</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold">Lifelong Learner</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Always exploring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎮</div>
                <div className="font-semibold">Gamer</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Strategy games fan</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
