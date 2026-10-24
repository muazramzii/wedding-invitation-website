import type { WeddingConfig, WeddingEvent } from "@/config/types";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function getTimeLeft(targetIso: string, now: number = Date.now()): TimeLeft {
  const target = new Date(targetIso).getTime();
  const diff = target - now;
  if (Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    expired: false,
  };
}

export function formatLongDate(iso: string, locale = "en-GB"): string {
  return new Date(iso).toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: timezoneOf(iso),
  });
}

/** Fixed-offset timezone so server and client render identical text. */
function timezoneOf(iso: string): string {
  const m = iso.match(/([+-])(\d{2}):?(\d{2})$/);
  if (!m) return "UTC";
  const sign = m[1] === "+" ? "-" : "+"; // Etc/GMT sign is inverted
  const hours = parseInt(m[2], 10);
  return hours === 0 ? "UTC" : `Etc/GMT${sign}${hours}`;
}

export function directionsUrl(event: WeddingEvent): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venue.mapQuery)}`;
}

function toIcsDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function calendarRange(w: WeddingConfig): { start: Date; end: Date } {
  const start = new Date(w.date);
  return { start, end: new Date(start.getTime() + w.durationHours * 3600_000) };
}

export function googleCalendarUrl(w: WeddingConfig): string {
  const { start, end } = calendarRange(w);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding of ${w.couple.first} & ${w.couple.second}`,
    dates: `${toIcsDate(start)}/${toIcsDate(end)}`,
    details: w.invitation.message,
    location: `${w.reception.venue.name}, ${w.reception.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(w: WeddingConfig): string {
  const { start, end } = calendarRange(w);
  const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${w.slug}@wedding-invitation`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${esc(`Wedding of ${w.couple.first} & ${w.couple.second}`)}`,
    `LOCATION:${esc(`${w.reception.venue.name}, ${w.reception.venue.address}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
