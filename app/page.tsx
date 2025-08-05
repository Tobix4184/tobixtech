import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Code, Palette, Zap, Users, Star, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 animate-pulse">
                Welcome to Tobix Technology
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight fade-in">
                Hi, I'm{" "}
                <span className="text-blue-500 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Ikeh Dominion
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 fade-in delay-1">
                Full-Stack Web Developer & Digital Marketing Expert
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl fade-in delay-2">
                I create stunning, high-performance websites and teach digital marketing strategies that drive real
                results. From modern web applications to Facebook ads mastery, I help businesses grow online.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 fade-in delay-3">
              <Button asChild size="lg" className="btn-primary btn-hover">
                <Link href="/projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-hover bg-transparent">
                <Link href="/courses">
                  Explore Courses <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="relative aspect-square rounded-full overflow-hidden border-8 border-blue-500 shadow-2xl">
                <img
                  src="/placeholder-user.jpg"
                  alt="Ikeh Dominion - Professional Web Developer and Digital Marketing Expert"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What I <span className="text-blue-500">Offer</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive web development and digital marketing solutions to help your business thrive online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-lg">Web Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Modern, responsive websites built with the latest technologies
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-lg">UI/UX Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Beautiful, user-friendly interfaces that convert visitors to customers
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-lg">Digital Marketing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Facebook ads, SEO, and marketing strategies that drive results
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg">Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  Strategic guidance to help your business grow and succeed online
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="project-card border-0 shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/placeholder.jpg"
                  alt="E-commerce platform with modern design"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">E-commerce Platform</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Full-stack e-commerce solution with React, Node.js, and MongoDB
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
                <Button asChild variant="outline" size="sm" className="btn-hover bg-transparent">
                  <Link href="/projects">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="project-card border-0 shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/placeholder.jpg"
                  alt="Task management application"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Task Management App</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Productivity app with real-time collaboration features
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Vue.js</Badge>
                  <Badge variant="secondary">Firebase</Badge>
                  <Badge variant="secondary">Tailwind</Badge>
                </div>
                <Button asChild variant="outline" size="sm" className="btn-hover bg-transparent">
                  <Link href="/projects">View Details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="project-card border-0 shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="/placeholder.jpg"
                  alt="Financial dashboard application"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Finance Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Personal finance tracker with data visualization
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Angular</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">D3.js</Badge>
                </div>
                <Button asChild variant="outline" size="sm" className="btn-hover bg-transparent">
                  <Link href="/projects">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg" className="btn-hover">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              My <span className="text-blue-500">Expertise</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Technologies and skills I work with</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Next.js", icon: "▲" },
              { name: "TypeScript", icon: "📘" },
              { name: "Node.js", icon: "🟢" },
              { name: "Python", icon: "🐍" },
              { name: "MongoDB", icon: "🍃" },
            ].map((skill, index) => (
              <Card key={skill.name} className="card-hover text-center p-4 border-0 shadow-md">
                <div className="text-3xl mb-2">{skill.icon}</div>
                <div className="font-medium">{skill.name}</div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="btn-hover bg-transparent">
              <Link href="/skills">
                View All Skills <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What Clients <span className="text-blue-500">Say</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Testimonials from satisfied clients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                content:
                  "Dominion delivered an exceptional website that exceeded our expectations. His attention to detail and technical expertise is outstanding.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Marketing Director",
                content:
                  "The Facebook ads course was incredibly valuable. Our ROI improved by 300% after implementing the strategies taught.",
                rating: 5,
              },
              {
                name: "Emily Davis",
                role: "Small Business Owner",
                content:
                  "Professional, reliable, and delivers quality work on time. I highly recommend Tobix Technology for any web development needs.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's work together to bring your ideas to life and grow your business online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="btn-hover">
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="btn-hover border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/courses">
                View Courses <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
