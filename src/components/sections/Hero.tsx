import type { WeddingConfig } from "@/config/types";
import { formatLongDate } from "@/lib/utils";
import { Polaroid } from "../ui/Photo";
import { Bouquet, LinerPattern, Ribbon, Tassel } from "../ui/Floral";
import { Reveal } from "../ui/Reveal";

/** Layered envelope-opening collage, positioned in percentages so it scales with the column. */
export function Hero({ wedding }: { wedding: WeddingConfig }) {
  const { couple, invitation, images, ceremony } = wedding;
  const [p2, p3] = images.collage;

  return (
    <section id="top" className="px-4 pb-10 pt-6">
      <Reveal>
        <div
          className="relative mx-auto w-full max-w-[460px] [container-type:inline-size]"
          style={{ aspectRatio: "100 / 168" }}
        >
          {/* envelope lining + pocket */}
          <div
            className="absolute left-[3%] top-0 h-[22%] w-[94%] drop-shadow-[0_6px_8px_rgba(70,60,55,0.2)]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
          >
            <LinerPattern className="h-full w-full" />
          </div>
          <div className="paper absolute left-[3%] top-[13%] h-[84%] w-[94%] opacity-60" />

          <Polaroid image={images.hero} tilt={-9} priority className="absolute left-[6%] top-[8%] w-[30%]" sizes="30vw" />

          {/* oval tag */}
          <div className="paper shape-oval absolute left-[58%] top-[6%] flex w-[30%] items-center justify-center px-[3%] text-center" style={{ aspectRatio: "3 / 4" }}>
            <p className="caps text-ink" style={{ fontSize: "2.5cqw" }}>{invitation.tagline}</p>
          </div>
          <Tassel className="absolute left-[69.5%] top-[29%] w-[4.5%]" />

          {/* arch invitation card */}
          <div
            className="paper shape-arch absolute left-[13%] top-[19%] flex w-[56%] flex-col items-center justify-end px-[4%] pb-[6%] text-center"
            style={{ aspectRatio: "56 / 74" }}
          >
            <p className="caps text-ink" style={{ fontSize: "2.3cqw" }}>The wedding of</p>
            <p className="font-script leading-[0.95] text-ink" style={{ fontSize: "9.5cqw" }}>
              {couple.first}
              <span className="block font-accent text-rose" style={{ fontSize: "6.5cqw", lineHeight: 1 }}>and</span>
              {couple.second}
            </p>
            <p className="caps mt-[4%] text-ink" style={{ fontSize: "2.4cqw" }}>{formatLongDate(wedding.date).split(", ")[1]}</p>
            <p className="caps text-ink" style={{ fontSize: "2.2cqw" }}>at {ceremony.time}</p>
            <p className="caps mt-[3%] text-ink" style={{ fontSize: "2cqw", lineHeight: 1.7 }}>
              {ceremony.venue.name}
            </p>
          </div>

          <Polaroid image={p2} tilt={6} className="absolute left-[63%] top-[28%] w-[31%]" sizes="30vw" />
          <Polaroid image={p3} tilt={-5} className="absolute left-[57%] top-[48%] w-[33%]" sizes="30vw" />

          <Ribbon className="pointer-events-none absolute left-[14%] top-[57%] w-[72%] rotate-[8deg] opacity-90" />

          {/* second oval tag */}
          <div className="paper shape-oval absolute left-[24%] top-[66%] flex w-[36%] items-center justify-center px-[4%] text-center" style={{ aspectRatio: "4 / 5" }}>
            <p className="caps text-ink" style={{ fontSize: "2.6cqw" }}>{invitation.joinLine}</p>
          </div>
          <Tassel className="absolute left-[40.5%] top-[92.5%] w-[4.5%]" />

          <Bouquet className="pointer-events-none absolute -left-[5%] top-[14%] w-[32%]" rotate={-8} />
          <Bouquet className="pointer-events-none absolute -left-[4%] top-[72%] w-[30%]" flip rotate={6} />
          <Bouquet className="pointer-events-none absolute right-[-2%] top-[86%] w-[22%]" rotate={14} />
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-4 max-w-sm text-center">
        <p className="caps text-rose">{invitation.eyebrow}</p>
        <p className="mt-3 font-serif text-xl italic leading-snug text-ink">{invitation.message}</p>
        <p className="caps mt-4 text-ink">{invitation.hosts}</p>
      </Reveal>
    </section>
  );
}
