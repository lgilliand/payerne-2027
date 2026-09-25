import type { Metadata } from "next";
import Block from "@/components/Block";

export const metadata: Metadata = { title: "Bénévoles" };

export default function BenevolesPage() {
  return (
    <>
      <Block headingLevel={1} title="Bénévoles" text="Informations et inscription pour les bénévoles à venir." />
    </>
  );
}
