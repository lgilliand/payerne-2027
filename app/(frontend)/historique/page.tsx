import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("historique");

export default function HistoriquePage() {
  return <PageIntro slug="historique" />;
}
