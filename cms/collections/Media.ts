import path from "path";
import type { CollectionConfig } from "payload";

// Images envoyées depuis l'administration. Payload génère automatiquement des versions
// redimensionnées en WebP : inutile de compresser les photos avant de les envoyer.
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Média", plural: "Médias" },
  access: { read: () => true },
  fields: [
    {
      name: "alt",
      label: "Description de l'image",
      type: "text",
      required: true,
      admin: { description: "Décrit l'image pour les personnes malvoyantes et les moteurs de recherche." },
    },
  ],
  upload: {
    // Stocké hors du dépôt en production (voir .env.example)
    staticDir: path.resolve(process.env.MEDIA_DIR || "data/media"),
    mimeTypes: ["image/*"],
    formatOptions: { format: "webp", options: { quality: 80 } },
    resizeOptions: { width: 2400, withoutEnlargement: true },
    imageSizes: [{ name: "block", width: 1200, formatOptions: { format: "webp", options: { quality: 80 } } }],
    adminThumbnail: "block",
  },
};
