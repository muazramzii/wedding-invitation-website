import Image from "next/image";
import type { GalleryImage } from "@/config/types";

/** Instant-photo frame. Width is set by the parent; rotation via `tilt` (degrees). */
export function Polaroid({
  image,
  tilt = 0,
  className = "",
  priority = false,
  sizes = "40vw",
  caption,
}: {
  image: GalleryImage;
  tilt?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
}) {
  return (
    <div
      className={`bg-[#fffafc] p-[6%] pb-[16%] shadow-[0_10px_22px_-8px_rgba(110,70,90,0.5)] ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-blush">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={image.src.endsWith(".svg")}
          className="object-cover"
        />
      </div>
      {caption && <p className="mt-2 text-center font-accent text-lg leading-none text-ink">{caption}</p>}
    </div>
  );
}
