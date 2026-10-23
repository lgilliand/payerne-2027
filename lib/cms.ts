import config from "@payload-config";
import type { Metadata } from "next";
import { getPayload } from "payload";
import { cache } from "react";

export type PageSlug =
  | "accueil"
  | "histoire"
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
