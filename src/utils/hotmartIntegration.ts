
import { toast } from '@/components/ui/use-toast';

// Types
export interface HotmartProduct {
  id: string;
  name: string;
  price: number;
  status: 'active' | 'inactive';
}

export interface HotmartSale {
  id: string;
  productId: string;
  buyerEmail: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

// Mock data for development
const mockProducts: HotmartProduct[] = [
  { id: '1', name: 'Quiz de Estilo Premium', price: 39.90, status: 'active' },
  { id: '2', name: 'Consultoria de Estilo', price: 197.00, status: 'active' }
];

const mockSales: HotmartSale[] = [
  { id: '1', productId: '1', buyerEmail: 'cliente@example.com', amount: 39.90, date: '2024-01-15', status: 'completed' }
];

// Hotmart integration class
export class HotmartIntegration {
  private apiKey: string | null = null;
  
  constructor() {
    this.apiKey = process.env.REACT_APP_HOTMART_API_KEY || null;
  }
  
  async getProducts(): Promise<HotmartProduct[]> {
    try {
      // In a real implementation, this would make an API call to Hotmart
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return mockProducts;
    } catch (error) {
      console.error('Error fetching Hotmart products:', error);
      return [];
    }
  }
  
  async getSales(): Promise<HotmartSale[]> {
    try {
      // In a real implementation, this would make an API call to Hotmart
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return mockSales;
    } catch (error) {
      console.error('Error fetching Hotmart sales:', error);
      return [];
    }
  }
  
  async processWebhook(webhookData: any): Promise<void> {
    try {
      console.log('Processing Hotmart webhook:', webhookData);
      
      // Track sale conversion if analytics is available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          transaction_id: webhookData.transaction?.code,
          value: webhookData.data?.product?.price,
          currency: 'BRL'
        });
      }
      
      toast({
        title: 'Venda processada',
        description: 'Webhook do Hotmart processado com sucesso'
      });
    } catch (error) {
      console.error('Error processing Hotmart webhook:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const hotmart = new HotmartIntegration();

// Hook for React components
export const useHotmart = () => {
  const [products, setProducts] = React.useState<HotmartProduct[]>([]);
  const [sales, setSales] = React.useState<HotmartSale[]>([]);
  const [loading, setLoading] = React.useState(false);
  
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await hotmart.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadSales = async () => {
    setLoading(true);
    try {
      const data = await hotmart.getSales();
      setSales(data);
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    products,
    sales,
    loading,
    loadProducts,
    loadSales
  };
};
