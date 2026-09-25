import type { Metadata } from "next";
import Block from "@/components/Block";

export const metadata: Metadata = { title: "Sponsors" };

export default function SponsorsPage() {
  return (
    <>
      <Block headingLevel={1} title="Sponsors" text="Merci à nos partenaires et sponsors." />
    </>
  );
}
