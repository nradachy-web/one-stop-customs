"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/**
 * Suds: a handful of soap bubbles drifting up a dark section. First built for
 * the Bubbles Auto Spa site; brought here at Ricky's request (October 2026)
 * for the detailing hero, with the blue tint taken out. They are pushed
 * aside by the pointer and pop when tapped or clicked. Canvas 2D, no deps.
 *
 * Rules: only over a dark hero; never on a light band. Renders nothing at all
 * with prefers-reduced-motion. Animates only while the host is on screen and the
 * tab is visible. The canvas ignores pointer events itself; it listens on the
 * host, so links and buttons underneath keep working.
 *
 * Host must be position: relative (the section) so the canvas can fill it.
 */

interface Bubble {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  wob: number;
  wobSpeed: number;
  alpha: number;
}

interface Drop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
}

interface Props {
  /** bubbles per 100,000 px² of host area (default 2.2) */
  density?: number;
  /** hard cap regardless of area (default 22) */
  max?: number;
  className?: string;
}

const TAU = Math.PI * 2;
const REACH = 150; // px, pointer influence radius
const REDUCE = "(prefers-reduced-motion: reduce)";

/** True when the visitor has not asked for reduced motion. Server: false, so the canvas is added on the client only. */
function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const motionAllowed = () => !window.matchMedia(REDUCE).matches;
const motionOnServer = () => false;

export default function Suds({ density = 2.2, max = 22, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const enabled = useSyncExternalStore(subscribeMotion, motionAllowed, motionOnServer);

  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 1;
    let h = 1;
    let bubbles: Bubble[] = [];
    let drops: Drop[] = [];
    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, active: false, t: 0 };
    let raf = 0;
    let running = false;
    let onScreen = false;
    let last = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (fromBottom: boolean): Bubble => {
      const r = rand(5, 22);
      return {
        x: rand(r, Math.max(r + 1, w - r)),
        y: fromBottom ? h + r + rand(0, h * 0.35) : rand(0, h),
        r,
        vx: 0,
        vy: -(14 + r * 0.9),
        wob: rand(0, TAU),
        wobSpeed: rand(0.5, 1.3),
        alpha: fromBottom ? 0 : 1,
      };
    };

    const targetCount = () => Math.min(max, Math.max(6, Math.round(((w * h) / 100000) * density)));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = targetCount();
      if (bubbles.length < n) {
        while (bubbles.length < n) bubbles.push(spawn(false));
      } else {
        bubbles.length = n;
      }
    };

    const drawBubble = (b: Bubble) => {
      const { x, y, r } = b;
      const a = b.alpha;
      // body: barely there, with a white rim
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fillStyle = `rgba(255,255,255,${0.05 * a})`;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255,255,255,${0.42 * a})`;
      ctx.stroke();
      // inner highlight arc, top left, where the shop lights would catch it
      ctx.beginPath();
      ctx.arc(x, y, r * 0.7, Math.PI * 1.08, Math.PI * 1.62);
      ctx.lineWidth = Math.max(1, r * 0.13);
      ctx.lineCap = "round";
      ctx.strokeStyle = `rgba(255,255,255,${0.55 * a})`;
      ctx.stroke();
      // specular dot
      ctx.beginPath();
      ctx.arc(x - r * 0.36, y - r * 0.4, Math.max(1, r * 0.13), 0, TAU);
      ctx.fillStyle = `rgba(255,255,255,${0.8 * a})`;
      ctx.fill();
    };

    const draw = (t: number) => {
      if (!running) return;
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016);
      last = t;
      ctx.clearRect(0, 0, w, h);
      pointer.vx *= 0.9;
      pointer.vy *= 0.9;

      for (const b of bubbles) {
        b.wob += b.wobSpeed * dt;
        b.alpha = Math.min(1, b.alpha + dt * 0.8);

        if (pointer.active) {
          const dx = b.x - pointer.x;
          const dy = b.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REACH * REACH) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / REACH;
            b.vx += (dx / d) * f * 320 * dt + pointer.vx * f * 0.12;
            b.vy += (dy / d) * f * 320 * dt + pointer.vy * f * 0.12;
          }
        }

        // settle back toward the slow upward drift
        b.vx *= 1 - 1.6 * dt;
        const baseVy = -(14 + b.r * 0.9);
        b.vy += (baseVy - b.vy) * 1.1 * dt;
        b.x += (b.vx + Math.sin(b.wob) * 9) * dt;
        b.y += b.vy * dt;

        if (b.y < -b.r * 2 || b.x < -b.r * 3 || b.x > w + b.r * 3) Object.assign(b, spawn(true));
        drawBubble(b);
      }

      if (drops.length) {
        drops = drops.filter((d) => d.life > 0);
        for (const d of drops) {
          d.life -= dt * 2.4;
          d.vy += 320 * dt;
          d.x += d.vx * dt;
          d.y += d.vy * dt;
          ctx.globalAlpha = Math.max(0, d.life);
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, TAU);
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || !onScreen || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const pop = (px: number, py: number) => {
      let best = -1;
      let bestD = Infinity;
      bubbles.forEach((b, i) => {
        const d = Math.hypot(b.x - px, b.y - py);
        if (d < b.r + 16 && d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best < 0) return;
      const b = bubbles[best];
      const n = 6 + Math.round(b.r / 4);
      for (let i = 0; i < n; i++) {
        const ang = rand(0, TAU);
        const sp = rand(40, 150);
        drops.push({
          x: b.x + Math.cos(ang) * b.r * 0.6,
          y: b.y + Math.sin(ang) * b.r * 0.6,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 40,
          r: rand(1, 2.6),
          life: 1,
        });
      }
      Object.assign(b, spawn(true));
    };

    const toLocal = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = toLocal(e);
      const now = performance.now();
      const dtp = pointer.t ? Math.max(0.008, (now - pointer.t) / 1000) : 0.016;
      if (pointer.active) {
        pointer.vx = Math.max(-1200, Math.min(1200, (x - pointer.x) / dtp));
        pointer.vy = Math.max(-1200, Math.min(1200, (y - pointer.y) / dtp));
      }
      pointer.x = x;
      pointer.y = y;
      pointer.t = now;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.vx = 0;
      pointer.vy = 0;
    };
    const onDown = (e: PointerEvent) => {
      const { x, y } = toLocal(e);
      pop(x, y);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0.02 }
    );
    io.observe(host);

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointercancel", onLeave);
    host.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointercancel", onLeave);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, density, max]);

  // nothing at all with prefers-reduced-motion: no canvas in the DOM, not just no animation
  if (!enabled) return null;

  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
