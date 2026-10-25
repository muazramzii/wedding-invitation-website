"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { WeddingConfig } from "@/config/types";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Bouquet, Ribbon, WaxSeal } from "../ui/Floral";

export function Story({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="story" className="relative mx-auto max-w-[460px] px-4 py-14">
      <Bouquet className="pointer-events-none absolute -left-6 top-4 z-10 w-36" rotate={-10} />
      <Reveal>
        <div className="paper mx-auto w-[88%] rotate-[-2deg] px-7 py-10">
          <SectionHeading caps="Our" script="love story" className="mb-6" />
          <ol className="space-y-6 text-center">
            {wedding.story.map((s) => (
              <li key={s.year}>
                <p className="font-accent text-3xl leading-none text-rose">{s.year}</p>
                <h3 className="caps mt-1 !tracking-[0.3em] text-ink">{s.title}</h3>
                <p className="mt-1 font-serif text-base italic leading-snug text-ink">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
      <Ribbon className="pointer-events-none absolute -right-8 bottom-0 w-60 rotate-[-12deg] opacity-80" flip />
      <WaxSeal className="absolute bottom-6 left-6 z-10 w-12 rotate-12" />
    </section>
  );
}

export function Gallery({ wedding }: { wedding: WeddingConfig }) {
  const items = wedding.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, step]);

  const current = index === null ? null : items[index];
  const tilts = [-4, 3, 2, -3, -2, 4];

  return (
    <section id="gallery" className="mx-auto max-w-[460px] px-4 py-14">
      <SectionHeading caps="Our" script="moments" className="mb-10" />
      <div className="grid grid-cols-2 gap-x-3 gap-y-6">
        {items.map((img, i) => (
          <Reveal key={img.src} delay={(i % 2) * 120} className={i % 2 ? "mt-8" : ""}>
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              className="block w-full text-left transition hover:scale-[1.03]"
              aria-label={`Open photo: ${img.alt}`}
            >
              <div
                className="bg-[#fffafc] p-[6%] pb-[14%] shadow-[0_10px_22px_-8px_rgba(60,50,45,0.4)]"
                style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-blush">
                  <Image src={img.src} alt={img.alt} fill sizes="45vw" unoptimized={img.src.endsWith(".svg")} className="object-cover" />
                </div>
                {img.caption && <p className="mt-2 text-center font-accent text-lg leading-none text-ink">{img.caption}</p>}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
          onClick={close}
        >
          <figure className="relative max-h-full w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/5] max-h-[78vh] w-full">
              <Image src={current.src} alt={current.alt} fill sizes="90vw" unoptimized={current.src.endsWith(".svg")} className="object-contain" />
            </div>
            {current.caption && <figcaption className="mt-3 text-center font-accent text-2xl text-ivory">{current.caption}</figcaption>}
            <p className="caps mt-1 text-center !text-[0.6rem] text-ivory/70" aria-live="polite">{(index ?? 0) + 1} / {items.length}</p>
          </figure>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close viewer" className="absolute right-4 top-4 h-11 w-11 rounded-full bg-ivory/90 text-xl text-ink">×</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-ivory/90 text-2xl text-ink">‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-ivory/90 text-2xl text-ink">›</button>
        </div>
      )}
    </section>
  );
}
