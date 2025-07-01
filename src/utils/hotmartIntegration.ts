
export interface HotmartProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  checkoutUrl: string;
}

export interface HotmartWebhookData {
  event: string;
  product: HotmartProduct;
  buyer: {
    email: string;
    name: string;
  };
  transaction: {
    id: string;
    status: string;
    amount: number;
  };
}

export class HotmartIntegration {
  private apiKey: string;
  private baseUrl: string = 'https://api.hotmart.com/v1';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async createCheckoutUrl(productId: string, buyerEmail?: string): Promise<string> {
    try {
      const params = new URLSearchParams({
        product_id: productId,
        ...(buyerEmail && { buyer_email: buyerEmail })
      });
      
      const response = await fetch(`${this.baseUrl}/checkout?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Hotmart API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.checkout_url;
    } catch (error) {
      console.error('Error creating Hotmart checkout URL:', error);
      throw error;
    }
  }
  
  async getProductInfo(productId: string): Promise<HotmartProduct> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Hotmart API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting Hotmart product info:', error);
      throw error;
    }
  }
  
  validateWebhook(webhookData: HotmartWebhookData): boolean {
    try {
      // Validate required fields
      const requiredFields = ['event', 'product', 'buyer', 'transaction'];
      return requiredFields.every(field => webhookData.hasOwnProperty(field));
    } catch (error) {
      console.error('Error validating Hotmart webhook:', error);
      return false;
    }
  }
  
  processWebhook(webhookData: HotmartWebhookData): void {
    try {
      if (!this.validateWebhook(webhookData)) {
        throw new Error('Invalid webhook data');
      }
      
      console.log('Processing Hotmart webhook:', webhookData.event);
      
      // Handle different event types
      switch (webhookData.event) {
        case 'PURCHASE_APPROVED':
          this.handlePurchaseApproved(webhookData);
          break;
        case 'PURCHASE_CANCELED':
          this.handlePurchaseCanceled(webhookData);
          break;
        case 'REFUND_REQUESTED':
          this.handleRefundRequested(webhookData);
          break;
        default:
          console.log('Unhandled webhook event:', webhookData.event);
      }
    } catch (error) {
      console.error('Error processing Hotmart webhook:', error);
    }
  }
  
  private handlePurchaseApproved(data: HotmartWebhookData): void {
    console.log('Purchase approved:', data.transaction.id);
    
    try {
      // 🎯 CONECTAR VENDA AOS DADOS DE TRACKING
      const userEmail = data.buyer.email;
      
      // Recuperar dados de tracking do usuário
      const userTrackingData = this.getUserTrackingData(userEmail);
      
      if (userTrackingData) {
        console.log('👤 Dados de tracking encontrados para:', userEmail, userTrackingData);
        
        // Enviar evento Purchase para Facebook com os UTMs originais
        if (typeof window !== 'undefined' && window.fbq) {
          const purchaseEventData = {
            value: data.transaction.amount,
            currency: 'BRL',
            content_name: data.product.name,
            content_type: 'product',
            transaction_id: data.transaction.id,
            // 🔥 DADOS DA CAMPANHA ORIGINAL:
            utm_source: userTrackingData.utm_parameters?.utm_source,
            utm_campaign: userTrackingData.utm_parameters?.utm_campaign,
            utm_content: userTrackingData.utm_parameters?.utm_content, // ← CRIATIVO QUE CONVERTEU!
            utm_medium: userTrackingData.utm_parameters?.utm_medium,
            utm_term: userTrackingData.utm_parameters?.utm_term,
            user_name: userTrackingData.user_name,
            funnel: userTrackingData.funnel,
            session_id: userTrackingData.session_id,
            event_id: `purchase_hotmart_${data.transaction.id}` // Evita duplicação
          };
          
          window.fbq('track', 'Purchase', purchaseEventData);
          
          console.log('🎯 Evento Purchase enviado para Facebook com dados originais:', purchaseEventData);
        }
        
        // Registrar venda no sistema de analytics
        if (typeof window !== 'undefined' && window.trackSaleConversion) {
          window.trackSaleConversion(
            data.transaction.amount, 
            data.product.name,
            data.transaction.id
          );
        }
        
      } else {
        console.warn('⚠️ Dados de tracking não encontrados para o usuário:', userEmail);
        
        // Mesmo sem dados de tracking, registrar a venda
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {
            value: data.transaction.amount,
            currency: 'BRL',
            content_name: data.product.name,
            transaction_id: data.transaction.id,
            event_id: `purchase_hotmart_${data.transaction.id}`
          });
        }
      }
      
    } catch (error) {
      console.error('❌ Erro ao processar compra aprovada:', error);
    }
  }
  
  /**
   * Recupera dados de tracking de um usuário pelo email
   */
  private getUserTrackingData(email: string): any {
    try {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem(`user_tracking_${email}`);
        return userData ? JSON.parse(userData) : null;
      }
      return null;
    } catch (error) {
      console.error('Erro ao recuperar dados de tracking:', error);
      return null;
    }
  }
  
  private handlePurchaseCanceled(data: HotmartWebhookData): void {
    console.log('Purchase canceled:', data.transaction.id);
    // Implement purchase cancellation logic
  }
  
  private handleRefundRequested(data: HotmartWebhookData): void {
    console.log('Refund requested:', data.transaction.id);
    // Implement refund logic
  }
}

export const createHotmartIntegration = (apiKey: string): HotmartIntegration => {
  return new HotmartIntegration(apiKey);
};
