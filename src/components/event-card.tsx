"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Event } from "@/types/event"
import  {Button}  from "@/components/ui/button"
import  Badge  from "@/components/ui/badge"
import Image from "next/image"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface EventCardProps {
  event: Event
  onGetTickets: () => void
}

export function EventCard({ event, onGetTickets }: EventCardProps) {
  const { title, description, image, date, time, location, category, price } = event

  return (
    <div className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=225&width=400"}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="space-y-1">
          <Badge variant="success" className="bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200">
            {category}
          </Badge>
          <h3 className="font-bold text-xl line-clamp-1">{title}</h3>
        </div>
      </div>
      <div className="p-4 pt-0 space-y-2">
        <p className="text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold">{price === 0 ? "Free" : `$${price.toFixed(2)}`}</div>
        <Button onClick={onGetTickets} className="bg-rose-600 hover:bg-rose-700">
          Get Tickets
        </Button>
      </div>
    </div>
  )
}
