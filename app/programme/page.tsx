import type { Metadata } from "next";
import Block from "@/components/Block";

export const metadata: Metadata = { title: "Programme" };

export default function ProgrammePage() {
  return (
    <>
      <Block headingLevel={1} title="Programme" text="Le programme détaillé sera publié prochainement." />
    </>
  );
}
