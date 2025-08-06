import Link from "next/link"
import { ArrowRight, BookOpen, Users, Award, Code, Zap, Globe } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Learn. Build. <span className="text-primary">Grow.</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Empowering the next generation of developers through quality education, hands-on projects, and personalized mentorship.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Why Choose TobixTech?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            We provide comprehensive learning experiences that prepare you for real-world development challenges.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary" />
              <CardTitle>Comprehensive Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                From fundamentals to advanced topics, our courses cover everything you need to become a proficient developer.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Code className="h-10 w-10 text-primary" />
              <CardTitle>Hands-on Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build real-world applications and create a portfolio that showcases your skills to potential employers.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary" />
              <CardTitle>Expert Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get personalized guidance from industry professionals who are passionate about your success.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary" />
              <CardTitle>Fast-Track Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our optimized learning paths help you acquire skills quickly without compromising on quality.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary" />
              <CardTitle>Global Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Join a vibrant community of learners and professionals from around the world.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary" />
              <CardTitle>Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Earn recognized certificates that validate your skills and boost your career prospects.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to Start Your Journey?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join thousands of students who have transformed their careers with TobixTech.
          </p>
          <Button size="lg" asChild>
            <Link href="/courses">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
