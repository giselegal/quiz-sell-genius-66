
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
