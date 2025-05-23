/**
 * Script para verificar a implementação da hierarquia de preços
 * Executar no console do navegador ao acessar a página de resultados
 */

(function checkPriceHierarchy() {
  console.log('🔍 Verificando hierarquia de preços...');
  
  // Verificar CTA principal
  const mainCTA = document.querySelector('#cta .flex.flex-col.items-center > div.mb-6');
  if (!mainCTA) {
    console.error('❌ CTA principal não encontrado!');
    return false;
  }
  
  const priceElements = mainCTA.querySelectorAll('p');
  if (priceElements.length !== 3) {
    console.error(`❌ Número incorreto de elementos de preço: ${priceElements.length} (esperado: 3)`);
    return false;
  }
  
  // Verificar formatação
  const originalPrice = priceElements[0];
  const installmentPrice = priceElements[1];
  const fullPrice = priceElements[2];
  
  console.log('💲 Verificando elementos de preço:');
  
  // Verificar preço original (riscado)
  if (originalPrice.classList.contains('line-through')) {
    console.log('✅ Preço original está riscado corretamente');
  } else {
    console.warn('⚠️ Preço original não está riscado');
  }
  
  // Verificar destaque para parcela
  if (installmentPrice.innerHTML.includes('5x de <span class="text-2xl font-bold">R$ 8,83</span>')) {
    console.log('✅ Preço parcelado está formatado com hierarquia correta');
  } else {
    console.warn('⚠️ Preço parcelado não está formatado conforme esperado');
    console.log('   Conteúdo atual:', installmentPrice.innerHTML);
  }
  
  // Verificar preço à vista
  if (fullPrice.innerHTML.includes('Ou R$ 39,90 à vista')) {
    console.log('✅ Preço à vista está formatado corretamente');
  } else {
    console.warn('⚠️ Preço à vista não está formatado conforme esperado');
    console.log('   Conteúdo atual:', fullPrice.innerHTML);
  }
  
  // Verificar CTA sticky
  const stickyCTA = document.querySelector('.fixed.bottom-0 .container p.text-sm.text-\\[\\#aa6b5d\\]');
  if (stickyCTA) {
    if (stickyCTA.innerHTML.includes('5x de <span class="text-lg font-bold">R$ 8,83</span>')) {
      console.log('✅ Preço no CTA fixo está formatado com hierarquia correta');
    } else {
      console.warn('⚠️ Preço no CTA fixo não está formatado conforme esperado');
      console.log('   Conteúdo atual:', stickyCTA.innerHTML);
    }
  } else {
    console.warn('⚠️ CTA fixo não encontrado');
  }
  
  console.log('✅ Verificação da hierarquia de preços concluída!');
  return true;
})();
