"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import type { Event } from "@/types/event"
import  {Button}  from "@/components/ui/button"
import  Input  from "@/components/ui/input"
import  Checkbox  from "@/components/ui/checkbox"
import  Label  from "@/components/ui/label"

interface EmailModalProps {
  event: Event
  onClose: () => void
  onSubmit: (email: string, optIn: boolean) => void
}

export function EmailModal({ event, onClose, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState("")
  const [optIn, setOptIn] = useState(true)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    onSubmit(email, optIn)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold tracking-tight">Almost there!</h3>
            <p className="text-muted-foreground">Enter your email to get tickets for:</p>
            <p className="font-medium">{event.title}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="opt-in" checked={optIn} onCheckedChange={(checked) => setOptIn(checked as any)} />
              <Label htmlFor="opt-in" className="text-sm">
                Send me updates about upcoming events in Sydney
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button"  onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                Continue to Tickets
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
