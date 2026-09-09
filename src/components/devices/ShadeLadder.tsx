import type { CSSProperties } from "react";
import Photo from "@/components/ui/Photo";
import ShadeSlider from "@/components/devices/ShadeSlider";
import { photo, SHADES, SHADE_LEGAL, SHADE_SCENE_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ShadeLadderProps {
  /** Adds the sixth pane with the native range input (the tint page). */
  slider?: boolean;
  /** A WORK id. Defaults to SHADE_SCENE_ID. */
  scenePhotoId?: string;
  className?: string;
}

/**
 * The shade ladder (docs/DESIGN.md 5.10): five panes over the same crop with
 * pure black overlays at the opacities in SHADES, labelled in mono. No
 * percentages anywhere until Ricky confirms which shades he stocks. Five
 * across from md (six with the slider), two per row under md. The legal line
 * renders once beneath; sections that use the ladder must not repeat it.
 * Pure markup and CSS: complete at first paint, with or without JavaScript.
 */
export default function ShadeLadder({ slider = false, scenePhotoId = SHADE_SCENE_ID, className }: ShadeLadderProps) {
  const scene = photo(scenePhotoId);
  const position = scene.position ?? "50% 50%";

  return (
    <div className={cn("w-full", className)}>
      <ul className="ladder" style={{ "--panes": slider ? 6 : 5 } as CSSProperties}>
        {SHADES.map((shade, i) => (
          <li key={shade.label}>
            <div className="pane">
              <div className="pane-photo" style={{ "--shade": shade.opacity, "--pos": position } as CSSProperties}>
                <Photo
                  src={scene.src}
                  alt={i === 0 ? scene.alt : ""}
                  width={scene.width}
                  height={scene.height}
                  className="h-full w-full"
                  imgClassName="[object-position:var(--pos)]"
                />
                <span className="pane-overlay" aria-hidden="true" />
              </div>
              <span className="pane-label">{shade.label}</span>
            </div>
          </li>
        ))}
        {slider && (
          <li>
            <ShadeSlider photo={scene} />
          </li>
        )}
      </ul>
      <p className="t-small muted mt-4">{SHADE_LEGAL}</p>
    </div>
  );
}
