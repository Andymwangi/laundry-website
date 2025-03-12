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
  }
};

module.exports = nextConfig;