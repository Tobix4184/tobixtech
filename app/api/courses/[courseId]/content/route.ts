import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Device authentication required" }, { status: 401 })
    }

    const deviceId = authHeader.substring(7)

    // Validate device ID format (should be a UUID)
    if (!deviceId || deviceId.length < 10) {
      return NextResponse.json({ message: "Invalid device identifier" }, { status: 401 })
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/courses/${params.courseId}/content`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Device-ID": deviceId,
        "User-Agent": "TobixTech-Frontend/1.0",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Course access denied" }))
      return NextResponse.json({ message: errorData.message || "Course access denied" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error accessing course content:", error)
    return NextResponse.json({ message: "Course content service temporarily unavailable" }, { status: 500 })
  }
}
