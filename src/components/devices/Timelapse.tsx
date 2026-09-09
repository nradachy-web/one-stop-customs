import Loop from "@/components/ui/Loop";
import SwatchCard from "@/components/devices/SwatchCard";
import { TIMELAPSE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TimelapseProps {
  className?: string;
}

/**
 * The one living photo (docs/DESIGN.md 3.4): the owner's real timelapse in a
 * 9:16 card. Loop renders the poster as the real content first, mounts the
 * video only on screen, and never mounts it at all under
 * prefers-reduced-motion or data saver. The colour bar and label say
 * driveway because that is where it was shot; the caption beneath says
 * 12 seconds, real footage.
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
      <p className="t-label mt-3">{TIMELAPSE.caption}</p>
    </div>
  );
}
