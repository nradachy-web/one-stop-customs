import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityTemplate from "@/components/service/CityTemplate";
import { CITIES, CITY_BY_SLUG, CITY_COPY } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

/** Twelve folders in out/wraps-and-tint/, one per CITIES entry. Nothing else is ever generated. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) return {};
  return pageMeta({ title: CITY_COPY.title(city), description: CITY_COPY.description(city), path: CITY_COPY.path(city) });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();
  return <CityTemplate city={city} />;
}
