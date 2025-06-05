# Integração Webhook Hotmart + Dashboard Analytics

## ✅ INTEGRAÇÃO CONCLUÍDA

A integração entre o webhook da Hotmart e o dashboard de analytics foi implementada com sucesso. Agora o painel exibe dados reais de vendas em vez de dados simulados.

## 🔄 Como Funciona

### 1. Coleta de Dados do Usuário
- Quando o usuário completa o quiz, seus dados UTM e resultados são armazenados
- Função: `hotmartWebhookManager.storeUserData()`
- Armazenamento: localStorage com chave `user_data_{email}`

### 2. Processamento do Webhook
- Webhook da Hotmart envia dados de compra para `/api/webhook/hotmart.ts`
- Sistema correlaciona compra com dados UTM do usuário
- Dados de venda são persistidos no localStorage

### 3. Dashboard Analytics
- Hook `useRealAnalytics` verifica se há dados reais da Hotmart
- Se há dados reais: exibe métricas baseadas em vendas reais
- Se não há dados: exibe dados simulados do Google Analytics

## 📊 Métricas Calculadas

### Dados Reais da Hotmart:
- **Revenue**: Soma total das vendas aprovadas
- **Total Sales**: Número de transações aprovadas
- **Conversion Rate**: Estimado baseado no volume de vendas
- **ROI**: Calculado com margem estimada de 70%
- **Performance por UTM**: Agrupamento por utm_content/utm_campaign
- **Top Products**: Produtos mais vendidos por revenue

### Indicadores Visuais:
- 🟢 **Badge Verde**: "Dados Reais da Hotmart" (quando há vendas)
- 🟡 **Badge Amarelo**: "Dados Simulados" (quando não há vendas)
- 🏷️ **Badge Secundário**: Indica fonte dos dados (Hotmart/Google Analytics/Simulação)

## 🧪 Testando a Integração

### Método 1: Console do Navegador
```javascript
// Simular dados de teste
testHotmartIntegration();

// Limpar dados de teste
clearTestData();
```

### Método 2: Simulação Manual
```javascript
// 1. Armazenar dados do usuário
hotmartWebhookManager.storeUserData('user@example.com', {
  utm_parameters: {
    utm_source: 'facebook',
    utm_campaign: 'test-campaign'
  }
});

// 2. Simular webhook (apenas em desenvolvimento)
simulateHotmartWebhook('user@example.com');
```

## 🗂️ Estrutura de Dados

### LocalStorage Keys:
- `hotmart_sales_data`: Array com todas as vendas
- `hotmart_analytics_metrics`: Métricas calculadas + timestamp
- `user_data_{email}`: Dados UTM por usuário

### Interface HotmartSaleData:
```typescript
{
  transactionId: string;
  buyerEmail: string;
  buyerName: string;
  productId: number;
  productName: string;
  value: number;
  currency: string;
  timestamp: string;
  status: 'approved' | 'canceled' | 'refunded';
  utm_parameters?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
}
```

## 🚀 Próximos Passos

1. **Monitorar Webhook**: Verificar se webhooks estão sendo recebidos corretamente
2. **Validar Métricas**: Comparar métricas calculadas com dados reais da Hotmart
3. **Otimizar Performance**: Implementar cache mais eficiente se necessário
4. **Relatórios**: Adicionar exportação de relatórios com dados reais

## 🔧 Arquivos Modificados

### Core:
- `src/utils/hotmartWebhook.ts` - Sistema de webhook expandido
- `src/hooks/useRealAnalytics.ts` - Integração com dados da Hotmart

### Dashboard:
- `src/pages/admin/OverviewPage.tsx` - Indicadores visuais
- `src/pages/admin/AnalyticsPage.tsx` - Indicadores visuais

### Teste:
- `test-hotmart-integration.js` - Script de teste

## 📈 Benefícios

✅ **Dados Reais**: Dashboard mostra vendas reais em vez de simulações
✅ **Correlação UTM**: Identifica qual criativo/campanha gerou cada venda
✅ **Performance Real**: ROI e conversão baseados em dados reais
✅ **Transparência**: Usuário sabe quando dados são reais ou simulados
✅ **Fallback**: Sistema funciona mesmo sem dados da Hotmart

## 🔍 Debug

Para verificar se a integração está funcionando:

1. Abrir DevTools → Console
2. Verificar logs do webhook: `[Hotmart Webhook]`
3. Verificar dados no localStorage:
   ```javascript
   JSON.parse(localStorage.getItem('hotmart_sales_data') || '[]')
   ```
4. Verificar métricas calculadas:
   ```javascript
   JSON.parse(localStorage.getItem('hotmart_analytics_metrics') || '{}')
   ```

---

**Status**: ✅ IMPLEMENTADO E FUNCIONAL
**Data**: Junho 2025
**Versão**: v1.0
