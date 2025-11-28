/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir as it's now standard
  experimental: {
    serverComponentsExternalPackages: ['axios', 'marked', 'prismjs']
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
