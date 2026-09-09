import type { CSSProperties } from "react";
import Photo from "@/components/ui/Photo";
import ShadeSlider from "@/components/devices/ShadeSlider";
import { photo, SHADES, SHADE_LEGAL, SHADE_SCENE_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ShadeLadderProps {
  /** Renders the slider pane above the ladder (the tint page passes false and places its own slider). */
  slider?: boolean;
  /** A WORK id. Defaults to SHADE_SCENE_ID. */
  scenePhotoId?: string;
  className?: string;
}

/**
 * The shade ladder (docs/DESIGN.md 4.3 and 7.2.2): five 4:5 panes over the
 * same crop with pure black overlays at the opacities in SHADES, labelled in
 * mono. No percentages anywhere until Ricky confirms which shades he stocks.
 * Five across from md, three per row under md (globals.css). With `slider`
 * the slider pane comes first at the full width of its column, 24px above
 * the ladder. The legal line renders once beneath; a section that places its
 * own slider and legal line passes `slider={false}` and must not repeat it.
 * Pure markup and CSS: complete at first paint, with or without JavaScript.
 */
export default function ShadeLadder({ slider = false, scenePhotoId = SHADE_SCENE_ID, className }: ShadeLadderProps) {
  const scene = photo(scenePhotoId);
  const position = scene.position ?? "50% 50%";

  return (
    <div className={cn("w-full", className)}>
      {slider && <ShadeSlider photo={scene} className="mb-6" />}
      <ul className="ladder" role="list" style={{ "--panes": SHADES.length } as CSSProperties}>
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
      </ul>
      <p className="t-small muted mt-4">{SHADE_LEGAL}</p>
    </div>
  );
}
