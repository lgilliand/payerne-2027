import type { CollectionConfig } from "payload";

// Lieux des événements du programme, à choisir dans chaque événement
export const Places: CollectionConfig = {
  slug: "places",
  labels: { singular: "Lieu", plural: "Lieux" },
  defaultSort: "name",
  admin: {
    useAsTitle: "name",
    group: "Programme",
    defaultColumns: ["name", "latitude", "longitude"],
  },
  fields: [
    { name: "name", label: "Nom", type: "text", required: true, unique: true },
    {
      type: "row",
      fields: [
        {
          name: "latitude",
          label: "Latitude",
          type: "number",
          min: -90,
          max: 90,
          admin: { step: 0.000001, description: "Optionnel, ex. 46.8219" },
        },
        {
          name: "longitude",
          label: "Longitude",
          type: "number",
          min: -180,
          max: 180,
          admin: { step: 0.000001, description: "Optionnel, ex. 6.9381" },
          // Un point GPS a besoin des deux coordonnées
          validate: (value: number | null | undefined, { siblingData }: { siblingData: { latitude?: number | null } }) =>
            (value == null) === (siblingData.latitude == null) || "Indiquer la latitude et la longitude, ou aucune des deux.",
        },
      ],
    },
  ],
};
