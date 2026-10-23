export type NavItem = {
  label: string;
  href: string;
  /** Page pas encore prête : rangée dans le sous-menu « À venir », visible en développement uniquement */
  hidden?: boolean;
};

const allNavigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Bénévoles", href: "/benevoles" },
  { label: "Boutique", href: "/boutique" },
  { label: "Comité", href: "/comite" },
  { label: "Sponsors", href: "/sponsors", hidden: true },
  { label: "Photos", href: "/photos", hidden: true },
  { label: "Infos générales", href: "/infos", hidden: true },
  { label: "Programme", href: "/programme", hidden: true },
  { label: "Billetterie", href: "/billetterie", hidden: true },
];

// Les pages pas encore prêtes ne sont accessibles qu'en développement (npm run dev) :
// en production, elles n'apparaissent pas dans le menu et renvoient une page 404
const showUpcoming = process.env.NODE_ENV === "development";

const hiddenPaths = allNavigation.filter((item) => item.hidden).map((item) => item.href);

/** La page (ou une de ses sous-pages) peut-elle être affichée ? */
export function isPublished(pathname: string) {
  return showUpcoming || !hiddenPaths.some((href) => pathname === href || pathname.startsWith(`${href}/`));
}

export const navigation = allNavigation.filter((item) => !item.hidden);

export const upcomingNavigation = {
  label: "À venir",
  items: showUpcoming ? allNavigation.filter((item) => item.hidden) : [],
};
