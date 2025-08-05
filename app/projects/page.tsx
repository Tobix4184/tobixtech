import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and MongoDB featuring user authentication, payment processing, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Productivity application with real-time collaboration, drag-and-drop functionality, and team management features.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "Firebase", "Vuetify", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Finance Dashboard",
    description: "Personal finance tracker with data visualization, budgeting tools, and expense categorization.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Angular", "TypeScript", "D3.js", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description:
      "Comprehensive social media analytics platform for tracking engagement, reach, and performance metrics.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Recharts"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Learning Management System",
    description:
      "Educational platform with course creation, student progress tracking, and interactive learning modules.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Express.js", "MySQL", "AWS S3"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Real Estate Platform",
    description: "Property listing and management system with advanced search, virtual tours, and agent dashboard.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "Supabase", "Mapbox", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-blue-500">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my web development work, featuring modern applications built with cutting-edge technologies
            and best practices.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-500">Featured</Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-3">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center bg-blue-50 dark:bg-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let's work together to bring your ideas to life with modern web technologies.
          </p>
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/contact">Start a Project</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
