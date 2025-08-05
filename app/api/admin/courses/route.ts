import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production"

function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  try {
    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded.admin ? decoded : null
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
  }

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch courses" }))
      return NextResponse.json({ message: errorData.message || "Failed to fetch courses" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ message: "Course management service temporarily unavailable" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to create course" }))
      return NextResponse.json({ message: errorData.message || "Failed to create course" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ message: "Course creation service temporarily unavailable" }, { status: 500 })
  }
}
