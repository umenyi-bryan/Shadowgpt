/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir is no longer experimental in Next.js 14
  experimental: {
    serverComponentsExternalPackages: ['axios', 'marked', 'prismjs']
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
  // Enable source maps in production for better debugging
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
