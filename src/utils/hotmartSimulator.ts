// Simulador de dados da Hotmart para demonstração
// Este arquivo pode ser usado para testar a integração sem depender de webhooks reais

import { hotmartWebhookManager } from "./hotmartWebhook";

// Função para simular vendas da Hotmart
export const simulateHotmartSales = () => {
  console.log("🧪 Simulando vendas da Hotmart...");

  // Dados de vendas simuladas
  const testSales = [
    {
      transactionId: "HM-2025-001",
      value: 197.0,
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "quiz-personality-google",
      status: "completed" as const,
      timestamp: new Date().toISOString(),
    },
    {
      transactionId: "HM-2025-002",
      value: 197.0,
      utmSource: "facebook",
      utmMedium: "ads",
      utmCampaign: "quiz-retargeting-fb",
      status: "completed" as const,
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
    },
    {
      transactionId: "HM-2025-003",
      value: 197.0,
      utmSource: "instagram",
      utmMedium: "stories",
      utmCampaign: "quiz-social-ig",
      status: "completed" as const,
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
    },
    {
      transactionId: "HM-2025-004",
      value: 197.0,
      utmSource: "email",
      utmMedium: "newsletter",
      utmCampaign: "quiz-email-campaign",
      status: "completed" as const,
      timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 horas atrás
    },
    {
      transactionId: "HM-2025-005",
      value: 197.0,
      utmSource: "direct",
      utmMedium: "organic",
      utmCampaign: "quiz-direct-access",
      status: "completed" as const,
      timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 horas atrás
    },
  ];

  // Armazenar cada venda usando o sistema existente
  testSales.forEach((sale) => {
    hotmartWebhookManager.storeSaleData(sale);
  });

  console.log(`✅ ${testSales.length} vendas simuladas adicionadas`);
  console.log("📊 Total de revenue:", hotmartWebhookManager.getTotalRevenue());
  console.log("📈 Total de vendas:", hotmartWebhookManager.getTotalSales());

  return testSales;
};

// Função para limpar dados de teste
export const clearHotmartTestData = () => {
  localStorage.removeItem("hotmart_sales_data");
  localStorage.removeItem("hotmart_analytics_metrics");
  console.log("🧹 Dados de teste da Hotmart removidos");
};

// Função para verificar se há dados da Hotmart
export const hasHotmartData = () => {
  return hotmartWebhookManager.hasRealSalesData();
};

// Disponibilizar funções globalmente para teste no console
if (typeof window !== "undefined") {
  (window as any).simulateHotmartSales = simulateHotmartSales;
  (window as any).clearHotmartTestData = clearHotmartTestData;
  (window as any).hasHotmartData = hasHotmartData;
  (window as any).hotmartWebhookManager = hotmartWebhookManager;

  console.log("🔧 Funções de teste da Hotmart disponíveis no console:");
  console.log("- simulateHotmartSales() - Simula 5 vendas da Hotmart");
  console.log("- clearHotmartTestData() - Remove dados de teste");
  console.log("- hasHotmartData() - Verifica se há dados da Hotmart");
  console.log("- hotmartWebhookManager - Acesso direto ao gerenciador");
}
