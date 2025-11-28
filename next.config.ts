import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export the app as static HTML (for GitHub Pages)
  output: 'export',
  // Disable Next.js Image Optimization when using static export
  // See: https://nextjs.org/docs/messages/export-image-api
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
