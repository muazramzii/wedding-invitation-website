import type { WeddingConfig } from "@/config/types";
import { formatLongDate } from "@/lib/utils";
import { Sprig } from "../ui/Floral";
import { Reveal } from "../ui/Reveal";

export function Closing({ wedding }: { wedding: WeddingConfig }) {
  return (
    <footer className="relative overflow-hidden bg-blush px-5 pb-16 pt-24 text-center">
      <Sprig className="pointer-events-none absolute -left-8 bottom-0 h-56 w-40 opacity-70 md:h-72 md:w-56" />
      <Sprig flip className="pointer-events-none absolute -right-8 bottom-0 h-56 w-40 opacity-70 md:h-72 md:w-56" />
      <Reveal className="relative mx-auto max-w-xl">
        <p className="font-serif text-2xl italic">{wedding.closing.message}</p>
        <p className="mt-8 font-script text-6xl text-ink md:text-7xl">
          {wedding.couple.first} <span className="text-gold">&amp;</span> {wedding.couple.second}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-rose">{formatLongDate(wedding.date)}</p>
      </Reveal>
    </footer>
  );
}
