import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("sponsors");

export default function SponsorsPage() {
  return <PageIntro slug="sponsors" />;
}
