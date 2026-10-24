import { Divider } from "./Floral";

export function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-10 text-center md:mb-14">
      {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.35em] text-rose">{eyebrow}</p>}
      <h2 className="font-serif text-4xl text-ink md:text-5xl">{title}</h2>
      <Divider className="mt-5" />
    </div>
  );
}
