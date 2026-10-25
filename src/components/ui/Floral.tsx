import { useId } from "react";

/* Hand-built botanical decorations, styled after the cream-rose and pampas look of the reference. */

const r2 = (n: number) => Math.round(n * 100) / 100;

function Rose({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#f7ecdd" stroke="#d9c3aa" strokeWidth="0.6" />
      <path d={`M${-r * 0.8} ${-r * 0.1} A${r * 0.8} ${r * 0.8} 0 0 1 ${r * 0.7} ${-r * 0.35}`} fill="none" stroke="#d6bda3" strokeWidth="0.6" />
      <circle r={r * 0.62} fill="#fbf3e8" stroke="#dbc6ad" strokeWidth="0.6" />
      <path d={`M${-r * 0.5} ${r * 0.15} A${r * 0.5} ${r * 0.5} 0 1 1 ${r * 0.45} ${r * 0.2}`} fill="none" stroke="#d3b99e" strokeWidth="0.6" />
      <circle r={r * 0.3} fill="#f6e9d8" stroke="#d3b99e" strokeWidth="0.6" />
      <path d={`M${-r * 0.12} 0 A${r * 0.14} ${r * 0.14} 0 1 1 ${r * 0.1} ${r * 0.08}`} fill="none" stroke="#c9ad90" strokeWidth="0.6" />
    </g>
  );
}

function Plume({ x, y, rot, len }: { x: number; y: number; rot: number; len: number }) {
  const lines = Array.from({ length: 44 }, (_, i) => {
    const t = i / 43;
    const side = i % 2 ? 1 : -1;
    const jitter = ((i * 37) % 10) / 10;
    const by = -(8 + t * len);
    const spread = (3 + 13 * Math.sin(Math.PI * Math.min(1, t * 1.1))) * (0.65 + jitter * 0.5);
    return (
      <line
        key={i}
        x1={0}
        y1={r2(by)}
        x2={r2(side * spread)}
        y2={r2(by - 9 - jitter * 6)}
        stroke={i % 3 ? "#d9c4a4" : "#c9ad86"}
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.8"
      />
    );
  });
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={`M0 0 L0 ${-len}`} stroke="#cdb38c" strokeWidth="0.9" />
      {lines}
    </g>
  );
}

function Leaf({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <path
      d="M0 0 C 8 -9, 22 -9, 32 0 C 22 8, 8 8, 0 0 Z"
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
      fill="#b7bf9f"
      stroke="#9aa383"
      strokeWidth="0.6"
      opacity="0.9"
    />
  );
}

/** Cream roses, sage leaves and pampas plumes. */
export function Bouquet({ className = "", flip = false, rotate = 0 }: { className?: string; flip?: boolean; rotate?: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <Plume x={80} y={150} rot={-22} len={95} />
      <Plume x={100} y={150} rot={4} len={110} />
      <Plume x={118} y={150} rot={26} len={92} />
      <Leaf x={92} y={150} rot={-150} s={1.2} />
      <Leaf x={100} y={152} rot={-35} s={1.1} />
      <Leaf x={96} y={140} rot={-170} s={0.9} />
      <Leaf x={104} y={140} rot={-10} s={0.9} />
      <path d="M94 200 Q 98 165 100 140" stroke="#9aa383" strokeWidth="2" fill="none" />
      <Rose x={82} y={112} r={19} />
      <Rose x={120} y={104} r={21} />
      <Rose x={100} y={130} r={16} />
      <Rose x={104} y={86} r={14} />
    </svg>
  );
}

/** Satin ribbon drifting across the layout. */
export function Ribbon({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 320 120" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f1e6dc" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e8d9cb" />
        </linearGradient>
      </defs>
      <path d="M5 80 C 50 10, 100 120, 150 60 S 250 10, 315 50" stroke={`url(#${id})`} strokeWidth="16" strokeLinecap="round" opacity="0.9" />
      <path d="M5 76 C 50 6, 100 116, 150 56 S 250 6, 315 46" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M5 86 C 50 16, 100 126, 150 66 S 250 16, 315 56" stroke="#d8c6b6" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

/** Gold cord and tassel that hangs from a card. */
export function Tassel({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 110" className={`sway ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9bd7e" />
          <stop offset="0.5" stopColor="#f0dba3" />
          <stop offset="1" stopColor="#b8964f" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="6" r="4" fill="none" stroke="#c2a15f" strokeWidth="1.4" />
      <path d="M12 10 L12 54" stroke="#c2a15f" strokeWidth="1.6" />
      <path d="M8 54 H16 L17 62 H7 Z" fill={`url(#${id})`} />
      <path d="M7 62 L5 106 H19 L17 62 Z" fill={`url(#${id})`} />
      {[8, 10.5, 13, 15.5].map((x) => (
        <path key={x} d={`M${x} 64 L${x - 1} 104`} stroke="#a98842" strokeWidth="0.5" opacity="0.7" />
      ))}
    </svg>
  );
}

/** Pearl-pink embossed wax seal. */
export function WaxSeal({ className = "", label }: { className?: string; label?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#ece4dd" />
          <stop offset="1" stopColor="#d9cec6" />
        </radialGradient>
      </defs>
      <path
        d="M40 4 C50 2 58 8 64 14 C72 18 78 28 76 38 C80 48 74 60 66 66 C60 74 48 78 40 76 C30 80 20 74 14 66 C6 60 2 48 4 40 C0 30 6 20 14 14 C20 6 30 2 40 4 Z"
        fill={`url(#${id})`}
        stroke="#cdbfb5"
        strokeWidth="0.8"
      />
      <circle cx="40" cy="40" r="26" fill="none" stroke="#fff" strokeWidth="1" opacity="0.7" />
      <circle cx="40" cy="40" r="24" fill="none" stroke="#cdbfb5" strokeWidth="0.6" opacity="0.7" />
      {label ? (
        <text x="40" y="47" textAnchor="middle" fontSize="20" fill="#9c8a82" fontFamily="var(--font-pinyon-script), cursive">
          {label}
        </text>
      ) : (
        <>
          <path d="M40 54 C 38 44, 38 36, 40 26 C 42 36, 42 44, 40 54" fill="none" stroke="#a8978e" strokeWidth="1.2" />
          <path d="M40 46 C 34 44, 31 40, 31 35 M40 46 C 46 44, 49 40, 49 35 M40 38 C 35 36, 33 33, 33 29 M40 38 C 45 36, 47 33, 47 29" fill="none" stroke="#a8978e" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gold/50" />
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" opacity="0.8" />
      </svg>
      <span className="h-px w-14 bg-gold/50" />
    </div>
  );
}

/** Pampas-print lining for the envelope flap. */
export function LinerPattern({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 300 150" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={id} width="46" height="46" patternUnits="userSpaceOnUse">
          <path d="M23 40 C 21 30, 21 20, 23 8" stroke="#bcc3a2" strokeWidth="0.8" fill="none" />
          <path d="M23 30 C 15 28, 12 24, 12 18 M23 24 C 31 22, 34 18, 34 12 M23 16 C 17 14, 15 10, 15 6" stroke="#bcc3a2" strokeWidth="0.8" fill="none" />
          <circle cx="23" cy="6" r="2.5" fill="#e6cfb8" />
          <circle cx="36" cy="38" r="3.5" fill="#f1e1cc" stroke="#d9c3aa" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="300" height="150" fill="#f6f1ec" />
      <rect width="300" height="150" fill={`url(#${id})`} opacity="0.9" />
    </svg>
  );
}
