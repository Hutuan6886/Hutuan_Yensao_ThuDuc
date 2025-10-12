import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-3fd9df0a9a034d6fa7c099456764cf28.r2.dev",
        pathname: "/**", // cho phép tất cả đường dẫn ảnh
      },
    ],
  },
};

export default nextConfig;
