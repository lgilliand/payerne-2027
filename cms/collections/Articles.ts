import type { CollectionConfig } from "payload";

// Articles affichés sur la page d'accueil, du plus récent au plus ancien
export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Article", plural: "Articles" },
  defaultSort: "-publishedAt",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "hideFrom", "_status"],
    description: "Les articles publiés apparaissent sur la page d'accueil, sous le compte à rebours.",
  },
  // Permet d'enregistrer un brouillon avant de le publier
  versions: { drafts: true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    { name: "content", label: "Texte", type: "richText", required: true },
    { name: "image", label: "Image", type: "upload", relationTo: "media" },
    {
      name: "imagePosition",
      label: "Position de l'image",
      type: "radio",
      defaultValue: "left",
      options: [
        { label: "À gauche", value: "left" },
        { label: "À droite", value: "right" },
      ],
      admin: { layout: "horizontal", condition: (data) => Boolean(data?.image) },
    },
    {
      name: "action",
      label: "Bouton",
      type: "group",
      admin: { description: "Optionnel : laisser vide pour ne pas afficher de bouton." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", label: "Texte du bouton", type: "text" },
            {
              name: "href",
              label: "Lien",
              type: "text",
              admin: { description: "Page du site (/benevoles), lien externe (https://…) ou mailto:…" },
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      label: "Date de l'article",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" } },
    },
    {
      name: "hideFrom",
      label: "Masquer à partir du",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Optionnel : l'article disparaît automatiquement à cette date (fin des inscriptions…).",
        date: { pickerAppearance: "dayAndTime", displayFormat: "d MMMM yyyy HH:mm" },
      },
    },
  ],
};
