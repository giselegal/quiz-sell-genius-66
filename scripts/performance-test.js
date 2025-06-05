#!/usr/bin/env node

// Script para executar testes de performance automatizados
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runPerformanceTests() {
  console.log('🚀 Iniciando testes de performance automatizados...\n');

  const testUrls = [
    'http://localhost:5173',
    'http://localhost:5173/quiz',
    'http://localhost:5173/quiz-descubra-seu-estilo',
    'http://localhost:5173/resultado',
    'http://localhost:5173/admin'
  ];

  const results = [];

  for (const url of testUrls) {
    console.log(`📊 Testando: ${url}`);
    
    try {
      // Teste com Puppeteer para métricas básicas
      const basicMetrics = await testWithPuppeteer(url);
      
      // Teste com Lighthouse para auditoria completa
      const lighthouseReport = await testWithLighthouse(url);
      
      results.push({
        url,
        basicMetrics,
        lighthouse: lighthouseReport,
        timestamp: new Date().toISOString()
      });

      console.log(`✅ Concluído: ${url}\n`);
      
    } catch (error) {
      console.error(`❌ Erro ao testar ${url}:`, error.message);
      results.push({
        url,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Gerar relatório
  generateReport(results);
}

async function testWithPuppeteer(url) {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Configurar métricas de performance
    await page.setCacheEnabled(false);
    
    // Medir tempo de carregamento
    const startTime = Date.now();
    
    const response = await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    const loadTime = Date.now() - startTime;
    
    // Obter métricas do navegador
    const metrics = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType('paint');
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      
      return {
        fcp: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || null,
        domContentLoaded: navigationEntry?.domContentLoadedEventEnd - navigationEntry?.domContentLoadedEventStart || null,
        loadComplete: navigationEntry?.loadEventEnd - navigationEntry?.loadEventStart || null,
        transferSize: navigationEntry?.transferSize || null,
        decodedBodySize: navigationEntry?.decodedBodySize || null
      };
    });

    // Verificar se há erros de console
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Verificar recursos não carregados
    const failedRequests = [];
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        errorText: request.failure().errorText
      });
    });

    return {
      status: response.status(),
      loadTime,
      metrics,
      consoleErrors,
      failedRequests
    };
    
  } finally {
    await browser.close();
  }
}

async function testWithLighthouse(url) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const options = {
      logLevel: 'info',
      output: 'json',
      port: chrome.port
    };
    
    const runnerResult = await lighthouse(url, options);
    
    const { lhr } = runnerResult;
    
    return {
      performance: lhr.categories.performance.score * 100,
      accessibility: lhr.categories.accessibility.score * 100,
      bestPractices: lhr.categories['best-practices'].score * 100,
      seo: lhr.categories.seo.score * 100,
      metrics: {
        fcp: lhr.audits['first-contentful-paint'].numericValue,
        lcp: lhr.audits['largest-contentful-paint'].numericValue,
        cls: lhr.audits['cumulative-layout-shift'].numericValue,
        fid: lhr.audits['max-potential-fid'].numericValue,
        tti: lhr.audits['interactive'].numericValue,
        si: lhr.audits['speed-index'].numericValue
      },
      opportunities: lhr.audits['unused-javascript'] ? {
        unusedJavaScript: lhr.audits['unused-javascript'].details?.items?.length || 0,
        unusedCSS: lhr.audits['unused-css-rules'].details?.items?.length || 0,
        unoptimizedImages: lhr.audits['uses-optimized-images'].details?.items?.length || 0
      } : null
    };
    
  } finally {
    await chrome.kill();
  }
}

function generateReport(results) {
  console.log('\n📋 RELATÓRIO DE PERFORMANCE');
  console.log('================================\n');

  let totalScore = 0;
  let validTests = 0;

  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.url}: ERRO - ${result.error}\n`);
      return;
    }

    validTests++;
    const lighthouse = result.lighthouse;
    
    console.log(`📊 ${result.url}`);
    console.log(`   Performance: ${lighthouse.performance.toFixed(1)}/100`);
    console.log(`   Accessibility: ${lighthouse.accessibility.toFixed(1)}/100`);
    console.log(`   Best Practices: ${lighthouse.bestPractices.toFixed(1)}/100`);
    console.log(`   SEO: ${lighthouse.seo.toFixed(1)}/100`);
    
    console.log(`   Core Web Vitals:`);
    console.log(`   - FCP: ${(lighthouse.metrics.fcp / 1000).toFixed(2)}s`);
    console.log(`   - LCP: ${(lighthouse.metrics.lcp / 1000).toFixed(2)}s`);
    console.log(`   - CLS: ${lighthouse.metrics.cls.toFixed(3)}`);
    console.log(`   - TTI: ${(lighthouse.metrics.tti / 1000).toFixed(2)}s`);
    
    if (lighthouse.opportunities) {
      console.log(`   Otimizações identificadas:`);
      console.log(`   - JS não utilizado: ${lighthouse.opportunities.unusedJavaScript} arquivos`);
      console.log(`   - CSS não utilizado: ${lighthouse.opportunities.unusedCSS} regras`);
      console.log(`   - Imagens não otimizadas: ${lighthouse.opportunities.unoptimizedImages} imagens`);
    }
    
    totalScore += lighthouse.performance;
    console.log('\n');
  });

  if (validTests > 0) {
    const averageScore = totalScore / validTests;
    console.log(`🎯 Score médio de performance: ${averageScore.toFixed(1)}/100`);
    
    if (averageScore >= 90) {
      console.log('🟢 EXCELENTE - Performance está ótima!');
    } else if (averageScore >= 70) {
      console.log('🟡 BOM - Algumas otimizações podem melhorar a performance');
    } else {
      console.log('🔴 PRECISA MELHORAR - Performance abaixo do esperado');
    }
  }

  // Salvar relatório em arquivo
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: results.length,
      validTests,
      averageScore: validTests > 0 ? totalScore / validTests : 0
    },
    results
  };

  require('fs').writeFileSync(
    'performance-report.json',
    JSON.stringify(reportData, null, 2)
  );

  console.log('\n💾 Relatório salvo em: performance-report.json');
}

// Executar testes se chamado diretamente
if (require.main === module) {
  runPerformanceTests().catch(console.error);
}

module.exports = { runPerformanceTests };
