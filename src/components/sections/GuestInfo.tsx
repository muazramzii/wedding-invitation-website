import type { WeddingConfig } from "@/config/types";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

function Block({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="h-full bg-ivory p-7 ring-1 ring-gold/40">
        <h3 className="mb-4 font-script text-3xl text-rose">{title}</h3>
        {children}
      </div>
    </Reveal>
  );
}

export function GuestInfo({ wedding }: { wedding: WeddingConfig }) {
  const g = wedding.guestInfo;
  return (
    <section id="guest-info" className="bg-blush/40 px-5 py-20 md:py-28">
      <SectionHeading eyebrow="Good to know" title="Guest Information" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <Block title="Itinerary">
          <ul className="space-y-2">
            {g.itinerary.map((it) => (
              <li key={it.time} className="flex gap-4">
                <span className="w-20 shrink-0 text-sm uppercase tracking-wider text-gold">{it.time}</span>
                <span>{it.label}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Dress Code" delay={100}>
          <p className="font-serif text-xl">{g.dressCode.title}</p>
          <p className="mt-1 text-ink/80">{g.dressCode.text}</p>
          <ul className="mt-4 flex gap-2" aria-label="Suggested colour palette">
            {g.dressCode.palette.map((c) => (
              <li key={c} className="h-9 w-9 rounded-full ring-1 ring-gold/40" style={{ background: c }} title={c} />
            ))}
          </ul>
        </Block>

        <Block title="Stay & Travel">
          <ul className="space-y-3">
            {g.accommodation.map((a) => (
              <li key={a.name}>
                <p className="font-serif text-lg">
                  {a.link ? (
                    <a href={a.link} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4 hover:text-rose">
                      {a.name}
                    </a>
                  ) : (
                    a.name
                  )}
                </p>
                <p className="text-sm text-ink/80">{a.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-gold/30 pt-4 text-sm">{g.transportation}</p>
        </Block>

        <Block title="Contact" delay={100}>
          <ul className="space-y-3">
            {g.contacts.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-3">
                <span>
                  <span className="font-serif text-lg">{c.name}</span>
                  <span className="ml-2 text-sm text-ink/70">{c.role}</span>
                </span>
                <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="text-sm text-rose underline underline-offset-4">
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
          {g.gifts && <p className="mt-4 border-t border-gold/30 pt-4 text-sm italic">{g.gifts.text}</p>}
        </Block>
      </div>

      <Reveal className="mx-auto mt-10 max-w-3xl">
        <h3 className="mb-4 text-center font-script text-4xl text-rose">Questions & Answers</h3>
        <div className="divide-y divide-gold/30 bg-ivory ring-1 ring-gold/40">
          {g.faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg">
                {f.q}
                <span className="text-gold transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-2 text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
