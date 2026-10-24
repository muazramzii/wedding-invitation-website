"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { WeddingConfig } from "@/config/types";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Story({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section id="story" className="bg-blush/40 px-5 py-20 md:py-28">
      <SectionHeading eyebrow="How it began" title="Our Story" />
      <ol className="relative mx-auto max-w-3xl border-l border-gold/50 pl-8 md:pl-12">
        {wedding.story.map((s, i) => (
          <li key={s.year} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[41px] top-1 h-3 w-3 rounded-full bg-gold ring-4 ring-blush md:-left-[57px]" aria-hidden="true" />
            <Reveal delay={i * 100}>
              <p className="font-script text-3xl text-rose">{s.year}</p>
              <h3 className="font-serif text-2xl">{s.title}</h3>
              <p className="mt-1 text-ink/80">{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
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

  return (
    <section id="gallery" className="px-5 py-20 md:py-28">
      <SectionHeading eyebrow="Moments" title="Gallery" />
      <div className="mx-auto max-w-5xl columns-2 gap-3 md:columns-3 md:gap-5">
        {items.map((img, i) => (
          <Reveal key={img.src} delay={(i % 3) * 100} className="mb-3 md:mb-5">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              className="group block w-full overflow-hidden bg-blush text-left ring-1 ring-gold/40"
              aria-label={`Open photo: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={i % 3 === 1 ? 600 : 1000}
                unoptimized={img.src.endsWith(".svg")}
                className="h-auto w-full transition duration-700 group-hover:scale-105"
              />
              {img.caption && <span className="block bg-ivory px-3 py-2 font-serif text-sm italic">{img.caption}</span>}
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
          <figure className="relative max-h-full w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/5] max-h-[78vh] w-full sm:aspect-[4/3]">
              <Image src={current.src} alt={current.alt} fill sizes="90vw" unoptimized={current.src.endsWith(".svg")} className="object-contain" />
            </div>
            {current.caption && <figcaption className="mt-3 text-center font-serif text-lg italic text-ivory">{current.caption}</figcaption>}
            <p className="mt-1 text-center text-xs text-ivory/60" aria-live="polite">{(index ?? 0) + 1} / {items.length}</p>
          </figure>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close viewer" className="absolute right-4 top-4 h-11 w-11 rounded-full bg-ivory/90 text-xl text-ink">×</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-ivory/90 text-2xl text-ink md:left-6">‹</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-ivory/90 text-2xl text-ink md:right-6">›</button>
        </div>
      )}
    </section>
  );
}
