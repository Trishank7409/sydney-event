import { EventsList } from "@/components/events-list"
import { Hero } from "@/components/hero"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <EventsList />
      </main>
      <SiteFooter />
    </div>
  )
}
