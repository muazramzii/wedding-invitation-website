"use client";

import { useState, useSyncExternalStore } from "react";
import type { WeddingConfig } from "@/config/types";
import { validateRsvp, type RsvpErrors } from "@/lib/rsvp";
import { SectionHeading } from "../ui/SectionHeading";
import { Bouquet, WaxSeal } from "../ui/Floral";
import { Reveal } from "../ui/Reveal";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "saved" }
  | { kind: "demo" }
  | { kind: "error"; message: string };

const field =
  "w-full border-b border-rose/50 bg-transparent px-1 py-2 text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none";

export function Rsvp({ wedding }: { wedding: WeddingConfig }) {
  const { maxGuestsPerRsvp: max, allowMessage, deadline } = wedding.rsvp;
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<RsvpErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Server snapshot is "open"; the client re-evaluates against the real clock after hydration.
  const deadlineMs = new Date(`${deadline}T23:59:59${wedding.date.slice(-6)}`).getTime();
  const closed = useSyncExternalStore(
    () => () => {},
    () => deadlineMs < Date.now(),
    () => false,
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input = { slug: wedding.slug, name, attendance, guests, message };
    const result = validateRsvp(input, max, allowMessage);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus({ kind: "idle" });
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
      } else if (!res.ok || !data.ok) {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
      } else {
        setStatus({ kind: data.saved ? "saved" : "demo" });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  const err = (k: keyof RsvpErrors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-sm text-[#a33a3a]" role="alert">{errors[k]}</p>
    ) : null;

  return (
    <section id="rsvp" className="relative mx-auto max-w-[460px] px-4 py-14">
      <Bouquet className="pointer-events-none absolute -left-8 top-0 z-10 w-32" rotate={-12} />
      <SectionHeading caps="Kindly" script="RSVP" className="mb-8" />
      <Reveal className="relative">
        <WaxSeal className="absolute -top-5 right-4 z-10 w-14 rotate-6" />
        <div className="paper mx-auto w-[94%] p-6 pt-8">
          {status.kind === "saved" || status.kind === "demo" ? (
            <div className="py-6 text-center" role="status">
              <p className="font-accent text-5xl text-rose">Thank you, {name.trim().split(" ")[0]}!</p>
              <p className="mt-3 font-serif text-xl">
                {attendance === "yes" ? "We can’t wait to celebrate with you." : "We’ll miss you and are grateful you let us know."}
              </p>
              {status.kind === "demo" && (
                <p className="mx-auto mt-5 max-w-sm border border-gold/50 bg-blush/60 p-3 text-sm">
                  <strong>Demo mode:</strong> this response was validated but <em>not stored</em>. Configure the RSVP backend to save replies (see README).
                </p>
              )}
            </div>
          ) : closed ? (
            <p className="py-6 text-center font-serif text-xl" role="status">RSVPs are now closed. Please contact us directly.</p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="caps mb-1 block !text-[0.6rem] text-ink">Full name</label>
                <input id="name" name="name" autoComplete="name" className={field} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {err("name")}
              </div>

              <fieldset>
                <legend className="caps mb-2 !text-[0.6rem] text-ink">Will you attend?</legend>
                <div className="grid grid-cols-2 gap-3">
                  {([["yes", "Joyfully accepts"], ["no", "Regretfully declines"]] as const).map(([v, label]) => (
                    <label key={v} className={`caps cursor-pointer rounded-full border px-3 py-2.5 text-center !text-[0.6rem] transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${attendance === v ? "border-rose bg-rose text-ivory" : "border-rose/40 hover:bg-blush"}`}>
                      <input type="radio" name="attendance" value={v} checked={attendance === v} onChange={() => setAttendance(v)} className="sr-only" />
                      {label}
                    </label>
                  ))}
                </div>
                {err("attendance")}
              </fieldset>

              {attendance === "yes" && (
                <div>
                  <label htmlFor="guests" className="caps mb-1 block !text-[0.6rem] text-ink">Number of guests (max {max})</label>
                  <input id="guests" name="guests" type="number" min={1} max={max} inputMode="numeric" className={field} value={guests} onChange={(e) => setGuests(Number(e.target.value))} aria-invalid={!!errors.guests} aria-describedby={errors.guests ? "guests-error" : undefined} />
                  {err("guests")}
                </div>
              )}

              {allowMessage && (
                <div>
                  <label htmlFor="message" className="caps mb-1 block !text-[0.6rem] text-ink">Wishes for the couple (optional)</label>
                  <textarea id="message" name="message" rows={3} maxLength={500} className={field} value={message} onChange={(e) => setMessage(e.target.value)} aria-describedby={errors.message ? "message-error" : undefined} />
                  {err("message")}
                </div>
              )}

              {status.kind === "error" && (
                <p className="border border-[#a33a3a]/50 bg-[#a33a3a]/5 p-3 text-sm text-[#a33a3a]" role="alert">{status.message}</p>
              )}

              <button type="submit" disabled={status.kind === "submitting"} className="caps w-full rounded-full bg-rose px-6 py-3 !tracking-[0.3em] text-ivory transition hover:bg-ink disabled:opacity-60">
                {status.kind === "submitting" ? "Sending…" : "Send RSVP"}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
