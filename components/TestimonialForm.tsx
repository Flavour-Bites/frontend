'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import toast from 'react-hot-toast'

export default function TestimonialForm() {
  // const [name, setName] = useState("") // Name will be taken from authenticated user
  const [rating, setRating] = useState(0)
  const [testimonial, setTestimonial] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for API call to register user
    console.log({
      // name, // Name will be taken from authenticated user
      rating,
      testimonial,
    })
    toast.success("Thank you for your testimonial!")
    // Reset form
    // setName("")
    setRating(0)
    setTestimonial("")
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-50">Share Your Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* <div>
          <Label htmlFor="name" className="text-base">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div> */}
        <div>
          <Label className="text-base">Your Rating</Label>
          <div className="flex space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400 dark:text-gray-600"}`}
                onClick={() => setRating(star)}
                size={28}
              />
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="testimonial" className="text-base">Your Testimonial</Label>
          <Textarea
            id="testimonial"
            placeholder="Tell us about your experience with Flavour Bites..."
            value={testimonial}
            onChange={(e) => setTestimonial(e.target.value)}
            rows={6}
            required
            className="mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-md transition-colors">
          Submit Testimonial
        </Button>
      </form>
    </div>
  )
}
