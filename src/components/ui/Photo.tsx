import Image from "next/image";
import type { GalleryImage } from "@/config/types";

/** Framed photograph with a fine gold border. Fills its parent's aspect ratio. */
export function Photo({
  image,
  className = "",
  priority = false,
  sizes = "(min-width: 768px) 40vw, 90vw",
}: {
  image: GalleryImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-blush ring-1 ring-gold/40 ring-offset-4 ring-offset-ivory ${className}`}>
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
  );
}
