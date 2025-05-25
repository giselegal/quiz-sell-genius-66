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

  // Configuração de webpack se necessário
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
