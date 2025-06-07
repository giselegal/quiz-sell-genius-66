
// Tipos para integração com Hotmart
export interface HotmartPurchase {
  transaction: string;
  checkout_country: string;
  approved_date: string;
}

export interface HotmartBuyer {
  email: string;
  name: string;
  document: string;
}

export interface HotmartTransaction {
  id: string;
  timestamp: string;
}

export interface HotmartWebhookData {
  event: "PURCHASE_COMPLETE" | "PURCHASE_APPROVED" | "PURCHASE_CANCELED" | "PURCHASE_REFUNDED";
  webhook_id: string;
  timestamp: string;
  data: {
    purchase: HotmartPurchase;
    buyer: HotmartBuyer;
    transaction: HotmartTransaction;
  };
}

// Analytics metrics interface
export interface HotmartAnalyticsMetrics {
  totalSales: number;
  totalRevenue: number;
  conversionRate: number;
  averageOrderValue: number;
  salesTrend: number;
  revenueTrend: number;
  lastSaleDate?: string;
  topBuyerEmails: string[];
}

class HotmartWebhookManager {
  private salesData: HotmartWebhookData[] = [];
  private readonly STORAGE_KEY = "hotmart_sales_data";
  private readonly ANALYTICS_KEY = "hotmart_analytics_metrics";

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Processa um webhook recebido da Hotmart
   */
  async processWebhook(webhookData: HotmartWebhookData): Promise<void> {
    console.log("[Hotmart Webhook] Processando webhook:", webhookData);

    try {
      // Validar dados obrigatórios
      this.validateWebhookData(webhookData);

      // Adicionar aos dados de vendas
      this.salesData.push(webhookData);

      // Salvar no localStorage
      this.saveToStorage();

      // Atualizar métricas
      this.updateAnalyticsMetrics();

      console.log("[Hotmart Webhook] ✅ Webhook processado com sucesso!");
    } catch (error) {
      console.error("[Hotmart Webhook] ❌ Erro ao processar webhook:", error);
      throw error;
    }
  }

  /**
   * Valida os dados do webhook
   */
  private validateWebhookData(data: HotmartWebhookData): void {
    if (!data.event || !data.webhook_id || !data.timestamp) {
      throw new Error("Dados obrigatórios do webhook ausentes");
    }

    if (!data.data?.purchase?.transaction || !data.data?.buyer?.email) {
      throw new Error("Dados de compra ou comprador ausentes");
    }

    if (!data.data?.buyer?.document || !data.data?.transaction?.timestamp) {
      throw new Error("Documento do comprador ou timestamp da transação ausentes");
    }
  }

  /**
   * Retorna todas as vendas
   */
  getAllSales(): HotmartWebhookData[] {
    return [...this.salesData];
  }

  /**
   * Retorna o total de vendas
   */
  getTotalSales(): number {
    return this.salesData.filter(sale => 
      sale.event === "PURCHASE_COMPLETE" || sale.event === "PURCHASE_APPROVED"
    ).length;
  }

  /**
   * Retorna a receita total (simulada - em implementação real viria do webhook)
   */
  getTotalRevenue(): number {
    const completedSales = this.salesData.filter(sale => 
      sale.event === "PURCHASE_COMPLETE" || sale.event === "PURCHASE_APPROVED"
    );
    
    // Valor simulado por venda (R$ 39,00)
    return completedSales.length * 39;
  }

  /**
   * Verifica se há dados reais de vendas
   */
  hasRealSalesData(): boolean {
    return this.salesData.length > 0;
  }

  /**
   * Retorna métricas para analytics
   */
  getAnalyticsMetrics(): HotmartAnalyticsMetrics | null {
    if (!this.hasRealSalesData()) {
      return null;
    }

    const totalSales = this.getTotalSales();
    const totalRevenue = this.getTotalRevenue();
    const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

    // Calcular trends (simulado - em implementação real seria baseado em dados históricos)
    const salesTrend = Math.floor(Math.random() * 20) + 5; // +5-25%
    const revenueTrend = Math.floor(Math.random() * 15) + 3; // +3-18%

    const lastSale = this.salesData
      .filter(sale => sale.event === "PURCHASE_COMPLETE" || sale.event === "PURCHASE_APPROVED")
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

    const topBuyerEmails = this.salesData
      .map(sale => sale.data.buyer.email)
      .slice(0, 5);

    return {
      totalSales,
      totalRevenue,
      conversionRate: Math.min(totalSales * 2.5, 100), // Taxa de conversão estimada
      averageOrderValue,
      salesTrend,
      revenueTrend,
      lastSaleDate: lastSale?.timestamp,
      topBuyerEmails,
    };
  }

  /**
   * Atualiza as métricas de analytics
   */
  private updateAnalyticsMetrics(): void {
    const metrics = this.getAnalyticsMetrics();
    if (metrics) {
      localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify(metrics));
    }
  }

  /**
   * Carrega dados do localStorage
   */
  private loadFromStorage(): void {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (savedData) {
        this.salesData = JSON.parse(savedData);
        console.log(`[Hotmart Webhook] Carregados ${this.salesData.length} registros de vendas`);
      }
    } catch (error) {
      console.error("[Hotmart Webhook] Erro ao carregar dados:", error);
      this.salesData = [];
    }
  }

  /**
   * Salva dados no localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.salesData));
    } catch (error) {
      console.error("[Hotmart Webhook] Erro ao salvar dados:", error);
    }
  }

  /**
   * Limpa todos os dados
   */
  clearAllData(): void {
    this.salesData = [];
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.ANALYTICS_KEY);
    console.log("[Hotmart Webhook] Todos os dados foram limpos");
  }
}

// Instância singleton
export const hotmartWebhookManager = new HotmartWebhookManager();

// Para uso no console do navegador durante desenvolvimento
if (typeof window !== "undefined") {
  (window as any).hotmartWebhookManager = hotmartWebhookManager;
}
