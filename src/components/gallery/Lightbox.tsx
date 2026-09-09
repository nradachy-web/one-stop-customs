"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import { asset } from "@/lib/asset";
import Ground from "@/components/ui/Ground";
import ChipStrip from "@/components/devices/ChipStrip";
import { LIGHTBOX, type WorkPhoto } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface LightboxProps {
  /** The photos the viewer can step through (the gallery passes the visible, filtered list). */
  photos: readonly WorkPhoto[];
  /** Position in `photos`, or null while closed. */
  index: number | null;
  onClose: () => void;
  /** Step by delta; the parent wraps around. */
  onStep: (delta: number) => void;
}

/** A horizontal swipe counts from this many pixels, and only when it is more sideways than up or down. */
const SWIPE = 40;

/** The crossfade on step (docs/DESIGN.md 3.2, lightbox): 200 ms on opacity, the site's ease-out curve. */
const FADE_MS = 200;
const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";

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
 * The lightbox (docs/DESIGN.md 5.8): a native dialog opened with showModal,
 * so focus, Escape and the inert page behind it are the browser's own. The
 * backdrop is black at 96 percent and the dialog fades in over 200 ms
 * (globals .lightbox); the dialog is .on-black so the chip strip and the
 * outline buttons take their black variants. Inside: the photo in a card
 * with the full chip strip beneath it at the photo's width, then the control
 * row: Previous and Next as round outline buttons at left, the counter in
 * mono ash as a live region in the middle, Close at right. Arrow keys, Home,
 * End and a horizontal swipe move; Escape, a backdrop click and Close close.
 * Body scroll is locked by body:has(.lightbox[open]) in globals.
 *
 * Crossfade on step (the choice BUILD_PLAN_V2.md asks to document): the
 * incoming photo is rendered in flow over the outgoing one, which sits
 * absolutely beneath it at full opacity, and the incoming fades in from 0
 * to 1 over 200 ms through the Web Animations API, started in a layout
 * effect so the first painted frame is already at opacity 0. The double
 * render costs no extra fetch: the outgoing file is the one that was just on
 * screen, so it comes from cache, and the incoming has to be fetched either
 * way. The outgoing is dropped once the fade has finished. The fade runs only
 * when the head gate set data-motion (reduced motion gets a hard cut, and
 * without JavaScript the dialog never opens; a gallery card is then a plain
 * link to its file).
 *
 * The dialog element is always in the DOM (closed) so the ref is stable; its
 * content renders only while a photo is open, so the page never fetches a
 * second copy of every file. The satin ground (docs/DESIGN.md 10.5) is always
 * rendered as the dialog's first child; the closed dialog has no box, so its
 * lazy image is not fetched until the dialog opens. It drifts behind the
 * photo at 0.24 so the enlarged car sits on the hero's material; the
 * backdrop stays 96 percent black.
 */
export default function Lightbox({ photos, index, onClose, onStep }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const incomingRef = useRef<HTMLImageElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const photo = index !== null ? photos[index] : undefined;
  const open = photo !== undefined;
  const current = photo ?? null;

  // The photo the previous render showed, and the one still fading out
  // beneath the current one. Adjusted during render when the prop changes
  // (the React pattern for state that follows a prop), so the first commit
  // of a new photo already carries its outgoing partner.
  const [shown, setShown] = useState<WorkPhoto | null>(null);
  const [outgoing, setOutgoing] = useState<WorkPhoto | null>(null);
  if (current?.id !== shown?.id) {
    setShown(current);
    setOutgoing(current && shown && current.id !== shown.id ? shown : null);
  }

  // Open and close the native dialog to follow the parent's state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Escape (the native cancel) and any other close end in the dialog's close
  // event, so listening there keeps the parent's state honest for every path.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // The crossfade. Runs before paint so the incoming image never flashes at
  // full opacity; the outgoing is released once the fade is over.
  useLayoutEffect(() => {
    if (!outgoing) return;
    const img = incomingRef.current;
    const motion = document.documentElement.dataset.motion === "on";
    const fade =
      img && motion && typeof img.animate === "function"
        ? img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: FADE_MS, easing: EASE_OUT, fill: "both" })
        : null;
    const timer = window.setTimeout(() => setOutgoing(null), fade ? FADE_MS + 40 : 0);
    return () => {
      fade?.cancel();
      window.clearTimeout(timer);
    };
  }, [outgoing, current]);

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (index === null) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onStep(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onStep(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      onStep(-index);
    } else if (e.key === "End") {
      e.preventDefault();
      onStep(photos.length - 1 - index);
    }
  };

  // A click on the backdrop (anything outside the content block) closes.
  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    const content = contentRef.current;
    if (!content || !content.contains(e.target as Node)) onClose();
  };

  const onTouchStart = (e: TouchEvent<HTMLDialogElement>) => {
    const t = e.touches[0];
    touchRef.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDialogElement>) => {
    const start = touchRef.current;
    const t = e.changedTouches[0];
    touchRef.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE || Math.abs(dx) <= Math.abs(dy)) return;
    onStep(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox on-black ground"
      aria-label={LIGHTBOX.label}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* The satin ground runs the whole viewport behind the photo; globals exempts its image from
          the .lightbox img cap (.lightbox .ground-media img). */}
      <Ground id="lightbox" />
      {photo && index !== null && (
        <div ref={contentRef} className="flex min-h-0 w-full max-w-[1328px] flex-col items-center gap-4">
          {/* The photo in its card; the strip beneath takes the photo's width. The
              height cap leaves room for the strip, the control row and the padding. */}
          <figure className="card min-h-0 w-fit max-w-full">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={photo.id}
                ref={incomingRef}
                src={asset(photo.src)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="eager"
                decoding="async"
                className="relative z-10 max-h-[calc(100svh-12rem)]!"
              />
              {outgoing ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset(outgoing.src)}
                  alt=""
                  width={outgoing.width}
                  height={outgoing.height}
                  loading="eager"
                  decoding="async"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 h-full! w-full! max-h-none!"
                />
              ) : null}
            </div>
            <ChipStrip chip={photo.chip} label={photo.label} setting={photo.setting} />
          </figure>

          <div className="flex w-full max-w-[44rem] items-center justify-between gap-4">
            <div className="flex gap-2">
              <button type="button" className="btn btn-outline btn-round" onClick={() => onStep(-1)} aria-label={LIGHTBOX.previous}>
                <Chevron />
              </button>
              <button type="button" className="btn btn-outline btn-round" onClick={() => onStep(1)} aria-label={LIGHTBOX.next}>
                <Chevron flip />
              </button>
            </div>
            <p className="t-mono muted m-0" role="status" aria-live="polite">
              {LIGHTBOX.counter(index + 1, photos.length)}
            </p>
            <button ref={closeRef} type="button" className="btn btn-outline" onClick={onClose}>
              {LIGHTBOX.close}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
