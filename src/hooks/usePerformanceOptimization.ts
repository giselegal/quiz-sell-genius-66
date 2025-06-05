import { useState, useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  connectionType: string;
  deviceMemory: number;
  hardwareConcurrency: number;
}

interface PerformanceSettings {
  enableAnimations: boolean;
  imageQuality: number;
  preloadStrategy: 'aggressive' | 'moderate' | 'conservative';
  enableTransitions: boolean;
  useLazyLoading: boolean;
}

export const usePerformanceOptimization = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    connectionType: 'unknown',
    deviceMemory: 4, // Default
    hardwareConcurrency: 4 // Default
  });

  const [settings, setSettings] = useState<PerformanceSettings>({
    enableAnimations: true,
    imageQuality: 85,
    preloadStrategy: 'moderate',
    enableTransitions: true,
    useLazyLoading: true
  });

  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);

  // Medir Core Web Vitals
  const measureWebVitals = useCallback(() => {
    // FCP (First Contentful Paint)
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }));
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

      } catch (error) {
        console.warn('Performance Observer não suportado:', error);
      }
    }
  }, []);

  // Detectar capacidades do dispositivo
  const detectDeviceCapabilities = useCallback(() => {
    const nav = navigator as any;
    
    // Memória do dispositivo
    const deviceMemory = nav.deviceMemory || 4;
    
    // Número de cores da CPU
    const hardwareConcurrency = nav.hardwareConcurrency || 4;
    
    // Tipo de conexão
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    const connectionType = connection?.effectiveType || 'unknown';
    
    setMetrics(prev => ({
      ...prev,
      deviceMemory,
      hardwareConcurrency,
      connectionType
    }));

    // Determinar se é dispositivo de baixo desempenho
    const isLowPerf = (
      deviceMemory < 2 ||
      hardwareConcurrency < 2 ||
      connectionType === 'slow-2g' ||
      connectionType === '2g'
    );

    setIsLowPerformanceDevice(isLowPerf);

    return {
      deviceMemory,
      hardwareConcurrency,
      connectionType,
      isLowPerformance: isLowPerf
    };
  }, []);

  // Ajustar configurações baseado na performance
  const optimizeSettings = useCallback((deviceInfo: ReturnType<typeof detectDeviceCapabilities>) => {
    let newSettings: PerformanceSettings;

    if (deviceInfo.isLowPerformance) {
      // Configurações para dispositivos de baixo desempenho
      newSettings = {
        enableAnimations: false,
        imageQuality: 60,
        preloadStrategy: 'conservative',
        enableTransitions: false,
        useLazyLoading: true
      };
    } else if (deviceInfo.connectionType === '3g') {
      // Configurações para conexões 3G
      newSettings = {
        enableAnimations: true,
        imageQuality: 75,
        preloadStrategy: 'moderate',
        enableTransitions: true,
        useLazyLoading: true
      };
    } else {
      // Configurações para dispositivos de alta performance
      newSettings = {
        enableAnimations: true,
        imageQuality: 85,
        preloadStrategy: 'aggressive',
        enableTransitions: true,
        useLazyLoading: false
      };
    }

    setSettings(newSettings);
    return newSettings;
  }, []);

  // Função para reportar métricas para analytics
  const reportMetrics = useCallback(() => {
    if (metrics.fcp && metrics.lcp) {
      // Reportar para analytics (Google Analytics, etc.)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vitals', {
          event_category: 'Performance',
          fcp: Math.round(metrics.fcp),
          lcp: Math.round(metrics.lcp),
          cls: metrics.cls ? Math.round(metrics.cls * 1000) / 1000 : 0,
          fid: metrics.fid ? Math.round(metrics.fid) : 0,
          device_memory: metrics.deviceMemory,
          connection_type: metrics.connectionType
        });
      }

      console.log('🚀 Performance Metrics:', {
        FCP: `${Math.round(metrics.fcp)}ms`,
        LCP: `${Math.round(metrics.lcp)}ms`,
        CLS: metrics.cls ? metrics.cls.toFixed(3) : 'N/A',
        FID: metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A',
        'Device Memory': `${metrics.deviceMemory}GB`,
        'CPU Cores': metrics.hardwareConcurrency,
        'Connection': metrics.connectionType
      });
    }
  }, [metrics]);

  // Inicializar ao montar o hook
  useEffect(() => {
    const deviceInfo = detectDeviceCapabilities();
    optimizeSettings(deviceInfo);
    measureWebVitals();

    // Reportar métricas após carregamento completo
    const reportTimer = setTimeout(reportMetrics, 3000);

    return () => {
      clearTimeout(reportTimer);
    };
  }, [detectDeviceCapabilities, optimizeSettings, measureWebVitals, reportMetrics]);

  return {
    metrics,
    settings,
    isLowPerformanceDevice,
    optimizeSettings,
    reportMetrics,
    // Funções utilitárias
    shouldPreload: (priority: 'high' | 'medium' | 'low') => {
      if (settings.preloadStrategy === 'aggressive') return true;
      if (settings.preloadStrategy === 'moderate') return priority !== 'low';
      return priority === 'high';
    },
    getOptimalImageQuality: (originalQuality = 85) => {
      return Math.min(originalQuality, settings.imageQuality);
    },
    shouldUseAnimation: () => settings.enableAnimations && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };
};
