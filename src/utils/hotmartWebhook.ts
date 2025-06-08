import { HotmartPurchase, HotmartBuyer } from '@/types/hotmart';
import { getUserDataForEmail, storeUserForHotmart } from './userManagement';
import { trackSaleConversion } from './analytics';

export interface HotmartWebhookPayload {
  event: string;
  data: any;
}

export const hotmartWebhookManager = {
  async processWebhook(payload: any) {
    try {
      const purchaseData = payload as HotmartPurchase;
      
      if (purchaseData.event === 'PURCHASE_COMPLETE') {
        // Track conversion
        trackSaleConversion(purchaseData.data.buyer.email, purchaseData.data.purchase.price);
        
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
