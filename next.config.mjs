
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://cdn.lovableproject.com; connect-src 'self' https://*.lovableproject.com https://api.lovable.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:;`,
          },
        ],
      },
    ];
  },
  
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/quiz-descubra-seu-estilo',
          destination: '/offer',
        },
      ],
    };
  },

  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules/ },
      { file: /\.(scss|css|js)$/ },
      (warning) => warning.message.includes('source-map'),
      (warning) => warning.message.includes('export') || warning.message.includes('import'),
    ];
    
    if (config.optimization) {
      if (!config.optimization.splitChunks) {
        config.optimization.splitChunks = {};
      }
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
