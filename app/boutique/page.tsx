import type { Metadata } from "next";
import Block from "@/components/Block";

export const metadata: Metadata = { title: "Boutique" };

export default function BoutiquePage() {
  return (
    <>
      <Block headingLevel={1} title="Boutique" text="Les articles officiels du Giron de la Broye 2027 seront bientôt disponibles." />
    </>
  );
}
