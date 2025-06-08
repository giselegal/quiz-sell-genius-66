
import { HotmartPurchase, HotmartBuyer } from '@/types/hotmart';
import { getUserDataForEmail, storeUserForHotmart } from './userManagement';
import { trackConversion } from './analytics';

export interface HotmartWebhookPayload {
  event: string;
  data: any;
}

export const hotmartWebhookManager = {
  async processWebhook(payload: any) {
    try {
      const purchaseData = payload as HotmartPurchase;
      
      if (purchaseData.event === 'PURCHASE_COMPLETE') {
        // Track conversion using the available trackConversion function
        trackConversion('purchase', {
          email: purchaseData.data.buyer.email,
          value: purchaseData.data.purchase.price.value,
          currency: purchaseData.data.purchase.price.currency_code,
          product_name: purchaseData.data.product.name
        });
        
        // Store user data
        const userData = getUserDataForEmail(purchaseData.data.buyer.email);
        if (userData) {
          console.log('[Hotmart] Correlação encontrada:', userData);
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error('[Hotmart] Erro no webhook:', error);
      return { success: false, error };
    }
  }
};

// Export the function that was missing
export { storeUserForHotmart };
