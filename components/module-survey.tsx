"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, X, ArrowLeft, RotateCcw } from "lucide-react"

interface Question {
  question: string
  options: string[]
  correct: number
}

interface Module {
  id: number
  title: string
  survey: Question[]
}

interface ModuleSurveyProps {
  module: Module
  onComplete: (passed: boolean) => void
  onBack: () => void
}

export function ModuleSurvey({ module, onComplete, onBack }: ModuleSurveyProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < module.survey.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      let correctAnswers = 0
      module.survey.forEach((question, index) => {
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
  }

  const handleComplete = () => {
    const passed = score >= Math.ceil(module.survey.length * 0.7) // 70% to pass
    onComplete(passed)
  }

  const progress = ((currentQuestion + 1) / module.survey.length) * 100
  const currentQ = module.survey[currentQuestion]

  if (showResults) {
    const passed = score >= Math.ceil(module.survey.length * 0.7)
    const percentage = Math.round((score / module.survey.length) * 100)

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
                Module {module.id} Survey Results
              </CardTitle>
              <Badge variant={passed ? "default" : "destructive"} className="text-lg px-4 py-2">
                {passed ? "Passed!" : "Failed"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{percentage}%</div>
                <p className="text-gray-600 dark:text-gray-300">
                  You got {score} out of {module.survey.length} questions correct
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Review Your Answers:</h3>
                {module.survey.map((question, index) => {
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
                {!passed && (
                  <Button variant="outline" onClick={handleRetry} className="btn-hover bg-transparent">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retry Survey
                  </Button>
                )}
                <Button onClick={handleComplete} className="btn-primary btn-hover ml-auto">
                  {passed ? "Continue to Next Module" : "Back to Module"}
                </Button>
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
              <CardTitle>Module {module.id} Survey</CardTitle>
              <Badge variant="outline">
                {currentQuestion + 1} of {module.survey.length}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
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
                {currentQuestion === 0 ? "Back to Module" : "Previous"}
              </Button>

              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="btn-primary btn-hover"
              >
                {currentQuestion === module.survey.length - 1 ? "Finish Survey" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
