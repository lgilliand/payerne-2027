export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique/" },
  { label: "Bénévoles", href: "/benevoles/" },
  { label: "Sponsors", href: "/sponsors/" },
  { label: "Photos", href: "/photos/" },
  { label: "Infos générales", href: "/infos/" },
  { label: "Programme", href: "/programme/" },
  { label: "Billetterie", href: "/billetterie/" },
];
