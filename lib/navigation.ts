export type NavItem = {
  label: string;
  href: string;
  /** Page pas encore prête : rangée dans le sous-menu « À venir » */
  hidden?: boolean;
};

const allNavigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique/" },
  { label: "Bénévoles", href: "/benevoles/" },
  { label: "Comité", href: "/comite/" },
  { label: "Sponsors", href: "/sponsors/", hidden: true },
  { label: "Photos", href: "/photos/", hidden: true },
  { label: "Infos générales", href: "/infos/", hidden: true },
  { label: "Programme", href: "/programme/", hidden: true },
  { label: "Billetterie", href: "/billetterie/", hidden: true },
];

export const navigation = allNavigation.filter((item) => !item.hidden);

export const upcomingNavigation = {
  label: "À venir",
  items: allNavigation.filter((item) => item.hidden),
};
