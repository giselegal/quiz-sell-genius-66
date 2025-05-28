import { hotmart } from '../../utils/hotmartIntegration';

// Função para processar webhook da Hotmart (simulação para frontend)
export async function handleHotmartWebhook(webhookData: any): Promise<boolean> {
  try {
    // Validar estrutura do webhook
    if (!webhookData.data || !webhookData.event) {
      console.error('Invalid webhook data structure');
      return false;
    }
    
    // Processar webhook
    await hotmart.processWebhook(webhookData);
    console.log('Webhook processado com sucesso:', webhookData.event);
    return true;
  } catch (error) {
    console.error('Erro ao processar webhook Hotmart:', error);
    return false;
  }
}
// Simulador de webhook para desenvolvimento/testes
export function simulateHotmartWebhook(eventType: string, productData: any) {
  const mockWebhookData = {
    id: `webhook_${Date.now()}`,
    event: eventType,
    version: '2.0.0',
    data: {
      product: {
        id: productData.id || 123456,
        name: productData.name || 'Produto Teste'
      },
      buyer: {
        email: 'teste@exemplo.com',
        name: 'Cliente Teste'
      purchase: {
        transaction: `txn_${Date.now()}`,
        status: eventType === 'PURCHASE_COMPLETE' ? 'APPROVED' : 'CANCELLED',
        approved_date: Math.floor(Date.now() / 1000),
        price: {
          value: productData.price || 297,
          currency_value: 'BRL'
        }
      affiliates: productData.affiliates || [],
      custom_fields: productData.customFields || {}
  };
  return handleHotmartWebhook(mockWebhookData);
