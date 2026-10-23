import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { fr } from "@payloadcms/translations/languages/fr";
import sharp from "sharp";
import { Articles } from "./cms/collections/Articles";
import { Media } from "./cms/collections/Media";
import { Users } from "./cms/collections/Users";
import { migrations } from "./cms/migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " – Giron de la Broye 2027" },
  },
  collections: [Articles, Media, Users],
  // Éditeur de texte volontairement simple : uniquement ce que les blocs du site savent afficher
  editor: lexicalEditor({
    features: [
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h3"] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature({ enabledCollections: [] }),
      UnorderedListFeature(),
      OrderedListFeature(),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  }),
  // Interface d'administration en français uniquement
  i18n: { supportedLanguages: { fr }, fallbackLanguage: "fr" },
  secret: process.env.PAYLOAD_SECRET || "",
  // La base SQLite est un simple fichier, stocké hors du dépôt en production (voir .env.example)
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || "file:./data/payload.db" },
    migrationDir: path.resolve(dirname, "cms/migrations"),
    // En production, les migrations sont appliquées automatiquement au démarrage
    prodMigrations: migrations,
  }),
  graphQL: { disable: true },
  sharp,
  typescript: { outputFile: path.resolve(dirname, "cms/payload-types.ts") },
});
