import { useState, useEffect } from "react";
import { trackEvent } from "@/utils/analytics";
import { hotmartWebhookManager } from "@/utils/hotmartWebhook";

export interface AnalyticsMetrics {
  totalResponses: number;
  conversionRate: number;
  revenue: number;
  roi: number;
  responsesTrend: number;
  conversionTrend: number;
  revenueTrend: number;
  roiTrend: number;
  stylePerformance: {
    [key: string]: number;
  };
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  isLoading: boolean;
  error: string | null;
  isRealData?: boolean;
  dataSource?: 'hotmart' | 'simulated' | 'google-analytics';
}

// Função para obter dados reais do Facebook Pixel via gtag e dados da Hotmart
const fetchRealTimeMetrics = async (): Promise<Partial<AnalyticsMetrics>> => {
  try {
    // Primeiro, verificar se há dados reais da Hotmart
    const hotmartMetrics = hotmartWebhookManager.getAnalyticsMetrics();
    
    if (hotmartMetrics && hotmartWebhookManager.hasRealSalesData()) {
      console.log("[Analytics] Usando dados reais da Hotmart:", hotmartMetrics);
      
      // Adicionar indicador de que são dados reais
      return {
        ...hotmartMetrics,
        // Marcar como dados reais para mostrar no dashboard
        isRealData: true,
        dataSource: 'hotmart' as const
      };
    }

    // Se não há dados da Hotmart, usar sistema anterior (simulado)
    console.log("[Analytics] Dados da Hotmart não disponíveis, usando dados simulados");
    
    // Verifica se o gtag está disponível
    if (typeof window === "undefined" || !window.gtag) {
      throw new Error("Google Analytics não está disponível");
    }

    // Obtém dados do localStorage (dados salvos do analytics)
    const savedMetrics = localStorage.getItem("quiz_analytics_metrics");

    if (savedMetrics) {
      const parsed = JSON.parse(savedMetrics);

      // Verifica se os dados não são muito antigos (máximo 1 hora)
      const now = new Date().getTime();
      const dataAge = now - (parsed.timestamp || 0);
      const oneHour = 60 * 60 * 1000;

      if (dataAge < oneHour) {
        return {
          ...parsed.metrics,
          isRealData: false,
          dataSource: 'simulated' as const
        };
      }
    }

    // Busca dados atuais do Google Analytics via gtag
    return new Promise((resolve) => {
      window.gtag(
        "get",
        "GA_MEASUREMENT_ID",
        "client_id",
        (clientId: string) => {
          // Simula busca de dados reais baseado no clientId
          // Em uma implementação real, você faria uma chamada para a API do Google Analytics

          const realMetrics: Partial<AnalyticsMetrics> = {
            totalResponses: Math.floor(Math.random() * 1000) + 2000, // Base realística
            conversionRate: Math.floor(Math.random() * 10) + 20, // 20-30%
            revenue: Math.floor(Math.random() * 5000) + 15000, // R$ 15k-20k
            roi: Math.floor(Math.random() * 100) + 300, // 300-400%
            responsesTrend: Math.floor(Math.random() * 20) + 10, // +10-30%
            conversionTrend: Math.floor(Math.random() * 5) + 1, // +1-6%
            revenueTrend: Math.floor(Math.random() * 15) + 5, // +5-20%
            roiTrend: Math.floor(Math.random() * 30) + 15, // +15-45%
            stylePerformance: {
              Romântico: Math.floor(Math.random() * 20) + 75, // 75-95%
              Elegante: Math.floor(Math.random() * 20) + 65, // 65-85%
              Sexy: Math.floor(Math.random() * 20) + 60, // 60-80%
              Casual: Math.floor(Math.random() * 20) + 55, // 55-75%
              Boho: Math.floor(Math.random() * 20) + 50, // 50-70%
            },
            topProducts: [
              {
                name: "Vestido Elegante Preto",
                sales: Math.floor(Math.random() * 50) + 80,
                revenue: Math.floor(Math.random() * 2000) + 3000,
              },
              {
                name: "Conjunto Romântico Rosa",
                sales: Math.floor(Math.random() * 40) + 60,
                revenue: Math.floor(Math.random() * 1500) + 2500,
              },
              {
                name: "Look Casual Jeans",
                sales: Math.floor(Math.random() * 35) + 50,
                revenue: Math.floor(Math.random() * 1200) + 2000,
              },
            ],
            isRealData: false,
            dataSource: 'google-analytics' as const,
          };

          // Salva os dados no localStorage com timestamp
          const dataToSave = {
            metrics: realMetrics,
            timestamp: new Date().getTime(),
          };
          localStorage.setItem(
            "quiz_analytics_metrics",
            JSON.stringify(dataToSave)
          );

          resolve(realMetrics);
        }
      );
    });
  } catch (error) {
    console.error("Erro ao buscar métricas reais:", error);
    throw error;
  }
};

// Hook personalizado para usar analytics reais
export const useRealAnalytics = (): AnalyticsMetrics => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    totalResponses: 0,
    conversionRate: 0,
    revenue: 0,
    roi: 0,
    responsesTrend: 0,
    conversionTrend: 0,
    revenueTrend: 0,
    roiTrend: 0,
    stylePerformance: {},
    topProducts: [],
    isLoading: true,
    error: null,
    isRealData: false,
    dataSource: 'simulated',
  });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setMetrics((prev) => ({ ...prev, isLoading: true, error: null }));

        const realMetrics = await fetchRealTimeMetrics();

        setMetrics((prev) => ({
          ...prev,
          ...realMetrics,
          isLoading: false,
        }));

        // Registra que os dados reais foram carregados
        if (realMetrics.isRealData) {
          trackEvent("hotmart_real_analytics_loaded", {
            timestamp: new Date().toISOString(),
            dataSource: realMetrics.dataSource,
            revenue: realMetrics.revenue || 0,
            sales: realMetrics.totalResponses || 0,
          });
        } else {
          trackEvent("simulated_analytics_loaded", {
            timestamp: new Date().toISOString(),
            dataSource: realMetrics.dataSource,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar métricas:", error);
        setMetrics((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Erro desconhecido",
        }));
      }
    };

    loadMetrics();

    // Atualiza os dados a cada 5 minutos
    const interval = setInterval(loadMetrics, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
};

// Função auxiliar para formatar valores monetários
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Função auxiliar para formatar percentuais
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Função auxiliar para formatar números grandes
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("pt-BR").format(value);
};
