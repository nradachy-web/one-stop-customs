"use client";

import { useEffect, useRef } from "react";

/**
 * A panel of black paint under an inspection light. First built for the
 * Jake's Car Detailing site; brought here at Ricky's request (October 2026)
 * and recolored to this site's neutral blacks.
 *
 * Swirl marks are thousands of fine, randomly curved scratches. Each one only
 * shows where it runs across the line back to the light, which is why they
 * appear as a halo of circles around a light and move with it. This draws
 * exactly that: every scratch segment is lit by how square it sits to the
 * light, falling off with distance.
 *
 * `level` is how corrected the paint is, 0 (as it arrived) to 1 (finished).
 * Deep scratches outlast shallow ones, and the light's own reflection tightens
 * from a haze to a clean point as the level rises.
 *
 * It is an illustration and is always captioned as one by the caller.
 */

interface Props {
  level: number;
  label: string;
}

// Small seeded generator so the panel looks the same on every visit.
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

const SEGS_PER_ARC = 6;
const BUCKETS = 6;

export default function PaintPanel({ level, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetLevel = useRef(level);
  const wake = useRef<() => void>(() => {});

  useEffect(() => {
    targetLevel.current = level;
    wake.current();
  }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let W = 0;
    let H = 0;
    let dpr = 1;
    let seg = new Float32Array(0); // x, y, dx, dy, half length, depth
    let count = 0;
    let flakes: HTMLCanvasElement | null = null;
    let mask: HTMLCanvasElement | null = null; // scratch canvas for the flake disc

    // Light position, in CSS pixels. `to` is where it is heading.
    const light = { x: 0, y: 0, tx: 0, ty: 0 };
    let cur = targetLevel.current;
    let pointerOn = false;
    let visible = false;
    let raf = 0;
    let t0 = performance.now();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      const rand = rng(8823);
      const arcs = Math.round((W * H) / 105);
      count = arcs * SEGS_PER_ARC;
      seg = new Float32Array(count * 6);
      let k = 0;
      for (let i = 0; i < arcs; i++) {
        // Wash marks are loose circular strokes: random centre, random radius.
        const r = 14 + Math.pow(rand(), 1.7) * Math.min(W, H) * 0.42;
        const cx = -40 + rand() * (W + 80);
        const cy = -40 + rand() * (H + 80);
        const a0 = rand() * Math.PI * 2;
        const sweep = 0.35 + rand() * 0.9;
        // Most scratches are shallow. A few are deep and take the longest to remove.
        const depth = Math.pow(rand(), 0.75);
        const step = sweep / SEGS_PER_ARC;
        for (let s = 0; s < SEGS_PER_ARC; s++) {
          const a = a0 + step * (s + 0.5);
          const ca = Math.cos(a);
          const sa = Math.sin(a);
          seg[k++] = cx + r * ca;
          seg[k++] = cy + r * sa;
          seg[k++] = -sa;
          seg[k++] = ca;
          seg[k++] = (r * step) / 2 + 0.6;
          seg[k++] = depth;
        }
      }

      // Metallic flake, drawn once and reused.
      flakes = document.createElement("canvas");
      flakes.width = canvas.width;
      flakes.height = canvas.height;
      const f = flakes.getContext("2d");
      if (f) {
        const n = Math.round((W * H) / 26);
        for (let i = 0; i < n; i++) {
          const v = rand();
          f.fillStyle = `rgba(${196 + Math.round(v * 59)},${202 + Math.round(v * 53)},${210 + Math.round(v * 45)},${0.05 + rand() * 0.3})`;
          const size = rand() < 0.08 ? 1.6 * dpr : dpr;
          f.fillRect(rand() * canvas.width, rand() * canvas.height, size, size);
        }
      }

      mask = document.createElement("canvas");
      mask.width = mask.height = Math.ceil(Math.min(W, H) * 0.62 * 1.9 * dpr);

      if (!light.x && !light.y) {
        light.x = light.tx = W * 0.6;
        light.y = light.ty = H * 0.42;
      }
    };

    const paths: Path2D[] = [];

    const draw = () => {
      const lx = light.x;
      const ly = light.y;
      const clean = cur; // 0 swirled .. 1 corrected
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      // Paint: gloss black, a touch lighter toward the top like a hood under sky.
      const base = ctx.createLinearGradient(0, 0, 0, H);
      base.addColorStop(0, "#161718");
      base.addColorStop(0.55, "#0b0c0d");
      base.addColorStop(1, "#040405");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      const reach = Math.min(W, H) * 0.62;

      // Glow of the lamp in the clear coat. Hazy on worn paint, tight on corrected.
      const bloomR = reach * (1.15 - 0.45 * clean);
      const bloom = ctx.createRadialGradient(lx, ly, 0, lx, ly, bloomR);
      bloom.addColorStop(0, `rgba(214,221,229,${0.26 - 0.12 * clean})`);
      bloom.addColorStop(0.4, `rgba(140,148,158,${0.1 - 0.05 * clean})`);
      bloom.addColorStop(1, "rgba(60,64,70,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W, H);

      // Corrected paint has depth: a wide, even pool of light under the lamp
      // that swirled paint scatters away.
      if (clean > 0.02) {
        const depth = ctx.createRadialGradient(lx, ly, 0, lx, ly, reach * 1.7);
        depth.addColorStop(0, `rgba(150,158,168,${0.16 * clean})`);
        depth.addColorStop(0.35, `rgba(90,96,104,${0.09 * clean})`);
        depth.addColorStop(1, "rgba(30,32,36,0)");
        ctx.fillStyle = depth;
        ctx.fillRect(0, 0, W, H);
      }

      // Flake sparkles near the light: the flake layer, masked to a soft disc.
      if (flakes && mask) {
        const size = mask.width;
        const sx = Math.round(lx * dpr - size / 2);
        const sy = Math.round(ly * dpr - size / 2);
        const m = mask.getContext("2d");
        if (m) {
          m.globalCompositeOperation = "source-over";
          m.clearRect(0, 0, size, size);
          m.drawImage(flakes, -sx, -sy);
          m.globalCompositeOperation = "destination-in";
          const g = m.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
          g.addColorStop(0, "rgba(0,0,0,1)");
          g.addColorStop(0.4, "rgba(0,0,0,0.7)");
          g.addColorStop(1, "rgba(0,0,0,0)");
          m.fillStyle = g;
          m.fillRect(0, 0, size, size);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.globalAlpha = 0.55 + 0.4 * clean;
          ctx.drawImage(mask, sx, sy);
          ctx.globalAlpha = 1;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
      }

      // Scratches. Sorted into brightness buckets so each is one stroke call.
      for (let b = 0; b < BUCKETS; b++) paths[b] = new Path2D();
      const cutoff = clean * 1.06;
      const reach2 = reach * reach;
      for (let i = 0; i < count; i++) {
        const o = i * 6;
        const depth = seg[o + 5];
        const left = depth - cutoff;
        if (left <= 0) continue;
        const vx = seg[o] - lx;
        const vy = seg[o + 1] - ly;
        const d2 = vx * vx + vy * vy;
        if (d2 > reach2 || d2 < 16) continue;
        const dist = Math.sqrt(d2);
        // 1 when the scratch runs square to the line from the light.
        const square = Math.abs(seg[o + 2] * vy - seg[o + 3] * vx) / dist;
        const s2 = square * square;
        const s8 = s2 * s2 * s2 * s2;
        const fall = 1 - dist / reach;
        const power = s8 * s8 * fall * fall * Math.min(1, left * 3.2) * (0.55 + depth * 0.6);
        if (power < 0.035) continue;
        const b = Math.min(BUCKETS - 1, Math.floor(power * BUCKETS));
        const hl = seg[o + 4];
        const p = paths[b];
        p.moveTo(seg[o] - seg[o + 2] * hl, seg[o + 1] - seg[o + 3] * hl);
        p.lineTo(seg[o] + seg[o + 2] * hl, seg[o + 1] + seg[o + 3] * hl);
      }
      ctx.lineCap = "round";
      for (let b = 0; b < BUCKETS; b++) {
        const a = (b + 0.6) / BUCKETS;
        ctx.strokeStyle = `rgba(232,236,240,${0.1 + a * 0.62})`;
        ctx.lineWidth = 0.55 + a * 0.55;
        ctx.stroke(paths[b]);
      }

      // The lamp itself, reflected: a soft blob on swirled paint, a hard point when clean.
      // Sized to the panel, so a phone does not get a lamp a quarter of its height.
      const k = Math.max(0.42, Math.min(1.15, Math.min(W, H) / 560));

      if (clean > 0.02) {
        // The lamp's long reflection: only clear paint holds a line this sharp.
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(-0.2);
        const len = reach * 1.5;
        const streak = ctx.createLinearGradient(-len, 0, len, 0);
        streak.addColorStop(0, "rgba(200,206,214,0)");
        streak.addColorStop(0.5, `rgba(238,241,245,${0.55 * clean})`);
        streak.addColorStop(1, "rgba(200,206,214,0)");
        ctx.fillStyle = streak;
        ctx.fillRect(-len, -1.1 * k, len * 2, 2.2 * k);
        const soft = ctx.createLinearGradient(-len * 0.7, 0, len * 0.7, 0);
        soft.addColorStop(0, "rgba(170,178,188,0)");
        soft.addColorStop(0.5, `rgba(170,178,188,${0.14 * clean})`);
        soft.addColorStop(1, "rgba(170,178,188,0)");
        ctx.fillStyle = soft;
        ctx.fillRect(-len * 0.7, -7 * k, len * 1.4, 14 * k);
        ctx.restore();
        // A fine halo ring around the lamp.
        ctx.strokeStyle = `rgba(222,227,233,${0.3 * clean})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(lx, ly, (20 + 22 * clean) * k * 1.9, 0, Math.PI * 2);
        ctx.stroke();
      }

      const coreR = (46 - 26 * clean) * k;
      const core = ctx.createRadialGradient(lx, ly, 0, lx, ly, coreR);
      core.addColorStop(0, "rgba(255,255,255,1)");
      core.addColorStop(0.18 + 0.52 * clean, `rgba(244,246,248,${0.75 + 0.25 * clean})`);
      core.addColorStop(1, "rgba(200,206,214,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(lx, ly, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Edge falloff.
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!pointerOn && !reduce.matches) {
        // Idle: the lamp drifts in a slow figure of eight.
        const t = (now - t0) / 1000;
        light.tx = W * (0.5 + 0.27 * Math.sin(t * 0.42));
        light.ty = H * (0.47 + 0.2 * Math.sin(t * 0.84 + 0.6));
      }
      const ease = reduce.matches ? 1 : 0.11;
      light.x += (light.tx - light.x) * ease;
      light.y += (light.ty - light.y) * ease;
      cur += (targetLevel.current - cur) * (reduce.matches ? 1 : 0.07);
      draw();
      const settled =
        Math.abs(light.tx - light.x) < 0.3 && Math.abs(light.ty - light.y) < 0.3 && Math.abs(targetLevel.current - cur) < 0.002;
      // Keep running while visible, unless reduced motion has nothing left to settle.
      if (visible && !(reduce.matches && settled)) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };
    wake.current = start;

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      light.tx = Math.max(0, Math.min(W, e.clientX - rect.left));
      light.ty = Math.max(0, Math.min(H, e.clientY - rect.top));
    };
    const onMove = (e: PointerEvent) => {
      pointerOn = true;
      toLocal(e);
      start();
    };
    const onLeave = () => {
      pointerOn = false;
      t0 = performance.now() - 2000;
      start();
    };

    build();
    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      wake.current = () => {};
    };
  }, []);

  return (
    <div className="viz__stage paintstage">
      <canvas ref={canvasRef} role="img" aria-label={label} />
    </div>
  );
}
