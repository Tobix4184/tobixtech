import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">TobixTech</h3>
            <p className="text-sm text-muted-foreground">
              Empowering the next generation of developers through quality education and mentorship.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Courses</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses/web-development-fundamentals" className="text-muted-foreground hover:text-foreground">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses/react-nextjs-bootcamp" className="text-muted-foreground hover:text-foreground">
                  React & Next.js
                </Link>
              </li>
              <li>
                <Link href="/courses/meta-facebook-ads" className="text-muted-foreground hover:text-foreground">
                  Facebook Ads
                </Link>
              </li>
              <li>
                <Link href="/become-tutor" className="text-muted-foreground hover:text-foreground">
                  Become a Tutor
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="mailto:contact@tobixtech.com" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TobixTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
