"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";

export interface MusicHandle {
  start: () => void;
}

/** Audio only ever starts from a user gesture (the envelope button) — never on page load. */
export function MusicPlayer({ src, title, handle }: { src: string; title: string; handle: Ref<MusicHandle> }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [engaged, setEngaged] = useState(false);

  useImperativeHandle(handle, () => ({
    start: () => {
      setEngaged(true);
      audio.current?.play().catch(() => setPlaying(false));
    },
  }));

  useEffect(() => {
    if (audio.current) audio.current.muted = muted;
  }, [muted]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-ivory/90 text-gold shadow-md backdrop-blur transition hover:bg-blush";

  return (
    <>
      <audio ref={audio} src={src} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      {engaged && (
    <div className="fixed bottom-4 right-4 z-40 flex gap-2" role="group" aria-label={`Music: ${title}`}>
      <button type="button" className={btn} onClick={toggle} aria-label={playing ? "Pause music" : "Play music"} aria-pressed={playing}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" /><rect x="9.5" y="2" width="3.5" height="12" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2 L14 8 L4 14 Z" /></svg>
        )}
      </button>
      <button type="button" className={btn} onClick={() => setMuted((m) => !m)} aria-label={muted ? "Unmute music" : "Mute music"} aria-pressed={muted}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 7 H6 L10 3.5 V14.5 L6 11 H3 Z" fill="currentColor" />
          {muted ? <path d="M12.5 6.5 L16 11.5 M16 6.5 L12.5 11.5" /> : <path d="M12.5 6.5 Q14.5 9 12.5 11.5" />}
        </svg>
      </button>
    </div>
      )}
    </>
  );
}
