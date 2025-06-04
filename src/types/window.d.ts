
// Type definitions for Facebook Pixel and Google Analytics
interface Window {
  fbq?: (...args: any[]) => void;
  gtag?: any;
  _fbq?: any;
}
