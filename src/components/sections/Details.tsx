"use client";

import type { WeddingConfig, WeddingEvent } from "@/config/types";
import { buildIcs, directionsUrl, formatLongDate, googleCalendarUrl } from "@/lib/utils";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

function EventCard({ event, date, delay }: { event: WeddingEvent; date: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="h-full bg-ivory p-8 text-center ring-1 ring-gold/40 md:p-10">
        <h3 className="font-script text-4xl text-rose">{event.title}</h3>
        <p className="mt-3 font-serif text-xl">{date}</p>
        <p className="text-sm uppercase tracking-[0.2em] text-gold">{event.time}</p>
        <div className="mx-auto my-5 h-px w-12 bg-gold/50" />
        <p className="font-serif text-2xl">{event.venue.name}</p>
        <p className="mt-1 text-sm text-ink/80">{event.venue.address}</p>
        {event.description && <p className="mt-3 font-serif italic text-ink/80">{event.description}</p>}
        <a
          href={directionsUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full border border-gold px-6 py-2.5 text-xs uppercase tracking-[0.25em] transition hover:bg-gold hover:text-ivory"
        >
          Get Directions<span className="sr-only"> to {event.venue.name} (opens Google Maps)</span>
        </a>
      </article>
    </Reveal>
  );
}

export function Details({ wedding }: { wedding: WeddingConfig }) {
  const date = formatLongDate(wedding.date);

  const downloadIcs = () => {
    const blob = new Blob([buildIcs(wedding)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${wedding.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="details" className="px-5 py-20 md:py-28">
      <SectionHeading eyebrow="Save the date" title="Wedding Details" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 md:gap-10">
        <EventCard event={wedding.ceremony} date={date} delay={0} />
        <EventCard event={wedding.reception} date={date} delay={150} />
      </div>
      <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
        <a
          href={googleCalendarUrl(wedding)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-rose px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-ivory transition hover:bg-ink"
        >
          Add to Google Calendar
        </a>
        <button
          type="button"
          onClick={downloadIcs}
          className="rounded-full border border-rose px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-rose transition hover:bg-rose hover:text-ivory"
        >
          Download .ics
        </button>
      </Reveal>
      <p className="mt-4 text-center text-xs text-ink/60">All times in {wedding.timezoneLabel}</p>
    </section>
  );
}
