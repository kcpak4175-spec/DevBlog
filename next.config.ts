import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "brunch.co.kr",
      },
      {
        protocol: "https",
        hostname: "img1.daumcdn.net", // brunch images are often served from daumcdn
      },
      {
        protocol: "https",
        hostname: "*.supabase.co", // Allow Supabase storage URLs
      },
      {
        protocol: "http",
        hostname: "localhost", // For local supabase storage
      },
    ],
  },
};

export default nextConfig;
