import { useState, useEffect } from 'react';

/**
 * Qualidade de imagem baseada na velocidade da conexão
 */
export type ConnectionSpeedQuality = {
  quality: number;       // Qualidade da imagem (0-100)
  batchSize: number;     // Número de imagens para carregar em paralelo
  placeholderQuality: number; // Qualidade para placeholders
};

/**
 * Tipos de conexão e suas configurações de qualidade correspondentes
 */
export const connectionQualityMap: Record<string, ConnectionSpeedQuality> = {
  slow: {
    quality: 70,
    batchSize: 2,
    placeholderQuality: 15
  },
  medium: {
    quality: 80,
    batchSize: 3,
    placeholderQuality: 20
  },
  fast: {
    quality: 85,
    batchSize: 4,
    placeholderQuality: 25
  },
  ultraFast: {
    quality: 90,
    batchSize: 6,
    placeholderQuality: 30
  }
};

/**
 * Hook para detectar a velocidade da conexão e retornar configurações
 * otimizadas de qualidade de imagem de acordo
 */
export const useConnectionSpeed = () => {
  const [connectionType, setConnectionType] = useState<string>('medium');
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionSpeedQuality>(
    connectionQualityMap.medium
  );
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Detectar dispositivos de baixo desempenho
    const checkLowEndDevice = () => {
      // Detectar memória limitada (menos de 4GB) ou processadores lentos (menos de 4 núcleos)
      // ou navegador mais antigo sem recursos modernos
      const isLowMemory = 'deviceMemory' in navigator && 
                         (navigator as any).deviceMemory < 4;
      
      const isSlow = 'hardwareConcurrency' in navigator && 
                     navigator.hardwareConcurrency < 4;
      
      // Limitações de API específicas do browser indicam dispositivo mais antigo
      const hasLimitations = !('IntersectionObserver' in window) || 
                            !('requestIdleCallback' in window);
      
      return isLowMemory || isSlow || hasLimitations;
    };

    // Medir velocidade inicial com um pequeno download de teste
    const measureConnectionSpeed = async () => {
      try {
        // Se o navegador suporta NetworkInformation API
        if ('connection' in navigator && (navigator as any).connection) {
          const connection = (navigator as any).connection;
          
          // Se tivermos informação de efetividade
          if (connection.effectiveType) {
            const effectiveType = connection.effectiveType;
            
            // Classificar por effectiveType
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
              setConnectionType('slow');
            } else if (effectiveType === '3g') {
              setConnectionType('medium');
            } else if (effectiveType === '4g') {
              setConnectionType('fast');
            }
            
            // Atualizar config baseada no tipo de conexão
            setConnectionSpeed(connectionQualityMap[connectionType]);
            return;
          }
        }
        
        // Se não temos Network API, fazemos um teste rápido
        const testImage = new Image();
        const startTime = Date.now();
        
        // URL de um pequeno arquivo para testar a velocidade (1KB imagem transparente)
        testImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        
        await new Promise(resolve => {
          testImage.onload = resolve;
          testImage.onerror = resolve;
          
          // Timeout de segurança
          setTimeout(resolve, 2000);
        });
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Classificar conexão com base na velocidade
        if (duration > 200) {
          setConnectionType('slow');
        } else if (duration > 100) {
          setConnectionType('medium');
        } else if (duration > 50) {
          setConnectionType('fast');
        } else {
          setConnectionType('ultraFast');
        }
        
        setConnectionSpeed(connectionQualityMap[connectionType]);
      } catch (error) {
        console.error('[ConnectionSpeed] Erro ao medir velocidade:', error);
        // Fallback para médio em caso de erro
        setConnectionType('medium');
        setConnectionSpeed(connectionQualityMap.medium);
      }
    };
    
    // Verificar dispositivo de baixo desempenho
    const lowEndResult = checkLowEndDevice();
    setIsLowEndDevice(lowEndResult);
    
    // Medir velocidade
    measureConnectionSpeed();
    
    // Se for um dispositivo de baixo desempenho, reduzir qualidade independente da conexão
    if (lowEndResult) {
      setConnectionType('slow');
      setConnectionSpeed(connectionQualityMap.slow);
    }
    
    // Setup listener para mudanças de conexão (se suportado)
    if ('connection' in navigator && (navigator as any).connection) {
      const connection = (navigator as any).connection;
      const updateConnectionType = () => measureConnectionSpeed();
      
      connection.addEventListener('change', updateConnectionType);
      return () => connection.removeEventListener('change', updateConnectionType);
    }
  }, [connectionType]);
  
  return {
    connectionType,
    connectionSpeed,
    isLowEndDevice
  };
};
