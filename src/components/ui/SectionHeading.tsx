/** Mixed heading as in the reference: spaced capitals plus one script word. */
export function SectionHeading({ caps, script, className = "" }: { caps: string; script: string; className?: string }) {
  return (
    <h2 className={`text-center ${className}`}>
      <span className="caps block !tracking-[0.35em] text-ink">{caps}</span>
      <span className="block font-accent text-5xl leading-[0.9] text-rose">{script}</span>
    </h2>
  );
}
