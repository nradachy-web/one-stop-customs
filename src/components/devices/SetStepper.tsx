"use client";

import { useId, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { asset } from "@/lib/asset";
import { photo, SETS, STEPPER } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SetStepperProps {
  /** One of SETS: the frames of a walk-around set that share a 1:1 box. */
  set: (typeof SETS)[number];
  className?: string;
}

const noopSubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/** A 16px chevron, 1.5px stroke. Points left by default; `flip` points right. */
function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(flip && "-scale-x-100")}
    >
      <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The walk-around set stepper (docs/DESIGN.md 4.5): one 1:1 frame holding a
 * set's frames stacked, the active one at full opacity, and a control row
 * beneath: the counter in mono ash, the frame's label, and two round
 * Previous and Next buttons. Click or tap on the frame advances; the left
 * and right arrow keys step while the frame or a control has focus; both
 * ends wrap. The crossfade is 240 ms on opacity, in globals.css.
 *
 * Without JavaScript `.set` lays the frames out as a two column grid inside
 * the bordered box, all visible, and the controls (`.js-only`) are absent.
 * The `.set` class sits on the frame element itself so that grid rule wraps
 * the slides, not the frame and its control row. The server render is that
 * complete state; `live` flips after mount to make the frame focusable.
 */
export default function SetStepper({ set, className }: SetStepperProps) {
  const frames = set.photoIds.map((id) => photo(id));
  const count = frames.length;
  const [index, setIndex] = useState(0);
  // `live` is false in the server render and during hydration, true after:
  // the frame becomes a focusable button only once the client is in charge.
  const live = useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot);
  const liveId = useId();
  const current = frames[index];
  const groupLabel = STEPPER.groupLabel(frames[0].label);

  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIndex(count - 1);
    }
  };

  return (
    <div
      className={cn("w-full", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={groupLabel}
      onKeyDown={onKeyDown}
    >
      <div
        className="set set-frame"
        onClick={live ? () => step(1) : undefined}
        onKeyDown={
          live
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  step(1);
                }
              }
            : undefined
        }
        tabIndex={live ? 0 : undefined}
        role={live ? "button" : undefined}
        aria-label={live ? STEPPER.next : undefined}
        aria-describedby={live ? liveId : undefined}
      >
        {frames.map((p, i) => {
          const isActive = i === index;
          return (
            <div key={p.id} className="set-slide" data-active={isActive ? "true" : "false"} aria-hidden={live && !isActive}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(p.src)}
                alt={p.alt}
                width={p.width}
                height={p.height}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                style={{ objectPosition: p.position ?? "50% 50%" }}
              />
            </div>
          );
        })}
      </div>

      <div className="set-ctrl js-only">
        <span className="set-counter">{STEPPER.counter(index + 1, count)}</span>
        <span className="t-chip muted min-w-0 flex-1 truncate">{current.label}</span>
        <div className="set-buttons">
          <button type="button" className="btn btn-outline btn-round" onClick={() => step(-1)} aria-label={STEPPER.previous}>
            <Chevron />
          </button>
          <button type="button" className="btn btn-outline btn-round" onClick={() => step(1)} aria-label={STEPPER.next}>
            <Chevron flip />
          </button>
        </div>
      </div>
      <span id={liveId} className="sr-only" aria-live="polite">
        {STEPPER.frameLabel(index + 1, count)}
      </span>
    </div>
  );
}
