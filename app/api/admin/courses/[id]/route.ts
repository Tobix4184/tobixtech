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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
  }

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/courses/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to fetch course" }))
      return NextResponse.json({ message: errorData.message || "Failed to fetch course" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ message: "Course fetch service temporarily unavailable" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
  }

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/courses/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to delete course" }))
      return NextResponse.json({ message: errorData.message || "Failed to delete course" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ message: "Course deletion service temporarily unavailable" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/courses/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to update course" }))
      return NextResponse.json({ message: errorData.message || "Failed to update course" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ message: "Course update service temporarily unavailable" }, { status: 500 })
  }
}
