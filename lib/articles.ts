import config from "@payload-config";
import { getPayload } from "payload";

/** Articles publiés et pas encore masqués, du plus récent au plus ancien */
export async function getArticles() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "articles",
    where: {
      _status: { equals: "published" },
      or: [{ hideFrom: { exists: false } }, { hideFrom: { greater_than: new Date().toISOString() } }],
    },
    sort: "-publishedAt",
    depth: 1,
    limit: 50,
  });
  return docs;
}
