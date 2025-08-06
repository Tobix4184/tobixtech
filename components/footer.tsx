"use client"

import Link from "next/link"
import { BookOpen, Mail, Phone, MapPin, Twitter, Linkedin, Github, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: "About", href: "/about" },
      { name: "Courses", href: "/courses" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
    courses: [
      { name: "Web Development", href: "/courses/web-development" },
      { name: "Digital Marketing", href: "/courses/digital-marketing" },
      { name: "Mobile Development", href: "/courses/mobile-development" },
      { name: "Full Stack", href: "/courses/full-stack" },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/tobixtech", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/tobixtech", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/tobixtech", label: "GitHub" },
    { icon: Youtube, href: "https://youtube.com/@tobixtech", label: "YouTube" },
  ]

  const contactInfo = [
    { icon: Mail, text: "hello@tobixtech.com", href: "mailto:hello@tobixtech.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">TobixTech</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Empowering the next generation of developers and digital marketers with 
              cutting-edge education and hands-on experience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Courses</h3>
              <ul className="space-y-2">
                {footerLinks.courses.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 md:mb-0">
              {contactInfo.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <contact.icon className="h-4 w-4" />
                  <span className="text-sm">{contact.text}</span>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} TobixTech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
