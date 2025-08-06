import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Award, Users, BookOpen, Target, Heart, Lightbulb, Zap } from 'lucide-react'
import Link from "next/link"

export default function AboutPage() {
  const skills = [
    { name: "Web Development", level: 95 },
    { name: "Digital Marketing", level: 90 },
    { name: "Mobile Development", level: 85 },
    { name: "UI/UX Design", level: 88 },
    { name: "Data Analytics", level: 82 },
    { name: "Cloud Computing", level: 87 }
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Student-Centered",
      description: "Every decision we make is focused on providing the best learning experience for our students."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We constantly update our curriculum to reflect the latest industry trends and technologies."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Results-Driven",
      description: "We measure our success by the career transformations and achievements of our graduates."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Practical Learning",
      description: "Hands-on projects and real-world applications are at the core of our teaching methodology."
    }
  ]

  const achievements = [
    { icon: <Users className="h-6 w-6" />, value: "500+", label: "Students Graduated" },
    { icon: <BookOpen className="h-6 w-6" />, value: "15+", label: "Courses Created" },
    { icon: <Award className="h-6 w-6" />, value: "95%", label: "Job Placement Rate" },
    { icon: <Target className="h-6 w-6" />, value: "4.9/5", label: "Average Rating" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                About TobixTech
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Empowering the Next Generation of{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Tech Leaders
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Founded with a mission to democratize tech education, TobixTech has been at the forefront 
                of providing world-class training in web development, digital marketing, and emerging technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/courses">
                    Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=About+TobixTech"
                alt="About TobixTech"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-xl text-muted-foreground">
                From humble beginnings to transforming thousands of careers
              </p>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                TobixTech was born from a simple observation: the gap between what traditional education 
                teaches and what the industry actually needs was growing wider every day. Our founder, 
                Ikeh Dominion, experienced this firsthand when transitioning from academia to the tech industry.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                What started as informal mentoring sessions with friends and colleagues quickly grew into 
                a structured program. We realized that practical, hands-on learning combined with industry 
                mentorship could dramatically accelerate career transitions and skill development.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Today, TobixTech stands as a testament to the power of focused, practical education. 
                We've helped over 500 students transition into tech careers, with a 95% job placement rate 
                and countless success stories that continue to inspire us every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do and shape the learning experience we provide
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit text-primary">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Our Expertise
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We specialize in the most in-demand skills in today's tech landscape, 
                ensuring our students are always ahead of the curve.
              </p>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=Skills+Expertise"
                alt="Skills and Expertise"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit text-primary">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{achievement.value}</div>
                <div className="text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Become part of a thriving community of learners, creators, and innovators. 
              Your tech journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/courses">
                  Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
