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
      // Limitando CORS para hosts específicos
      'Access-Control-Allow-Origin': [
        'http://localhost:8080',
        'https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com'
      ].join(', '),
    },
    fs: {
      allow: ['../']
    },
    allowedHosts: [
      "a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com"
    ],
    // CORREÇÃO CRÍTICA: Configuração de fallback para SPA
    // Isso garante que todas as rotas retornem o index.html
    historyApiFallback: {
      rewrites: [
        { from: /\/admin\/editor/, to: '/index.html' },
        { from: /\/admin\/.*/, to: '/index.html' },
        { from: /\/resultado/, to: '/index.html' },
        { from: /\/quiz-.*/, to: '/index.html' },
        { from: /.*/, to: '/index.html' }
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
    sourcemap: true,
    // Configurações para evitar problemas de MIME type
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
          utils: ['date-fns', 'clsx']
        }
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
