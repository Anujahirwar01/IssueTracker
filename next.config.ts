import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  eslint: {
    // Only fail build on ESLint errors, not warnings
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail build on TypeScript errors in production
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
