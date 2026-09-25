import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique dans le dossier `out/` (hébergement Infomaniak)
  output: "export",
  // Génère /boutique/index.html plutôt que /boutique.html (URLs propres sur Apache)
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
