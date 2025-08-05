"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: number
  studentName: string
  rating: number
  comment: string
  date: string
  helpful: number
  avatar?: string
}

interface CourseReviewsProps {
  courseId: string
  courseName: string
}

const mockReviews: Review[] = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    rating: 5,
    comment:
      "Excellent course! The instructor explains everything clearly and the hands-on projects really helped me understand the concepts. Highly recommended!",
    date: "2024-01-15",
    helpful: 12,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    studentName: "Mike Chen",
    rating: 4,
    comment:
      "Great content overall. The course covers all the essential topics and the examples are practical. Could use a bit more advanced topics though.",
    date: "2024-01-10",
    helpful: 8,
  },
  {
    id: 3,
    studentName: "Emily Rodriguez",
    rating: 5,
    comment:
      "This course exceeded my expectations! The step-by-step approach made it easy to follow along, and I feel confident applying what I learned.",
    date: "2024-01-08",
    helpful: 15,
  },
  {
    id: 4,
    studentName: "David Kim",
    rating: 4,
    comment:
      "Solid course with good practical examples. The instructor is knowledgeable and the pace is just right for beginners.",
    date: "2024-01-05",
    helpful: 6,
  },
]

export default function CourseReviews({ courseId, courseName }: CourseReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage: (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100,
  }))

  const handleSubmitReview = async () => {
    if (!newReview.trim() || newRating === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide both a rating and a review comment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const review: Review = {
        id: Date.now(),
        studentName: "You", // In a real app, this would come from user session
        rating: newRating,
        comment: newReview,
        date: new Date().toISOString().split("T")[0],
        helpful: 0,
      }

      setReviews((prev) => [review, ...prev])
      setNewReview("")
      setNewRating(0)

      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback! Your review has been posted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHelpful = (reviewId: number) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
    )

    toast({
      title: "Thank you!",
      description: "Your feedback has been recorded.",
    })
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange?.(star)}
            disabled={!interactive}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          >
            <Star className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Student Reviews</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating Summary */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center mb-2">{renderStars(Math.round(averageRating))}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Based on {reviews.length} reviews</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write a Review */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            {renderStars(newRating, true, setNewRating)}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <Textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder={`Share your experience with ${courseName}...`}
              rows={4}
            />
          </div>

          <Button
            onClick={handleSubmitReview}
            disabled={isSubmitting || !newReview.trim() || newRating === 0}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">All Reviews ({reviews.length})</h3>

        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.studentName} />
                  <AvatarFallback>
                    {review.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{review.studentName}</h4>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-600 dark:text-gray-300">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>

                  <div className="flex items-center space-x-4 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleHelpful(review.id)}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
