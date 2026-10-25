"use client";

import { useEffect, useState } from "react";
import type { WeddingConfig } from "@/config/types";
import { getTimeLeft, type TimeLeft } from "@/lib/utils";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Bouquet, Ribbon } from "../ui/Floral";

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
    <section id="countdown" className="relative mx-auto max-w-[460px] overflow-hidden px-4 py-14">
      <Bouquet className="pointer-events-none absolute -right-8 top-2 w-32" rotate={12} />
      <SectionHeading caps="The" script="countdown" className="mb-6" />
      <Reveal>
        {left?.expired ? (
          <p className="text-center font-serif text-2xl italic text-ink" role="status">
            Today is the day — or it has already happened. Thank you for celebrating with us!
          </p>
        ) : (
          <div
            className="mx-auto grid max-w-xs grid-cols-4 text-center"
            role="timer"
            aria-label={left ? `${left.days} days, ${left.hours} hours, ${left.minutes} minutes, ${left.seconds} seconds remaining` : "Countdown loading"}
          >
            {units.map(([label, value]) => (
              <div key={label}>
                <div className="font-serif text-4xl tabular-nums text-ink" data-testid={`cd-${label.toLowerCase()}`}>
                  {value === undefined ? "--" : String(value).padStart(2, "0")}
                </div>
                <div className="caps !text-[0.55rem] text-rose">{label}</div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
      <Ribbon className="pointer-events-none mx-auto mt-6 w-72 opacity-90" />
    </section>
  );
}
