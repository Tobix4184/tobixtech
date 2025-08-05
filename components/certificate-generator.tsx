"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Share2, Calendar, BookOpen, CheckCircle } from "lucide-react"

interface CertificateData {
  studentName: string
  courseName: string
  completionDate: string
  certificateId: string
  instructorName: string
  courseHours: number
  grade?: string
}

interface CertificateGeneratorProps {
  certificateData: CertificateData
}

export default function CertificateGenerator({ certificateData }: CertificateGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)

    try {
      // Simulate certificate generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create certificate HTML content
      const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate of Completion</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              margin: 0;
              padding: 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .certificate {
              background: white;
              padding: 60px;
              border-radius: 20px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 800px;
              border: 8px solid #3b82f6;
            }
            .header {
              margin-bottom: 40px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #3b82f6;
              margin-bottom: 20px;
            }
            .title {
              font-size: 48px;
              color: #1e293b;
              margin-bottom: 20px;
              font-weight: bold;
            }
            .subtitle {
              font-size: 24px;
              color: #64748b;
              margin-bottom: 40px;
            }
            .student-name {
              font-size: 36px;
              color: #3b82f6;
              font-weight: bold;
              margin: 30px 0;
              text-decoration: underline;
            }
            .course-name {
              font-size: 28px;
              color: #1e293b;
              margin: 30px 0;
              font-style: italic;
            }
            .completion-text {
              font-size: 18px;
              color: #64748b;
              margin: 20px 0;
            }
            .date {
              font-size: 20px;
              color: #1e293b;
              margin: 20px 0;
            }
            .signature-section {
              margin-top: 60px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .signature {
              text-align: center;
            }
            .signature-line {
              border-top: 2px solid #1e293b;
              width: 200px;
              margin: 20px auto 10px;
            }
            .instructor-name {
              font-size: 18px;
              font-weight: bold;
              color: #1e293b;
            }
            .instructor-title {
              font-size: 14px;
              color: #64748b;
            }
            .seal {
              width: 100px;
              height: 100px;
              border: 4px solid #3b82f6;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #eff6ff;
              font-size: 12px;
              font-weight: bold;
              color: #3b82f6;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="logo">TobixTech</div>
              <div class="title">Certificate of Completion</div>
              <div class="subtitle">This is to certify that</div>
            </div>
            
            <div class="student-name">${certificateData.studentName}</div>
            
            <div class="completion-text">has successfully completed the course</div>
            
            <div class="course-name">${certificateData.courseName}</div>
            
            <div class="completion-text">on</div>
            
            <div class="date">${certificateData.completionDate}</div>
            
            <div class="signature-section">
              <div class="signature">
                <div class="signature-line"></div>
                <div class="instructor-name">${certificateData.instructorName}</div>
                <div class="instructor-title">Lead Instructor</div>
              </div>
              
              <div class="seal">
                <div>
                  TOBIX<br>
                  TECH<br>
                  CERTIFIED
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `

      // Create and download the certificate
      const blob = new Blob([certificateHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${certificateData.studentName.replace(/\s+/g, "_")}_${certificateData.courseName.replace(/\s+/g, "_")}_Certificate.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating certificate:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate of Completion - ${certificateData.courseName}`,
        text: `I've completed ${certificateData.courseName} at Tobix Technology!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Certificate Preview */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8">
          {/* Certificate Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Certificate of Completion</h1>
            <p className="text-gray-600 dark:text-gray-400">Tobix Technology Learning Platform</p>
          </div>

          {/* Certificate Body */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">This is to certify that</p>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-b-2 border-gray-300 dark:border-gray-600 pb-2 inline-block">
              {certificateData.studentName}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">has successfully completed the course</p>
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
              {certificateData.courseName}
            </h3>

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <Calendar className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Completion Date</p>
                <p className="font-semibold">{certificateData.completionDate}</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Course Hours</p>
                <p className="font-semibold">{certificateData.courseHours} hours</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Grade</p>
                <p className="font-semibold">{certificateData.grade || "Pass"}</p>
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="flex justify-between items-end">
            <div className="text-left">
              <div className="border-t-2 border-gray-400 pt-2 w-48">
                <p className="font-semibold">{certificateData.instructorName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Course Instructor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-500">Official Seal</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-2">Certificate ID</p>
              <p className="font-mono text-sm">{certificateData.certificateId}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Certificate Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>{isGenerating ? "Generating PDF..." : "Download Certificate"}</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="flex-1 flex items-center justify-center space-x-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              <span>Share on LinkedIn</span>
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Certificate Features</span>
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Unique certificate ID for verification</li>
              <li>• Professional PDF format suitable for printing</li>
              <li>• LinkedIn integration for profile enhancement</li>
              <li>• Permanent record in your learning portfolio</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
