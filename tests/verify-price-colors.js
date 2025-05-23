/**
 * Script para verificar a implementação das cores na seção de preços
 * 
 * Este script verifica se as cores e estilos visuais foram aplicados corretamente
 * na exibição de preços na página de resultados.
 */

(function checkPriceColors() {
  console.log('🔍 Verificando cores e efeitos visuais na exibição de preços...');
  
  // Verificar CTA principal
  const mainCTA = document.querySelector('#cta .flex.flex-col.items-center > div.mb-6');
  if (!mainCTA) {
    console.error('❌ CTA principal não encontrado!');
    return false;
  }
  
  // Verificar badge de desconto
  const discountBadge = mainCTA.querySelector('.absolute.-top-4.-right-12');
  if (discountBadge) {
    console.log('✅ Badge de desconto encontrado');
    
    // Verificar cor do badge
    const badgeStyle = window.getComputedStyle(discountBadge);
    console.log(`   Cor de fundo do badge: ${badgeStyle.backgroundColor}`);
    
    // Verificar texto do badge
    const badgeText = discountBadge.textContent?.trim();
    console.log(`   Texto do badge: ${badgeText}`);
  } else {
    console.warn('⚠️ Badge de desconto não encontrado');
  }
  
  // Verificar preço parcelado
  const installmentContainer = mainCTA.querySelector('p:nth-child(2)');
  if (installmentContainer) {
    const priceSpan = installmentContainer.querySelector('span');
    if (priceSpan) {
      const priceStyle = window.getComputedStyle(priceSpan);
      
      // Verificar o gradiente
      console.log('✅ Elemento de preço parcelado encontrado');
      console.log(`   Tamanho da fonte: ${priceStyle.fontSize}`);
      console.log(`   Background: ${priceStyle.backgroundImage}`);
      console.log(`   Texto transparente: ${priceStyle.webkitBackgroundClip || priceStyle.backgroundClip}`);
      
      // Confirmar se o gradiente foi aplicado
      if (priceStyle.backgroundImage.includes('gradient')) {
        console.log('✅ Gradiente aplicado corretamente ao preço');
      } else {
        console.warn('⚠️ Gradiente não detectado no preço');
      }
    } else {
      console.warn('⚠️ Span do preço parcelado não encontrado');
    }
  } else {
    console.warn('⚠️ Container do preço parcelado não encontrado');
  }
  
  // Verificar sticky CTA
  const stickyCTA = document.querySelector('.fixed.bottom-0 .container span.text-xl.font-bold');
  if (stickyCTA) {
    const stickyStyle = window.getComputedStyle(stickyCTA);
    
    console.log('✅ Preço no CTA fixo encontrado');
    console.log(`   Tamanho da fonte: ${stickyStyle.fontSize}`);
    console.log(`   Background: ${stickyStyle.backgroundImage}`);
    
    // Verificar se o gradiente também foi aplicado no sticky
    if (stickyStyle.backgroundImage.includes('gradient')) {
      console.log('✅ Gradiente aplicado corretamente ao preço no CTA fixo');
    } else {
      console.warn('⚠️ Gradiente não detectado no preço do CTA fixo');
    }
  } else {
    console.warn('⚠️ Preço no CTA fixo não encontrado');
  }
  
  console.log('✅ Verificação das cores concluída!');
  return true;
})();
