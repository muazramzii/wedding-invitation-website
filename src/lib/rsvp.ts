export type Attendance = "yes" | "no";

export interface RsvpInput {
  slug: string;
  name: string;
  attendance: Attendance;
  guests: number;
  message: string;
}

export type RsvpErrors = Partial<Record<keyof RsvpInput, string>>;

/** Shared by the browser form and the API route so rules never drift apart. */
export function validateRsvp(
  input: Partial<Record<keyof RsvpInput, unknown>>,
  maxGuests: number,
  allowMessage: boolean,
): { ok: true; value: RsvpInput } | { ok: false; errors: RsvpErrors } {
  const errors: RsvpErrors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const attendance = input.attendance;
  const slug = typeof input.slug === "string" ? input.slug : "";

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 80) errors.name = "Name must be 80 characters or fewer.";

  if (attendance !== "yes" && attendance !== "no") errors.attendance = "Please let us know if you can attend.";

  let guests = Number(input.guests);
  if (attendance === "no") guests = 0;
  else if (!Number.isInteger(guests) || guests < 1) errors.guests = "Please enter at least 1 guest.";
  else if (guests > maxGuests) errors.guests = `You can RSVP for up to ${maxGuests} guests.`;

  if (!allowMessage && message) errors.message = "Messages are not enabled for this invitation.";
  else if (message.length > 500) errors.message = "Message must be 500 characters or fewer.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { slug, name, attendance: attendance as Attendance, guests, message } };
}
