import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export the app as static HTML (for GitHub Pages)
  output: 'export',
  // Disable Next.js Image Optimization API for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
