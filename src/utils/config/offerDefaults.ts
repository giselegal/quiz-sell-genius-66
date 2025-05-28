
export const offerDefaults = {
  hero: {
    title: 'Oferta Especial',
    subtitle: 'Descubra seu estilo único com nosso guia personalizado',
    backgroundImage: '',
    backgroundColor: '#f8f9fa',
    textColor: '#333333',
    buttonText: 'Quero Meu Guia',
    buttonColor: '#007bff',
    showTimer: true,
    timerDuration: 3600 // 1 hour in seconds
  },

  benefits: {
    title: 'O que você vai receber:',
    items: [
      'Análise completa do seu estilo',
      'Guia personalizado de cores',
      'Dicas de combinações',
      'Acesso vitalício'
    ]
  },

  pricing: {
    originalPrice: 197,
    currentPrice: 97,
    currency: 'BRL',
    showDiscount: true,
    paymentOptions: ['pix', 'cartao', 'boleto']
  },

  testimonials: {
    show: true,
    items: [
      {
        text: 'Transformou completamente meu guarda-roupa!',
        author: 'Maria Silva',
        rating: 5
      }
    ]
  }
};
