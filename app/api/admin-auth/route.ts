import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const { step, pin, pin1, pin2 } = await request.json()

    if (!step || (step === 1 && !pin) || (step === 2 && (!pin1 || !pin2))) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000"

    const response = await fetch(`${backendUrl}/api/admin/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TobixTech-Frontend/1.0",
      },
      body: JSON.stringify({ step, pin, pin1, pin2 }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Authentication failed" }))
      return NextResponse.json(
        { success: false, message: errorData.message || "Authentication failed" },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (step === 2 && data.success) {
      const token = jwt.sign(
        {
          admin: true,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 4 * 60 * 60,
        },
        JWT_SECRET,
      )

      const expires = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()

      return NextResponse.json({
        success: true,
        token,
        expires,
        message: "Admin access granted",
      })
    }

    return NextResponse.json({
      success: data.success,
      message: data.message || "Authentication step completed",
    })
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json(
      { success: false, message: "Authentication service temporarily unavailable" },
      { status: 500 },
    )
  }
}
