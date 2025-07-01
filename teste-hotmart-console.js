// Script de teste da integração Hotmart - Execute no console do navegador
// Acesse http://localhost:8080/admin e cole este código no console

console.log("🧪 Iniciando teste de integração Hotmart...");

// Simular dados de vendas da Hotmart
const testSales = [
  {
    transactionId: "HOTMART-TEST-001",
    value: 197.0,
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "quiz-personality",
    status: "completed",
    timestamp: new Date().toISOString(),
  },
  {
    transactionId: "HOTMART-TEST-002",
    value: 197.0,
    utmSource: "facebook",
    utmMedium: "ads",
    utmCampaign: "quiz-retargeting",
    status: "completed",
    timestamp: new Date().toISOString(),
  },
  {
    transactionId: "HOTMART-TEST-003",
    value: 197.0,
    utmSource: "instagram",
    utmMedium: "stories",
    utmCampaign: "quiz-social",
    status: "completed",
    timestamp: new Date().toISOString(),
  },
];

// Função para simular vendas
function simularVendasHotmart() {
  console.log("💰 Simulando vendas da Hotmart...");

  // Armazenar dados no localStorage
  const salesData = JSON.parse(
    localStorage.getItem("hotmart_sales_data") || "[]"
  );

  testSales.forEach((sale) => {
    salesData.push(sale);
    console.log(
      `✅ Venda adicionada: ${sale.transactionId} - R$ ${sale.value}`
    );
  });

  localStorage.setItem("hotmart_sales_data", JSON.stringify(salesData));

  // Calcular métricas
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.value, 0);
  const totalSales = salesData.length;

  const metrics = {
    totalRevenue,
    totalSales,
    averageOrderValue: totalRevenue / totalSales,
    conversionRate: 15.5,
    performanceByUTM: {},
    isRealData: true,
    dataSource: "Hotmart",
  };

  // Agrupar por UTM
  salesData.forEach((sale) => {
    if (!metrics.performanceByUTM[sale.utmSource]) {
      metrics.performanceByUTM[sale.utmSource] = {
        revenue: 0,
        sales: 0,
        roi: 0,
      };
    }
    metrics.performanceByUTM[sale.utmSource].revenue += sale.value;
    metrics.performanceByUTM[sale.utmSource].sales += 1;
    metrics.performanceByUTM[sale.utmSource].roi = (
      Math.random() * 5 +
      2
    ).toFixed(1);
  });

  localStorage.setItem("hotmart_analytics_metrics", JSON.stringify(metrics));

  console.log("📊 Métricas calculadas:", metrics);
  console.log(
    "✅ Dados armazenados! Recarregue a página para ver os dados reais."
  );
}

// Função para limpar dados de teste
function limparDadosHotmart() {
  localStorage.removeItem("hotmart_sales_data");
  localStorage.removeItem("hotmart_analytics_metrics");
  console.log(
    "🧹 Dados da Hotmart removidos. Recarregue a página para ver dados simulados."
  );
}

// Função para verificar dados atuais
function verificarDadosHotmart() {
  const sales = JSON.parse(localStorage.getItem("hotmart_sales_data") || "[]");
  const metrics = JSON.parse(
    localStorage.getItem("hotmart_analytics_metrics") || "{}"
  );

  console.log("📈 Dados atuais:");
  console.log("Vendas:", sales);
  console.log("Métricas:", metrics);

  return { sales, metrics };
}

// Disponibilizar funções globalmente
window.simularVendasHotmart = simularVendasHotmart;
window.limparDadosHotmart = limparDadosHotmart;
window.verificarDadosHotmart = verificarDadosHotmart;

console.log(`
🎯 INSTRUÇÕES PARA TESTE:

1. Execute: simularVendasHotmart()
   - Adiciona vendas de teste da Hotmart
   - Calcula métricas reais

2. Recarregue a página para ver os badges "Dados Reais da Hotmart"

3. Execute: verificarDadosHotmart()
   - Mostra dados armazenados atualmente

4. Execute: limparDadosHotmart()
   - Remove dados de teste e volta aos dados simulados

🔍 Procure pelos badges verdes "Dados Reais da Hotmart" nas páginas:
- /admin (Overview)
- /admin/analytics (Analytics)
`);
