import config from "@payload-config";
import type { Metadata } from "next";
import { getPayload } from "payload";
import { cache } from "react";
import { type MenuItem, navigation, upcomingNavigation } from "./navigation";

export type PageSlug =
  | "accueil"
  | "historique"
  | "benevoles"
  | "boutique"
  | "comite"
  | "sponsors"
  | "photos"
  | "infos"
  | "programme"
  | "billetterie";

// cache() : une seule lecture par visite, même si la page et ses métadonnées la demandent
export const getSettings = cache(async () => {
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "settings" });
});

/** Titre et texte du bloc du haut d'une page, modifiables dans /admin */
export const getPage = cache(async <S extends PageSlug>(slug: S) => {
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: `page-${slug}` as `page-${S}`, depth: 1 });
});

export async function pageMetadata(slug: PageSlug): Promise<Metadata> {
  const page = await getPage(slug);
  return { title: page.title, description: page.description || undefined };
}

/**
 * Menu du site, nommé avec les titres des pages saisis dans /admin.
 * Le menu principal ne garde que les pages cochées « Afficher dans le menu ».
 */
export async function getMenu() {
  const withTitles = (items: typeof navigation) =>
    Promise.all(
      items.map(async (item) => {
        const page = await getPage(item.slug);
        return { label: item.label ?? page.title, href: item.href, visible: page.showInMenu };
      }),
    );
  const [main, upcoming] = await Promise.all([withTitles(navigation), withTitles(upcomingNavigation)]);
  const toMenu = ({ label, href }: MenuItem) => ({ label, href });

  return {
    navigation: main.filter((item) => item.visible).map(toMenu),
    upcoming: upcoming.map(toMenu),
  };
}
