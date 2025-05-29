/**
 * Configuração de Exemplo para Testes A/B
 * 
 * Este arquivo contém exemplos de como configurar testes A/B
 * no sistema Quiz Sell Genius
 */

const exampleABTests = [
  {
    "id": "result_page_style_test",
    "name": "Teste de Estilo da Página de Resultado",
    "type": "result",
    "isActive": true,
    "startDate": "2025-05-29T00:00:00.000Z",
    "endDate": "2025-06-29T23:59:59.000Z",
    "variations": [
      {
        "id": "control",
        "name": "Controle (Original)",
        "trafficPercentage": 50,
        "content": {
          "styles": {
            "primaryColor": "#B89B7A",
            "ctaButtonStyle": "default",
            "headerStyle": "classic"
          }
        }
      },
      {
        "id": "variant_modern",
        "name": "Variante Moderna",
        "trafficPercentage": 50,
        "content": {
          "styles": {
            "primaryColor": "#8B5A3C",
            "ctaButtonStyle": "modern",
            "headerStyle": "bold"
          }
        }
      }
    ]
  },
  {
    "id": "pricing_test",
    "name": "Teste de Preços",
    "type": "sales",
    "isActive": true,
    "startDate": "2025-05-29T00:00:00.000Z",
    "endDate": "2025-07-01T23:59:59.000Z",
    "variations": [
      {
        "id": "price_original",
        "name": "Preço Original",
        "trafficPercentage": 33,
        "content": {
          "pricing": {
            "originalPrice": "R$ 197,00",
            "discountPrice": "R$ 97,00",
            "discountPercentage": "51%"
          }
        }
      },
      {
        "id": "price_higher",
        "name": "Preço Mais Alto",
        "trafficPercentage": 33,
        "content": {
          "pricing": {
            "originalPrice": "R$ 297,00",
            "discountPrice": "R$ 127,00",
            "discountPercentage": "57%"
          }
        }
      },
      {
        "id": "price_lower",
        "name": "Preço Mais Baixo",
        "trafficPercentage": 34,
        "content": {
          "pricing": {
            "originalPrice": "R$ 147,00",
            "discountPrice": "R$ 67,00",
            "discountPercentage": "54%"
          }
        }
      }
    ]
  },
  {
    "id": "cta_button_test",
    "name": "Teste de Botão CTA",
    "type": "result",
    "isActive": true,
    "startDate": "2025-05-29T00:00:00.000Z",
    "endDate": "2025-06-15T23:59:59.000Z",
    "variations": [
      {
        "id": "cta_control",
        "name": "CTA Original",
        "trafficPercentage": 25,
        "content": {
          "ctaText": "QUERO MEU GUIA PERSONALIZADO",
          "ctaStyle": "primary"
        }
      },
      {
        "id": "cta_urgency",
        "name": "CTA com Urgência",
        "trafficPercentage": 25,
        "content": {
          "ctaText": "GARANTIR AGORA - OFERTA LIMITADA",
          "ctaStyle": "urgent"
        }
      },
      {
        "id": "cta_benefit",
        "name": "CTA com Benefício",
        "trafficPercentage": 25,
        "content": {
          "ctaText": "TRANSFORMAR MEU ESTILO HOJE",
          "ctaStyle": "benefit"
        }
      },
      {
        "id": "cta_simple",
        "name": "CTA Simples",
        "trafficPercentage": 25,
        "content": {
          "ctaText": "COMPRAR AGORA",
          "ctaStyle": "simple"
        }
      }
    ]
  },
  {
    "id": "domain_specific_test",
    "name": "Teste Específico por Domínio",
    "type": "result",
    "isActive": true,
    "startDate": "2025-05-29T00:00:00.000Z",
    "variations": [
      {
        "id": "localhost_variant",
        "name": "Variante para Localhost",
        "domain": "localhost",
        "content": {
          "showDebugInfo": true,
          "testMode": true
        }
      },
      {
        "id": "production_variant",
        "name": "Variante para Produção",
        "domain": "production-domain.com",
        "content": {
          "showDebugInfo": false,
          "testMode": false
        }
      }
    ]
  }
];

/**
 * Função para configurar os testes A/B de exemplo
 */
function setupExampleABTests() {
  try {
    // Salvar no localStorage
    localStorage.setItem('ab_tests', JSON.stringify(exampleABTests));
    
    console.log('✅ Testes A/B de exemplo configurados!');
    console.log('📊 Total de testes criados:', exampleABTests.length);
    console.log('🔍 Para visualizar: localStorage.getItem("ab_tests")');
    
    // Mostrar resumo dos testes
    exampleABTests.forEach(test => {
      console.log(`\n🧪 ${test.name}`);
      console.log(`   Tipo: ${test.type}`);
      console.log(`   Ativo: ${test.isActive ? 'Sim' : 'Não'}`);
      console.log(`   Variações: ${test.variations.length}`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao configurar testes A/B:', error);
    return false;
  }
}

/**
 * Função para simular um visitor A/B test
 */
function simulateABTestVisitor(testType = 'result') {
  try {
    const tests = JSON.parse(localStorage.getItem('ab_tests') || '[]');
    const activeTests = tests.filter(test => test.isActive && test.type === testType);
    
    if (activeTests.length === 0) {
      console.log('ℹ️ Nenhum teste ativo encontrado para o tipo:', testType);
      return null;
    }
    
    const test = activeTests[0]; // Usar o primeiro teste encontrado
    
    // Simular visitor ID
    const visitorId = Math.floor(Math.random() * 100);
    localStorage.setItem(`ab_test_${test.id}_visitor_id`, visitorId.toString());
    
    // Determinar variação baseada na distribuição
    let accumulatedPercentage = 0;
    let selectedVariation = null;
    
    for (const variation of test.variations) {
      accumulatedPercentage += variation.trafficPercentage || 0;
      if (visitorId < accumulatedPercentage) {
        selectedVariation = variation;
        break;
      }
    }
    
    if (selectedVariation) {
      console.log('🎲 Simulação de Visitor A/B Test:');
      console.log(`   Teste: ${test.name}`);
      console.log(`   Visitor ID: ${visitorId}`);
      console.log(`   Variação: ${selectedVariation.name}`);
      console.log(`   Conteúdo:`, selectedVariation.content);
      
      return {
        test,
        variation: selectedVariation,
        visitorId
      };
    }
    
    return null;
  } catch (error) {
    console.error('❌ Erro na simulação A/B:', error);
    return null;
  }
}

/**
 * Função para simular uma conversão A/B
 */
function simulateABConversion(testId, variationId) {
  try {
    const conversionKey = `ab_test_${testId}_${variationId}_conversions`;
    const currentConversions = localStorage.getItem(conversionKey);
    const newConversions = currentConversions ? parseInt(currentConversions, 10) + 1 : 1;
    
    localStorage.setItem(conversionKey, newConversions.toString());
    
    // Registrar timestamp
    const timestampKey = `ab_test_${testId}_${variationId}_conversion_timestamps`;
    const currentTimestamps = localStorage.getItem(timestampKey);
    const timestamps = currentTimestamps ? JSON.parse(currentTimestamps) : [];
    timestamps.push(new Date().toISOString());
    localStorage.setItem(timestampKey, JSON.stringify(timestamps));
    
    console.log('💰 Conversão A/B simulada:');
    console.log(`   Teste: ${testId}`);
    console.log(`   Variação: ${variationId}`);
    console.log(`   Total de conversões: ${newConversions}`);
    
    return newConversions;
  } catch (error) {
    console.error('❌ Erro ao simular conversão:', error);
    return 0;
  }
}

/**
 * Função para obter relatório de performance A/B
 */
function getABTestReport() {
  try {
    const tests = JSON.parse(localStorage.getItem('ab_tests') || '[]');
    const report = [];
    
    tests.forEach(test => {
      const testReport = {
        id: test.id,
        name: test.name,
        type: test.type,
        isActive: test.isActive,
        variations: []
      };
      
      test.variations.forEach(variation => {
        const conversionKey = `ab_test_${test.id}_${variation.id}_conversions`;
        const conversions = parseInt(localStorage.getItem(conversionKey) || '0', 10);
        
        testReport.variations.push({
          id: variation.id,
          name: variation.name,
          trafficPercentage: variation.trafficPercentage,
          conversions: conversions
        });
      });
      
      report.push(testReport);
    });
    
    console.log('📊 Relatório A/B Test:');
    console.table(report);
    
    return report;
  } catch (error) {
    console.error('❌ Erro ao gerar relatório:', error);
    return [];
  }
}

// Exportar funções
if (typeof window !== 'undefined') {
  window.ABTestExamples = {
    setup: setupExampleABTests,
    simulate: simulateABTestVisitor,
    convert: simulateABConversion,
    report: getABTestReport,
    data: exampleABTests
  };
  
  console.log('🧪 AB Test Examples carregado!');
  console.log('📝 Comandos disponíveis:');
  console.log('   ABTestExamples.setup() - Configurar testes de exemplo');
  console.log('   ABTestExamples.simulate("result") - Simular visitor');
  console.log('   ABTestExamples.convert(testId, variationId) - Simular conversão');
  console.log('   ABTestExamples.report() - Ver relatório de performance');
}

export default {
  exampleABTests,
  setupExampleABTests,
  simulateABTestVisitor,
  simulateABConversion,
  getABTestReport
};
