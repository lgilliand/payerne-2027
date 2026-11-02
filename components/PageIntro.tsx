import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getPage, type PageSlug } from "@/lib/cms";
import Block from "./Block";

/**
 * Texte du bloc du haut, s'il y en a un : un champ vidé dans l'éditeur garde un paragraphe vide,
 * qui ne doit pas laisser d'espace sous le titre.
 */
export function introText(intro: SerializedEditorState | null | undefined) {
  const isEmpty =
    !intro ||
    intro.root.children.every(
      (node) => node.type === "paragraph" && !("children" in node && Array.isArray(node.children) && node.children.length),
    );
  return isEmpty ? undefined : <RichText data={intro} disableContainer />;
}

// Bloc du haut d'une page, avec le titre et le texte saisis dans /admin
export default async function PageIntro({ slug }: { slug: Exclude<PageSlug, "accueil"> }) {
  const page = await getPage(slug);
  return <Block headingLevel={1} title={page.title} text={introText(page.intro)} />;
}
