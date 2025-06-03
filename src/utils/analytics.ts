
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
