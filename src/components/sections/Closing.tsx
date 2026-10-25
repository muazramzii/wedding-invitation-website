import type { WeddingConfig } from "@/config/types";
import { formatLongDate } from "@/lib/utils";
import { Bouquet, Ribbon } from "../ui/Floral";
import { Reveal } from "../ui/Reveal";

export function Closing({ wedding }: { wedding: WeddingConfig }) {
  return (
    <footer className="relative mx-auto max-w-[460px] overflow-hidden px-4 pb-24 pt-20 text-center">
      <Ribbon className="pointer-events-none absolute -left-6 top-6 w-64 rotate-[-8deg] opacity-80" />
      <Bouquet className="pointer-events-none absolute -left-6 bottom-0 w-40" rotate={-6} />
      <Bouquet className="pointer-events-none absolute -right-6 bottom-0 w-40" flip rotate={6} />
      <Reveal className="relative">
        <p className="caps mx-auto max-w-xs text-ink">{wedding.closing.message}</p>
        <p className="mt-8 font-script text-6xl leading-[0.95] text-ink">
          {wedding.couple.first}
          <span className="block font-accent text-[0.55em] leading-none text-rose">and</span>
          {wedding.couple.second}
        </p>
        <p className="caps mt-4 !tracking-[0.35em] text-rose">{formatLongDate(wedding.date)}</p>
      </Reveal>
    </footer>
  );
}
