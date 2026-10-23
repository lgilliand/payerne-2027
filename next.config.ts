import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Le site tourne avec `next start` sur l'hébergement Node.js d'Infomaniak
const nextConfig: NextConfig = {};

export default withPayload(nextConfig);
