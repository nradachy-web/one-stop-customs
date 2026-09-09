import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { SERVICE_PAGES } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

const spec = SERVICE_PAGES.powder;

export const metadata = pageMeta({ title: spec.metaTitle, description: spec.metaDescription, path: spec.path });

export default function Page() {
  return <ServicePageTemplate spec={spec} />;
}
