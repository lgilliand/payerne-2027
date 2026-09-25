import type { Metadata } from "next";
import Block from "@/components/Block";

export const metadata: Metadata = { title: "Billetterie" };

export default function BilletteriePage() {
  return (
    <>
      <Block headingLevel={1} title="Billetterie" text="La billetterie ouvrira prochainement." />
    </>
  );
}
