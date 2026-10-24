# Wedding Invitation Website

Premium interactive wedding invitation website with customizable themes and RSVP functionality.

Built with Next.js, TypeScript and Tailwind CSS. One polished template, driven entirely by a single config file per wedding.

## Features

- **Envelope opening** — animated cover with a wax seal and an "Open the Envelope" button.
- **Music** — optional, starts only after that click; pause and mute controls.
- **Hero & collage** — overlapping invitation card and editorial photo composition, botanical SVG ornaments.
- **Countdown** — days/hours/minutes/seconds from the configured date and time, with an expired state.
- **Wedding details** — ceremony and reception, Google Maps directions, Add to Google Calendar and `.ics` download.
- **Story & gallery** — timeline, responsive gallery, keyboard-accessible lightbox (arrows, Esc, focus return).
- **Guest info** — itinerary, accommodation, transport, dress code with palette, FAQ, contacts, gift note.
- **RSVP** — validation shared by browser and API, guest limit, optional message, deadline, clear success/error states.
- **Closing** — thank-you message and footer.
- **Configurable** — every section can be hidden; theme colours and fonts come from config.
- **Accessibility** — labelled form controls, `role="alert"` errors, focus styles, `prefers-reduced-motion` support.

## Screenshots

_Placeholders — add images to `docs/screenshots/` and link them here._

| Envelope | Invitation | RSVP |
| --- | --- | --- |
| `docs/screenshots/envelope.png` | `docs/screenshots/invitation.png` | `docs/screenshots/rsvp.png` |

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · `next/font` (Great Vibes, Cormorant Garamond, Jost) · optional Supabase (REST) for RSVP storage.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000> (redirects to `/w/aiman-sarah`).

### Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run assets` | Regenerate the demo placeholder photos and audio |

## Creating a new wedding

1. Copy `src/config/weddings/aiman-sarah.ts` to `src/config/weddings/<your-slug>.ts` and edit the values.
2. Register it in `src/config/index.ts`.
3. Visit `/w/<your-slug>`.
4. Replace the placeholder images in `public/images` and the audio in `public/audio` (or edit the paths in the config). Remove `music` from the config to disable music.

Set a section to `false` in `sections` to hide it. The shape of the config is documented by `src/config/types.ts`.

The demo content (names, venues, phone numbers) is fictional. The photographs are generated SVG placeholders and the audio is a synthesized pad loop, so there are no licensing concerns, but you should replace them.

## RSVP storage

Without configuration the RSVP form runs in **demo mode**: input is validated, but **nothing is stored**, and the UI says so.

To persist responses with Supabase:

1. Create a project and run `supabase/schema.sql` in the SQL editor (RLS is enabled with no public policies).
2. Copy `.env.example` to `.env.local` and fill in:

   ```bash
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. Set the same variables in your hosting provider. The service-role key is server-only; never expose it to the browser or commit it.

Known limits: the API's rate limit is per server instance and best-effort; use a shared limiter (e.g. Upstash) for production. There is no admin view yet — read responses in the Supabase dashboard.

## Build and deploy

```bash
npm run build
npm start
```

Deploys to Vercel (import the repo, add the two environment variables) or any Node host. Add a custom domain in your hosting provider's settings.

## Testing notes

Verified in a browser against the running app: envelope open, music start/pause/mute, countdown values, RSVP validation (client and API), guest limit, demo-mode message, lightbox navigation, and link targets. There is no automated test suite yet.

## Repository

<https://github.com/muazramzii/wedding-invitation-website>
