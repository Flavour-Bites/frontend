'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for API call to request password reset
    console.log({
      phoneNumber,
    })
    toast.success("If an account with that phone number exists, a reset link has been sent.")
    // In a real app, you would redirect to a page indicating email sent or similar
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
          <p className="text-gray-500 dark:text-gray-400">Enter your phone number to reset your password</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                type="tel"
                placeholder="+251 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
              Reset Password
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline" prefetch={false}>
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
