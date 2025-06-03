
// Analytics utilities

export const initFacebookPixel = () => {
  console.log('Facebook Pixel initialized');
};

export const trackPageView = (path: string, data?: any) => {
  console.log('Page view tracked:', path, data);
};

export const trackButtonClick = (buttonName: string, data?: any) => {
  console.log('Button click tracked:', buttonName, data);
};

export const trackSaleConversion = (value: number, currency = 'BRL') => {
  console.log('Sale conversion tracked:', value, currency);
};

export const captureUTMParameters = () => {
  console.log('UTM parameters captured');
};

export const trackQuizStart = (userName: string, userEmail?: string) => {
  console.log('Quiz started by:', userName, userEmail);
};

export const trackQuizAnswer = (questionId: string, selectedOptions: string[], questionIndex: number, totalQuestions: number) => {
  console.log('Quiz answer tracked:', questionId, selectedOptions, questionIndex, totalQuestions);
};

export const trackQuizComplete = () => {
  console.log('Quiz completed');
};

export const trackResultView = (resultType: string) => {
  console.log('Result viewed:', resultType);
};

export const getAnalyticsEvents = () => {
  console.log('Getting analytics events');
  return [];
};

export const clearAnalyticsData = () => {
  console.log('Clearing analytics data');
};

export const testFacebookPixel = () => {
  console.log('Testing Facebook Pixel');
};

export const getCreativePerformance = (): Record<string, any> => {
  console.log('Getting creative performance');
  return {
    'Creative A': {
      creative_name: 'Creative A',
      page_views: 1000,
      quiz_starts: 300,
      quiz_completions: 150,
      leads: 75,
      purchases: 25,
      revenue: 2500,
      conversion_rate: '2.5',
      cost_per_lead: 33.33
    },
    'Creative B': {
      creative_name: 'Creative B',
      page_views: 800,
      quiz_starts: 200,
      quiz_completions: 100,
      leads: 40,
      purchases: 15,
      revenue: 1500,
      conversion_rate: '1.9',
      cost_per_lead: 37.5
    }
  };
};
