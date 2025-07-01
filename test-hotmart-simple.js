// Script para testar a integração com Hotmart via fetch
const testHotmartIntegration = async () => {
  console.log("🧪 Iniciando teste de integração com Hotmart...");

  // Dados de teste simulando vendas da Hotmart
  const testSales = [
    {
      transactionId: "HOTMART-TEST-001",
      event: "PURCHASE_COMPLETE",
      value: 197.0,
      currency: "BRL",
      productId: "quiz-personality-pro",
      buyerEmail: "teste1@email.com",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "quiz-personality",
      timestamp: new Date().toISOString(),
    },
    {
      transactionId: "HOTMART-TEST-002",
      event: "PURCHASE_COMPLETE",
      value: 197.0,
      currency: "BRL",
      productId: "quiz-personality-pro",
      buyerEmail: "teste2@email.com",
      utmSource: "facebook",
      utmMedium: "ads",
      utmCampaign: "quiz-retargeting",
      timestamp: new Date().toISOString(),
    },
    {
      transactionId: "HOTMART-TEST-003",
      event: "PURCHASE_COMPLETE",
      value: 197.0,
      currency: "BRL",
      productId: "quiz-personality-pro",
      buyerEmail: "teste3@email.com",
      utmSource: "instagram",
      utmMedium: "stories",
      utmCampaign: "quiz-social",
      timestamp: new Date().toISOString(),
    },
  ];

  try {
    console.log("📡 Enviando vendas de teste para o webhook...");

    for (let i = 0; i < testSales.length; i++) {
      const sale = testSales[i];
      console.log(`Enviando venda ${i + 1}:`, sale.transactionId);

      const response = await fetch(
        "http://localhost:8083/api/hotmart/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Hotmart-Hottok": "test-token",
          },
          body: JSON.stringify(sale),
        }
      );

      if (response.ok) {
        const result = await response.text();
        console.log(`✅ Venda ${sale.transactionId} processada:`, result);
      } else {
        console.log(
          `❌ Erro ao processar venda ${sale.transactionId}:`,
          response.status
        );
      }

      // Aguarda 500ms entre requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("\n🎯 Testando endpoint de métricas...");
    const metricsResponse = await fetch(
      "http://localhost:8083/api/analytics/metrics"
    );

    if (metricsResponse.ok) {
      const metrics = await metricsResponse.json();
      console.log("📊 Métricas obtidas:", JSON.stringify(metrics, null, 2));
    } else {
      console.log("❌ Erro ao obter métricas:", metricsResponse.status);
    }

    console.log(
      "\n✅ Teste concluído! Acesse o dashboard em http://localhost:8083/admin para ver os dados reais."
    );
    console.log(
      '🔍 Procure pelos badges "Dados Reais da Hotmart" nas páginas de Overview e Analytics.'
    );
  } catch (error) {
    console.error("❌ Erro durante o teste:", error.message);
  }
};

// Executa o teste
testHotmartIntegration();
