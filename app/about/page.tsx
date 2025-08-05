"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Target,
  Heart,
  Lightbulb,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story")

  const stats = [
    { icon: Users, label: "Students Taught", value: "10,000+", color: "text-blue-600" },
    { icon: BookOpen, label: "Courses Created", value: "50+", color: "text-green-600" },
    { icon: Award, label: "Certificates Issued", value: "8,500+", color: "text-purple-600" },
    { icon: Star, label: "Average Rating", value: "4.9/5", color: "text-yellow-600" },
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do, from course content to student support.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for teaching and technology drives us to create engaging learning experiences.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new technologies and teaching methods to stay ahead of the curve.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Quality education should be available to everyone, regardless of background or location.",
    },
  ]

  const team = [
    {
      name: "Tobias Johnson",
      role: "Founder & Lead Instructor",
      image: "/placeholder-user.jpg",
      bio: "Full-stack developer with 8+ years of experience in web technologies and education.",
      skills: ["React", "Node.js", "Python", "AWS", "Teaching"],
    },
    {
      name: "Sarah Chen",
      role: "Senior Developer & Instructor",
      image: "/placeholder-user.jpg",
      bio: "Frontend specialist passionate about creating beautiful, accessible user interfaces.",
      skills: ["React", "TypeScript", "UI/UX", "Accessibility"],
    },
    {
      name: "Michael Rodriguez",
      role: "Backend Architect",
      image: "/placeholder-user.jpg",
      bio: "Systems architect with expertise in scalable backend solutions and cloud infrastructure.",
      skills: ["Node.js", "MongoDB", "Docker", "Kubernetes"],
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "TobixTech Founded",
      description: "Started with a vision to make quality tech education accessible to everyone.",
    },
    {
      year: "2021",
      title: "First 1,000 Students",
      description: "Reached our first major milestone with students from over 30 countries.",
    },
    {
      year: "2022",
      title: "Platform Launch",
      description: "Launched our comprehensive learning platform with interactive features.",
    },
    {
      year: "2023",
      title: "Corporate Partnerships",
      description: "Partnered with leading tech companies to provide industry-relevant training.",
    },
    {
      year: "2024",
      title: "10,000+ Students",
      description: "Celebrating over 10,000 students and 8,500 certificates issued.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            About TobixTech
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Empowering the Next Generation of Developers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            We're on a mission to make high-quality tech education accessible, engaging, and practical. Join thousands
            of students who have transformed their careers with TobixTech.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <CardContent className="pt-6">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="story">Our Story</TabsTrigger>
              <TabsTrigger value="values">Our Values</TabsTrigger>
              <TabsTrigger value="team">Our Team</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="space-y-8">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    Our Journey
                  </CardTitle>
                  <CardDescription className="text-lg">
                    From a simple idea to a thriving educational platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      TobixTech was born from a simple observation: traditional tech education was either too expensive,
                      too theoretical, or too disconnected from real-world applications. Our founder, Tobias,
                      experienced this firsthand while transitioning from a non-tech background into software
                      development.
                    </p>
                    <p className="text-lg leading-relaxed">
                      After years of struggling with outdated courses and impractical tutorials, Tobias decided to
                      create the learning platform he wished he had access to. Starting with just a few YouTube videos,
                      TobixTech has grown into a comprehensive educational ecosystem serving students worldwide.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Milestones</h3>
                    <div className="space-y-6">
                      {milestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                              {milestone.year.slice(-2)}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-500">{milestone.year}</span>
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {milestone.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="values" className="space-y-8">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <Shield className="w-8 h-8 text-purple-600" />
                    Our Core Values
                  </CardTitle>
                  <CardDescription className="text-lg">The principles that guide everything we do</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                      <div key={index} className="flex gap-4 p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex-shrink-0">
                          <value.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">Our Mission</h3>
                    </div>
                    <p className="text-lg leading-relaxed">
                      To democratize tech education by providing high-quality, practical, and affordable courses that
                      prepare students for real-world challenges. We believe that everyone deserves access to the tools
                      and knowledge needed to build a successful career in technology.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-8">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <Users className="w-8 h-8 text-green-600" />
                    Meet Our Team
                  </CardTitle>
                  <CardDescription className="text-lg">
                    The passionate educators and developers behind TobixTech
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                      <Card key={index} className="text-center border-0 shadow-lg bg-gray-50 dark:bg-gray-700/50">
                        <CardContent className="pt-6">
                          <Avatar className="w-24 h-24 mx-auto mb-4">
                            <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="text-xl">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {member.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center gap-3">
                      <Mail className="w-8 h-8 text-blue-600" />
                      Get in Touch
                    </CardTitle>
                    <CardDescription className="text-lg">We'd love to hear from you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <Mail className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Email</div>
                        <div className="text-gray-600 dark:text-gray-300">hello@tobixtech.com</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <Phone className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Phone</div>
                        <div className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                      <MapPin className="w-6 h-6 text-red-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Location</div>
                        <div className="text-gray-600 dark:text-gray-300">San Francisco, CA</div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Mail className="w-4 h-4 mr-2" />
                        Send us a Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <CardContent className="pt-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="w-8 h-8" />
                      <h3 className="text-2xl font-bold">Ready to Start Learning?</h3>
                    </div>
                    <p className="text-lg mb-8 opacity-90">
                      Join thousands of students who have already transformed their careers with TobixTech. Start your
                      journey today with our comprehensive courses and expert instruction.
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Lifetime access to all course materials</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Direct access to instructors</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span>Community support</span>
                      </div>
                    </div>

                    <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
