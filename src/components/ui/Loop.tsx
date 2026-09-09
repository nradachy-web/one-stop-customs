"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

interface LoopProps {
  /** silent mp4 under /public, e.g. "/video/hero-foam.mp4" */
  src: string;
  /** the still it was made from, under /public; always rendered, always the fallback */
  poster: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  /** frame classes (sizing, aspect) */
  className?: string;
  /** applied to BOTH the img and the video (object-position, masks) */
  mediaClassName?: string;
  /** wrap in the .photo frame (2px radius, graphite ground). Off for the hero. */
  frame?: boolean;
}

const REDUCE = "(prefers-reduced-motion: reduce)";

/** navigator.connection where the browser has it (Chromium); it fires "change" when data saver flips. */
function connection() {
  return (navigator as Navigator & { connection?: Partial<EventTarget> & { saveData?: boolean } }).connection;
}

/**
 * True when the visitor has not asked for reduced motion and is not on data saver. Server: false.
 * Both inputs are live: flipping either setting while the page is open unmounts the video.
 */
function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE);
  const conn = connection();
  mq.addEventListener("change", onChange);
  conn?.addEventListener?.("change", onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    conn?.removeEventListener?.("change", onChange);
  };
}
function motionAllowed() {
  return !window.matchMedia(REDUCE).matches && !connection()?.saveData;
}
const motionOnServer = () => false;

/**
 * Loop: a photo that quietly comes alive. The <img> is the real content (alt,
 * dimensions, LCP); a muted, looping, inline video generated from that same
 * photo fades in over it once it can play. The video is decorative and hidden
 * from assistive tech.
 *
 * It is never rendered at all when the visitor prefers reduced motion or has
 * data saver on, plays only while on screen, and pauses in background tabs.
 *
 * The poster always wins the network and the LCP: the video is not mounted
 * until the poster has loaded and decoded (so the clip never shares the pipe
 * with the LCP image), below-the-fold clips fetch nothing until they are on
 * screen (preload none), and the video is clipped 1px inside the poster's box
 * so Chrome can never rank it as the larger LCP candidate.
 */
export default function Loop({ src, poster, alt, width, height, priority, className, mediaClassName, frame = true }: LoopProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enabled = useSyncExternalStore(subscribeMotion, motionAllowed, motionOnServer);
  const [posterReady, setPosterReady] = useState(false);
  const [ready, setReady] = useState(false);
  const show = enabled && posterReady;

  // Arm the clip only once the poster has loaded and decoded. Waiting on the load
  // event first (not decode() alone) keeps a lazy poster from being fetched early.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let cancelled = false;
    const arm = () => {
      if (!cancelled) setPosterReady(true);
    };
    const loaded = img.complete
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
    loaded.then(() => img.decode()).then(arm, arm);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    const host = hostRef.current;
    if (!v || !host) return;
    let onScreen = false;

    const play = () => {
      if (!onScreen || document.hidden) return;
      v.muted = true;
      v.defaultMuted = true;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) play();
        else v.pause();
      },
      { threshold: 0.12 }
    );
    io.observe(host);
    const onVisibility = () => (document.hidden ? v.pause() : play());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      // the video is unmounting; if motion comes back it should fade in again, not appear at full opacity
      setReady(false);
    };
  }, [show]);

  return (
    <div ref={hostRef} className={cn(frame && "photo", "relative", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={asset(poster)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn("h-full w-full object-cover", mediaClassName)}
      />
      {show && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          // the hero clip may buffer as soon as it mounts (the poster is already in); every other
          // clip fetches nothing until the observer calls play(), and the 1s fade covers that latency
          preload={priority ? "auto" : "none"}
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setReady(true)}
          // clip-path keeps the video 1px inside the poster's box without rescaling it: on a
          // fractional-height band (62svh) Chrome measures the img with a snapped height and the
          // video with the exact one, so an unclipped video reads as the larger LCP candidate and
          // takes the LCP from the poster. The 1px rim shows the identical poster underneath.
          className={cn(
            "absolute inset-0 h-full w-full object-cover [clip-path:inset(1px)] transition-opacity duration-1000 ease-out",
            ready ? "opacity-100" : "opacity-0",
            mediaClassName
          )}
        >
          <source src={asset(src)} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
