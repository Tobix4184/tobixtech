"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Calendar, BookOpen, CheckCircle, Star, Share2 } from "lucide-react"

interface CertificateData {
  studentName: string
  courseName: string
  completionDate: string
  instructorName: string
  courseId: string
  grade?: string
  duration?: string
}

export function CertificateGenerator({
  courseData,
  studentData,
  onGenerate,
}: {
  courseData?: any
  studentData?: any
  onGenerate?: (data: CertificateData) => void
}) {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    studentName: studentData?.name || "",
    courseName: courseData?.title || "",
    completionDate: new Date().toLocaleDateString(),
    instructorName: "Tobix - TobixTech",
    courseId: courseData?.id || "",
    grade: "A+",
    duration: courseData?.duration || "40 hours",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (field: keyof CertificateData, value: string) => {
    setCertificateData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateCertificate = async () => {
    setIsGenerating(true)

    try {
      // Simulate certificate generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (onGenerate) {
        onGenerate(certificateData)
      }

      // Here you would typically generate a PDF or image
      console.log("Certificate generated:", certificateData)
    } catch (error) {
      console.error("Error generating certificate:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadCertificate = () => {
    // In a real implementation, this would download the generated certificate
    const element = document.createElement("a")
    const file = new Blob([JSON.stringify(certificateData, null, 2)], {
      type: "application/json",
    })
    element.href = URL.createObjectURL(file)
    element.download = `certificate-${certificateData.courseId}-${Date.now()}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate - ${certificateData.courseName}`,
        text: `I've completed ${certificateData.courseName} course!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Certificate link copied to clipboard!")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Certificate Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Certificate Generator
          </CardTitle>
          <CardDescription>Generate a professional certificate of completion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={certificateData.studentName}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                placeholder="Enter student name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                value={certificateData.courseName}
                onChange={(e) => handleInputChange("courseName", e.target.value)}
                placeholder="Enter course name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input
                id="completionDate"
                type="date"
                value={certificateData.completionDate}
                onChange={(e) => handleInputChange("completionDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructorName">Instructor Name</Label>
              <Input
                id="instructorName"
                value={certificateData.instructorName}
                onChange={(e) => handleInputChange("instructorName", e.target.value)}
                placeholder="Enter instructor name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                value={certificateData.grade}
                onChange={(e) => handleInputChange("grade", e.target.value)}
                placeholder="Enter grade (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Course Duration</Label>
              <Input
                id="duration"
                value={certificateData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="Enter course duration"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={generateCertificate}
              disabled={isGenerating || !certificateData.studentName || !certificateData.courseName}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Award className="w-4 h-4 mr-2" />
                  Generate Certificate
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Certificate Preview</CardTitle>
          <CardDescription>Preview of the generated certificate</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12"
          >
            {/* Certificate Design */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 md:p-12 border-8 border-gradient-to-r from-blue-500 to-purple-600">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  Certificate of Completion
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
              </div>

              {/* Content */}
              <div className="text-center space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300">This is to certify that</p>

                <div className="py-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white border-b-2 border-gray-300 dark:border-gray-600 pb-2 inline-block">
                    {certificateData.studentName || "Student Name"}
                  </h2>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300">has successfully completed the course</p>

                <div className="py-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-400">
                    {certificateData.courseName || "Course Name"}
                  </h3>
                </div>

                {/* Course Details */}
                <div className="flex flex-wrap justify-center gap-4 my-6">
                  {certificateData.duration && (
                    <Badge variant="secondary" className="px-3 py-1">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {certificateData.duration}
                    </Badge>
                  )}
                  {certificateData.grade && (
                    <Badge variant="secondary" className="px-3 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Grade: {certificateData.grade}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="px-3 py-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified
                  </Badge>
                </div>

                <p className="text-gray-600 dark:text-gray-300">on this day of</p>

                <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
                  <Calendar className="w-5 h-5" />
                  {certificateData.completionDate}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <div className="w-32 h-0.5 bg-gray-400 mb-2 mx-auto md:mx-0"></div>
                    <p className="font-semibold text-gray-800 dark:text-white">{certificateData.instructorName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Course Instructor</p>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">TB</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">TobixTech</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Learning Platform</p>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="w-32 h-0.5 bg-gray-400 mb-2 mx-auto md:mx-0"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Certificate ID</p>
                    <p className="font-mono text-xs text-gray-800 dark:text-white">
                      {certificateData.courseId || "CERT-001"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button onClick={downloadCertificate} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
            <Button onClick={shareCertificate} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Named export for the component

// Default export for backward compatibility
export default CertificateGenerator
