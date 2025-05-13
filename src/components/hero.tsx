import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import operaImg from "@/assets/opera-house.jpg"
import  {Button}  from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Sydney&apos;s Best Events
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Find and book the hottest events in Sydney. From concerts to exhibitions, we&apos;ve got you covered.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#events">
                <Button  className="bg-rose-600 hover:bg-rose-700">
                  Explore Events
                </Button>
              </Link>
              <Link href="#about">
                <Button  >
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Updated daily</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Sydney, Australia</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover">
              <Image
                alt="Sydney Opera House"
                src={operaImg.src}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
