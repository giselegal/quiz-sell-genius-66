import { useState, useEffect } from 'react';
import { systemCapacity } from '../utils/systemCapacity';

export function useSystemCapacity() {
  const [capacity, setCapacity] = useState(systemCapacity.calculateCurrentCapacity());
  const [usage, setUsage] = useState(systemCapacity.getCurrentUsage());
  const [bottlenecks, setBottlenecks] = useState(systemCapacity.identifyBottlenecks());

  useEffect(() => {
    const updateMetrics = () => {
      setCapacity(systemCapacity.calculateCurrentCapacity());
      setUsage(systemCapacity.getCurrentUsage());
      setBottlenecks(systemCapacity.identifyBottlenecks());
    };

    // Atualizar métricas a cada 30 segundos
    const interval = setInterval(updateMetrics, 30000);
    updateMetrics(); // Primeira execução

    return () => clearInterval(interval);
  }, []);

  const utilizationPercent = (usage.activeUsers / capacity.maxUsers) * 100;
  const isNearLimit = utilizationPercent > 75;
  const isCritical = utilizationPercent > 90;

  return {
    capacity,
    usage,
    bottlenecks,
    utilizationPercent,
    isNearLimit,
    isCritical,
    upgradeOptions: systemCapacity.getUpgradeOptions(),
    recommendations: systemCapacity.getOptimizationRecommendations()
  };
}
