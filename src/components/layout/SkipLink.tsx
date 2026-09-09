/**
 * "Skip to content": the first thing Tab reaches on every page. Visually
 * hidden until focused, then a 44px paper tab at the top left with the
 * global signal focus ring. Targets <main id="main" tabIndex={-1}>.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="t-small sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:inline-flex focus:h-11 focus:items-center focus:border focus:border-ink focus:bg-paper focus:px-4 focus:text-ink"
    >
      Skip to content
    </a>
  );
}
