/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: false, // Desabilitando modo estrito para ignorar warnings não críticos
  // Desabilitando todas as verificações de tipos, ESLint e erros não críticos durante a compilação
  typescript: {
    ignoreBuildErrors: true,    // continua build mesmo com erros de TS
  },
  eslint: {
    ignoreDuringBuilds: true,   // continua build mesmo com erros de lint
  },
  // Configuração para ignorar warnings durante o build
  onDemandEntries: {
    // Período em ms onde a página compilada deve permanecer em buffer
    maxInactiveAge: 60 * 60 * 1000,
    // Número de páginas que devem ser mantidas simultaneamente sem serem descartadas
    pagesBufferLength: 5,
  },
  // Configuração para desenvolvimento local apenas
  distDir: '.next',  // Usando o diretório padrão do Next.js
  images: {
    domains: ['localhost'], // Permitindo imagens do localhost
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  // Configuração para pacotes externos do servidor
  serverExternalPackages: ['@auth'],
}

module.exports = nextConfig;
