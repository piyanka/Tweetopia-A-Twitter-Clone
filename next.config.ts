import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin allow-popups",
          },
          // {
          //   key: "Cross-Origin-Embedder-Policy",
          //   value: "unsafe-none", // 🔹 Temporary fix for COEP issues
          // },
          // {
          //   key: "Cross-Origin-Resource-Policy",
          //   value: "cross-origin", // 🔹 Temporary fix for COEP issues
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
