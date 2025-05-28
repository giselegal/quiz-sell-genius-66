
export interface FunnelStep {
  name: string;
  url: string;
  timestamp: number;
  data?: Record<string, any>;
}

export interface FunnelMetrics {
  totalSessions: number;
  completedFunnels: number;
  dropoffRate: number;
  averageTimeToComplete: number;
}

export class FunnelMonitor {
  private steps: FunnelStep[] = [];
  private sessionId: string;
  
  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadStoredSteps();
  }
  
  private generateSessionId(): string {
    return `funnel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private loadStoredSteps(): void {
    try {
      const stored = localStorage.getItem(`funnel_${this.sessionId}`);
      if (stored) {
        this.steps = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading funnel steps:', error);
    }
  }
  
  private saveSteps(): void {
    try {
      localStorage.setItem(`funnel_${this.sessionId}`, JSON.stringify(this.steps));
    } catch (error) {
      console.error('Error saving funnel steps:', error);
    }
  }
  
  trackStep(name: string, url: string, data?: Record<string, any>): void {
    try {
      const step: FunnelStep = {
        name,
        url,
        timestamp: Date.now(),
        data
      };
      
      this.steps.push(step);
      this.saveSteps();
      
      console.log(`Funnel step tracked: ${name}`, step);
    } catch (error) {
      console.error('Error tracking funnel step:', error);
    }
  }
  
  getMetrics(): FunnelMetrics {
    const allSessions = this.getAllSessions();
    const completedSessions = allSessions.filter(session => 
      session.some(step => step.name === 'conversion')
    );
    
    const totalTime = completedSessions.reduce((acc, session) => {
      const firstStep = session[0];
      const lastStep = session[session.length - 1];
      return acc + (lastStep.timestamp - firstStep.timestamp);
    }, 0);
    
    return {
      totalSessions: allSessions.length,
      completedFunnels: completedSessions.length,
      dropoffRate: allSessions.length > 0 ? 
        ((allSessions.length - completedSessions.length) / allSessions.length) * 100 : 0,
      averageTimeToComplete: completedSessions.length > 0 ? 
        totalTime / completedSessions.length : 0
    };
  }
  
  private getAllSessions(): FunnelStep[][] {
    const sessions: FunnelStep[][] = [];
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('funnel_')) {
          const stepsData = localStorage.getItem(key);
          if (stepsData) {
            sessions.push(JSON.parse(stepsData));
          }
        }
      }
    } catch (error) {
      console.error('Error getting all sessions:', error);
    }
    
    return sessions;
  }
  
  clearSession(): void {
    try {
      localStorage.removeItem(`funnel_${this.sessionId}`);
      this.steps = [];
    } catch (error) {
      console.error('Error clearing funnel session:', error);
    }
  }
  
  exportData(): string {
    return JSON.stringify({
      sessionId: this.sessionId,
      steps: this.steps,
      metrics: this.getMetrics()
    }, null, 2);
  }
}

export const funnelMonitor = new FunnelMonitor();
