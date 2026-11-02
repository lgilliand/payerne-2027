import type { CollectionConfig } from "payload";

// Catégories des événements du programme (Musique, Sport, Animation…)
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Catégorie", plural: "Catégories" },
  defaultSort: "name",
  admin: { useAsTitle: "name", group: "Programme" },
  fields: [{ name: "name", label: "Nom", type: "text", required: true, unique: true }],
};
