import config from "@payload-config";
import type { Metadata } from "next";
import { getPayload } from "payload";
import { cache } from "react";
import { type NavPage, navigation, upcomingNavigation } from "./navigation";

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
  | "billetterie"
  | "contact";

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
 * Le menu principal suit la fiche « Menu », sans les pages pas encore prêtes.
 */
export async function getMenu() {
  const payload = await getPayload({ config });
  const menu = await payload.findGlobal({ slug: "menu" });
  const main = (menu.items ?? [])
    .map(({ page }) => navigation.find((item) => item.slug === page))
    .filter((item) => item !== undefined);

  const withTitles = (items: NavPage[]) =>
    Promise.all(items.map(async (item) => ({ label: item.label ?? (await getPage(item.slug)).title, href: item.href })));
  const [mainItems, upcomingItems] = await Promise.all([withTitles(main), withTitles(upcomingNavigation)]);

  return { navigation: mainItems, upcoming: upcomingItems };
}
