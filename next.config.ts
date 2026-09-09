import type { NextConfig } from "next";

/**
 * Ricky Wraps - static export.
 * Set NEXT_PUBLIC_BASE_PATH=/one-stop-customs to build for a GitHub Pages
 * project page (https://<user>.github.io/one-stop-customs/). Leave it unset to
 * serve at a domain root (e.g. rickywrapsllc.com via public/CNAME). The
 * asset() helper reads the same env var so image paths stay correct either way.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
