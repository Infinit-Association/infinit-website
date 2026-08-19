import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },

  // Hides the floating "N" Next.js development indicator
  devIndicators: false,

  // Transpile three.js and related packages for Next.js
  transpilePackages: ["three"],
};

export default nextConfig;