import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import TestimonialForm from "@/components/TestimonialForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">
          Get in Touch
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 sm:mt-4 dark:text-gray-400">
          We'd love to hear from you! Send us a message or give us a call.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-6">Our Contact Details</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-7 w-7 text-pink-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Our Bakery</h3>
                <p className="text-md text-gray-600 dark:text-gray-400">123 Sweet Street, Dessert Town, DT 45678</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-7 w-7 text-pink-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Call Us</h3>
                <p className="text-md text-gray-600 dark:text-gray-400">+251 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="h-7 w-7 text-pink-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Email Us</h3>
                <p className="text-md text-gray-600 dark:text-gray-400">info@flavourbites.com</p>
              </div>
            </div>
            <Button asChild size="lg" className="mt-6 bg-green-500 hover:bg-green-600 text-white shadow-md transform transition-transform hover:scale-105">
              <Link href="https://t.me/boosted_bella2247" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" /> Chat on WhatsApp
              </Link>
            </Button>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50">
              Send Us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-name" className="text-md">Name</Label>
                <Input id="contact-name" placeholder="Your Name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email" className="text-md">Email</Label>
                <Input id="contact-email" type="email" placeholder="your@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-subject" className="text-md">Subject</Label>
                <Input id="contact-subject" placeholder="Subject of your message" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-message" className="text-md">Message</Label>
                <Textarea id="contact-message" placeholder="Your message here..." rows={5} required />
              </div>
              <Button type="submit" size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg transition-colors shadow-md transform hover:scale-105">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Testimonial Submission Form */}
      <div className="mt-16">
        <TestimonialForm />
      </div>
    </div>
  )
}
