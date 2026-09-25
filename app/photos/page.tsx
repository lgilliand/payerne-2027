import type { Metadata } from "next";
import Block from "@/components/Block";

export const metadata: Metadata = { title: "Photos" };

export default function PhotosPage() {
  return (
    <>
      <Block headingLevel={1} title="Photos" text="Les galeries photos seront publiées ici." />
    </>
  );
}
