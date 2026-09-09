import { pageMeta } from "@/lib/seo";
import { HOME_TITLE, SEO } from "@/lib/constants";
import Hero from "@/components/home/Hero";
import Finishes from "@/components/home/Finishes";
import TintCompare from "@/components/home/TintCompare";
import Ppf from "@/components/home/Ppf";
import WatchIt from "@/components/home/WatchIt";
import Fleet from "@/components/home/Fleet";
import PowderCoat from "@/components/home/PowderCoat";
import RecentWork from "@/components/home/RecentWork";
import Reviews from "@/components/sections/Reviews";
import QuoteSection from "@/components/home/QuoteSection";

export const metadata = pageMeta({ title: HOME_TITLE, description: SEO.home.description, path: "/" });

/**
 * The home page (docs/DESIGN.md 7.1): ten leaves of the sample book on one
 * sheet of paper, in this order, then the footer from the layout. Every
 * section carries its tab slug as its id.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Finishes />
      <TintCompare />
      <Ppf />
      <WatchIt />
      <Fleet />
      <PowderCoat />
      <RecentWork />
      <Reviews count={4} />
      <QuoteSection />
    </>
  );
}
