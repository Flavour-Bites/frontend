'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import toast from 'react-hot-toast'
import axiosInstance from "@/lib/api"

interface ProductReviewFormProps {
  productId: string;
}

export default function ProductReviewForm({ productId }: ProductReviewFormProps) {
  // const [name, setName] = useState("") // Name will be taken from authenticated user
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for API call to submit product review
    axiosInstance.post(`/products/${productId}/reviews/`, {
      rating,
      comment: review,
    })
    toast.success("Thank you for your review!")
    // Reset form
    // setName("")
    setRating(0)
    setReview("")
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Your Rating</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                onClick={() => setRating(star)}
                size={24}
              />
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="review">Your Review</Label>
          <Textarea
            id="review"
            placeholder="Share your thoughts on this product..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
          Submit Review
        </Button>
      </form>
    </div>
  )
}
