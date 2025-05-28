import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress' }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'charts': ['recharts'],
          'ui-components': ['@radix-ui/react-toast', '@radix-ui/react-progress', '@radix-ui/react-select']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  // Otimizações de performance
  esbuild: {
    drop: ['console', 'debugger'] // Remover console.log em produção
  }
});
