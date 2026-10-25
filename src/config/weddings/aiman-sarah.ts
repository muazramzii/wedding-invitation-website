import type { WeddingConfig } from "../types";

/**
 * Sample wedding. Duplicate this file, change the values, and register it in
 * ../index.ts to create a new invitation at /w/<slug>.
 * All names, venues and phone numbers below are fictional demo data.
 */
export const aimanSarah: WeddingConfig = {
  slug: "aiman-sarah",
  couple: { first: "Aiman", second: "Sarah", monogram: "A&S" },
  date: "2027-03-20T11:00:00+08:00",
  durationHours: 6,
  timezoneLabel: "Malaysia Time (GMT+8)",
  sections: {
    hero: true,
    countdown: true,
    details: true,
    story: true,
    gallery: true,
    guestInfo: true,
    rsvp: true,
    closing: true,
  },
  theme: {
    blush: "#f8f4f1",
    rose: "#9d8883",
    ivory: "#ffffff",
    gold: "#c2a15f",
    ink: "#2d2729",
    fonts: { script: "Pinyon Script", serif: "Cormorant Garamond" },
  },
  intro: { eyebrow: "You’ve received an invitation from", buttonLabel: "Open the Envelope" },
  invitation: {
    eyebrow: "Together with their families",
    message:
      "With hearts full of joy, we invite you to celebrate the beginning of our forever. Your presence would make our day complete.",
    hosts: "Mr. & Mrs. Hamdan · Mr. & Mrs. Rahman",
    tagline: "Together is a beautiful place to be",
    joinLine: "Join us for the beginning of forever",
  },
  images: {
    hero: { src: "/images/hero.svg", alt: "Aiman and Sarah portrait" },
    collage: [
      { src: "/images/collage-1.svg", alt: "Hands together" },
      { src: "/images/collage-2.svg", alt: "Walking at sunset" },
      { src: "/images/collage-3.svg", alt: "Wedding bouquet" },
    ],
  },
  music: { src: "/audio/lullaby.wav", title: "Soft piano pad (demo)" },
  ceremony: {
    title: "Akad Nikah",
    time: "11:00 AM",
    venue: {
      name: "Masjid Jamek Garden Hall",
      address: "Jalan Contoh 1, Taman Bunga, 50000 Kuala Lumpur",
      mapQuery: "Masjid Jamek Kuala Lumpur",
    },
    description: "A solemn ceremony among family and closest friends.",
  },
  reception: {
    title: "Wedding Reception",
    time: "12:30 PM – 5:00 PM",
    venue: {
      name: "The Rosewood Ballroom",
      address: "88 Jalan Mawar, 50450 Kuala Lumpur",
      mapQuery: "Rosewood Ballroom Kuala Lumpur",
    },
    description: "Lunch, laughter and a little dancing.",
  },
  story: [
    { year: "2019", title: "We Met", text: "A rainy afternoon, a shared umbrella, and a conversation that never quite ended." },
    { year: "2022", title: "First Trip Together", text: "Sunrise on a hillside and the first time we said it out loud." },
    { year: "2026", title: "The Proposal", text: "Among the roses of her grandmother's garden, he asked. She said yes before he finished." },
  ],
  gallery: [
    { src: "/images/gallery-1.svg", alt: "Couple laughing", caption: "Our favourite kind of afternoon" },
    { src: "/images/gallery-2.svg", alt: "Garden walk", caption: "The garden where it began" },
    { src: "/images/gallery-3.svg", alt: "Engagement rings", caption: "The question" },
    { src: "/images/gallery-4.svg", alt: "Evening light", caption: "Golden hour" },
    { src: "/images/gallery-5.svg", alt: "Flowers", caption: "Her favourite peonies" },
    { src: "/images/gallery-6.svg", alt: "Together", caption: "Always" },
  ],
  guestInfo: {
    itinerary: [
      { time: "10:30 AM", label: "Guests arrive & seating" },
      { time: "11:00 AM", label: "Akad Nikah" },
      { time: "12:30 PM", label: "Reception begins" },
      { time: "1:30 PM", label: "Lunch served" },
      { time: "3:00 PM", label: "Cake cutting & dances" },
      { time: "5:00 PM", label: "Farewell" },
    ],
    accommodation: [
      { name: "Hotel Mawar", note: "5 minutes from the reception. Mention “Aiman & Sarah” for a guest rate.", link: "https://www.google.com/maps/search/?api=1&query=Hotel+Mawar+Kuala+Lumpur" },
      { name: "The Garden Inn", note: "Budget-friendly, 10 minutes away." },
    ],
    transportation:
      "Free parking is available at the ballroom. A complimentary shuttle runs between Hotel Mawar and the venue from 10:00 AM.",
    dressCode: {
      title: "Garden Formal",
      text: "Soft, romantic tones. Please avoid white and bright red.",
      palette: ["#ffffff", "#e8dcd2", "#c9b8a6", "#a9b394"],
    },
    faqs: [
      { q: "Can I bring a plus-one?", a: "Your invitation lists the number of seats reserved for you. Please RSVP with that number." },
      { q: "Are children welcome?", a: "Yes, we would love to celebrate with your little ones." },
      { q: "Will there be halal food?", a: "Yes, all food served is halal-certified." },
      { q: "What if I need to change my RSVP?", a: "Contact us before the RSVP deadline using the details below." },
    ],
    contacts: [
      { name: "Nadia", role: "Maid of honour", phone: "+60 12-000 0001" },
      { name: "Hafiz", role: "Best man", phone: "+60 12-000 0002" },
    ],
    gifts: {
      text: "Your presence is the greatest gift. If you wish to give, a contribution towards our first home would be warmly appreciated.",
    },
  },
  rsvp: { deadline: "2027-02-20", maxGuestsPerRsvp: 4, allowMessage: true },
  closing: {
    message: "Thank you for being part of our story. We can’t wait to celebrate with you.",
  },
};
