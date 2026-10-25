"use client";

import type { WeddingConfig, WeddingEvent } from "@/config/types";
import { buildIcs, directionsUrl, formatLongDate, googleCalendarUrl } from "@/lib/utils";
import { Reveal } from "../ui/Reveal";
import { Bouquet, Ribbon, Tassel, WaxSeal } from "../ui/Floral";

function EventOval({ event, date, side }: { event: WeddingEvent; date: string; side: "left" | "right" }) {
  return (
    <Reveal className={`relative w-[84%] ${side === "right" ? "ml-auto" : "mr-auto"}`}>
      <article className="paper shape-oval px-[14%] py-[22%] text-center">
        <h3 className="font-accent text-4xl leading-none text-rose">{event.title}</h3>
        <p className="caps mt-2 text-ink">{date}</p>
        <p className="caps !leading-tight text-gold">{event.time}</p>
        <p className="caps mt-4 !tracking-[0.3em] text-ink">{event.venue.name}</p>
        <p className="caps !text-[0.6rem] !leading-snug text-ink/90">{event.venue.address}</p>
        {event.description && <p className="mt-2 font-serif text-base italic leading-snug text-ink">{event.description}</p>}
        <a
          href={directionsUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="caps mt-4 inline-block bg-ink/10 px-4 py-1 !text-[0.6rem] text-ink transition hover:bg-rose hover:text-ivory"
        >
          Get directions<span className="sr-only"> to {event.venue.name} (opens Google Maps)</span>
        </a>
      </article>
      <Tassel className={`absolute -bottom-14 w-5 ${side === "right" ? "left-[30%]" : "right-[30%]"}`} />
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

  const chip = "caps bg-ink/10 px-4 py-2 !text-[0.6rem] text-ink transition hover:bg-rose hover:text-ivory";

  return (
    <section id="details" className="relative mx-auto max-w-[460px] space-y-20 px-4 py-14">
      <Bouquet className="pointer-events-none absolute -right-8 top-0 z-10 w-32" rotate={12} />
      <Ribbon className="pointer-events-none absolute -left-8 top-1/3 w-56 rotate-[20deg] opacity-80" />
      <EventOval event={wedding.ceremony} date={date} side="left" />
      <EventOval event={wedding.reception} date={date} side="right" />
      <Reveal className="relative pt-4 text-center">
        <WaxSeal className="mx-auto mb-4 w-14" />
        <p className="font-accent text-3xl text-rose">Save the date</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a href={googleCalendarUrl(wedding)} target="_blank" rel="noopener noreferrer" className={chip}>
            Add to Google Calendar
          </a>
          <button type="button" onClick={downloadIcs} className={chip}>
            Download .ics
          </button>
        </div>
        <p className="caps mt-3 !text-[0.55rem] text-ink/70">All times in {wedding.timezoneLabel}</p>
      </Reveal>
    </section>
  );
}
