// Servidor Express para simular endpoints de API durante desenvolvimento
const express = require('express');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Endpoint para webhook da Hotmart
app.post('/api/hotmart/webhook', async (req, res) => {
  try {
    console.log('🔄 Webhook Hotmart recebido:', req.body);
    
    // Simular processamento do webhook
    const webhookData = {
      event: 'PURCHASE_COMPLETE',
      data: {
        transaction: {
          id: req.body.transactionId,
          value: req.body.value,
          currency: req.body.currency || 'BRL'
        },
        buyer: {
          email: req.body.buyerEmail
        },
        affiliations: {
          utm_source: req.body.utmSource,
          utm_medium: req.body.utmMedium,
          utm_campaign: req.body.utmCampaign
        }
      },
      webhook_id: 'test-webhook-' + Date.now(),
      timestamp: req.body.timestamp || new Date().toISOString()
    };

    // Armazenar os dados usando o sistema existente
    const saleData = {
      transactionId: req.body.transactionId,
      value: req.body.value,
      utmSource: req.body.utmSource,
      utmMedium: req.body.utmMedium,
      utmCampaign: req.body.utmCampaign,
      status: 'completed',
      timestamp: req.body.timestamp || new Date().toISOString()
    };

    // Simular armazenamento no localStorage (seria feito no frontend)
    // Aqui só retornamos sucesso
    
    res.json({
      success: true,
      message: 'Webhook processado com sucesso',
      transactionId: req.body.transactionId
    });

  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// Endpoint para métricas de analytics
app.get('/api/analytics/metrics', (req, res) => {
  try {
    // Simular métricas baseadas em dados da Hotmart
    const metrics = {
      totalRevenue: 591.00, // 3 vendas x 197
      totalSales: 3,
      averageOrderValue: 197.00,
      conversionRate: 15.5,
      performanceByUTM: {
        google: { revenue: 197, sales: 1, roi: 4.2 },
        facebook: { revenue: 197, sales: 1, roi: 3.8 },
        instagram: { revenue: 197, sales: 1, roi: 5.1 }
      },
      isRealData: true,
      dataSource: 'Hotmart'
    };

    res.json(metrics);
  } catch (error) {
    console.error('❌ Erro ao obter métricas:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de API rodando em http://localhost:${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/api/hotmart/webhook`);
  console.log(`📊 Metrics endpoint: http://localhost:${PORT}/api/analytics/metrics`);
});

module.exports = app;
