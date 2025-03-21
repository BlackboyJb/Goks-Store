import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    //WILL STILL ALLOW PRODUCTION BUILD WITH TYPE ERRORS
    ignoreBuildErrors: true,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
