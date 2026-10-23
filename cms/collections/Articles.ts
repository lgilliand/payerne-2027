import type { CollectionConfig } from "payload";
import { generateKeyBetween } from "payload/shared";

// Actualités affichées sur la page d'accueil, dans l'ordre choisi dans /admin
export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Actualité", plural: "Actualités" },
  // Réorganisation par glisser-déposer dans la liste (champ caché _order)
  orderable: true,
  defaultSort: "_order",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "hideFrom", "_status"],
    description:
      "Les actualités publiées apparaissent sur la page d'accueil, sous le compte à rebours, dans l'ordre de cette liste. Glisser-déposer pour les réorganiser.",
  },
  hooks: {
    beforeChange: [
      // Payload ajoute les nouveaux documents en fin de liste : une nouvelle actualité arrive plutôt en tête
      async ({ data, operation, req }) => {
        if (operation === "create" && !data._order) {
          const { docs } = await req.payload.find({
            collection: "articles",
            where: { _order: { exists: true } },
            sort: "_order",
            select: { _order: true },
            limit: 1,
            depth: 0,
            pagination: false,
            req,
          });
          data._order = generateKeyBetween(null, docs[0]?._order ?? null);
        }
        return data;
      },
    ],
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
      name: "hideFrom",
      label: "Masquer à partir du",
      type: "date",
      admin: {
        position: "sidebar",
        description: "Optionnel : l'actualité disparaît automatiquement à cette date (fin des inscriptions…).",
        date: { pickerAppearance: "dayAndTime", displayFormat: "d MMMM yyyy HH:mm" },
      },
    },
  ],
};
