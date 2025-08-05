import { type NextRequest, NextResponse } from "next/server"

// Store PINs securely - in production, use environment variables or database
const COURSE_PINS = {
  "meta-facebook-ads": ["46418", "29485", "52887"],
  "web-development-fundamentals": ["78901", "23456", "67890"],
  "react-nextjs-bootcamp": ["11223", "44556", "77889"],
}

export async function POST(request: NextRequest) {
  try {
    const { courseId, pin } = await request.json()

    // Validate input
    if (!courseId || !pin) {
      return NextResponse.json({ valid: false, message: "Missing courseId or pin" }, { status: 400 })
    }

    // Check if course exists
    const validPins = COURSE_PINS[courseId as keyof typeof COURSE_PINS]
    if (!validPins) {
      return NextResponse.json({ valid: false, message: "Invalid course" }, { status: 400 })
    }

    // Validate PIN
    const isValid = validPins.includes(pin)

    if (isValid) {
      // Create response with secure cookie
      const response = NextResponse.json({ valid: true })

      // Set secure cookie for course access (24 hours)
      response.cookies.set("course-access", `${courseId}-${pin}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400, // 24 hours
        path: "/",
      })

      return response
    } else {
      return NextResponse.json({
        valid: false,
        message: "Invalid PIN",
      })
    }
  } catch (error) {
    console.error("PIN validation error:", error)
    return NextResponse.json({ valid: false, message: "Server error" }, { status: 500 })
  }
}
