/** Hand-built botanical sprig. Colours follow the wedding theme via CSS variables. */
export function Sprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      fill="none"
    >
      <path d="M100 255 C 96 200, 108 150, 98 90 C 94 60, 100 35, 106 15" stroke="var(--c-gold)" strokeWidth="1.4" strokeLinecap="round" />
      {[
        [96, 200, -38, 1],
        [104, 170, 40, 1],
        [98, 135, -42, 0.9],
        [102, 105, 38, 0.85],
        [99, 78, -36, 0.7],
        [104, 52, 34, 0.6],
      ].map(([x, y, rot, s], i) => (
        <path
          key={i}
          d="M0 0 C 14 -10, 34 -10, 46 0 C 34 10, 14 10, 0 0 Z"
          transform={`translate(${x} ${y}) rotate(${rot < 0 ? 180 + (rot as number) : rot}) scale(${s})`}
          fill="var(--c-gold)"
          opacity={0.28}
          stroke="var(--c-gold)"
          strokeWidth="0.8"
        />
      ))}
      <g transform="translate(106 22)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-13" rx="8" ry="15" transform={`rotate(${a})`} fill="var(--c-rose)" opacity="0.55" stroke="var(--c-rose)" strokeWidth="0.8" />
        ))}
        <circle r="5" fill="var(--c-gold)" opacity="0.8" />
      </g>
      <g transform="translate(70 120) scale(0.7)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-13" rx="8" ry="15" transform={`rotate(${a})`} fill="var(--c-blush)" stroke="var(--c-rose)" strokeWidth="0.8" />
        ))}
        <circle r="4" fill="var(--c-gold)" opacity="0.7" />
      </g>
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gold/50" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" opacity="0.8" />
      </svg>
      <span className="h-px w-16 bg-gold/50" />
    </div>
  );
}
