import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Users, Trophy, Star, Code, Laptop, Smartphone, Globe, CheckCircle, Play } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript, React, and Next.js with hands-on projects",
      skills: ["HTML/CSS", "JavaScript", "React", "Next.js"]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Development", 
      description: "Build cross-platform mobile apps with React Native and modern tools",
      skills: ["React Native", "Flutter", "iOS", "Android"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Digital Marketing",
      description: "Learn Facebook Ads, Google Ads, SEO, and social media marketing strategies",
      skills: ["Facebook Ads", "Google Ads", "SEO", "Analytics"]
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Full-Stack Projects",
      description: "Create complete applications from frontend to backend deployment",
      skills: ["Node.js", "MongoDB", "APIs", "Deployment"]
    }
  ]

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "500+", label: "Students Trained" },
    { icon: <BookOpen className="h-6 w-6" />, value: "15+", label: "Courses Available" },
    { icon: <Trophy className="h-6 w-6" />, value: "95%", label: "Success Rate" },
    { icon: <Star className="h-6 w-6" />, value: "4.9/5", label: "Student Rating" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Tech Corp",
      content: "TobixTech transformed my career. I went from complete beginner to landing my dream job in just 6 months!",
      avatar: "/placeholder.svg?height=48&width=48&text=SJ",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Full-Stack Developer", 
      company: "StartupXYZ",
      content: "The hands-on projects and mentorship were incredible. I now run my own development agency.",
      avatar: "/placeholder.svg?height=48&width=48&text=MC",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      company: "Marketing Pro",
      content: "The Facebook Ads course alone paid for itself within weeks. Amazing ROI on my education investment!",
      avatar: "/placeholder.svg?height=48&width=48&text=ER",
      rating: 5
    }
  ]

  const benefits = [
    "Lifetime access to course materials",
    "1-on-1 mentorship sessions",
    "Real-world project portfolio",
    "Job placement assistance",
    "Certificate of completion",
    "Community access"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="container relative px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 Professional Tech Training
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Master{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Web Development
                  </span>{" "}
                  & Digital Marketing
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Transform your career with industry-leading courses in modern web development, 
                  mobile apps, and digital marketing. Learn from experts and build real-world projects.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/courses">
                    Start Learning <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link href="/about">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:order-2">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=600&width=500&text=Hero+Learning+Platform"
                  alt="TobixTech Learning Platform"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Live Courses Available</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-xs">Job Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose TobixTech?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide comprehensive, hands-on training that prepares you for real-world challenges
              in today's competitive tech industry.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {feature.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our comprehensive approach ensures you have all the tools, knowledge, 
                and support needed to launch your tech career.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/courses">
                    Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=Student+Success"
                alt="Student Success"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real success stories from our community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of successful students who have transformed their careers with TobixTech.
              Get started today with our comprehensive courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/courses">
                  Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
