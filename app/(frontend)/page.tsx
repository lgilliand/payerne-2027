import type { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import ArticleBlock from "@/components/ArticleBlock";
import Block from "@/components/Block";
import Countdown from "@/components/Countdown";
import { getArticles } from "@/lib/articles";
import { getPage, getSettings } from "@/lib/cms";

// Photo affichée tant qu'aucune autre n'est choisie dans /admin
const defaultImage = {
  src: "/images/equipe-organisation.jpg",
  alt: "Les membres de l'équipe d'organisation, en t-shirt noir, posent devant l'abbatiale de Payerne",
  width: 1170,
  height: 1165,
};

// Le titre de l'accueil est celui du site (défini dans le layout), seule la description est reprise
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("accueil");
  return page.description ? { description: page.description } : {};
}

export default async function HomePage() {
  const [page, settings, articles] = await Promise.all([getPage("accueil"), getSettings(), getArticles()]);
  const media = typeof page.image === "object" ? page.image : null;
  // Version redimensionnée (1200 px) si l'image d'origine est plus grande
  const file = media?.sizes?.block?.url ? media.sizes.block : media;

  return (
    <>
      <Block
        headingLevel={1}
        title={page.title}
        text={<RichText data={page.intro} disableContainer />}
        image={
          file?.url
            ? { src: file.url, alt: media?.alt ?? "", width: file.width ?? undefined, height: file.height ?? undefined }
            : defaultImage
        }
        action={{ label: "En savoir plus", href: "/histoire" }}
      >
        <Countdown target={settings.startDate} label={page.countdownLabel} doneLabel={page.countdownDoneLabel} />
      </Block>
      {articles.map((article) => (
        <ArticleBlock key={article.id} article={article} />
      ))}
    </>
  );
}
