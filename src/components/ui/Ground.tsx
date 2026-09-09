import type { CSSProperties } from "react";
import { asset } from "@/lib/asset";
import { AI_ASSETS, GROUNDS, type GroundFade, type GroundId } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GroundProps {
  id: GroundId;
  /** Eager with low fetch priority. The home hero only. */
  priority?: boolean;
  /** Visibility helpers only (.under-lg, .only-lg), on the layer, never on the image. */
  className?: string;
}

/** The mask span variables for one fade, with the defaults filled in when `complete` (the under lg override replaces the whole fade). */
function fadeVars(fade: GroundFade | undefined, suffix: string, complete: boolean): Record<string, string> {
  const v: Record<string, string> = {};
  const set = (name: string, value: string | undefined, fallback: string) => {
    if (value) v[`--${name}${suffix}`] = value;
    else if (complete) v[`--${name}${suffix}`] = fallback;
  };
  set("gl0", fade?.leftFrom, "0%");
  set("gl", fade?.left, "0%");
  set("gr", fade?.right, "100%");
  set("gt0", fade?.topFrom, "0%");
  set("gt", fade?.top, "0%");
  set("gb", fade?.bottom, "100%");
  return v;
}

/**
 * A decorative ground (docs/DESIGN.md 10): the first child of a host that
 * carries .ground. Renders .ground-media with the preset's variables inline
 * and the file inside through asset(). alt is empty, the layer is hidden from
 * assistive tech, nothing is captioned. Complete with JavaScript off.
 *
 * A preset's `small` block writes the same variables with an `-sm` suffix;
 * globals.css reads those under lg and falls back to the lg values. `flip`
 * mirrors the picture element (not the image, so the drift keeps its own
 * transform).
 */
export default function Ground({ id, priority = false, className }: GroundProps) {
  const g = GROUNDS[id];
  const a = AI_ASSETS[g.asset];
  const tall = g.tall ? AI_ASSETS[g.tall] : null;
  const style = {
    "--ground-opacity": g.opacity,
    "--ground-pos": g.position,
    ...fadeVars(g.fade, "", false),
    ...(g.height ? { "--ground-h": g.height } : {}),
    ...(g.driftSeconds ? { "--drift-s": `${g.driftSeconds}s` } : {}),
    ...(g.small?.opacity !== undefined ? { "--ground-opacity-sm": g.small.opacity } : {}),
    ...(g.small?.position ? { "--ground-pos-sm": g.small.position } : {}),
    ...(g.small?.height ? { "--ground-h-sm": g.small.height } : {}),
    ...(g.small?.fade ? fadeVars(g.small.fade, "-sm", true) : {}),
  } as CSSProperties;
  return (
    <div className={cn("ground-media", g.anchor === "bottom" && "ground-media-b", className)} style={style} aria-hidden="true">
      <picture className={cn(g.flip && "ground-flip")}>
        {tall ? <source media="(max-width: 63.99rem)" srcSet={asset(tall.src)} width={tall.width} height={tall.height} /> : null}
        <img
          src={asset(a.src)}
          alt=""
          width={a.width}
          height={a.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "low" : undefined}
          draggable={false}
          className={cn(g.drift && "ground-drift")}
        />
      </picture>
    </div>
  );
}
