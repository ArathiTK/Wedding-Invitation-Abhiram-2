import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  // Videos/audio in /public never change filename-to-filename, so let browsers and the
  // CDN cache them forever — repeat visits (and re-opening the same section) become
  // instant instead of re-fetching multi-MB assets.
  async headers() {
    return [
      {
        source: "/assets/:path*.(mp4|mp3)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // OG image is versioned via ?v= query param, so let crawlers/CDNs cache it hard.
        source: "/assets/og-image.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
