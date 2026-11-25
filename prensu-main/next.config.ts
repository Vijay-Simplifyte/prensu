import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Optimise for mobile-first portfolio — covers common phone/tablet widths
    deviceSizes: [375, 430, 640, 750, 828, 1080, 1200, 1920],
    // Thumbnail / gallery slot sizes
    imageSizes: [64, 160, 340, 640, 860],
    // Allow Vercel to cache for 1 week (default 60 s is too short for a portfolio)
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
