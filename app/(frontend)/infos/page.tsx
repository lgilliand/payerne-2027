import type { Metadata } from "next";
import Block from "@/components/Block";

export const metadata: Metadata = { title: "Infos générales" };

export default function InfosPage() {
  return (
    <>
      <Block headingLevel={1} title="Infos générales" text="Accès, horaires, plan du site et informations pratiques." />
    </>
  );
}
