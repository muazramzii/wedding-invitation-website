import type { WeddingConfig } from "@/config/types";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Bouquet, Ribbon, Tassel, WaxSeal } from "../ui/Floral";

/** Arch itinerary card followed by the round accommodation / transport / dress-code card. */
export function Timeline({ wedding }: { wedding: WeddingConfig }) {
  const g = wedding.guestInfo;
  return (
    <section id="guest-info" className="relative mx-auto max-w-[460px] px-4 py-14">
      <Ribbon className="pointer-events-none absolute -left-10 top-4 w-60 rotate-[-10deg]" />
      <Reveal>
        <div className="paper shape-arch relative mx-auto w-[82%] px-8 pb-12 pt-[26%] text-center">
          <Bouquet className="pointer-events-none absolute -right-10 top-[8%] z-10 w-32" rotate={10} />
          <SectionHeading caps="Wedding" script="timeline" className="mb-6" />
          <ul className="space-y-4">
            {g.itinerary.map((it) => (
              <li key={it.time}>
                <p className="caps !leading-tight text-ink">{it.time}</p>
                <p className="font-accent text-2xl leading-none text-rose">{it.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="relative -mt-4">
        <WaxSeal className="absolute -top-6 right-6 z-10 w-14 rotate-6" />
        <div className="paper shape-oval mx-auto w-[96%] px-[15%] py-[24%] text-center">
          <h3 className="caps !tracking-[0.3em] text-ink">Accommodations</h3>
          <ul className="mt-1 space-y-1">
            {g.accommodation.map((a) => (
              <li key={a.name} className="caps !text-[0.58rem] !leading-snug text-ink/90">
                {a.link ? (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">
                    {a.name}
                  </a>
                ) : (
                  a.name
                )}
                {" — "}
                {a.note}
              </li>
            ))}
          </ul>
          <h3 className="caps mt-5 !tracking-[0.3em] text-ink">Transportation</h3>
          <p className="caps !text-[0.58rem] !leading-snug text-ink/90">{g.transportation}</p>
          <h3 className="caps mt-5 !tracking-[0.3em] text-ink">Dress code</h3>
          <p className="caps !text-[0.58rem] !leading-snug text-ink/90">
            {g.dressCode.title}. {g.dressCode.text}
          </p>
          <ul className="mt-3 flex justify-center gap-2" aria-label="Suggested colour palette">
            {g.dressCode.palette.map((c) => (
              <li key={c} className="h-6 w-6 rounded-full ring-1 ring-white" style={{ background: c }} title={c} />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/** FAQ, contacts and gift note. */
export function GuestExtras({ wedding }: { wedding: WeddingConfig }) {
  const g = wedding.guestInfo;
  return (
    <section id="faq" className="relative mx-auto max-w-[460px] px-4 py-14">
      <Reveal>
        <SectionHeading caps="Questions &" script="answers" className="mb-6" />
        <div className="paper divide-y divide-rose/20 px-5 py-2">
          {g.faqs.map((f) => (
            <details key={f.q} className="group py-3">
              <summary className="caps flex cursor-pointer list-none items-center justify-between gap-4 !tracking-[0.18em] text-ink">
                {f.q}
                <span className="text-gold transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-2 font-serif text-base italic leading-snug text-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <SectionHeading caps="Get in" script="touch" className="mb-6" />
        <ul className="space-y-3 text-center">
          {g.contacts.map((c) => (
            <li key={c.name}>
              <p className="font-accent text-3xl leading-none text-rose">{c.name}</p>
              <p className="caps !text-[0.6rem] text-ink">{c.role}</p>
              <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="caps !text-[0.65rem] text-ink underline decoration-gold underline-offset-4">
                {c.phone}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {g.gifts && (
        <Reveal className="relative mt-14">
          <WaxSeal className="absolute -left-1 -top-6 z-10 w-14 -rotate-6" />
          <div className="paper mx-auto w-[86%] rotate-[3deg] px-7 py-9 text-center">
            <h3 className="font-accent text-4xl leading-none text-rose">Gifts</h3>
            <p className="caps mt-2 !text-[0.6rem] !leading-relaxed text-ink">{g.gifts.text}</p>
          </div>
          <Tassel className="absolute -bottom-12 right-[22%] w-5" />
        </Reveal>
      )}
    </section>
  );
}
