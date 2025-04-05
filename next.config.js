/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Next.js 14 specific experimental features
    optimizeCss: false,
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
      // Ignore specific errors during build
      // This is a bit of a hack and not officially supported
    },
    webpack: (config, { isServer }) => {
      // This will reduce the verbosity of the build output
      config.infrastructureLogging = {
        level: 'error', // Only show errors, not warnings
      };
      
      return config;
    },
};

module.exports = nextConfig;