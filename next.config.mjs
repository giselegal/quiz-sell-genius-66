/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para permitir que o Lovable Editor carregue scripts externos
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.lovableproject.com; connect-src 'self' https://*.lovableproject.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:;`,
          },
        ],
      },
    ];
  },
  
  // Reescrever rotas legadas para manter compatibilidade
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

  // Configuração de webpack para ignorar erros não críticos
  webpack: (config) => {
    // Configuração para ignorar warnings no webpack
    config.ignoreWarnings = [
      // Ignore warnings from module not found errors
      { module: /node_modules/ },
      // Ignore warnings from resource size limit
      { file: /\.(scss|css|js)$/ },
      // Ignore warnings related to source maps
      (warning) => warning.message.includes('source-map'),
      // Ignore warnings from import/export
      (warning) => warning.message.includes('export') || warning.message.includes('import'),
    ];
    
    // Ajustando configuração de otimização para ser mais tolerante
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
