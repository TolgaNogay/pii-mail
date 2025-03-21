/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pii.email', 'avatars.dicebear.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  // Enable static exports for better SEO crawling
  output: 'export',
  // Use trailing slashes for cleaner URLs
  trailingSlash: true,
  // Set the base path for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/pii-mail' : '',
  // Disable image optimization for static export
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://tolganogay.github.io/pii-mail/' : '',
};

export default nextConfig; 