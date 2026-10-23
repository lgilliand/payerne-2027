import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPage, type PageSlug } from "@/lib/cms";
import Block from "./Block";

// Bloc du haut d'une page, avec le titre et le texte saisis dans /admin
export default async function PageIntro({ slug }: { slug: Exclude<PageSlug, "accueil"> }) {
  const page = await getPage(slug);
  return (
    <Block headingLevel={1} title={page.title} text={<RichText data={page.intro} disableContainer />} />
  );
}
