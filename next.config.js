/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'], // Add your image domains here
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Next.js 14 specific experimental features
    serverComponentsExternalPackages: [],
    optimizeCss: true,
  },
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // For improved performance
  poweredByHeader: false,
  // Set output directory for static exports (if needed)
  // distDir: 'build',
  // Enable app directory (if using new app router)
  appDir: true,
};

module.exports = nextConfig;