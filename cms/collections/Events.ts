import type { CollectionConfig } from "payload";

// Événements de la page Programme, affichés par ordre chronologique
export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Événement", plural: "Événements" },
  defaultSort: "date",
  admin: {
    useAsTitle: "title",
    group: "Programme",
    defaultColumns: ["title", "date", "place", "category", "_status"],
    description: "Les événements publiés apparaissent sur la page Programme, par ordre chronologique.",
  },
  // Permet de préparer le programme en brouillon avant de le publier
  versions: { drafts: true },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    {
      name: "image",
      label: "Photo",
      type: "upload",
      relationTo: "media",
      admin: { description: "Affichée en carré sur la carte de l'événement : le sujet doit être au centre." },
    },
    { name: "description", label: "Description", type: "richText" },
    {
      type: "row",
      fields: [
        {
          name: "date",
          label: "Date et heure",
          type: "date",
          required: true,
          admin: { date: { pickerAppearance: "dayAndTime", displayFormat: "EEEE d MMMM yyyy HH:mm", timeIntervals: 15 } },
        },
        { name: "place", label: "Lieu", type: "relationship", relationTo: "places", required: true },
        { name: "category", label: "Catégorie", type: "relationship", relationTo: "categories", required: true },
      ],
    },
    {
      name: "link",
      label: "Lien externe",
      type: "text",
      admin: { description: "Optionnel : site de l'artiste, inscription au tournoi… (https://…)" },
      validate: (value: string | null | undefined) =>
        !value || /^https?:\/\/\S+$/.test(value) || "Le lien doit commencer par https://",
    },
    {
      name: "embed",
      label: "Code à intégrer",
      type: "code",
      admin: {
        language: "html",
        description:
          "Optionnel : code fourni par un service externe (billetterie Strap'n'pay…), affiché en bas du détail de l'événement. Il s'exécute sur le site : ne coller que du code d'un service de confiance.",
      },
    },
  ],
};
