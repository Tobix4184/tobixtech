import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected course content routes
const protectedRoutes = [
  "/courses/meta-facebook-ads/content",
  "/courses/web-development-fundamentals/content",
  "/courses/react-nextjs-bootcamp/content",
]

// Admin routes protection
const adminRoutes = ["/Adminpage"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    const adminAccess = request.cookies.get("admin-access")?.value
    if (!adminAccess) {
      return NextResponse.redirect(new URL("/admin-login", request.url))
    }
  }

  // Check if the current path is a protected course content route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Check if user has valid session/token
    const hasValidAccess = request.cookies.get("course-access")?.value

    if (!hasValidAccess) {
      // Extract course ID from the path
      const courseId = pathname.split("/")[2]
      // Redirect to course PIN entry page
      return NextResponse.redirect(new URL(`/courses/${courseId}`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/courses/:path*/content/:path*", "/Adminpage/:path*"],
}
