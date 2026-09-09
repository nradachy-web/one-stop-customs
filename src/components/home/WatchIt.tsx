import SectionHead from "@/components/ui/SectionHead";
import Timelapse from "@/components/devices/Timelapse";
import Process from "@/components/service/Process";
import { HOME_SECTIONS } from "@/lib/constants";

/**
 * How it goes (docs/DESIGN.md 7.1.5): the owner's real timelapse in a 9:16
 * swatch card (columns 3 to 6, about 430 by 765 at lg plus the strip) with
 * the numbered process in columns 8 to 12 aligned to the card's top. The
 * Timelapse device carries its own caption; Loop shows the poster first and
 * never mounts the video under reduced motion or data saver. No lede.
 */
export default function WatchIt() {
  const copy = HOME_SECTIONS.watch;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} id={`${copy.id}-title`} />
        <div className="grid-12">
          <Timelapse className="mt-10 lg:col-span-4 lg:col-start-3 lg:mt-12 lg:self-start" />
          <Process className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-12 lg:self-start" />
        </div>
      </div>
    </section>
  );
}
