import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SetStepper from "@/components/devices/SetStepper";
import { HOME_SECTIONS, SETS, WORK } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Recent work (docs/DESIGN.md 7.1.8): two walk-around sets you step through,
 * the Corvette in columns 1 to 6 and the TRX in 7 to 12, each a 1:1 frame
 * (600 by 600 at 1440) with a counter, the frame's label and two round
 * controls beneath; stacked at 390 (350 by 350). Click, tap on the frame and
 * the arrow keys step with a 240 ms crossfade. Without JavaScript each set
 * lays out as a two column grid of every frame. The count in the action is
 * WORK.length, never typed.
 */
export default function RecentWork() {
  const copy = HOME_SECTIONS.recent;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead
          title={copy.h2}
          id={`${copy.id}-title`}
          action={
            <Button variant="text" href={copy.href}>
              {copy.linkLabel(WORK.length)}
            </Button>
          }
        />
        <div className="grid-12 mt-10 lg:mt-12">
          {SETS.map((set, i) => (
            <SetStepper
              key={set.id}
              set={set}
              className={cn(i > 0 && "mt-10 lg:mt-0", i === 0 ? "lg:col-span-6 lg:col-start-1" : "lg:col-span-6 lg:col-start-7")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
