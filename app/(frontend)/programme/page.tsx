import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("programme");

export default function ProgrammePage() {
  return <PageIntro slug="programme" />;
}
