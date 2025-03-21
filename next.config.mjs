/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pii.email', 'avatars.dicebear.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable static exports for better SEO crawling
  output: 'standalone',
  // Use trailing slashes for cleaner URLs
  trailingSlash: true,
};

export default nextConfig; 