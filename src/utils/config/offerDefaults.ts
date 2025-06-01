
import { OfferSection, StyleOptions } from '@/types/resultPageConfig';

export const createOfferSectionConfig = (): OfferSection => {
  const defaultStyle: StyleOptions = {
    padding: '40px',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    borderRadius: '8px'
  };

  return {
    hero: {
      visible: true,
      style: {
        ...defaultStyle,
        padding: '60px 40px'
      },
      content: {
        title: 'Transforme Seu Estilo Agora',
        subtitle: 'Oferta Especial Para Você',
        heroImage: '',
        ctaText: 'Quero Conhecer',
        ctaUrl: '#'
      }
    },
    products: {
      visible: true,
      style: {
        ...defaultStyle,
        padding: '40px'
      },
      content: {
        title: 'Produtos Recomendados',
        description: 'Selecionados especialmente para o seu estilo'
      }
    },
    benefits: {
      visible: true,
      style: {
        ...defaultStyle,
        padding: '40px'
      },
      content: {
        title: 'Benefícios Exclusivos',
        description: 'Vantagens únicas para transformar seu visual'
      }
    },
    pricing: {
      visible: true,
      style: {
        ...defaultStyle,
        padding: '40px',
        backgroundColor: '#F8F7F5'
      },
      content: {
        title: 'Oferta Especial',
        price: 'R$ 197',
        regularPrice: 'R$ 497',
        ctaText: 'Comprar Agora',
        ctaUrl: '#checkout'
      }
    },
    testimonials: {
      visible: true,
      style: {
        ...defaultStyle,
        padding: '40px'
      },
      content: {
        title: 'O Que Nossas Clientes Dizem',
        description: 'Depoimentos reais de transformações'
      }
    },
    guarantee: {
      visible: true,
      style: {
        ...defaultStyle,
        padding: '30px',
        backgroundColor: '#F0F9FF'
      },
      content: {
        title: 'Garantia de 30 Dias',
        description: 'Satisfação garantida ou seu dinheiro de volta'
      }
    }
  };
};
