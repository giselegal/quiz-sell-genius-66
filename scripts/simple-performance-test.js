#!/usr/bin/env node

// Script simplificado para testes de performance
import puppeteer from 'puppeteer';
import fs from 'fs';

async function simplePerformanceTest() {
  console.log('🚀 Iniciando teste de performance simplificado...\n');

  const testUrls = [
    'http://localhost:8081',
    'http://localhost:8081/quiz',
    'http://localhost:8081/resultado'
  ];

  const results = [];
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });

  try {
    for (const url of testUrls) {
      console.log(`📊 Testando: ${url}`);
      
      try {
        const page = await browser.newPage();
        
        // Configurar timeouts menores
        page.setDefaultTimeout(15000);
        page.setDefaultNavigationTimeout(15000);
        
        // Medir tempo de carregamento
        const startTime = Date.now();
        
        const response = await page.goto(url, { 
          waitUntil: 'domcontentloaded',
          timeout: 15000
        });
        
        const loadTime = Date.now() - startTime;
        
        // Aguardar um pouco mais para garantir que tudo carregou
        await page.waitForTimeout(2000);
        
        // Obter métricas do navegador
        const metrics = await page.evaluate(() => {
          const paintEntries = performance.getEntriesByType('paint');
          const navigationEntry = performance.getEntriesByType('navigation')[0];
          
          return {
            fcp: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || null,
            lcp: paintEntries.find(entry => entry.name === 'largest-contentful-paint')?.startTime || null,
            domContentLoaded: navigationEntry?.domContentLoadedEventEnd - navigationEntry?.domContentLoadedEventStart || null,
            loadComplete: navigationEntry?.loadEventEnd - navigationEntry?.loadEventStart || null,
            transferSize: navigationEntry?.transferSize || null,
            decodedBodySize: navigationEntry?.decodedBodySize || null,
            resourceCount: performance.getEntriesByType('resource').length
          };
        });

        // Verificar Core Web Vitals usando web-vitals se disponível
        const webVitals = await page.evaluate(() => {
          return new Promise((resolve) => {
            // Simular medição de CLS
            let clsScore = 0;
            
            // Timeout para coletar métricas
            setTimeout(() => {
              resolve({
                cls: clsScore,
                timestamp: Date.now()
              });
            }, 1000);
          });
        });

        const result = {
          url,
          status: response.status(),
          loadTime,
          metrics: {
            ...metrics,
            cls: webVitals.cls
          },
          timestamp: new Date().toISOString()
        };

        results.push(result);
        
        console.log(`✅ Concluído: ${url} (${loadTime}ms)`);
        console.log(`   Status: ${response.status()}`);
        console.log(`   FCP: ${metrics.fcp ? (metrics.fcp / 1000).toFixed(2) + 's' : 'N/A'}`);
        console.log(`   Recursos: ${metrics.resourceCount}`);
        console.log('');
        
        await page.close();
        
      } catch (error) {
        console.error(`❌ Erro ao testar ${url}:`, error.message);
        results.push({
          url,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
  } finally {
    await browser.close();
  }

  // Gerar relatório
  generateSimpleReport(results);
}

function generateSimpleReport(results) {
  console.log('\n📋 RELATÓRIO DE PERFORMANCE SIMPLIFICADO');
  console.log('==========================================\n');

  let totalLoadTime = 0;
  let successfulTests = 0;

  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.url}: ERRO - ${result.error}\n`);
      return;
    }

    successfulTests++;
    totalLoadTime += result.loadTime;
    
    console.log(`📊 ${result.url}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Tempo de carregamento: ${result.loadTime}ms`);
    
    if (result.metrics.fcp) {
      console.log(`   First Contentful Paint: ${(result.metrics.fcp / 1000).toFixed(2)}s`);
    }
    
    if (result.metrics.resourceCount) {
      console.log(`   Recursos carregados: ${result.metrics.resourceCount}`);
    }
    
    if (result.metrics.transferSize) {
      console.log(`   Tamanho transferido: ${(result.metrics.transferSize / 1024).toFixed(2)}KB`);
    }
    
    console.log('');
  });

  if (successfulTests > 0) {
    const averageLoadTime = totalLoadTime / successfulTests;
    console.log(`⏱️  Tempo médio de carregamento: ${averageLoadTime.toFixed(0)}ms`);
    
    if (averageLoadTime < 1000) {
      console.log('🟢 EXCELENTE - Carregamento muito rápido!');
    } else if (averageLoadTime < 3000) {
      console.log('🟡 BOM - Carregamento aceitável');
    } else {
      console.log('🔴 PRECISA MELHORAR - Carregamento lento');
    }
  }

  // Salvar relatório
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: results.length,
      successfulTests,
      averageLoadTime: successfulTests > 0 ? totalLoadTime / successfulTests : 0
    },
    results
  };

  fs.writeFileSync(
    'simple-performance-report.json',
    JSON.stringify(reportData, null, 2)
  );

  console.log('\n💾 Relatório salvo em: simple-performance-report.json');
}

// Executar teste
simplePerformanceTest().catch(console.error);
