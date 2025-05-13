import type { Event,RawEvent } from "@/types/event"


import axios from "axios";
// import { Event } from "./types";

export async function fetchEvents(): Promise<Event[]> {
  try {
    const res = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json", {
      params: {
        apikey: 'OyyLgPsF1GpPK4t1aMkxinlMNB1ijqGV',
        city: "Sydney",
        countryCode: "AU",
        size: 20,
        sort: "date,asc"
      }
    });

    const eventsData = res.data._embedded?.events || [];

    const events: Event[] = eventsData.map((e: RawEvent) => ({
      id: e.id,
      title: e.name,
      date: e.dates?.start?.dateTime || "No date available",
      time: "6:00 PM",
      image: e.images?.[0]?.url || "https://via.placeholder.com/300x200?text=No+Image",
      ticketUrl: e.url || "#",
      category: e.classifications?.[0]?.segment?.name || "No classification",
      price: e.priceRanges?.[0]?.min || 0,
      location: e._embedded?.venues?.[0]?.name || "No location available",
    }));

    console.log(`Fetched ${events.length} events`);
    console.dir(eventsData[0], { depth: null });
    return events;
  } catch (error) {
    console.error("Error scraping events:",error);
    return [];
  }
}


// This is a mock API function that would normally fetch data from your backend
// In a real app, this would connect to your scraper service
// export async function fetchEvents(): Promise<Event[]> {
//   // Simulate API delay
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // Return mock data
//   return [
//     {
//       id: "1",
//       title: "Sydney Symphony Orchestra: Beethoven's Fifth",
//       description:
//         "Experience the power and emotion of Beethoven's iconic Fifth Symphony performed by the Sydney Symphony Orchestra.",
//       date: "2025-05-15",
//       time: "7:30 PM",
//       location: "Sydney Opera House, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Symphony",
//       category: "music",
//       price: 120,
//       ticketUrl: "https://example.com/tickets/1",
//     },
//     {
//       id: "2",
//       title: "Vivid Sydney Light Festival",
//       description:
//         "Australia's largest festival of light, music and ideas returns to transform Sydney into a wonderland of light art.",
//       date: "2025-05-20",
//       time: "6:00 PM",
//       location: "Circular Quay, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Vivid",
//       category: "arts",
//       price: 0,
//       ticketUrl: "https://example.com/tickets/2",
//     },
//     {
//       id: "3",
//       title: "Sydney FC vs Melbourne Victory",
//       description: "The biggest rivalry in Australian football comes to Sydney. Don't miss this A-League clash!",
//       date: "2025-05-18",
//       time: "5:00 PM",
//       location: "Allianz Stadium, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Football",
//       category: "sports",
//       price: 45,
//       ticketUrl: "https://example.com/tickets/3",
//     },
//     {
//       id: "4",
//       title: "Sydney Food Festival",
//       description:
//         "A celebration of Sydney's diverse culinary scene with food stalls, cooking demonstrations, and tastings.",
//       date: "2025-05-25",
//       time: "11:00 AM",
//       location: "The Rocks, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Food",
//       category: "food",
//       price: 15,
//       ticketUrl: "https://example.com/tickets/4",
//     },
//     {
//       id: "5",
//       title: "Hannah Gadsby: Live",
//       description: "Award-winning comedian Hannah Gadsby brings her new stand-up show to Sydney.",
//       date: "2025-05-12",
//       time: "8:00 PM",
//       location: "State Theatre, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Comedy",
//       category: "comedy",
//       price: 85,
//       ticketUrl: "https://example.com/tickets/5",
//     },
//     {
//       id: "6",
//       title: "Disney on Ice",
//       description: "A magical ice skating show featuring all your favorite Disney characters.",
//       date: "2025-05-30",
//       time: "2:00 PM",
//       location: "Qudos Bank Arena, Sydney Olympic Park",
//       image: "/placeholder.svg?height=225&width=400&text=Disney",
//       category: "family",
//       price: 65,
//       ticketUrl: "https://example.com/tickets/6",
//     },
//     {
//       id: "7",
//       title: "Sydney Writers' Festival",
//       description:
//         "Australia's largest celebration of literature, stories and ideas featuring local and international authors.",
//       date: "2025-05-22",
//       time: "10:00 AM",
//       location: "Carriageworks, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Writers",
//       category: "arts",
//       price: 25,
//       ticketUrl: "https://example.com/tickets/7",
//     },
//     {
//       id: "8",
//       title: "Tame Impala: Live in Sydney",
//       description: "Psychedelic music project of Kevin Parker performs their latest album and greatest hits.",
//       date: "2025-05-28",
//       time: "8:30 PM",
//       location: "ICC Sydney Theatre, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Concert",
//       category: "music",
//       price: 110,
//       ticketUrl: "https://example.com/tickets/8",
//     },
//     {
//       id: "9",
//       title: "Sydney Harbour Bridge Climb",
//       description:
//         "Experience breathtaking 360-degree views of Sydney on this guided tour to the top of the iconic Sydney Harbour Bridge.",
//       date: "2025-05-15",
//       time: "Various times",
//       location: "Sydney Harbour Bridge, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Bridge",
//       category: "family",
//       price: 250,
//       ticketUrl: "https://example.com/tickets/9",
//     },
//     {
//       id: "10",
//       title: "Australian Ballet: Swan Lake",
//       description: "A timeless production of Tchaikovsky's masterpiece performed by the Australian Ballet.",
//       date: "2025-05-19",
//       time: "7:00 PM",
//       location: "Joan Sutherland Theatre, Sydney Opera House",
//       image: "/placeholder.svg?height=225&width=400&text=Ballet",
//       category: "arts",
//       price: 140,
//       ticketUrl: "https://example.com/tickets/10",
//     },
//     {
//       id: "11",
//       title: "Sydney Craft Beer Festival",
//       description: "Sample over 300 craft beers from local and international breweries alongside food and live music.",
//       date: "2025-05-24",
//       time: "12:00 PM",
//       location: "Australian Technology Park, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Beer",
//       category: "food",
//       price: 45,
//       ticketUrl: "https://example.com/tickets/11",
//     },
//     {
//       id: "12",
//       title: "Sydney Comedy Festival Gala",
//       description: "A showcase of the best local and international comedians performing at this year's festival.",
//       date: "2025-05-10",
//       time: "7:30 PM",
//       location: "Enmore Theatre, Sydney",
//       image: "/placeholder.svg?height=225&width=400&text=Comedy",
//       category: "comedy",
//       price: 70,
//       ticketUrl: "https://example.com/tickets/12",
//     },
//   ]
// }
