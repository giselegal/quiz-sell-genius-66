// Testa se as melhorias na interface de preço foram implementadas corretamente
const puppeteer = require('puppeteer');

async function verifyPriceHierarchyAndEffects() {
  console.log('🧪 Iniciando teste de hierarquia de preços e efeitos visuais...');
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Simula os dados do quiz para conseguir carregar a página
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('quiz_results', JSON.stringify({
        primaryStyle: {
          category: 'Elegante',
          percentage: 85
        },
        secondaryStyles: [
          { category: 'Natural', percentage: 45 },
          { category: 'Criativo', percentage: 30 }
        ]
      }));
      
      localStorage.setItem('preloadedResults', 'true');
    });
    
    await page.goto('http://localhost:3000/resultado', { waitUntil: 'networkidle0' });
    
    // Verificar elementos específicos da nova implementação
    console.log('Verificando elementos da interface de preços...');
    
    // 1. Verificar selo de desconto
    const discountBadge = await page.evaluate(() => {
      const element = document.querySelector('span.text-xs.font-bold.text-\\[\\#D68047\\]');
      return element ? element.textContent : null;
    });
    
    console.log(`1. Selo de desconto: ${discountBadge ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 2. Verificar temporizador
    const countdown = await page.evaluate(() => {
      const element = document.querySelector('.bg-\\[\\#432818\\].text-white');
      return element ? true : false;
    });
    
    console.log(`2. Temporizador: ${countdown ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 3. Verificar indicador de estoque limitado
    const limitedStock = await page.evaluate(() => {
      const element = document.querySelector('.text-\\[\\#D68047\\]');
      return element && element.textContent.includes('Estoque limitado');
    });
    
    console.log(`3. Indicador de estoque: ${limitedStock ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 4. Verificar destaque no valor do parcelamento
    const installmentHighlight = await page.evaluate(() => {
      const element = document.querySelector('.text-3xl.font-bold.bg-gradient-to-r');
      return element ? element.textContent : null;
    });
    
    console.log(`4. Destaque parcelamento: ${installmentHighlight ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 5. Verificar selo de "MELHOR OFERTA"
    const bestOfferBadge = await page.evaluate(() => {
      const element = document.querySelector('span.text-xs.font-semibold.bg-gradient-to-r.from-\\[\\#FFD700\\]');
      return element ? element.textContent : null;
    });
    
    console.log(`5. Selo "MELHOR OFERTA": ${bestOfferBadge ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 6. Verificar mockup do guia aprimorado
    const enhancedGuide = await page.evaluate(() => {
      const element = document.querySelector('.h-36.bg-gradient-to-b');
      return element ? true : false;
    });
    
    console.log(`6. Mockup do guia aprimorado: ${enhancedGuide ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 7. Verificar selo de garantia aprimorado
    const enhancedGuarantee = await page.evaluate(() => {
      const element = document.querySelector('.w-14.h-14.flex.items-center.justify-center');
      return element ? true : false;
    });
    
    console.log(`7. Selo de garantia aprimorado: ${enhancedGuarantee ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // 8. Verificar botão CTA aprimorado
    const enhancedCTA = await page.evaluate(() => {
      const element = document.querySelector('.group-hover\\:translate-x-1');
      return element ? true : false;
    });
    
    console.log(`8. Botão CTA aprimorado: ${enhancedCTA ? '✅ Encontrado' : '❌ Não encontrado'}`);
    
    // Resultado final
    const totalChecks = 8;
    const passedChecks = [
      discountBadge, countdown, limitedStock, installmentHighlight, 
      bestOfferBadge, enhancedGuide, enhancedGuarantee, enhancedCTA
    ].filter(Boolean).length;
    
    console.log(`\n🏁 Resultado: ${passedChecks}/${totalChecks} verificações passaram`);
    console.log(`${passedChecks === totalChecks ? '✅ SUCESSO' : '❌ FALHA'}: ${Math.round((passedChecks/totalChecks)*100)}% dos elementos implementados corretamente`);
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  } finally {
    await browser.close();
  }
}

// Executar o teste
verifyPriceHierarchyAndEffects();
