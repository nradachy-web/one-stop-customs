import Loop from "@/components/ui/Loop";
import SwatchCard from "@/components/devices/SwatchCard";
import { TIMELAPSE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TimelapseProps {
  className?: string;
}

/**
 * The one thing on the site that moves on its own (docs/DESIGN.md 3.3): the
 * owner's real timelapse in a 9:16 swatch card. Loop renders the poster as the
 * real content first, mounts the video only on screen, and never mounts it at
 * all under prefers-reduced-motion or data saver. The chip label says driveway
 * because that is where it was shot.
 */
export default function Timelapse({ className }: TimelapseProps) {
  return (
    <div className={cn("w-full", className)}>
      <SwatchCard
        photo={TIMELAPSE}
        aspect="9/16"
        media={
          <Loop
            src={TIMELAPSE.src}
            poster={TIMELAPSE.poster}
            alt={TIMELAPSE.alt}
            width={TIMELAPSE.width}
            height={TIMELAPSE.height}
            frame={false}
            className="h-full w-full"
          />
        }
      />
      <p className="t-small muted mt-3">{TIMELAPSE.caption}</p>
    </div>
  );
}
