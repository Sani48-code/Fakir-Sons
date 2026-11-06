import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photos are local (public/images). 90 is used for the hero only.
    qualities: [75, 90],
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
