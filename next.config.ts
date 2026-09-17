import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Cloudflare Pages (no Node server needed).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
