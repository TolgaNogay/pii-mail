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
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', '@radix-ui', 'lucide-react'],
  },
  
  webpack: (config, { isServer }) => {
    // Chunk size optimization
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageNameMatch = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (!packageNameMatch) return 'npm.unknown';
            const packageName = packageNameMatch[1];
            return `npm.${packageName.replace('@', '')}`;
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
        },
      },
    };
    
    return config;
  },
};

export default nextConfig; 