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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/pins/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to update PIN" }))
      return NextResponse.json({ message: errorData.message || "Failed to update PIN" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating pin:", error)
    return NextResponse.json({ message: "PIN update service temporarily unavailable" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = verifyAdminToken(request)
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
  }

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/pins/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Failed to delete PIN" }))
      return NextResponse.json({ message: errorData.message || "Failed to delete PIN" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error deleting pin:", error)
    return NextResponse.json({ message: "PIN deletion service temporarily unavailable" }, { status: 500 })
  }
}
