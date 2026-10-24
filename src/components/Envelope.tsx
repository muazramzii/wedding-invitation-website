"use client";

import { useState } from "react";
import type { WeddingConfig } from "@/config/types";
import { formatLongDate } from "@/lib/utils";
import { Sprig } from "./ui/Floral";

export function Envelope({ wedding, onOpen }: { wedding: WeddingConfig; onOpen: () => void }) {
  const [opened, setOpened] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    onOpen();
    setTimeout(() => setLeaving(true), 2300);
  };

  const { couple, intro } = wedding;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation envelope"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-blush px-5 transition-opacity duration-1000 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Sprig className="drift absolute -left-6 top-0 h-56 w-44 opacity-80 md:h-80 md:w-60" />
      <Sprig flip className="drift absolute -right-6 bottom-0 h-56 w-44 rotate-180 opacity-80 md:h-80 md:w-60" />

      <p className="fade-up mb-[2vh] text-xs uppercase tracking-[0.4em] text-rose">{intro.eyebrow}</p>

      <div style={{ width: "min(24rem, 88vw, 52vh)" }}
        className={`envelope-scene relative ${opened ? "opened" : ""}`}>
        <div className="relative aspect-[4/3] w-full">
          {/* back of envelope */}
          <div className="absolute inset-0 rounded-sm bg-[#ecc9c4] shadow-xl" />
          {/* invitation card sliding out */}
          <div className="env-card absolute inset-x-4 top-3 bottom-3 flex flex-col items-center justify-center rounded-sm bg-ivory px-4 text-center ring-1 ring-gold/40">
            <span className="font-script text-4xl text-rose">{couple.first} &amp; {couple.second}</span>
            <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-ink/70">{formatLongDate(wedding.date)}</span>
          </div>
          {/* front pocket */}
          <div
            className="absolute inset-0 rounded-sm bg-[#f1d3ce]"
            style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
          />
          {/* flap */}
          <div
            className="env-flap absolute inset-x-0 top-0 h-[55%] bg-[#e7bfb9]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", zIndex: opened ? 0 : 5 }}
          />
          {/* wax seal */}
          {!opened && (
            <div className="absolute left-1/2 top-[48%] z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold font-script text-lg text-ivory shadow-lg">
              {couple.monogram}
            </div>
          )}
        </div>
      </div>

      <h1 className="fade-up mt-[3vh] text-center font-script text-[clamp(2.75rem,10vh,4.5rem)] leading-none text-ink">
        {couple.first} <span className="text-gold">&amp;</span> {couple.second}
      </h1>
      <p className="fade-up mt-2 text-center font-serif text-lg italic text-ink/80">{formatLongDate(wedding.date)}</p>

      <button
        type="button"
        onClick={open}
        disabled={opened}
        className="fade-up mt-[3vh] rounded-full border border-gold bg-ivory px-8 py-3 text-xs uppercase tracking-[0.3em] text-ink shadow-md transition hover:bg-gold hover:text-ivory disabled:opacity-60"
      >
        {intro.buttonLabel}
      </button>
    </div>
  );
}
