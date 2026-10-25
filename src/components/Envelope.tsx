"use client";

import { useState } from "react";
import type { WeddingConfig } from "@/config/types";
import { formatLongDate } from "@/lib/utils";
import { Bouquet, WaxSeal } from "./ui/Floral";

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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 transition-opacity duration-1000 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ background: "radial-gradient(120% 80% at 50% 0%, #fbeef4 0%, var(--c-blush) 60%, #efd9e6 100%)" }}
    >
      <p className="fade-up caps mb-[1.5vh] text-center text-ink">{intro.eyebrow}</p>

      <h1 className="fade-up text-center font-script text-[clamp(3rem,11vh,4.75rem)] leading-[0.95] text-ink">
        {couple.first}
        <span className="block font-accent text-[0.6em] leading-none text-rose">and</span>
        {couple.second}
      </h1>

      <div
        style={{ width: "min(21rem, 88vw, 46vh)" }}
        className={`envelope-scene relative mt-[4vh] ${opened ? "opened" : ""}`}
      >
        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 rounded-[3px] bg-[#e9d3dc] shadow-[0_18px_30px_-14px_rgba(120,80,100,0.5)]" />
          <div className="env-card paper absolute inset-x-4 top-3 bottom-3 flex flex-col items-center justify-center text-center">
            <span className="font-script text-3xl text-ink">{couple.first} &amp; {couple.second}</span>
            <span className="caps mt-1 !text-[0.55rem] text-rose">{formatLongDate(wedding.date)}</span>
          </div>
          <div
            className="absolute inset-0 rounded-[3px] bg-[#f3e3ea]"
            style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className="env-flap absolute inset-x-0 top-0 h-[55%] bg-[#ecd8e1]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", zIndex: opened ? 0 : 5 }}
          />
          {!opened && (
            <WaxSeal
              label={couple.monogram}
              className="absolute left-1/2 top-[50%] z-10 h-[22%] w-auto -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
            />
          )}
          <Bouquet className="pointer-events-none absolute -right-[12%] -top-[20%] z-20 w-[48%] drift" />
        </div>
      </div>

      <button
        type="button"
        onClick={open}
        disabled={opened}
        className="fade-up caps mt-[5vh] border-b border-rose/60 pb-1 !tracking-[0.35em] text-ink transition hover:text-rose disabled:opacity-60"
      >
        {intro.buttonLabel}
      </button>
    </div>
  );
}
