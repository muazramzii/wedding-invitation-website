export type SectionKey =
  | "hero"
  | "countdown"
  | "details"
  | "story"
  | "gallery"
  | "guestInfo"
  | "rsvp"
  | "closing";

export interface Venue {
  name: string;
  address: string;
  /** Used to build the Google Maps directions link. */
  mapQuery: string;
}

export interface WeddingEvent {
  title: string;
  /** Display time, e.g. "11:00 AM" */
  time: string;
  venue: Venue;
  description?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface WeddingConfig {
  slug: string;
  couple: { first: string; second: string; monogram: string };
  /** ISO 8601 with offset, e.g. 2027-03-20T11:00:00+08:00 */
  date: string;
  /** Wedding length in hours (used for calendar entry). */
  durationHours: number;
  timezoneLabel: string;
  sections: Record<SectionKey, boolean>;
  theme: {
    blush: string;
    rose: string;
    ivory: string;
    gold: string;
    ink: string;
    fonts: { script: "Great Vibes" | "Pinyon Script" | "Allura"; serif: "Cormorant Garamond" | "Playfair Display" };
  };
  intro: { eyebrow: string; buttonLabel: string };
  invitation: { eyebrow: string; message: string; hosts: string; tagline: string; joinLine: string };
  images: {
    hero: GalleryImage;
    collage: GalleryImage[];
  };
  music?: { src: string; title: string };
  ceremony: WeddingEvent;
  reception: WeddingEvent;
  story: { year: string; title: string; text: string }[];
  gallery: GalleryImage[];
  guestInfo: {
    itinerary: { time: string; label: string }[];
    accommodation: { name: string; note: string; link?: string }[];
    transportation: string;
    dressCode: { title: string; text: string; palette: string[] };
    faqs: { q: string; a: string }[];
    contacts: { name: string; role: string; phone: string }[];
    gifts?: { text: string };
  };
  rsvp: {
    deadline: string; // ISO date
    maxGuestsPerRsvp: number;
    allowMessage: boolean;
  };
  closing: { message: string };
}
