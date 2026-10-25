// Generates the demo placeholder "photographs" (SVG) and a soft demo audio loop (WAV).
// Replace the files in /public/images and /public/audio with real media for a real wedding.
import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("public/images", { recursive: true });
mkdirSync("public/audio", { recursive: true });

const palettes = [
  ["#f4eee8", "#e3d6c9", "#b9a48f"],
  ["#f3e9d8", "#e1cfae", "#b8934e"],
  ["#ece6df", "#d4c6b8", "#9c8a82"],
  ["#f6f0ea", "#e6d8cc", "#c0a58f"],
  ["#eef0e6", "#d3dac3", "#8a9a7b"],
  ["#f2ebe4", "#ddcbb9", "#a98f7a"],
];

function photo(name, w, h, p, seed) {
  const r = (n) => ((Math.sin(seed * 999 + n * 77) + 1) / 2);
  const blobs = Array.from({ length: 5 }, (_, i) => {
    const cx = Math.round(r(i) * w);
    const cy = Math.round(r(i + 9) * h);
    const rad = Math.round(w * (0.25 + r(i + 3) * 0.3));
    return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${p[i % 3]}" opacity="0.55"/>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient>
<filter id="b"><feGaussianBlur stdDeviation="${Math.round(w / 12)}"/></filter></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/><g filter="url(#b)">${blobs}</g>
<path d="M${w * 0.5} ${h * 0.92} C ${w * 0.35} ${h * 0.7}, ${w * 0.35} ${h * 0.45}, ${w * 0.5} ${h * 0.32} C ${w * 0.65} ${h * 0.45}, ${w * 0.65} ${h * 0.7}, ${w * 0.5} ${h * 0.92} Z" fill="${p[2]}" opacity="0.18"/>
<circle cx="${w * 0.5}" cy="${h * 0.26}" r="${w * 0.09}" fill="${p[2]}" opacity="0.2"/>
</svg>`;
  writeFileSync(`public/images/${name}.svg`, svg);
}

photo("hero", 900, 1200, palettes[0], 1);
photo("collage-1", 600, 800, palettes[1], 2);
photo("collage-2", 800, 600, palettes[2], 3);
photo("collage-3", 600, 800, palettes[3], 4);
palettes.forEach((p, i) => photo(`gallery-${i + 1}`, i % 3 === 1 ? 800 : 600, i % 3 === 1 ? 600 : 800, p, i + 10));

// Gentle looping pad: slow chord progression of soft sine tones, 24s, 16-bit mono 16 kHz.
const sr = 16000;
const chords = [
  [261.63, 329.63, 392.0],
  [220.0, 261.63, 329.63],
  [174.61, 220.0, 261.63],
  [196.0, 246.94, 293.66],
];
const per = 6;
const total = sr * per * chords.length;
const pcm = new Int16Array(total);
for (let i = 0; i < total; i++) {
  const t = i / sr;
  const ci = Math.floor(t / per) % chords.length;
  const local = t - ci * per;
  const env = Math.min(1, local / 1.5) * Math.min(1, (per - local) / 1.5);
  let s = 0;
  for (const f of chords[ci]) s += Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * f * 2 * t);
  pcm[i] = Math.round((s / 4.5) * env * 0.5 * 32767);
}
const buf = Buffer.alloc(44 + pcm.length * 2);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + pcm.length * 2, 4); buf.write("WAVEfmt ", 8);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
buf.writeUInt32LE(sr, 24); buf.writeUInt32LE(sr * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
buf.write("data", 36); buf.writeUInt32LE(pcm.length * 2, 40);
Buffer.from(pcm.buffer).copy(buf, 44);
writeFileSync("public/audio/lullaby.wav", buf);
console.log("assets generated");
