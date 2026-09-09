import SectionHead from "@/components/ui/SectionHead";
import Timelapse from "@/components/devices/Timelapse";
import Process from "@/components/service/Process";
import { HOME_SECTIONS } from "@/lib/constants";

/**
 * Watch it happen (docs/DESIGN.md 7.1.5): the owner's real timelapse in a
 * 9:16 card in columns 1 to 4 (392 by 697 at 1440, plus the colour bar and
 * the caption) with the numbered process in columns 6 to 12 aligned to its
 * top. The Timelapse device carries its own caption ("12 seconds, real
 * footage"); Loop shows the poster first, mounts the video only on screen
 * and never under reduced motion or data saver. No lede. At 390 the card is
 * full width (350 by 622) and the process follows it.
 */
export default function WatchIt() {
  const copy = HOME_SECTIONS.watch;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead title={copy.h2} id={`${copy.id}-title`} />
        <div className="grid-12 mt-10 lg:mt-12">
          <Timelapse className="lg:col-span-4 lg:col-start-1 lg:self-start" />
          <Process className="mt-10 lg:col-span-7 lg:col-start-6 lg:mt-0 lg:self-start" />
        </div>
      </div>
    </section>
  );
}
