import { type NextRequest, NextResponse } from "next/server"

// Admin PINs - in production, use environment variables
const ADMIN_PIN_1 = "123456"
const ADMIN_PIN_2 = "654321"

export async function POST(request: NextRequest) {
  try {
    const { step, pin, pin1, pin2 } = await request.json()

    if (step === 1) {
      const isValid = pin === ADMIN_PIN_1
      return NextResponse.json({ valid: isValid })
    }

    if (step === 2) {
      const isValid = pin1 === ADMIN_PIN_1 && pin2 === ADMIN_PIN_2

      if (isValid) {
        const response = NextResponse.json({ valid: true })
        // Set secure admin cookie (4 hours)
        response.cookies.set("admin-access", "granted", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 14400, // 4 hours
          path: "/",
        })
        return response
      }
    }

    return NextResponse.json({ valid: false })
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
