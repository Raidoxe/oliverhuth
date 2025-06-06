import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placekitten.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
