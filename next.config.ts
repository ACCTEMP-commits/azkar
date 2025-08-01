import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com/**",
      },{
        protocol: "https",
        hostname: "alkulify.com/**",
      },{
        protocol: "https",
        hostname: "cdn4.cdn-telegram.org/**",
      },{
        protocol: "https",
        hostname: "raw.githubusercontent.com/**",
      },
    ],
  },
  // if used turbopack
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
