import config from "@payload-config";
import { getPayload } from "payload";

/** Actualités publiées et pas encore masquées, dans l'ordre choisi dans /admin */
export async function getArticles() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "articles",
    where: {
      _status: { equals: "published" },
      or: [{ hideFrom: { exists: false } }, { hideFrom: { greater_than: new Date().toISOString() } }],
    },
    sort: "_order",
    depth: 1,
    limit: 50,
  });
  return docs;
}
