/**
 * Utilitários para integração com a plataforma Hotmart
 */

interface HotmartPurchase {
  transaction: string;
  status: string;
  approved_date: number;
  price: {
    value: number;
    currency_value: string;
  };
}

interface HotmartProduct {
  id: number | string;
  name: string;
}

interface HotmartBuyer {
  email: string;
  name: string;
}

interface HotmartWebhook {
  id: string;
  event: string;
  version: string;
  data: {
    product: HotmartProduct;
    buyer: HotmartBuyer;
    purchase: HotmartPurchase;
    affiliates?: Array<any>;
    custom_fields?: Record<string, any>;
  };
}

/**
 * Classe principal para lidar com eventos da Hotmart
 */
class HotmartIntegration {
  private apiKey: string | null = null;
  private apiUrl: string = 'https://api-sec-vlc.hotmart.com';
  private webhookSecret: string | null = null;

  constructor() {
    // Tentar carregar as credenciais do ambiente se disponíveis
    this.apiKey = process.env.HOTMART_API_KEY || null;
    this.webhookSecret = process.env.HOTMART_WEBHOOK_SECRET || null;
  }

  /**
   * Configura as credenciais da API Hotmart
   */
  public setCredentials(apiKey: string, webhookSecret: string): void {
    this.apiKey = apiKey;
    this.webhookSecret = webhookSecret;
  }

  /**
   * Processa eventos de webhook da Hotmart
   */
  public async processWebhook(webhookData: HotmartWebhook): Promise<boolean> {
    try {
      // Validação básica do evento
      if (!webhookData.event || !webhookData.data) {
        console.error('Dados de webhook inválidos');
        return false;
      }

      // Processar diferentes tipos de eventos
      switch (webhookData.event) {
        case 'PURCHASE_COMPLETE':
          return await this.handlePurchaseComplete(webhookData);
        
        case 'PURCHASE_CANCELED':
        case 'PURCHASE_REFUNDED':
          return await this.handlePurchaseCanceled(webhookData);
          
        case 'SUBSCRIPTION_CANCELED':
          return await this.handleSubscriptionCanceled(webhookData);
          
        case 'SUBSCRIPTION_RESTARTED':
          return await this.handleSubscriptionRestarted(webhookData);
          
        default:
          console.log(`Evento não tratado: ${webhookData.event}`);
          return true; // Retornamos true para não reprocessar eventos desconhecidos
      }
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      return false;
    }
  }

  /**
   * Lida com eventos de compra completa
   */
  private async handlePurchaseComplete(webhookData: HotmartWebhook): Promise<boolean> {
    try {
      const { product, buyer, purchase } = webhookData.data;
      
      console.log(`Processando compra: ${purchase.transaction} - Produto: ${product.name} - Cliente: ${buyer.email}`);
      
      // Em um ambiente real, aqui você pode:
      // 1. Registrar a compra em seu banco de dados
      // 2. Conceder acesso ao produto para o cliente
      // 3. Enviar e-mail de boas-vindas
      // 4. Registrar comissões para afiliados, se houver
      
      return true;
    } catch (error) {
      console.error('Erro ao processar compra:', error);
      return false;
    }
  }

  /**
   * Lida com eventos de compra cancelada ou reembolsada
   */
  private async handlePurchaseCanceled(webhookData: HotmartWebhook): Promise<boolean> {
    try {
      const { product, buyer, purchase } = webhookData.data;
      
      console.log(`Processando cancelamento/reembolso: ${purchase.transaction} - Produto: ${product.name} - Cliente: ${buyer.email}`);
      
      // Em um ambiente real, aqui você pode:
      // 1. Marcar a compra como cancelada em seu banco de dados
      // 2. Revogar acesso ao produto
      // 3. Registrar o reembolso para fins de contabilidade
      
      return true;
    } catch (error) {
      console.error('Erro ao processar cancelamento:', error);
      return false;
    }
  }

  /**
   * Lida com eventos de cancelamento de assinatura
   */
  private async handleSubscriptionCanceled(webhookData: HotmartWebhook): Promise<boolean> {
    try {
      const { product, buyer, purchase } = webhookData.data;
      
      console.log(`Processando cancelamento de assinatura: ${purchase.transaction} - Produto: ${product.name} - Cliente: ${buyer.email}`);
      
      // Em um ambiente real, aqui você pode:
      // 1. Atualizar o status da assinatura em seu banco de dados
      // 2. Agendar a revogação de acesso para o final do período pago
      // 3. Enviar e-mail de confirmação de cancelamento
      
      return true;
    } catch (error) {
      console.error('Erro ao processar cancelamento de assinatura:', error);
      return false;
    }
  }

  /**
   * Lida com eventos de reinício de assinatura
   */
  private async handleSubscriptionRestarted(webhookData: HotmartWebhook): Promise<boolean> {
    try {
      const { product, buyer, purchase } = webhookData.data;
      
      console.log(`Processando reinício de assinatura: ${purchase.transaction} - Produto: ${product.name} - Cliente: ${buyer.email}`);
      
      // Em um ambiente real, aqui você pode:
      // 1. Reativar a assinatura em seu banco de dados
      // 2. Garantir que o acesso ao produto seja restaurado
      // 3. Enviar e-mail de confirmação de reativação
      
      return true;
    } catch (error) {
      console.error('Erro ao processar reinício de assinatura:', error);
      return false;
    }
  }

  /**
   * Verifica o status de uma compra específica
   */
  public async checkPurchaseStatus(transactionId: string): Promise<any> {
    try {
      console.log(`Verificando status da compra: ${transactionId}`);
      
      // Esta é uma simulação para ambiente de desenvolvimento.
      // Em um ambiente real, você faria uma chamada à API da Hotmart como:
      /*
      if (!this.apiKey) {
        throw new Error('API Key não configurada');
      }

      const response = await fetch(`${this.apiUrl}/payments/api/v1/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
      */
      
      // Retorno simulado
      return {
        transaction: transactionId,
        status: 'APPROVED',
        purchase_date: new Date().toISOString(),
        product: { id: '123456', name: 'Produto Simulado' },
        buyer: { email: 'cliente@exemplo.com', name: 'Cliente Simulado' }
      };
    } catch (error) {
      console.error('Erro ao verificar status da compra:', error);
      throw error;
    }
  }
}

// Exportamos uma instância única para ser usada em toda a aplicação
export const hotmart = new HotmartIntegration();
