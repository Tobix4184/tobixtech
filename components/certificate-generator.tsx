"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Calendar, User, BookOpen, Star } from "lucide-react"

interface CertificateData {
  studentName: string
  courseName: string
  completionDate: string
  instructorName: string
  courseHours: string
  grade: string
}

export function CertificateGenerator() {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    studentName: "John Doe",
    courseName: "React & Next.js Bootcamp",
    completionDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    instructorName: "Tobias Johnson",
    courseHours: "40",
    grade: "A+",
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateCertificate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 1200
    canvas.height = 800

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(0.5, "#ffffff")
    gradient.addColorStop(1, "#f1f5f9")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Border
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 8
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)

    // Inner border
    ctx.strokeStyle = "#1e40af"
    ctx.lineWidth = 2
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120)

    // Header
    ctx.fillStyle = "#1e40af"
    ctx.font = "bold 48px Arial"
    ctx.textAlign = "center"
    ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 150)

    // Decorative line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(300, 180)
    ctx.lineTo(900, 180)
    ctx.stroke()

    // This is to certify that
    ctx.fillStyle = "#64748b"
    ctx.font = "24px Arial"
    ctx.fillText("This is to certify that", canvas.width / 2, 240)

    // Student name
    ctx.fillStyle = "#1e293b"
    ctx.font = "bold 42px Arial"
    ctx.fillText(certificateData.studentName, canvas.width / 2, 300)

    // Has successfully completed
    ctx.fillStyle = "#64748b"
    ctx.font = "24px Arial"
    ctx.fillText("has successfully completed the course", canvas.width / 2, 350)

    // Course name
    ctx.fillStyle = "#3b82f6"
    ctx.font = "bold 36px Arial"
    ctx.fillText(certificateData.courseName, canvas.width / 2, 410)

    // Course details
    ctx.fillStyle = "#64748b"
    ctx.font = "20px Arial"
    ctx.fillText(
      `Duration: ${certificateData.courseHours} hours | Grade: ${certificateData.grade}`,
      canvas.width / 2,
      460,
    )

    // Date and instructor section
    ctx.fillStyle = "#1e293b"
    ctx.font = "18px Arial"
    ctx.textAlign = "left"

    // Date
    ctx.fillText("Date of Completion:", 200, 580)
    ctx.font = "bold 18px Arial"
    ctx.fillText(certificateData.completionDate, 200, 610)

    // Instructor
    ctx.font = "18px Arial"
    ctx.textAlign = "right"
    ctx.fillText("Instructor:", canvas.width - 200, 580)
    ctx.font = "bold 18px Arial"
    ctx.fillText(certificateData.instructorName, canvas.width - 200, 610)

    // Signature line
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(canvas.width - 350, 630)
    ctx.lineTo(canvas.width - 50, 630)
    ctx.stroke()

    // TobixTech logo/brand
    ctx.fillStyle = "#3b82f6"
    ctx.font = "bold 28px Arial"
    ctx.textAlign = "center"
    ctx.fillText("TobixTech", canvas.width / 2, 700)

    ctx.fillStyle = "#64748b"
    ctx.font = "16px Arial"
    ctx.fillText("Professional Development Platform", canvas.width / 2, 730)
  }

  const downloadCertificate = () => {
    generateCertificate()

    const canvas = canvasRef.current
    if (!canvas) return

    // Create download link
    const link = document.createElement("a")
    link.download = `${certificateData.studentName.replace(/\s+/g, "_")}_Certificate.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const handleInputChange = (field: keyof CertificateData, value: string) => {
    setCertificateData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
          <Award className="w-4 h-4" />
          Certificate Generator
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Generate Your Certificate
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create professional certificates for course completion. Customize the details and download your certificate.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Certificate Details
            </CardTitle>
            <CardDescription>Fill in the information to generate your certificate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="studentName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Student Name
              </Label>
              <Input
                id="studentName"
                value={certificateData.studentName}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                placeholder="Enter student name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Course Name
              </Label>
              <Input
                id="courseName"
                value={certificateData.courseName}
                onChange={(e) => handleInputChange("courseName", e.target.value)}
                placeholder="Enter course name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseHours" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Course Hours
                </Label>
                <Input
                  id="courseHours"
                  value={certificateData.courseHours}
                  onChange={(e) => handleInputChange("courseHours", e.target.value)}
                  placeholder="40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Grade
                </Label>
                <Input
                  id="grade"
                  value={certificateData.grade}
                  onChange={(e) => handleInputChange("grade", e.target.value)}
                  placeholder="A+"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="completionDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Completion Date
              </Label>
              <Input
                id="completionDate"
                type="date"
                value={new Date(certificateData.completionDate).toISOString().split("T")[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value)
                  handleInputChange(
                    "completionDate",
                    date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }),
                  )
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructorName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Instructor Name
              </Label>
              <Input
                id="instructorName"
                value={certificateData.instructorName}
                onChange={(e) => handleInputChange("instructorName", e.target.value)}
                placeholder="Enter instructor name"
              />
            </div>

            <div className="pt-4 space-y-4">
              <Button onClick={generateCertificate} className="w-full bg-blue-600 hover:bg-blue-700">
                <Award className="w-4 h-4 mr-2" />
                Generate Preview
              </Button>

              <Button onClick={downloadCertificate} variant="outline" className="w-full bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Certificate Preview
            </CardTitle>
            <CardDescription>Preview your certificate before downloading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
              <canvas
                ref={canvasRef}
                className="w-full h-auto border rounded shadow-sm bg-white"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {certificateData.studentName}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {certificateData.courseName}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {certificateData.completionDate}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {certificateData.grade}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="pt-8">
          <div className="text-center space-y-4">
            <Award className="w-12 h-12 mx-auto" />
            <h3 className="text-2xl font-bold">Professional Certificates</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our certificates are professionally designed and can be used to showcase your achievements to employers,
              on LinkedIn, or in your portfolio.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">High Quality</h4>
                <p className="text-sm opacity-80">Download in high resolution PNG format</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">Professional Design</h4>
                <p className="text-sm opacity-80">Clean, modern design suitable for any use</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">Personalized</h4>
                <p className="text-sm opacity-80">Customized with your details and achievements</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Named export for flexibility

// Default export for backward compatibility
export default CertificateGenerator
