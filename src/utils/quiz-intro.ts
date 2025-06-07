
import { trackEvent } from './analytics';

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', pageName, 'navigation');
};

export const trackQuizStart = () => {
  trackEvent('quiz_start', 'Quiz Started', 'engagement');
};

export const trackQuizComplete = () => {
  trackEvent('quiz_complete', 'Quiz Completed', 'engagement');
};

export const trackStyleResult = (styleName: string, percentage: number) => {
  trackEvent('style_result', styleName, 'quiz_result', percentage);
};
