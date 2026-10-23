import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("infos");

export default function InfosPage() {
  return <PageIntro slug="infos" />;
}
