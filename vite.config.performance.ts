import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import compression from 'vite-plugin-compression';

// Bundle analyzer plugin
const bundleAnalyzer = (): PluginOption => {
  return {
    name: 'bundle-analyzer',
    generateBundle(options, bundle) {
      const analysis: Record<string, { size: number; imports: string[] }> = {};
      
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk') {
          analysis[fileName] = {
            size: chunk.code.length,
            imports: chunk.imports || []
          };
        }
      }
      
      // Log bundle sizes
      console.log('\n📦 Bundle Analysis:');
      console.log('==================');
      
      const sorted = Object.entries(analysis)
        .sort(([,a], [,b]) => b.size - a.size)
        .slice(0, 10);
        
      sorted.forEach(([name, info]) => {
        const sizeKB = (info.size / 1024).toFixed(2);
        console.log(`${name}: ${sizeKB}KB`);
        if (info.imports.length > 0) {
          console.log(`  Dependencies: ${info.imports.slice(0, 3).join(', ')}${info.imports.length > 3 ? '...' : ''}`);
        }
      });
      
      console.log('==================\n');
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    bundleAnalyzer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de build
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks separados
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-tabs'],
          'chart-vendor': ['recharts'],
          'icons-vendor': ['lucide-react'],
          // Chunks por funcionalidade
          'admin': [
            './src/pages/admin/DashboardPage',
            './src/pages/admin/AnalyticsPage',
            './src/components/analytics/AdvancedFunnel'
          ],
          'quiz': [
            './src/components/QuizPage',
            './src/pages/quiz-descubra-seu-estilo'
          ],
          'result': [
            './src/pages/ResultPage',
            './src/components/result/Header'
          ],
        },
      },
    },
    // Increase chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [
      '@huggingface/transformers', // Excluir se não usado
      'canvas' // Excluir se não usado no browser
    ]
  },
  define: {
    // Performance optimizations
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  }
});
