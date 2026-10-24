"use client";

import { useEffect, useState } from "react";
import type { WeddingConfig } from "@/config/types";
import { getTimeLeft, type TimeLeft } from "@/lib/utils";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Countdown({ wedding }: { wedding: WeddingConfig }) {
  // null until mounted so server and client markup match
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setLeft(getTimeLeft(wedding.date));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [wedding.date]);

  const units: [string, number | undefined][] = [
    ["Days", left?.days],
    ["Hours", left?.hours],
    ["Minutes", left?.minutes],
    ["Seconds", left?.seconds],
  ];

  return (
    <section id="countdown" className="bg-blush/50 px-5 py-20 md:py-28">
      <SectionHeading eyebrow="Counting down" title="Until We Say “I Do”" />
      <Reveal>
        {left?.expired ? (
          <p className="text-center font-serif text-3xl italic text-ink" role="status">
            Today is the day — or it has already happened. Thank you for celebrating with us!
          </p>
        ) : (
          <div
            className="mx-auto grid max-w-3xl grid-cols-4 gap-2 sm:gap-6"
            role="timer"
            aria-label={left ? `${left.days} days, ${left.hours} hours, ${left.minutes} minutes, ${left.seconds} seconds remaining` : "Countdown loading"}
          >
            {units.map(([label, value]) => (
              <div key={label} className="bg-ivory py-5 text-center shadow-sm ring-1 ring-gold/40 sm:py-8">
                <div className="font-serif text-3xl tabular-nums text-ink sm:text-6xl" data-testid={`cd-${label.toLowerCase()}`}>
                  {value === undefined ? "--" : String(value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-rose sm:text-xs">{label}</div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
