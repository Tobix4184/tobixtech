"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Shield, Lock, Loader2 } from "lucide-react"

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
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 1, pin: pin1 }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStep(2)
        toast({
          title: "Step 1 Complete",
          description: "Please enter the second PIN",
        })
      } else {
        toast({
          title: "Invalid PIN",
          description: data.message || "The first PIN is incorrect",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to authentication server",
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
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: 2, pin1, pin2 }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store admin token securely
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_expires", data.expires)

        toast({
          title: "Access Granted",
          description: "Welcome to TobixTech Admin Dashboard",
        })

        setTimeout(() => {
          router.push("/admin-dashboard")
        }, 1000)
      } else {
        toast({
          title: "Access Denied",
          description: data.message || "Invalid PIN combination",
          variant: "destructive",
        })
        setStep(1)
        setPin1("")
        setPin2("")
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to authentication server",
        variant: "destructive",
      })
    } finally {
      setIsValidating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TobixTech Admin
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Step {step} of 2: Enter {step === 1 ? "first" : "second"} PIN
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <label htmlFor="pin1" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  First PIN (6 digits)
                </label>
                <Input
                  id="pin1"
                  type="password"
                  placeholder="••••••"
                  value={pin1}
                  onChange={(e) => setPin1(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyPress={(e) => handleKeyPress(e, handleStep1)}
                  maxLength={6}
                  className="text-center text-xl tracking-[0.5em] h-14 border-2 focus:border-blue-500 transition-colors"
                  disabled={isValidating}
                  autoFocus
                />
              </div>
              <Button
                onClick={handleStep1}
                disabled={isValidating || pin1.length !== 6}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all duration-200"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Continue to Step 2"
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="pin2" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Second PIN (6 digits)
                </label>
                <Input
                  id="pin2"
                  type="password"
                  placeholder="••••••"
                  value={pin2}
                  onChange={(e) => setPin2(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyPress={(e) => handleKeyPress(e, handleStep2)}
                  maxLength={6}
                  className="text-center text-xl tracking-[0.5em] h-14 border-2 focus:border-blue-500 transition-colors"
                  disabled={isValidating}
                  autoFocus
                />
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1)
                    setPin2("")
                  }}
                  disabled={isValidating}
                  className="flex-1 h-12 border-2 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Back to Step 1
                </Button>
                <Button
                  onClick={handleStep2}
                  disabled={isValidating || pin2.length !== 6}
                  className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Access Dashboard"
                  )}
                </Button>
              </div>
            </>
          )}

          <div className="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Lock className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">Secure Admin Portal</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
