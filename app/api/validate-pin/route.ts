import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { courseId, pin, deviceId } = await request.json()

    if (!courseId || !pin || !deviceId) {
      return NextResponse.json({ valid: false, message: "Course ID, PIN, and device ID are required" }, { status: 400 })
    }

    if (!/^\d{5}$/.test(pin)) {
      return NextResponse.json({ valid: false, message: "PIN must be exactly 5 digits" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/pins/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
      body: JSON.stringify({
        courseId,
        pin,
        deviceId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "PIN validation failed" }))
      return NextResponse.json(
        { valid: false, message: errorData.message || "PIN validation failed" },
        { status: response.status },
      )
    }

    const data = await response.json()

    return NextResponse.json({
      valid: data.valid || false,
      message: data.message || "PIN validation completed",
      courseId: data.courseId || courseId,
      deviceLinked: data.deviceLinked || false,
    })
  } catch (error) {
    console.error("PIN validation error:", error)
    return NextResponse.json(
      { valid: false, message: "PIN validation service temporarily unavailable" },
      { status: 500 },
    )
  }
}
