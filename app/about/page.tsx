"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Award,
  Users,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  Download,
  ExternalLink,
  User,
} from "lucide-react"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const skills = [
    { name: "JavaScript/TypeScript", level: 95, category: "Frontend" },
    { name: "React/Next.js", level: 92, category: "Frontend" },
    { name: "Node.js/Express", level: 88, category: "Backend" },
    { name: "Python/Django", level: 85, category: "Backend" },
    { name: "MongoDB/PostgreSQL", level: 82, category: "Database" },
    { name: "AWS/Cloud Services", level: 78, category: "DevOps" },
    { name: "Docker/Kubernetes", level: 75, category: "DevOps" },
    { name: "UI/UX Design", level: 80, category: "Design" },
  ]

  const timeline = [
    {
      year: "2024",
      title: "Senior Full Stack Developer",
      company: "TobixTech Solutions",
      description: "Leading development of educational platforms and enterprise applications.",
      type: "work",
    },
    {
      year: "2023",
      title: "Full Stack Developer",
      company: "Tech Innovations Inc.",
      description: "Developed scalable web applications using modern technologies.",
      type: "work",
    },
    {
      year: "2022",
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      description: "Created responsive and interactive user interfaces for various clients.",
      type: "work",
    },
    {
      year: "2021",
      title: "Computer Science Degree",
      company: "University of Technology",
      description: "Bachelor of Science in Computer Science with honors.",
      type: "education",
    },
    {
      year: "2020",
      title: "Web Development Bootcamp",
      company: "Code Academy",
      description: "Intensive 6-month program covering full-stack development.",
      type: "education",
    },
  ]

  const achievements = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: Award,
    },
    {
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2023",
      icon: Code,
    },
    {
      title: "Top Contributor",
      issuer: "Open Source Community",
      date: "2023",
      icon: Github,
    },
    {
      title: "Best Innovation Award",
      issuer: "Tech Conference 2023",
      date: "2023",
      icon: Star,
    },
  ]

  const projects = [
    {
      title: "TobixTech Learning Platform",
      description:
        "Comprehensive educational platform with course management, secure authentication, and certificate generation.",
      tech: ["Next.js", "TypeScript", "MongoDB", "JWT"],
      status: "Live",
      link: "#",
    },
    {
      title: "E-Commerce Dashboard",
      description: "Advanced analytics dashboard for e-commerce businesses with real-time data visualization.",
      tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
      status: "Live",
      link: "#",
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and real-time transactions.",
      tech: ["React Native", "Firebase", "Stripe API"],
      status: "In Development",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-xl">
              <AvatarImage src="/placeholder-user.jpg" alt="Tobix" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                TB
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Tobix - Full Stack Developer
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Passionate about creating innovative digital solutions that make a difference. Specializing in modern web
            technologies and educational platforms.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">100+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    I'm a passionate full-stack developer with over 5 years of experience in creating innovative web
                    applications and educational platforms. My journey in technology started with a curiosity about how
                    things work, and it has evolved into a career dedicated to building solutions that make a positive
                    impact.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    I specialize in modern JavaScript frameworks, cloud technologies, and creating user-centric
                    applications. When I'm not coding, you'll find me exploring new technologies, contributing to
                    open-source projects, or sharing knowledge through teaching and mentoring.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.slice(0, 3).map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold">{achievement.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.issuer} • {achievement.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Personal Info */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Born: January 15, 1995</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>Location: San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <span>Education: BS Computer Science</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span>Experience: 5+ Years</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>Team Size: 10+ Members</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <span>Languages: English, Spanish</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {["Frontend", "Backend", "Database", "DevOps", "Design"].map((category) => (
                <Card key={category} className="card-hover">
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technology Stack */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>Technologies and tools I work with regularly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Express",
                    "Python",
                    "Django",
                    "MongoDB",
                    "PostgreSQL",
                    "AWS",
                    "Docker",
                    "Kubernetes",
                    "Git",
                    "Figma",
                    "Tailwind CSS",
                    "GraphQL",
                    "REST API",
                  ].map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            item.type === "work" ? "bg-blue-100 dark:bg-blue-900" : "bg-green-100 dark:bg-green-900"
                          }`}
                        >
                          {item.type === "work" ? (
                            <Briefcase
                              className={`w-6 h-6 ${item.type === "work" ? "text-blue-600" : "text-green-600"}`}
                            />
                          ) : (
                            <GraduationCap className="w-6 h-6 text-green-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{item.year}</Badge>
                          <Badge variant={item.type === "work" ? "default" : "secondary"}>
                            {item.type === "work" ? "Work" : "Education"}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{item.company}</p>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant={project.status === "Live" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                  <CardDescription>
                    I'm always open to discussing new opportunities and interesting projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>tobix@tobixtech.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span>www.tobixtech.com</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>Connect with me on social media and professional networks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Github className="w-5 h-5 mr-3" />
                    GitHub
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Linkedin className="w-5 h-5 mr-3" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Twitter className="w-5 h-5 mr-3" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Globe className="w-5 h-5 mr-3" />
                    Portfolio
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
