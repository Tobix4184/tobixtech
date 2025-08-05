import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-blue-500">
              Tobix<span className="text-slate-800 dark:text-white">Tech</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Web Development & Digital Marketing</p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="mailto:tobixtech@gmail.com"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {currentYear} Tobix Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
