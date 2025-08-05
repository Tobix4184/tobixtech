"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Users, BookOpen, Award, DollarSign, Clock, Globe, CheckCircle, Star, TrendingUp, Heart } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Earn Money",
    description: "Get paid for sharing your knowledge and helping others learn",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Teach at your own pace and set your own schedule",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with students from around the world",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Brand",
    description: "Build your reputation as an expert in your field",
  },
  {
    icon: Heart,
    title: "Make an Impact",
    description: "Help others achieve their learning goals and career aspirations",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Get recognized for your expertise and teaching excellence",
  },
]

const requirements = [
  "Expertise in your chosen subject area",
  "Passion for teaching and helping others",
  "Good communication skills",
  "Reliable internet connection",
  "Commitment to quality education",
]

const subjects = [
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Machine Learning",
  "Digital Marketing",
  "Graphic Design",
  "UI/UX Design",
  "Business & Entrepreneurship",
  "Photography",
  "Video Editing",
  "Other",
]

export default function BecomeTutorPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    expertise: [] as string[],
    experience: "",
    motivation: "",
    portfolio: "",
    availability: "",
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleExpertiseChange = (subject: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      expertise: checked ? [...prev.expertise, subject] : prev.expertise.filter((s) => s !== subject),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    if (formData.expertise.length === 0) {
      toast({
        title: "Expertise Required",
        description: "Please select at least one area of expertise.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      const response = await fetch("/api/tutor-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description:
            "Thank you for your interest! We'll review your application and get back to you within 3-5 business days.",
        })

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          expertise: [],
          experience: "",
          motivation: "",
          portfolio: "",
          availability: "",
          agreeToTerms: false,
        })
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Become a Tutor</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Share your expertise and help others learn while earning money
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              <span>10,000+ Students</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-green-500" />
              <span>500+ Courses</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              <span>4.8/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Teach With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">What We're Looking For:</h3>
                  <ul className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Application Process:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1
                      </div>
                      <span>Submit your application</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2
                      </div>
                      <span>Review process (3-5 days)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3
                      </div>
                      <span>Interview & onboarding</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        4
                      </div>
                      <span>Start teaching!</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Tutor Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              {/* Areas of Expertise */}
              <div>
                <Label>Areas of Expertise *</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Select all subjects you're qualified to teach
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={formData.expertise.includes(subject)}
                        onCheckedChange={(checked) => handleExpertiseChange(subject, checked as boolean)}
                      />
                      <Label htmlFor={subject} className="text-sm">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience">Teaching/Professional Experience *</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="Describe your relevant experience, qualifications, and background..."
                  rows={4}
                  required
                />
              </div>

              {/* Motivation */}
              <div>
                <Label htmlFor="motivation">Why do you want to teach with us? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange("motivation", e.target.value)}
                  placeholder="Tell us about your passion for teaching and what motivates you..."
                  rows={4}
                  required
                />
              </div>

              {/* Portfolio */}
              <div>
                <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
                <Input
                  id="portfolio"
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => handleInputChange("portfolio", e.target.value)}
                  placeholder="https://your-portfolio.com"
                />
              </div>

              {/* Availability */}
              <div>
                <Label htmlFor="availability">Availability *</Label>
                <Textarea
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => handleInputChange("availability", e.target.value)}
                  placeholder="Describe your availability (days, hours, timezone)..."
                  rows={3}
                  required
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
