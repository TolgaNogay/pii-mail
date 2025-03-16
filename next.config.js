/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pii.email'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    scrollRestoration: true,
    optimizeCss: false,
  },
  // Vercel için yapılandırma
  distDir: '.next',
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
}

module.exports = nextConfig 