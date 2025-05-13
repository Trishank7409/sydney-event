"use client"

import { useState, useEffect } from "react"
import  {EventCard}  from "@/components/event-card"
import { EventFilter } from "@/components/event-filter"
import { EmailModal } from "@/components/email-modal"
import type { Event } from "@/types/event"
import { fetchEvents } from "@/lib/api"

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState({
    category: "all",
    date: "all",
  })

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    getEvents()
  }, [])

  useEffect(() => {
    let result = [...events]

    if (filter.category !== "all") {
      result = result.filter((event) => event.category === filter.category)
    }

    if (filter.date === "today") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      result = result.filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate.getTime() === today.getTime()
      })
    } else if (filter.date === "this-week") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)

      result = result.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate >= today && eventDate < nextWeek
      })
    } else if (filter.date === "this-month") {
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()

      result = result.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
      })
    }

    setFilteredEvents(result)
  }, [filter, events])

  const handleGetTickets = (event: Event) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedEvent(null)
  }

  const handleEmailSubmit = (email: string, optIn: boolean) => {
    // In a real app, you would save this email to your database
    console.log(`Email: ${email}, Opt-in: ${optIn}`)

    // Redirect to the original ticket site
    if (selectedEvent) {
      window.open(selectedEvent.ticketUrl, "_blank")
    }

    handleCloseModal()
  }

  return (
    <section id="events" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Browse the latest events happening in Sydney. Updated daily with fresh content.
            </p>
          </div>

          <EventFilter filter={filter} setFilter={setFilter} />

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
                  <div className="h-48 rounded-t-lg bg-muted"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 bg-muted rounded"></div>
                    <div className="h-4 w-1/2 bg-muted rounded"></div>
                    <div className="h-10 w-full bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onGetTickets={() => handleGetTickets(event)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-xl font-medium">No events found</p>
              <p className="text-muted-foreground">Try changing your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedEvent && (
        <EmailModal event={selectedEvent} onClose={handleCloseModal} onSubmit={handleEmailSubmit} />
      )}
    </section>
  )
}
