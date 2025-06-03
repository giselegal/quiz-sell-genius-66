
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

// Adicionar funções ausentes para quiz tracking
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

// Adicionar funções ausentes para analytics
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

export const getCreativePerformance = () => {
  console.log('Getting creative performance');
  return { impressions: 0, clicks: 0, conversions: 0 };
};
