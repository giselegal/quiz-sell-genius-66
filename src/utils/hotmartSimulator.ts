// Simulador de dados da Hotmart para demonstração
// Este arquivo pode ser usado para testar a integração sem depender de webhooks reais

import { hotmartWebhookManager, HotmartWebhookData } from "./hotmartWebhook";

// Função para simular vendas da Hotmart
export const simulateHotmartSales = () => {
  console.log("🧪 Simulando vendas da Hotmart...");

  // Dados de vendas simuladas - usando formato correto do webhook
  const testSales: HotmartWebhookData[] = [
    {
      event: "PURCHASE_COMPLETE",
      webhook_id: "test-webhook-001",
      timestamp: new Date().toISOString(),
      data: {
        purchase: {
          transaction: "HM-2025-001",
          checkout_country: "BR",
          approved_date: new Date().toISOString(),
        },
        buyer: {
          email: "test1@example.com",
          name: "Usuário Teste 1",
          document: "123.456.789-00",
        },
        transaction: {
          id: "HM-2025-001",
          timestamp: new Date().toISOString(),
        },
      },
    },
    {
      event: "PURCHASE_COMPLETE",
      webhook_id: "test-webhook-002",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      data: {
        purchase: {
          transaction: "HM-2025-002",
          checkout_country: "BR",
          approved_date: new Date(Date.now() - 3600000).toISOString(),
        },
        buyer: {
          email: "test2@example.com",
          name: "Usuário Teste 2",
          document: "987.654.321-00",
        },
        transaction: {
          id: "HM-2025-002",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
      },
    },
    {
      event: "PURCHASE_COMPLETE",
      webhook_id: "test-webhook-003",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      data: {
        purchase: {
          transaction: "HM-2025-003",
          checkout_country: "BR",
          approved_date: new Date(Date.now() - 7200000).toISOString(),
        },
        buyer: {
          email: "test3@example.com",
          name: "Usuário Teste 3",
          document: "543.210.987-00",
        },
        transaction: {
          id: "HM-2025-003",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
      },
    },
    {
      event: "PURCHASE_COMPLETE",
      webhook_id: "test-webhook-004",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      data: {
        purchase: {
          transaction: "HM-2025-004",
          checkout_country: "BR",
          approved_date: new Date(Date.now() - 10800000).toISOString(),
        },
        buyer: {
          email: "test4@example.com",
          name: "Usuário Teste 4",
          document: "876.543.210-00",
        },
        transaction: {
          id: "HM-2025-004",
          timestamp: new Date(Date.now() - 10800000).toISOString(),
        },
      },
    },
    {
      event: "PURCHASE_COMPLETE",
      webhook_id: "test-webhook-005",
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      data: {
        purchase: {
          transaction: "HM-2025-005",
          checkout_country: "BR",
          approved_date: new Date(Date.now() - 14400000).toISOString(),
        },
        buyer: {
          email: "test5@example.com",
          name: "Usuário Teste 5",
          document: "321.654.987-00",
        },
        transaction: {
          id: "HM-2025-005",
          timestamp: new Date(Date.now() - 14400000).toISOString(),
        },
      },
    },
  ];

  // Processar cada venda usando o sistema de webhook existente
  testSales.forEach(async (saleData) => {
    try {
      await hotmartWebhookManager.processWebhook(saleData);
    } catch (error) {
      console.error("Erro ao processar venda simulada:", error);
    }
  });

  console.log(`✅ ${testSales.length} vendas simuladas processadas`);
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
