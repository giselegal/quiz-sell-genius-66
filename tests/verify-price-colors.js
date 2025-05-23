/**
 * Script para verificar a implementação das cores e imagens na seção de preços
 * 
 * Este script verifica se as cores, elementos visuais e imagens foram
 * aplicados corretamente na exibição de preços na página de resultados.
 */

(function checkPriceColorAndImages() {
  console.log('🔍 Verificando cores, efeitos visuais e imagens na exibição de preços...');
  
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
  
  // Verificar ícone de tempo limitado
  const timerIcon = mainCTA.querySelector('.absolute.-top-3.-left-16');
  if (timerIcon) {
    console.log('✅ Ícone de tempo limitado encontrado');
    
    // Verificar animação
    const hasAnimationClass = timerIcon.querySelector('.animate-pulse') !== null;
    console.log(`   Animação de pulso: ${hasAnimationClass ? 'Presente' : 'Ausente'}`);
    
    // Verificar texto
    const timerText = timerIcon.textContent?.trim();
    console.log(`   Texto do timer: ${timerText}`);
  } else {
    console.warn('⚠️ Ícone de tempo limitado não encontrado');
  }
  
  // Verificar mockup do guia
  const guideMockup = mainCTA.querySelector('.mt-6.relative.max-w-\\[180px\\]');
  if (guideMockup) {
    console.log('✅ Mockup do guia encontrado');
    
    // Verificar rotação
    const mockupElement = guideMockup.querySelector('.transform.-rotate-3');
    if (mockupElement) {
      console.log('   Rotação aplicada corretamente');
    } else {
      console.warn('⚠️ Rotação no mockup não encontrada');
    }
    
    // Verificar selo de garantia
    const garanteeElement = guideMockup.querySelector('.absolute.-bottom-4.-right-4');
    if (garanteeElement) {
      console.log('✅ Selo de garantia encontrado');
      const garanteeText = garanteeElement.textContent?.trim();
      console.log(`   Texto da garantia: ${garanteeText}`);
    } else {
      console.warn('⚠️ Selo de garantia não encontrado');
    }
  } else {
    console.warn('⚠️ Mockup do guia não encontrado');
  }
  
  // Verificar preço parcelado
  const installmentContainer = mainCTA.querySelector('p:nth-child(3)');
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
  
  // Verificar botão com efeito brilho
  const ctaButton = document.querySelector('#cta button.group');
  if (ctaButton) {
    console.log('✅ Botão com classe "group" encontrado');
    
    // Verificar efeito de brilho
    const shineEffect = ctaButton.querySelector('div.absolute.bg-white');
    if (shineEffect) {
      console.log('✅ Efeito de brilho encontrado no botão');
    } else {
      console.warn('⚠️ Efeito de brilho não encontrado no botão');
    }
    
    // Verificar ícone animado
    const cartIcon = ctaButton.querySelector('.group-hover\\:scale-110');
    if (cartIcon) {
      console.log('✅ Ícone com animação de hover encontrado');
    } else {
      console.warn('⚠️ Ícone sem animação de hover');
    }
  } else {
    console.warn('⚠️ Botão com classe "group" não encontrado');
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
  
  console.log('✅ Verificação das cores e imagens concluída!');
  return true;
})();
