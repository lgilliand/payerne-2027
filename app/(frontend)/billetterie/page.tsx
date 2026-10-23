import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("billetterie");

export default function BilletteriePage() {
  return <PageIntro slug="billetterie" />;
}
