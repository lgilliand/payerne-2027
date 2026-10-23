import ContactForm from "@/components/ContactForm";
import PageIntro from "@/components/PageIntro";
import { pageMetadata } from "@/lib/cms";

export const generateMetadata = () => pageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <PageIntro slug="contact" />
      <ContactForm />
    </>
  );
}
