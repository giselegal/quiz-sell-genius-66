
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
    // Implement purchase approval logic
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
