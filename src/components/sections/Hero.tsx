import type { WeddingConfig } from "@/config/types";
import { formatLongDate } from "@/lib/utils";
import { Photo } from "../ui/Photo";
import { Sprig } from "../ui/Floral";
import { Reveal } from "../ui/Reveal";

export function Hero({ wedding }: { wedding: WeddingConfig }) {
  const { couple, invitation, images } = wedding;
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-16 md:pb-32 md:pt-24">
      <Sprig className="pointer-events-none absolute -left-12 top-0 h-40 w-28 opacity-60 sm:h-64 sm:w-48 sm:opacity-70 md:left-4 md:h-96 md:w-72" />
      <Sprig flip className="pointer-events-none absolute -right-12 top-0 h-40 w-28 opacity-60 sm:h-64 sm:w-48 sm:opacity-70 md:right-4 md:h-96 md:w-72" />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-rose">{invitation.eyebrow}</p>
          <h1 className="mt-4 font-script text-6xl leading-tight text-ink sm:text-7xl md:text-8xl">
            {couple.first} <span className="text-gold">&amp;</span> {couple.second}
          </h1>
          <p className="mt-3 font-serif text-2xl italic text-ink/80">{formatLongDate(wedding.date)}</p>
        </Reveal>

        {/* Overlapping photo + invitation card composition */}
        <div className="relative mx-auto mt-14 grid max-w-4xl items-center gap-8 md:grid-cols-12 md:gap-0">
          <Reveal className="md:col-span-5 md:col-start-1">
            <Photo image={images.hero} priority className="mx-auto aspect-[3/4] w-4/5 md:w-full" sizes="(min-width: 768px) 30vw, 80vw" />
          </Reveal>
          <Reveal delay={200} className="relative z-10 md:col-span-6 md:col-start-6 md:-ml-10">
            <div className="bg-ivory p-8 text-center shadow-[0_20px_50px_-20px_rgba(74,58,58,0.35)] ring-1 ring-gold/40 md:p-12">
              <div className="border border-gold/30 p-6 md:p-8">
                <p className="font-serif text-xl leading-relaxed text-ink md:text-2xl">{invitation.message}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-rose">{invitation.hosts}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Editorial collage */}
        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-3 items-end gap-3 md:gap-6">
          <Reveal className="mb-8"><Photo image={images.collage[0]} className="aspect-[3/4]" sizes="30vw" /></Reveal>
          <Reveal delay={150}><Photo image={images.collage[1]} className="aspect-[4/5]" sizes="30vw" /></Reveal>
          <Reveal delay={300} className="mb-12"><Photo image={images.collage[2]} className="aspect-[3/4]" sizes="30vw" /></Reveal>
        </div>
      </div>
    </section>
  );
}
