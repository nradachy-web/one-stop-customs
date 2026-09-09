"use client";

import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import { asset } from "@/lib/asset";
import ChipStrip from "@/components/devices/ChipStrip";
import type { WorkPhoto } from "@/lib/constants";

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

/**
 * The lightbox (docs/DESIGN.md 5.19): a native dialog opened with showModal,
 * so focus, Escape and the inert page behind it are the browser's own. The
 * backdrop is black at 92 percent (globals .lightbox::backdrop); the dialog
 * itself is .on-black so the chip strip and the outline buttons take their
 * black variants. Next and previous are hard cuts, the counter is a live
 * region, and body scroll is locked by body:has(.lightbox[open]).
 *
 * The dialog element is always in the DOM (closed) so the ref is stable; its
 * content renders only while a photo is open, so the page never fetches a
 * second copy of every file.
 */
export default function Lightbox({ photos, index, onClose, onStep }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const photo = index !== null ? photos[index] : undefined;
  const open = photo !== undefined;

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

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onStep(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onStep(-1);
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
      className="lightbox on-black"
      aria-label="Photo viewer"
      onKeyDown={onKeyDown}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {photo && index !== null && (
        <div ref={contentRef} className="flex min-h-0 w-full max-w-[1328px] flex-col items-center gap-4">
          {/* The photo in its card, black variant. Height leaves room for the strip, caption, counter and buttons. */}
          <figure className="card min-h-0 w-fit max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={photo.id}
              src={asset(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="eager"
              decoding="async"
              className="max-h-[calc(100svh-15rem)]!"
            />
            <ChipStrip chip={photo.chip} label={photo.label} setting={photo.setting} />
          </figure>

          <div className="flex flex-col items-center gap-1 text-center">
            {/* The alt text, printed. Hidden from assistive tech because the img already carries it. */}
            <p className="t-small muted max-w-[44rem]" aria-hidden="true">
              {photo.alt}
            </p>
            <p className="t-label" role="status" aria-live="polite">
              {index + 1} / {photos.length}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className="btn btn-outline" onClick={() => onStep(-1)}>
              Previous
            </button>
            <button type="button" className="btn btn-outline" onClick={() => onStep(1)}>
              Next
            </button>
            <button ref={closeRef} type="button" className="btn btn-outline" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
