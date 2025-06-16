
export const getCtaUrl = () => {
  // Default CTA URL - this should be configurable
  return 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
};

export const initializePixel = (pixelId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('init', pixelId);
  }
};
