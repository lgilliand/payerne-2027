import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("histoire");

export default function HistoirePage() {
  return <PageIntro slug="histoire" />;
}
