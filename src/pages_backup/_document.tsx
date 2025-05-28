
import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

// URLs de recursos críticos para preload
const CRITICAL_RESOURCES = {
  // Fonte essencial
  playfairFont: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
  
  // Imagem LCP
  lcpImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_avif,q_85,w_300,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up',
  
  // Logo
  logoImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_120,h_50,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2'
};

// Estilos CSS críticos para a renderização inicial
const CRITICAL_CSS = `
  html, body {
    margin: 0;
    padding: 0;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  .playfair-display {
    font-family: 'Playfair Display', serif;
  }
  
  #lcp-image {
    content-visibility: auto;
  }
  
  /* Improve layout stability */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  /* Remove default margin */
  h1, h2, h3, h4, h5, p {
    overflow-wrap: break-word;
  }
`;

// Componente personalizado para o Document
// Como estamos usando Vite e não Next.js, isso serve como um template para
// inserir no index.html durante o build, ou para ser adicionado via script
const CustomDocument = () => {
  return (
    <html lang="pt-BR">
      <Head>
        {/* Preload crítico de recursos com alta prioridade */}
        <link
          rel="preload"
          href={CRITICAL_RESOURCES.playfairFont}
          as="style"
        />
        <link
          rel="preload"
          href={CRITICAL_RESOURCES.lcpImage}
          as="image"
          fetchPriority="high"
          type="image/avif"
        />
        <link
          rel="preload"
          href={CRITICAL_RESOURCES.logoImage}
          as="image"
        />
        
        {/* Carregamento otimizado da fonte */}
        <link
          rel="stylesheet"
          href={CRITICAL_RESOURCES.playfairFont}
          media="print"
          onLoad={() => {
            const el = document.querySelector('link[href*="Playfair"]');
            if (el) el.setAttribute('media', 'all');
          }}
        />
        
        {/* Pré-conexões para recursos externos */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Inserir CSS crítico inline para renderização inicial rápida */}
        <style
          dangerouslySetInnerHTML={{
            __html: CRITICAL_CSS
          }}
        />
        
        {/* Meta tags para desempenho */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <div id="root"></div>
        {/* Script de detecção para relatórios de desempenho */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Inicialização do monitoramento de performance
              window.QUIZ_PERF = {
                marks: {},
                startTime: performance.now(),
                markerTimings: {},
                mark: function(name) {
                  this.marks[name] = performance.now();
                  if (window.PerformanceObserver && name === 'lcp_loaded') {
                    const lcpElement = document.getElementById('lcp-image');
                    if (lcpElement) {
                      new PerformanceObserver((entryList) => {
                        const entries = entryList.getEntries();
                        if (entries.length > 0) {
                          console.log('[Performance] LCP:', entries[0].startTime);
                          this.marks.lcp_metric = entries[0].startTime;
                        }
                      }).observe({type: 'largest-contentful-paint', buffered: true});
                    }
                  }
                }
              };
              
              // Função para corrigir problemas de imagens embaçadas
              window.fixBlurryIntroQuizImages = function() {
                // Esta função será implementada se necessário
                console.log('Verificando e corrigindo imagens embaçadas...');
                const introImages = document.querySelectorAll('.quiz-intro-image');
                introImages.forEach(img => {
                  const src = img.getAttribute('src');
                  if (src && src.includes('cloudinary.com') && !src.includes('q_95')) {
                    // Gerar uma URL de alta qualidade
                    // Código de substituição de URL aqui
                  }
                });
              };
            `
          }}
        />
      </body>
    </html>
  );
};

export default CustomDocument;
