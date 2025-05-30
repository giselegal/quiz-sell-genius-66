import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: '.',
  base: './',
  
  server: {
    host: '0.0.0.0',
    port: 8080,
    // Configurações CORS e mime-types para desenvolvimento
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
    },
    fs: {
      allow: ['../']
    },
    allowedHosts: [
      "a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com"
    ],
    // Configuração SPA - fallback para index.html
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/quiz$/, to: '/index.html' },
        { from: /^\/resultado$/, to: '/index.html' },
        { from: /^\/oferta$/, to: '/index.html' },
        { from: /^\/admin.*$/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    }
  },
  
  plugins: [
    react(),
    componentTagger(),
    // Compressão GZIP
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Compressão Brotli
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    // Configurações para evitar problemas de MIME type
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip'
          ],
          'vendor-utils': [
            'clsx', 
            'tailwind-merge'
          ],
          'analytics': [
            './src/utils/analytics.ts',
            './src/utils/facebookPixel.ts'
          ]
        },
        // Garantir que os assets sejam carregados corretamente para as rotas específicas
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  
  css: {
    devSourcemap: mode === 'development',
  }
}));
