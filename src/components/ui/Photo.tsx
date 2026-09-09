import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

interface PhotoProps {
  src: string; // path under /public, e.g. "/photos/gwagon.webp"
  alt: string;
  width: number;
  height: number;
  className?: string; // sizing + aspect classes for the frame
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}

/** Plain <img> in a 2px-radius frame. Static export, so no next/image. */
export default function Photo({ src, alt, width, height, className, imgClassName, priority }: PhotoProps) {
  return (
    <div className={cn("photo", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={imgClassName}
      />
    </div>
  );
}
