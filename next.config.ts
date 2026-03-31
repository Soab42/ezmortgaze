import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      // Example legacy blog route redirect placeholder
      {
        source: "/articles/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.kuro.info",
      },
      {
        protocol: "https",
        hostname: "www.pala.com.au",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "dwe6gs8sp.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
