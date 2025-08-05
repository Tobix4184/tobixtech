"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const technicalSkills = [
  { name: "HTML5 & CSS3", level: 95 },
  { name: "JavaScript (ES6+)", level: 90 },
  { name: "React.js", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Node.js", level: 80 },
  { name: "TypeScript", level: 75 },
  { name: "Python", level: 70 },
  { name: "MongoDB", level: 75 },
]

const professionalSkills = [
  { name: "UI/UX Design", level: 85 },
  { name: "Responsive Design", level: 95 },
  { name: "Problem Solving", level: 90 },
  { name: "Team Collaboration", level: 88 },
  { name: "Project Management", level: 80 },
  { name: "Digital Marketing", level: 85 },
  { name: "SEO Optimization", level: 75 },
  { name: "Performance Optimization", level: 80 },
]

const tools = [
  "VS Code",
  "Git & GitHub",
  "Figma",
  "Adobe XD",
  "Postman",
  "Docker",
  "AWS",
  "Vercel",
  "Netlify",
  "Firebase",
  "Supabase",
  "Prisma",
]

const frameworks = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Express.js",
  "Tailwind CSS",
  "Bootstrap",
  "Material-UI",
  "Chakra UI",
  "Framer Motion",
]

function SkillBar({ skill, index }: { skill: { name: string; level: number }; index: number }) {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressElement = entry.target.querySelector("[data-progress]") as HTMLElement
            if (progressElement) {
              setTimeout(() => {
                progressElement.style.width = `${skill.level}%`
              }, index * 100)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => observer.disconnect()
  }, [skill.level, index])

  return (
    <div ref={progressRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          data-progress
          className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  )
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-blue-500">Skills</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and professional capabilities in web development and
            digital marketing.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Technical Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </CardContent>
          </Card>

          {/* Professional Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Professional Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {professionalSkills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Tools & Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Tools & Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Frameworks & Libraries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {frameworks.map((framework) => (
                  <Badge key={framework} variant="secondary" className="text-sm">
                    {framework}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experience Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Experience & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">5+</div>
                <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">100+</div>
                <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Certifications & Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">Meta Certified Digital Marketing Associate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Facebook Blueprint Certification</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">Google Analytics Certified</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Google Analytics Individual Qualification</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">AWS Cloud Practitioner</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Amazon Web Services Certification</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold">React Developer Certification</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Advanced React & Next.js Development</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
