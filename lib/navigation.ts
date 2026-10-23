import type { PageSlug } from "./cms";

export type NavPage = {
  href: string;
  /** Fiche de la page dans /admin : son titre sert de nom dans le menu */
  slug: PageSlug;
  /** Nom fixe dans le menu, à la place du titre de la page */
  label?: string;
  /** Page pas encore prête : rangée dans le sous-menu « À venir », visible en développement uniquement */
  hidden?: boolean;
};

export type MenuItem = { label: string; href: string };

// Pages du site. L'ordre et le choix des pages du menu se règlent dans la fiche « Menu » de /admin.
const allNavigation: NavPage[] = [
  // Le titre de l'accueil est le message de bienvenue : nom fixe dans le menu
  { href: "/", slug: "accueil", label: "Accueil" },
  { href: "/historique", slug: "historique" },
  { href: "/benevoles", slug: "benevoles" },
  { href: "/boutique", slug: "boutique" },
  { href: "/comite", slug: "comite" },
  { href: "/contact", slug: "contact" },
  { href: "/sponsors", slug: "sponsors", hidden: true },
  { href: "/photos", slug: "photos", hidden: true },
  { href: "/infos", slug: "infos", hidden: true },
  { href: "/programme", slug: "programme", hidden: true },
  { href: "/billetterie", slug: "billetterie", hidden: true },
];

// Les pages pas encore prêtes ne sont accessibles qu'en développement (npm run dev) :
// en production, elles n'apparaissent pas dans le menu et renvoient une page 404
const showUpcoming = process.env.NODE_ENV === "development";

const hiddenPaths = allNavigation.filter((item) => item.hidden).map((item) => item.href);

/** La page (ou une de ses sous-pages) peut-elle être affichée ? */
export function isPublished(pathname: string) {
  return showUpcoming || !hiddenPaths.some((href) => pathname === href || pathname.startsWith(`${href}/`));
}

/** Pages prêtes, pouvant figurer dans le menu (voir getMenu) */
export const navigation = allNavigation.filter((item) => !item.hidden);

/** Pages pas encore prêtes, pour le sous-menu « À venir » */
export const upcomingNavigation = showUpcoming ? allNavigation.filter((item) => item.hidden) : [];
