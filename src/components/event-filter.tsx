"use client"

import { ChevronDown } from "lucide-react"
import  {Button}  from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterState {
  category: string
  date: string
}

interface EventFilterProps {
  filter: FilterState
  setFilter: (filter: FilterState) => void
}

export function EventFilter({ filter, setFilter }: EventFilterProps) {
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "music", label: "Music" },
    { value: "arts", label: "Arts & Theatre" },
    { value: "sports", label: "Sports" },
    { value: "food", label: "Food & Drink" },
    { value: "comedy", label: "Comedy" },
    { value: "family", label: "Family" },
  ]

  const dates = [
    { value: "all", label: "All Dates" },
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
  ]

  return (
    <div className="flex flex-wrap gap-4 my-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='destructive' className="flex items-center gap-1">
            {categories.find((c) => c.value === filter.category)?.label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.value}
                onClick={() => setFilter({ ...filter, category: category.value })}
                className={filter.category === category.value ? "bg-muted" : ""}
              >
                {category.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' className="flex items-center gap-1">
            {dates.find((d) => d.value === filter.date)?.label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {dates.map((date) => (
              <DropdownMenuItem
                key={date.value}
                onClick={() => setFilter({ ...filter, date: date.value })}
                className={filter.date === date.value ? "bg-muted" : ""}
              >
                {date.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
