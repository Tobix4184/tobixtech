import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://tobixtech.vercel.app"),
  title: {
    default: "TobixTech - Professional Web Development & Digital Marketing Training",
    template: "%s | TobixTech",
  },
  description:
    "Master web development, digital marketing, and technology skills with TobixTech. Expert-led courses in React, Next.js, Facebook Ads, and more. Start your tech career today!",
  keywords: [
    "web development",
    "digital marketing",
    "React training",
    "Next.js courses",
    "Facebook Ads",
    "programming bootcamp",
    "tech education",
    "online courses",
    "TobixTech",
    "coding tutorials",
  ],
  authors: [{ name: "TobixTech Team" }],
  creator: "TobixTech",
  publisher: "TobixTech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tobixtech.vercel.app",
    siteName: "TobixTech",
    title: "TobixTech - Professional Web Development & Digital Marketing Training",
    description:
      "Master web development, digital marketing, and technology skills with TobixTech. Expert-led courses in React, Next.js, Facebook Ads, and more.",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "TobixTech - Professional Tech Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TobixTech - Professional Web Development & Digital Marketing Training",
    description:
      "Master web development, digital marketing, and technology skills with TobixTech. Expert-led courses in React, Next.js, Facebook Ads, and more.",
    images: ["/placeholder.jpg"],
    creator: "@tobixtech",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://tobixtech.vercel.app",
    languages: {
      "en-US": "https://tobixtech.vercel.app",
    },
  },
  category: "education",
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "TobixTech",
  description: "Professional web development and digital marketing training platform",
  url: "https://tobixtech.vercel.app",
  logo: "https://tobixtech.vercel.app/placeholder-logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-0123",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://twitter.com/tobixtech", 
    "https://linkedin.com/company/tobixtech", 
    "https://github.com/tobixtech"
  ],
  offers: {
    "@type": "Offer",
    category: "Education",
    availability: "https://schema.org/InStock",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="preload" href="/placeholder-logo.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-16">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
