"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

/**
 * Water on bare paint versus coated paint. First built for the Jake's Car
 * Detailing site; brought here at Ricky's request (October 2026), recolored
 * to this site's neutral blacks and set in the same frame as the tint preview.
 *
 * A small particle model of one behaviour: how water sits on the panel.
 *  - Coated: water pulls into tight round beads. Once a bead gathers enough
 *    water it lets go, rolls down the panel and takes the beads in its path
 *    with it. The panel ends up nearly dry.
 *  - Bare: water flattens into wide patches that join into sheets, creep down
 *    slowly and leave a wet film behind them that takes its time drying.
 *
 * The panel rinses itself once when it scrolls into view and again whenever
 * the visitor switches surface, presses the button, or drags across it.
 * It is an illustration and is captioned as one.
 */

type Mode = "bare" | "coated";

interface Drop {
  x: number;
  y: number;
  r: number; // amount of water, as a radius
  vy: number;
  ph: number; // phase for a little side-to-side wander
  flat: number; // 0..1, how far a bare-paint drop has spread
  grip: number; // how much water this bead holds before it lets go (coated)
  sq: number; // slight squash, so beads are not all perfect circles
  left: number; // distance rolled since it last shed a droplet
}

const CAP = 760;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One bead, drawn once at a large size and scaled for every drop. */
function beadSprite(size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const m = size / 2;
  const r = size * 0.36;
  // Contact shadow, down and to the right of the light.
  const sh = g.createRadialGradient(m + r * 0.16, m + r * 0.24, r * 0.5, m + r * 0.16, m + r * 0.24, r * 1.28);
  sh.addColorStop(0, "rgba(0,0,0,0.6)");
  sh.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = sh;
  g.fillRect(0, 0, size, size);
  // Body: clear water over dark paint, darker toward the rim.
  const body = g.createRadialGradient(m - r * 0.3, m - r * 0.36, r * 0.05, m, m, r);
  body.addColorStop(0, "rgba(196,204,214,0.5)");
  body.addColorStop(0.5, "rgba(72,78,86,0.55)");
  body.addColorStop(0.9, "rgba(10,11,13,0.9)");
  body.addColorStop(1, "rgba(206,213,221,0.55)");
  g.fillStyle = body;
  g.beginPath();
  g.arc(m, m, r, 0, Math.PI * 2);
  g.fill();
  // Light gathered on the far side of the bead.
  g.save();
  g.translate(m + r * 0.3, m + r * 0.36);
  g.rotate(-0.7);
  const ca = g.createRadialGradient(0, 0, 0, 0, 0, r * 0.5);
  ca.addColorStop(0, "rgba(218,224,231,0.75)");
  ca.addColorStop(1, "rgba(190,198,208,0)");
  g.fillStyle = ca;
  g.scale(1, 0.55);
  g.beginPath();
  g.arc(0, 0, r * 0.5, 0, Math.PI * 2);
  g.fill();
  g.restore();
  // The lamp, reflected.
  g.save();
  g.translate(m - r * 0.36, m - r * 0.42);
  g.rotate(-0.6);
  g.scale(1, 0.62);
  g.fillStyle = "rgba(255,255,255,0.96)";
  g.beginPath();
  g.arc(0, 0, r * 0.24, 0, Math.PI * 2);
  g.fill();
  g.restore();
  return c;
}

/** A soft dot, used to stamp water into the film layer on bare paint. */
function dotSprite(size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  if (!g) return c;
  const m = size / 2;
  const fill = g.createRadialGradient(m, m, 0, m, m, m);
  fill.addColorStop(0, "rgba(255,255,255,1)");
  fill.addColorStop(0.55, "rgba(255,255,255,0.8)");
  fill.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = fill;
  g.fillRect(0, 0, size, size);
  return c;
}

// The film layer runs below the panel's size: it is read back every frame to
// find the edge of the water, and it is meant to look soft.
const FILM = 1.5;
const WET = 112; // wetness above which the paint shows as wet

function BeadPanel({ mode, rinse, label }: { mode: Mode; rinse: number; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  const api = useRef<{ rinse: () => void; reset: () => void }>({ rinse: () => {}, reset: () => {} });
  const first = useRef(true);

  useEffect(() => {
    modeRef.current = mode;
    if (first.current) return;
    api.current.reset();
    api.current.rinse();
  }, [mode]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    api.current.rinse();
  }, [rinse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rand = rng(321);
    const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;
    let W = 1;
    let H = 1;
    let dpr = 1;
    let scale = 1; // drop sizes follow the panel width a little
    let drops: Drop[] = [];
    let film: HTMLCanvasElement | null = null; // where water is right now (alpha only)
    let sheet: HTMLCanvasElement | null = null; // the wet film, drawn as water
    let wet = new Float32Array(0); // how wet each film pixel is, 0..255. It dries over time.
    let fw = 1;
    let fh = 1;
    let bead: HTMLCanvasElement | null = null;
    let dot: HTMLCanvasElement | null = null;
    let sprayFrom = 0;
    let sprayTo = 0;
    let clock = 0; // simulation time, seconds
    const pointer = { x: 0, y: 0, on: false };
    let visible = false;
    let seen = false;
    let raf = 0;
    let last = 0;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      scale = Math.max(0.6, Math.min(1.35, W / 900));
      fw = Math.max(1, Math.round(W / FILM));
      fh = Math.max(1, Math.round(H / FILM));
      film = document.createElement("canvas");
      sheet = document.createElement("canvas");
      film.width = sheet.width = fw;
      film.height = sheet.height = fh;
      wet = new Float32Array(fw * fh);
      bead = beadSprite(Math.round(112 * dpr));
      dot = dotSprite(64);
    };

    const shown = (d: Drop, coated: boolean) => (coated ? d.r : d.r * (1 + 0.95 * d.flat));
    // Beads differ: most let go early, some cling until they are large. That is
    // what leaves a mix of sizes sitting on the panel after a rinse.
    const fresh = (x: number, y: number, r: number): Drop => ({
      x,
      y,
      r,
      vy: 0,
      ph: rand() * 6.283,
      flat: 0,
      grip: 0.8 + Math.pow(rand(), 2.2) * 1.5,
      sq: 0.92 + rand() * 0.16,
      left: 0,
    });

    const addWater = (x: number, y: number, r: number, coated: boolean) => {
      const cap = (coated ? 22 : 30) * scale;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const reach = shown(d, coated) * 0.92;
        const dx = d.x - x;
        const dy = d.y - y;
        if (dx * dx + dy * dy < reach * reach) {
          d.r = Math.min(cap, Math.sqrt(d.r * d.r + r * r));
          return;
        }
      }
      if (drops.length < CAP) drops.push(fresh(x, y, r));
    };

    const step = (dt: number) => {
      clock += dt;
      const coated = modeRef.current === "coated";
      const letGo = (coated ? 7.6 : 12) * scale; // size at which a drop starts to move
      const cap = (coated ? 22 : 30) * scale;

      if (clock < sprayTo) {
        const p = (clock - sprayFrom) / (sprayTo - sprayFrom);
        const sx = W * (-0.06 + 1.12 * p);
        const n = coated ? 10 : 4;
        for (let k = 0; k < n; k++) {
          const r = (coated ? 3 + rand() * 4.4 : 3.4 + rand() * 4.6) * scale;
          addWater(sx + gauss() * W * 0.075, H * (0.03 + rand() * 0.9), r, coated);
        }
      }
      if (pointer.on) {
        for (let k = 0; k < 2; k++) {
          const r = (coated ? 2.8 + rand() * 4.2 : 3.6 + rand() * 4.6) * scale;
          addWater(pointer.x + gauss() * 30 * scale, pointer.y + gauss() * 30 * scale, r, coated);
        }
      }

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        if (!coated) d.flat = Math.min(1, d.flat + dt * 1.7);
        if (d.r > letGo * (coated ? d.grip : 1)) {
          if (coated) {
            d.vy += (620 + d.r * 70) * dt;
            d.vy *= 0.993;
            // A rolling bead sheds small droplets behind it now and then.
            d.left += d.vy * dt;
            if (d.left > (46 + d.ph * 9) * scale && drops.length < CAP) {
              d.left = 0;
              const rr = (1.4 + rand() * 2.4) * scale;
              const kid = fresh(d.x + gauss() * d.r * 0.5, d.y - d.r - rr - 2, rr);
              kid.grip = 9; // it stays where it was left
              drops.push(kid);
            }
          } else {
            const target = 12 + (d.r - letGo) * 3;
            d.vy += (target - d.vy) * Math.min(1, dt * 2.2);
          }
          d.y += d.vy * dt;
          d.x += Math.sin(d.ph + d.y * 0.045) * (coated ? 0.55 : 0.2);
        } else {
          d.vy = 0;
        }
      }

      // Drops that touch join. On a coating, beads that are sitting still keep to themselves.
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        if (a.r <= 0) continue;
        const aMoving = a.r > letGo * (coated ? a.grip : 1);
        const ra = shown(a, coated);
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          if (b.r <= 0) continue;
          if (coated && !aMoving && b.r <= letGo * b.grip) continue;
          const reach = (ra + shown(b, coated)) * (coated ? 0.84 : 0.7);
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy > reach * reach) continue;
          const big = a.r >= b.r ? a : b;
          const small = big === a ? b : a;
          const total = Math.sqrt(a.r * a.r + b.r * b.r);
          big.vy = Math.max(a.vy, b.vy);
          big.r = Math.min(cap, total);
          big.grip = Math.min(big.grip, 2.3); // a shed droplet that grows can roll again
          small.r = 0;
          if (small === a) break;
        }
      }
      drops = drops.filter((d) => d.r > 0 && d.y - shown(d, coated) < H + 4);
    };

    // Bare paint only. Wherever water sits or passes, the panel is wet, and a
    // wet patch dries slowly from its thin edges inward.
    const soak = (dt: number) => {
      if (modeRef.current === "coated" || !film || !dot) return;
      const f = film.getContext("2d", { willReadFrequently: true });
      if (!f) return;
      f.clearRect(0, 0, fw, fh);
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const R = (shown(d, false) * 1.32) / FILM;
        f.drawImage(dot, d.x / FILM - R, d.y / FILM - R * 1.08, R * 2, R * 2.16);
      }
      const now = f.getImageData(0, 0, fw, fh).data;
      const dry = dt * 21;
      for (let i = 0, p = 3; i < wet.length; i++, p += 4) {
        const v = wet[i] - dry;
        const here = now[p];
        wet[i] = here > v ? here : v > 0 ? v : 0;
      }
    };

    const draw = () => {
      const coated = modeRef.current === "coated";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const base = ctx.createLinearGradient(0, 0, 0, H);
      base.addColorStop(0, "#17181a");
      base.addColorStop(0.55, "#0b0c0d");
      base.addColorStop(1, "#040405");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      // A soft light across the panel. Sharper on the coated surface.
      ctx.save();
      ctx.translate(W * 0.26, -H * 0.1);
      ctx.rotate(0.42);
      const band = ctx.createLinearGradient(0, 0, W * 0.34, 0);
      const peak = coated ? 0.17 : 0.09;
      band.addColorStop(0, "rgba(190,198,208,0)");
      band.addColorStop(coated ? 0.42 : 0.3, `rgba(190,198,208,${peak * 0.5})`);
      band.addColorStop(0.5, `rgba(226,231,237,${peak})`);
      band.addColorStop(coated ? 0.58 : 0.7, `rgba(190,198,208,${peak * 0.5})`);
      band.addColorStop(1, "rgba(190,198,208,0)");
      ctx.fillStyle = band;
      ctx.fillRect(0, -H, W * 0.34, H * 3);
      ctx.restore();

      if (!coated && sheet) {
        // Draw the wet film as water: a faint body and a brighter line where it ends.
        const o = sheet.getContext("2d");
        if (o) {
          const out = o.createImageData(fw, fh);
          const w = out.data;
          const off = fw * 2 + 2; // two film pixels down and to the right
          const last = wet.length - 1;
          for (let i = 0, p = 0; i < wet.length; i++, p += 4) {
            const v = wet[i];
            if (v <= WET - 22) continue;
            const t = v >= WET + 22 ? 1 : (v - (WET - 22)) / 44;
            const body = t * t * (3 - 2 * t);
            // The lamp is up and to the left. Where the film's edge faces it the
            // edge catches light; on the far side it throws a thin shadow.
            const toward = wet[i - off < 0 ? 0 : i - off];
            const away = wet[i + off > last ? last : i + off];
            let lit = ((away - toward) / 255) * 2.6;
            lit = lit > 1 ? 1 : lit < -1 ? -1 : lit;
            if (lit > 0.04) {
              w[p] = 232;
              w[p + 1] = 236;
              w[p + 2] = 241;
              w[p + 3] = body * (30 + lit * 150);
            } else if (lit < -0.04) {
              w[p] = 8;
              w[p + 1] = 9;
              w[p + 2] = 11;
              w[p + 3] = body * (30 - lit * 120);
            } else {
              w[p] = 186;
              w[p + 1] = 194;
              w[p + 2] = 204;
              w[p + 3] = body * 30;
            }
          }
          o.putImageData(out, 0, 0);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(sheet, 0, 0, W, H);
        }
      }

      if (coated && bead) {
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          const s = d.r / 0.36; // the bead is 36% of its sprite, as a radius
          // A rolling bead stretches a little along its path.
          const stretch = (1 + Math.min(0.35, d.vy / 1400)) / d.sq;
          const wide = s * d.sq;
          ctx.drawImage(bead, d.x - wide / 2, d.y - (s * stretch) / 2, wide, s * stretch);
        }
      }

      const vig = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.4, W / 2, H / 2, Math.max(W, H) * 0.78);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    const busy = () => clock < sprayTo + 0.2 || pointer.on || drops.some((d) => d.vy > 0.5);

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      step(dt);
      soak(dt);
      draw();
      // Keep going while water is moving. On bare paint the film keeps drying for a while after.
      const drying = modeRef.current === "bare" && clock < sprayTo + 14;
      if (visible && (busy() || drying)) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const rinse = () => {
      sprayFrom = clock;
      sprayTo = clock + 1.7;
      if (reduce.matches) {
        // No animation: work the rinse through and show where the water ends up.
        for (let i = 0; i < 60 * 5; i++) step(1 / 60);
        soak(0);
        draw();
        return;
      }
      start();
    };
    const reset = () => {
      drops = [];
      wet.fill(0);
      draw();
    };
    api.current = { rinse, reset };

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onDown = (e: PointerEvent) => {
      if (reduce.matches) return;
      pointer.on = true;
      local(e);
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!pointer.on && e.pointerType !== "mouse") return;
      if (reduce.matches) return;
      // A mouse sprays while it moves over the panel; touch sprays while pressed.
      pointer.on = true;
      local(e);
      start();
    };
    const onUp = () => {
      pointer.on = false;
    };

    size();
    draw();
    const ro = new ResizeObserver(() => {
      size();
      drops = [];
      draw();
      if (seen) rinse();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !seen) {
          seen = true;
          rinse();
        } else if (visible) {
          start();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(canvas);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      api.current = { rinse: () => {}, reset: () => {} };
    };
  }, []);

  return (
    <div className="viz__stage paintstage">
      <canvas ref={canvasRef} role="img" aria-label={label} />
    </div>
  );
}

const SURFACES: { value: Mode; label: string; sub: string; note: string }[] = [
  {
    value: "bare",
    label: "Bare paint",
    sub: "No coating",
    note: "On bare paint, water lies flat, joins into sheets and clings. It creeps off slowly and dries where it sits.",
  },
  {
    value: "coated",
    label: "Coated",
    sub: "Ceramic",
    note: "On a coated panel, water pulls into tight beads. Once a bead is heavy enough it rolls away and takes the ones in its path with it.",
  },
];

export default function BeadDemo({ ctaHref = "#quote" }: { ctaHref?: string }) {
  const [mode, setMode] = useState<Mode>("coated");
  const [rinse, setRinse] = useState(0);
  const current = SURFACES.find((s) => s.value === mode) ?? SURFACES[1];

  return (
    <figure className="viz">
      <BeadPanel
        mode={mode}
        rinse={rinse}
        label={`Illustration of water on a black paint panel. Surface shown: ${current.label}. ${current.note}`}
      />
      <div className="viz__controls">
        <p className="label">Pick the surface, then drag across the panel to spray it</p>
        <div className="viz__chips paint__chips" role="group" aria-label="Paint surface">
          {SURFACES.map((s) => (
            <button key={s.value} type="button" className="viz__chip" aria-pressed={s.value === mode} onClick={() => setMode(s.value)}>
              <strong>{s.label}</strong>
              <span>{s.sub}</span>
            </button>
          ))}
          <button type="button" className="viz__chip" onClick={() => setRinse((n) => n + 1)}>
            <strong>Rinse again</strong>
            <span>Run the water</span>
          </button>
        </div>
        <p className="paint__note" aria-live="polite">
          {current.note}
        </p>
        <div className="viz__foot">
          <figcaption className="viz__note">
            Illustration of how water behaves on bare and coated paint. Not a photo, and not a test of a specific product.
          </figcaption>
          <Button href={ctaHref}>Get a coating quote</Button>
        </div>
      </div>
    </figure>
  );
}
