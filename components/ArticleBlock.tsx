import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Article } from "@/cms/payload-types";
import Block from "./Block";

// Affiche un article du CMS avec le même rendu que les autres blocs du site
export default function ArticleBlock({ article }: { article: Article }) {
  const media = typeof article.image === "object" ? article.image : null;
  // Version redimensionnée (1200 px) si l'image d'origine est plus grande
  const file = media?.sizes?.block?.url ? media.sizes.block : media;

  return (
    <Block
      title={article.title}
      text={<RichText data={article.content} disableContainer />}
      image={
        file?.url
          ? {
              src: file.url,
              alt: media?.alt ?? "",
              width: file.width ?? undefined,
              height: file.height ?? undefined,
            }
          : undefined
      }
      imagePosition={article.imagePosition ?? "left"}
      action={
        article.action?.label && article.action.href
          ? { label: article.action.label, href: article.action.href }
          : undefined
      }
    />
  );
}
