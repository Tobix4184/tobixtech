import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TobixTech - Learn. Build. Grow.",
  description: "Empowering the next generation of developers through quality education and mentorship.",
  keywords: ["web development", "programming", "courses", "tutorials", "React", "Next.js"],
  authors: [{ name: "TobixTech" }],
  creator: "TobixTech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tobixtech.com",
    title: "TobixTech - Learn. Build. Grow.",
    description: "Empowering the next generation of developers through quality education and mentorship.",
    siteName: "TobixTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "TobixTech - Learn. Build. Grow.",
    description: "Empowering the next generation of developers through quality education and mentorship.",
    creator: "@tobixtech",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
