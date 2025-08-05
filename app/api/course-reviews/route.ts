import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, rating, comment, studentName } = body

    // Validate required fields
    if (!courseId || !rating || !comment || !studentName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Authenticate the user
    // 2. Check if user has access to the course
    // 3. Prevent duplicate reviews from the same user
    // 4. Save to database
    // 5. Send notifications to instructors

    // Simulate database save
    await new Promise((resolve) => setTimeout(resolve, 500))

    const review = {
      id: Date.now(),
      courseId,
      studentName,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      review,
    })
  } catch (error) {
    console.error("Error submitting review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    // In a real application, you would fetch reviews from database
    // This is mock data for demonstration
    const mockReviews = [
      {
        id: 1,
        courseId,
        studentName: "Sarah Johnson",
        rating: 5,
        comment: "Excellent course! Very comprehensive and well-structured.",
        date: "2024-01-15",
        helpful: 12,
      },
      {
        id: 2,
        courseId,
        studentName: "Mike Chen",
        rating: 4,
        comment: "Great content, learned a lot. Could use more practical examples.",
        date: "2024-01-10",
        helpful: 8,
      },
    ]

    return NextResponse.json({
      success: true,
      reviews: mockReviews,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
