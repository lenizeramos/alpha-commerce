import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "images.vexels.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeFonts: false,
  }
};

export default nextConfig;
