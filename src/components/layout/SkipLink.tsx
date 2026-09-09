/**
 * "Skip to content": the first thing Tab reaches on every page. Parked above
 * the viewport by a transform until focused, then a 48px green button with
 * ink text pinned top left above the fixed header (z-50) and the menu sheet
 * (z-49). Built from utilities only: the unlayered .btn and .sr-only rules in
 * globals.css would beat a plain utility, so neither is used here. The text
 * colour takes the important form because the unlayered `a { color: inherit }`
 * reset beats a plain layered utility. Targets <main id="main" tabIndex={-1}>.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-3 top-3 z-[60] inline-flex h-12 -translate-y-[calc(100%+16px)] items-center rounded-[4px] bg-green px-[22px] text-[15px] font-semibold text-ink! focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}
