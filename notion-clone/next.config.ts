import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['prisma', '@prisma/client'],
};

export default nextConfig;
