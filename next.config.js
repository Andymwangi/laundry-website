/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Next.js 14 specific experimental features
    optimizeCss: false,
    // This is needed to prevent errors during export
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable critters (minify CSS) optimization
  experimental: {
    // If you're using Next.js 12 or newer with the 'optimizeCss' feature
    optimizeCss: false,
  },
  // Suppress specific build warnings (optional)
  onDemandEntries: {
    // The number of pages that should be kept in memory
    maxInactiveAge: 25 * 1000,
    // The number of pages that should be kept in memory
    pagesBufferLength: 2,
  },
  webpack: (config, { isServer }) => {
    // This will reduce the verbosity of the build output
    config.infrastructureLogging = {
      level: 'error', // Only show errors, not warnings
    };
    
    return config;
  },
  output: 'standalone', // Changed from 'export' for proper API route support
  images: {
    domains: ['randomuser.me'],
    unoptimized: process.env.NODE_ENV === 'production' // Only unoptimize in production
  },
};

module.exports = nextConfig;