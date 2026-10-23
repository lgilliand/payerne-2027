import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("photos");

export default function PhotosPage() {
  return <PageIntro slug="photos" />;
}
