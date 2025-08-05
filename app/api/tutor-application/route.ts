import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      expertise,
      experience,
      motivation,
      portfolio,
      availability,
      agreeToTerms,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !experience || !motivation || !availability) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!agreeToTerms) {
      return NextResponse.json({ error: "Must agree to terms and conditions" }, { status: 400 })
    }

    if (!expertise || expertise.length === 0) {
      return NextResponse.json({ error: "Must select at least one area of expertise" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Save the application to a database
    // 2. Send confirmation email to applicant
    // 3. Send notification to admin team
    // 4. Create application tracking record
    // 5. Integrate with HR/recruitment system

    // Simulate database save
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const application = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phone,
      expertise,
      experience,
      motivation,
      portfolio,
      availability,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    // In production, you might want to:
    // - Send welcome email
    // - Add to CRM system
    // - Schedule follow-up tasks
    // - Log application metrics

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application.id,
    })
  } catch (error) {
    console.error("Error processing tutor application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // In a real application, you would fetch applications from database
    // This is mock data for demonstration
    const mockApplications = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        expertise: ["Web Development", "JavaScript"],
        status: "pending",
        submittedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        expertise: ["Digital Marketing", "SEO"],
        status: "approved",
        submittedAt: "2024-01-14T15:30:00Z",
      },
    ]

    let filteredApplications = mockApplications
    if (status) {
      filteredApplications = mockApplications.filter((app) => app.status === status)
    }

    // Simulate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      applications: paginatedApplications,
      pagination: {
        page,
        limit,
        total: filteredApplications.length,
        totalPages: Math.ceil(filteredApplications.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching tutor applications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
