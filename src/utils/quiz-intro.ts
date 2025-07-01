
import { trackEvent } from './analytics';

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page: pageName });
};

export const trackQuizStart = () => {
  trackEvent('quiz_start', { event: 'Quiz Started' });
};

export const trackQuizComplete = () => {
  trackEvent('quiz_complete', { event: 'Quiz Completed' });
};

export const trackStyleResult = (styleName: string, percentage: number) => {
  trackEvent('style_result', { style: styleName, percentage });
};
