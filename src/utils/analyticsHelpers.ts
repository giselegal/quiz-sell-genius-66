export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: number;
}

export interface ConversionFunnelStep {
  step: string;
  users: number;
  conversionRate: number;
}

export interface UserMetrics {
  totalUsers: number;
  newUsers: number;
  returningUsers: number;
  averageSessionDuration: number;
}

export const analyticsHelpers = {
  trackEvent: (eventName: string, properties: Record<string, any> = {}): void => {
    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: Date.now()
    };

    // Store in localStorage for demo purposes
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      events.push(event);
      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (error) {
      console.error('Error tracking event:', error);
    }

    // Send to external analytics if configured
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    if (window.fbq) {
      window.fbq('track', eventName, properties);
    }
  },

  getEvents: (): AnalyticsEvent[] => {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]');
    } catch (error) {
      console.error('Error getting events:', error);
      return [];
    }
  },

  calculateConversionFunnel: (): ConversionFunnelStep[] => {
    const events = analyticsHelpers.getEvents();
    const steps = ['quiz_start', 'quiz_complete', 'result_view', 'offer_view', 'conversion'];
    
    const stepCounts: Record<string, number> = {};
    steps.forEach(step => {
      stepCounts[step] = events.filter(e => e.name === step).length;
    });

    const funnel: ConversionFunnelStep[] = [];
    let previousCount = stepCounts[steps[0]] || 0;

    steps.forEach((step, index) => {
      const count = stepCounts[step] || 0;
      const conversionRate = index === 0 ? 100 : previousCount > 0 ? (count / previousCount) * 100 : 0;
      
      funnel.push({
        step,
        users: count,
        conversionRate
      });
      
      previousCount = count;
    });

    return funnel;
  },

  getUserMetrics: (): UserMetrics => {
    const events = analyticsHelpers.getEvents();
    const users = new Set(events.map(e => e.properties.userId || 'anonymous')).size;
    
    return {
      totalUsers: users,
      newUsers: Math.floor(users * 0.7), // Mock data
      returningUsers: Math.floor(users * 0.3), // Mock data
      averageSessionDuration: 180 // Mock data in seconds
    };
  },

  clearAnalytics: (): void => {
    localStorage.removeItem('analytics_events');
  }
};

// Exported functions for direct import
export const getCachedMetrics = () => {
  const cacheKey = 'analytics_metrics_cache';
  const cacheTime = 5 * 60 * 1000; // 5 minutes
  
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheTime) {
        return data;
      }
    }
  } catch (error) {
    console.error('Error reading cached metrics:', error);
  }

  // Generate fresh metrics
  const metrics = {
    userMetrics: analyticsHelpers.getUserMetrics(),
    conversionFunnel: analyticsHelpers.calculateConversionFunnel(),
    events: analyticsHelpers.getEvents()
  };

  // Cache the metrics
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: metrics,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Error caching metrics:', error);
  }

  return metrics;
};

export const resetMetricsCache = () => {
  try {
    localStorage.removeItem('analytics_metrics_cache');
  } catch (error) {
    console.error('Error resetting metrics cache:', error);
  }
};

export const filterEventsByTimeRange = (events: AnalyticsEvent[], startDate: Date, endDate: Date): AnalyticsEvent[] => {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  
  return events.filter(event => 
    event.timestamp >= startTime && event.timestamp <= endTime
  );
};

export const getUserProgressData = () => {
  const events = analyticsHelpers.getEvents();
  
  // Simular dados de progresso do usuário baseado nos eventos
  const progressSteps = [
    { step: 'Quiz Started', count: events.filter(e => e.name === 'quiz_start').length },
    { step: 'Questions Answered', count: events.filter(e => e.name === 'question_answered').length },
    { step: 'Quiz Completed', count: events.filter(e => e.name === 'quiz_complete').length },
    { step: 'Result Viewed', count: events.filter(e => e.name === 'result_view').length },
    { step: 'Offer Clicked', count: events.filter(e => e.name === 'offer_click').length }
  ];

  return {
    progressSteps,
    totalUsers: new Set(events.map(e => e.properties.userId || 'anonymous')).size,
    averageCompletionRate: progressSteps.length > 0 ? 
      (progressSteps[progressSteps.length - 1].count / Math.max(progressSteps[0].count, 1)) * 100 : 0
  };
};
