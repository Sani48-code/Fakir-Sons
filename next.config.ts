import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photos are local (public/images). 85 by default (<Img>), 90 for the hero and large images.
    qualities: [85, 90],
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
