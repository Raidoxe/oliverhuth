import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placekitten.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
