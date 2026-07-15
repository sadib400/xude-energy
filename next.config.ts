import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  allowedDevOrigins: ['cd585e0807854a.lhr.life', '6ea829fa216f98.lhr.life', 'cute-onions-eat.loca.lt', 'fine-cameras-feel.loca.lt', '*.loca.lt', 'localhost:3000'],
  /* config options here */
};

export default nextConfig;
