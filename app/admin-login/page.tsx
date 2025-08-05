"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Shield, Lock } from "lucide-react"

export default function AdminLogin() {
  const [step, setStep] = useState(1)
  const [pin1, setPin1] = useState("")
  const [pin2, setPin2] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleStep1 = async () => {
    if (pin1.length !== 6) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 6-digit PIN",
        variant: "destructive",
      })
      return
    }

    setIsValidating(true)

    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 1, pin: pin1 }),
      })

      const data = await response.json()

      if (data.valid) {
        setStep(2)
        toast({
          title: "Step 1 Complete",
          description: "Please enter the second PIN",
        })
      } else {
        toast({
          title: "Invalid PIN",
          description: "The first PIN is incorrect",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleStep2 = async () => {
    if (pin2.length !== 6) {
      toast({
        title: "Invalid PIN",
        description: "Please enter a 6-digit PIN",
        variant: "destructive",
      })
      return
    }

    setIsValidating(true)

    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 2, pin1, pin2 }),
      })

      const data = await response.json()

      if (data.valid) {
        toast({
          title: "Access Granted",
          description: "Redirecting to admin dashboard...",
        })
        setTimeout(() => {
          router.push("/Adminpage")
        }, 1000)
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid PIN combination",
          variant: "destructive",
        })
        setStep(1)
        setPin1("")
        setPin2("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Step {step} of 2: Enter {step === 1 ? "first" : "second"} PIN
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label htmlFor="pin1" className="block text-sm font-medium mb-2">
                  First PIN (6 digits)
                </label>
                <Input
                  id="pin1"
                  type="password"
                  placeholder="••••••"
                  value={pin1}
                  onChange={(e) => setPin1(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <Button onClick={handleStep1} disabled={isValidating || pin1.length !== 6} className="w-full">
                {isValidating ? "Validating..." : "Continue"}
              </Button>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="pin2" className="block text-sm font-medium mb-2">
                  Second PIN (6 digits)
                </label>
                <Input
                  id="pin2"
                  type="password"
                  placeholder="••••••"
                  value={pin2}
                  onChange={(e) => setPin2(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1)
                    setPin2("")
                  }}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleStep2} disabled={isValidating || pin2.length !== 6} className="flex-1">
                  {isValidating ? "Validating..." : "Access Dashboard"}
                </Button>
              </div>
            </>
          )}

          <div className="flex items-center justify-center pt-4">
            <Lock className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Secure Admin Portal</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
