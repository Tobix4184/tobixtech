"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, ArrowLeft, RotateCcw, Award } from "lucide-react"
import CertificateGenerator from "@/components/certificate-generator"

interface Question {
  question: string
  options: string[]
  correct: number
}

interface FinalSurveyProps {
  courseId: string
  courseName: string
  questions: Question[]
  onBack: () => void
  onComplete: () => void
}

export function FinalSurvey({ courseId, courseName, questions, onBack, onComplete }: FinalSurveyProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [showCertificate, setShowCertificate] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      let correctAnswers = 0
      questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correct) {
          correctAnswers++
        }
      })
      setScore(correctAnswers)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setScore(0)
    setShowCertificate(false)
  }

  const handleGetCertificate = () => {
    onComplete()
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const passed = score >= Math.ceil(questions.length * 0.7) // 70% to pass
  const percentage = Math.round((score / questions.length) * 100)

  if (showCertificate) {
    const certificateData = {
      studentName: "Student Name", // This would come from user context
      courseName: courseName,
      completionDate: new Date().toLocaleDateString(),
      certificateId: `CERT-${courseId.toUpperCase()}-${Date.now()}`,
      instructorName: "TobixTech Team",
      courseHours: 40, // This would be dynamic based on course
      grade: `${percentage}%`,
    }

    return (
      <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <Button variant="outline" onClick={() => setShowCertificate(false)} className="mb-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
            <h1 className="text-3xl font-bold mb-2">🎉 Congratulations!</h1>
            <p className="text-gray-600 dark:text-gray-300">
              You've successfully completed {courseName} with a score of {percentage}%
            </p>
          </div>
          <CertificateGenerator certificateData={certificateData} />
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto">
          <Card className="card-hover">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center mb-4">
                {passed ? (
                  <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                ) : (
                  <X className="h-8 w-8 text-red-500 mr-2" />
                )}
                Final Course Assessment Results
              </CardTitle>
              <Badge variant={passed ? "default" : "destructive"} className="text-lg px-4 py-2">
                {passed ? "Passed!" : "Failed"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{percentage}%</div>
                <p className="text-gray-600 dark:text-gray-300">
                  You got {score} out of {questions.length} questions correct
                </p>
                {passed && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-700 dark:text-green-300 font-semibold">
                      Congratulations! You're eligible for a certificate.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Review Your Answers:</h3>
                {questions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correct
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-medium text-sm">
                          Q{index + 1}: {question.question}
                        </p>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                          Your answer: {question.options[selectedAnswers[index]]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600 dark:text-green-400">
                            Correct answer: {question.options[question.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between pt-6 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={onBack} className="btn-hover bg-transparent">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Course
                  </Button>
                  {!passed && (
                    <Button variant="outline" onClick={handleRetry} className="btn-hover bg-transparent">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retry Assessment
                    </Button>
                  )}
                </div>
                {passed && (
                  <Button onClick={handleGetCertificate} className="btn-primary btn-hover">
                    <Award className="h-4 w-4 mr-2" />
                    Get Certificate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Final Course Assessment</CardTitle>
              <Badge variant="outline">
                {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              You need 70% or higher to pass and receive your certificate.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Question {currentQuestion + 1}: {currentQ.question}
              </h3>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:border-blue-500 ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                          selectedAnswers[currentQuestion] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}
                      >
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={currentQuestion === 0 ? onBack : handlePrevious}
                className="btn-hover bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {currentQuestion === 0 ? "Back to Course" : "Previous"}
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="btn-primary btn-hover"
              >
                {currentQuestion === questions.length - 1 ? "Finish Assessment" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
