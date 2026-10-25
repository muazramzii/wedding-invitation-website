"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { WeddingConfig } from "@/config/types";
import { Envelope } from "./Envelope";
import { MusicPlayer, type MusicHandle } from "./MusicPlayer";
import { Hero } from "./sections/Hero";
import { Countdown } from "./sections/Countdown";
import { Details } from "./sections/Details";
import { Gallery, Story } from "./sections/StoryGallery";
import { GuestExtras, Timeline } from "./sections/GuestInfo";
import { Rsvp } from "./sections/Rsvp";
import { Closing } from "./sections/Closing";

const SCRIPT_VARS = {
  "Great Vibes": "--font-great-vibes",
  "Pinyon Script": "--font-pinyon-script",
  Allura: "--font-allura",
} as const;
const SERIF_VARS = {
  "Cormorant Garamond": "--font-cormorant-garamond",
  "Playfair Display": "--font-playfair-display",
} as const;

export default function WeddingSite({ wedding }: { wedding: WeddingConfig }) {
  const [entered, setEntered] = useState(false);
  const music = useRef<MusicHandle>(null);
  const { theme, sections } = wedding;

  const style = {
    "--c-blush": theme.blush,
    "--c-rose": theme.rose,
    "--c-ivory": theme.ivory,
    "--c-gold": theme.gold,
    "--c-ink": theme.ink,
    "--f-script": `var(${SCRIPT_VARS[theme.fonts.script]})`,
    "--f-serif": `var(${SERIF_VARS[theme.fonts.serif]})`,
  } as CSSProperties;

  // Lock scroll while the envelope is showing.
  const [overlay, setOverlay] = useState(true);
  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlay]);

  return (
    <div style={style} className="min-h-screen overflow-x-clip text-ink">
      {overlay && (
        <Envelope
          wedding={wedding}
          onOpen={() => {
            setEntered(true);
            music.current?.start();
            setTimeout(() => setOverlay(false), 3300);
          }}
        />
      )}
      {wedding.music && <MusicPlayer src={wedding.music.src} title={wedding.music.title} handle={music} />}
      <main aria-hidden={!entered && overlay ? true : undefined} inert={!entered && overlay ? true : undefined}>
        {sections.hero && <Hero wedding={wedding} />}
        {sections.story && <Story wedding={wedding} />}
        {sections.rsvp && <Rsvp wedding={wedding} />}
        {sections.countdown && <Countdown wedding={wedding} />}
        {sections.guestInfo && <Timeline wedding={wedding} />}
        {sections.details && <Details wedding={wedding} />}
        {sections.gallery && <Gallery wedding={wedding} />}
        {sections.guestInfo && <GuestExtras wedding={wedding} />}
      </main>
      {sections.closing && <Closing wedding={wedding} />}
    </div>
  );
}
