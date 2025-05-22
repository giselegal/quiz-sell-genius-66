import React, { useState, useEffect, Suspense } from 'react';
import { DashboardHeader } from '@/components/analytics/DashboardHeader';
import { AnalyticsLoadingState } from '@/components/analytics/LoadingState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import { getCachedMetrics, resetMetricsCache, filterEventsByTimeRange } from '@/utils/analyticsHelpers';
import { getAnalyticsEvents, clearAnalyticsData, testFacebookPixel } from '@/utils/analytics';
import { toast } from '@/components/ui/use-toast';

// Lazy loaded tab components for better performance
const OverviewTab = React.lazy(() => import('@/components/analytics/tabs/OverviewTab').then(module => ({ default: module.OverviewTab })));
const FunnelTab = React.lazy(() => import('@/components/analytics/tabs/FunnelTab').then(module => ({ default: module.FunnelTab })));
const FunnelComparisonTab = React.lazy(() => import('@/components/analytics/tabs/FunnelComparisonTab').then(module => ({ default: module.FunnelComparisonTab })));
const UsersTab = React.lazy(() => import('@/components/analytics/tabs/UsersTab').then(module => ({ default: module.UsersTab })));
const ProgressTab = React.lazy(() => import('@/components/analytics/tabs/ProgressTab').then(module => ({ default: module.ProgressTab })));
const DataTab = React.lazy(() => import('@/components/analytics/tabs/DataTab').then(module => ({ default: module.DataTab })));
const UtmTab = React.lazy(() => import('@/components/analytics/tabs/UtmTab').then(module => ({ default: module.UtmTab })));
const IntegrationTab = React.lazy(() => import('@/components/analytics/tabs/IntegrationTab').then(module => ({ default: module.IntegrationTab })));

const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [metricsCalculated, setMetricsCalculated] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['quiz_start', 'quiz_complete', 'result_view', 'lead_generated', 'sale']);
  const [compactView, setCompactView] = useState<boolean>(() => {
    return localStorage.getItem('analytics_compact_view') === 'true';
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  
  const { isLoading, setLoading, completeLoading } = useLoadingState({
    minDuration: 800,
    maxDuration: 10000
  });

  useEffect(() => {
    // Load analytics data
    setLoading(true);
    
    try {
      // Get metrics from cache or calculate new ones
      const metrics = getCachedMetrics(timeRange);
      
      // Get events from localStorage
      const events = getAnalyticsEvents();
      
      // Apply time range filter
      const filteredEvents = filterEventsByTimeRange(events, timeRange);
      
      // Filter events by selected types
      const filteredByType = selectedEvents.length > 0
        ? filteredEvents.filter(event => selectedEvents.includes(event.type))
        : filteredEvents;
      
      // Group events by funnel
      const funnel1Events = filteredByType.filter(event => 
        event.funnel === 'quiz_isca' || (!event.funnel && event.utm_campaign?.includes('Por Fora'))
      );
      
      const funnel2Events = filteredByType.filter(event => 
        event.funnel === 'quiz_embutido' || (!event.funnel && event.utm_campaign?.includes('Por Dentro'))
      );
      
      // Calculate metrics for each funnel
      const funnel1Metrics = calculateFunnelMetrics(funnel1Events);
      const funnel2Metrics = calculateFunnelMetrics(funnel2Events);
      
      setAnalyticsData({ 
        events: filteredByType,
        metrics: {
          ...metrics,
          funnel1: funnel1Metrics,
          funnel2: funnel2Metrics
        },
        timeRange,
        selectedEvents,
        compactView,
        onExportData: handleExportData
      });
      
      setMetricsCalculated(true);
      completeLoading();
    } catch (error) {
      console.error('Erro ao carregar dados de analytics:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar dados de analytics. Por favor, tente novamente.',
        variant: 'destructive',
      });
      completeLoading();
    }
  }, [timeRange, selectedEvents, compactView, setLoading, completeLoading]);

  // Helper function to calculate metrics for a specific funnel
  const calculateFunnelMetrics = (events: any[]) => {
    return {
      totalStarts: events.filter(e => e.type === 'quiz_start').length,
      totalCompletes: events.filter(e => e.type === 'quiz_complete').length,
      totalResultViews: events.filter(e => e.type === 'result_view').length,
      totalLeads: events.filter(e => e.type === 'lead_generated').length,
      totalSales: events.filter(e => e.type === 'sale' || e.type === 'purchase').length,
      salesRate: calculateSalesRate(events)
    };
  };

  // Helper function to calculate sales rate for a group of events
  const calculateSalesRate = (events: any[]) => {
    const results = events.filter(e => e.type === 'result_view').length;
    const sales = events.filter(e => e.type === 'sale' || e.type === 'purchase').length;
    return results > 0 ? (sales / results) * 100 : 0;
  };

  const handleRefresh = () => {
    setLoading(true);
    // Reset cache to ensure fresh data
    resetMetricsCache();
    
    // Re-fetch analytics data
    setTimeout(() => {
      const metrics = getCachedMetrics(timeRange);
      const events = getAnalyticsEvents();
      const filteredEvents = filterEventsByTimeRange(events, timeRange);
      
      // Filter events by selected types
      const filteredByType = selectedEvents.length > 0
        ? filteredEvents.filter(event => selectedEvents.includes(event.type))
        : filteredEvents;
      
      setAnalyticsData({ 
        events: filteredByType,
        metrics,
        timeRange,
        selectedEvents,
        compactView,
        onExportData: handleExportData
      });
      
      toast({
        title: 'Atualizado',
        description: 'Dados de analytics foram atualizados.',
      });
      
      completeLoading();
    }, isLowPerformance ? 200 : 500); // Shorter time for low performance devices
  };

  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `analytics-quiz-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: 'Exportação concluída',
        description: 'Os dados de analytics foram exportados com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      toast({
        title: 'Falha na exportação',
        description: 'Não foi possível exportar os dados de analytics.',
        variant: 'destructive',
      });
    }
  };

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados de analytics? Esta ação não pode ser desfeita.')) {
      clearAnalyticsData();
      
      toast({
        title: 'Dados limpos',
        description: 'Todos os dados de analytics foram excluídos.',
      });
      
      handleRefresh();
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleEventSelectionChange = (events: string[]) => {
    setSelectedEvents(events);
  };

  const toggleCompactView = () => {
    const newValue = !compactView;
    setCompactView(newValue);
    localStorage.setItem('analytics_compact_view', String(newValue));
  };

  // Render loading skeleton if data is not ready
  if (isLoading || !analyticsData) {
    return (
      <div className="container mx-auto px-4 py-6">
        <AnalyticsLoadingState />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <DashboardHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={handleRefresh}
        onExportData={handleExportData}
        onClearData={handleClearData}
        onEventSelectionChange={handleEventSelectionChange}
        selectedEvents={selectedEvents}
        compactView={compactView}
        onToggleCompactView={toggleCompactView}
      />
      
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent p-0">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger 
            value="funnel"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Funil de Conversão
          </TabsTrigger>
          <TabsTrigger 
            value="funnel-comparison"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Comparação de Funis
          </TabsTrigger>
          <TabsTrigger 
            value="users"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Análise de Usuários
          </TabsTrigger>
          <TabsTrigger 
            value="progress"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Progresso do Quiz
          </TabsTrigger>
          <TabsTrigger 
            value="utm"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Campanhas UTM
          </TabsTrigger>
          <TabsTrigger 
            value="integration"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Integrações
          </TabsTrigger>
          <TabsTrigger 
            value="data"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Dados Brutos
          </TabsTrigger>
        </TabsList>
        
        <Suspense fallback={<div className="h-[200px] flex items-center justify-center"><LoadingSpinner /></div>}>
          <TabsContent value="overview" className="mt-6">
            <OverviewTab analyticsData={{...analyticsData, compactView}} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="funnel" className="mt-6">
            <FunnelTab analyticsData={{...analyticsData, compactView}} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="funnel-comparison" className="mt-6">
            <FunnelComparisonTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <UsersTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-6">
            <ProgressTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="utm" className="mt-6">
            <UtmTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
          
          <TabsContent value="integration" className="mt-6">
            <IntegrationTab analyticsData={analyticsData} testFunction={testFacebookPixel} />
          </TabsContent>
          
          <TabsContent value="data" className="mt-6">
            <DataTab analyticsData={analyticsData} loading={!metricsCalculated} />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
