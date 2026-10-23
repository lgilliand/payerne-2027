import type { GlobalConfig } from "payload";
import { Pages } from "./Pages";

// Toutes les pages du site, nommées comme leur fiche dans /admin (« page-benevoles » → « benevoles »)
const pageOptions = Pages.map((page) => ({
  label: String(page.label),
  value: page.slug.replace(/^page-/, ""),
}));

// Pages du menu principal, dans l'ordre d'affichage
export const Menu: GlobalConfig = {
  slug: "menu",
  label: "Menu",
  admin: {
    group: "Pages",
    description:
      "Glisser-déposer les lignes pour changer l'ordre du menu, supprimer une ligne pour retirer la page du menu (elle reste accessible par son adresse). Le nom affiché est le titre de la page, sauf pour l'accueil.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "items",
      label: "Pages du menu",
      labels: { singular: "Page", plural: "Pages" },
      type: "array",
      // Fonction : la valeur par défaut n'est pas recopiée dans le schéma SQL
      defaultValue: () =>
        ["accueil", "historique", "benevoles", "boutique", "comite", "contact", "sponsors", "photos", "infos", "programme", "billetterie"].map(
          (page) => ({ page }),
        ),
      validate: (items) => {
        const pages = (items ?? []).map((item) => (item as { page?: string }).page);
        return new Set(pages).size === pages.length || "Chaque page ne peut apparaître qu'une fois dans le menu.";
      },
      fields: [{ name: "page", label: "Page", type: "select", required: true, options: pageOptions }],
    },
  ],
};
