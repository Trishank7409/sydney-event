export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  category: string
  price: number
  ticketUrl: string
}
export interface RawEvent {
  id: string;
  name: string;
  dates?: {
    start?: {
      dateTime?: string;
    };
  };
  images?: {
    url: string;
  }[];
  url?: string;
  classifications?: {
    segment?: {
      name?: string;
    };
  }[];
  priceRanges?: {
    min?: number;
  }[];
  _embedded?: {
    venues?: {
      name?: string;
    }[];
  };
}
