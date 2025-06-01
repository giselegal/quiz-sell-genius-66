
import { ResultPageConfig } from '@/types/resultPageConfig';
import { createOfferSectionConfig } from './config/offerDefaults';

export const defaultResultTemplate: ResultPageConfig = {
  styleType: 'Natural',
  heroSection: {
    title: "Descubra Seu Estilo",
    subtitle: "Transforme seu visual com nosso quiz personalizado",
    imageUrl: "",
    ctaText: "Começar Quiz",
    backgroundColor: "#FAF9F7"
  },
  aboutSection: {
    title: "Sobre Seu Estilo",
    description: "Entenda melhor suas preferências e descubra looks perfeitos para você",
    imageUrl: ""
  },
  header: {
    visible: true,
    content: {
      title: 'Quiz de Estilo',
      logo: ''
    },
    style: {
      backgroundColor: '#FAF9F7',
      padding: '20px',
      textAlign: 'center'
    }
  },
  mainContent: {
    visible: true,
    content: {
      title: 'Seu Resultado de Estilo',
      subtitle: 'Baseado nas suas respostas, identificamos seu estilo único',
      description: 'Agora você pode descobrir looks e produtos perfeitos para o seu perfil'
    },
    style: {
      padding: '40px',
      backgroundColor: '#FFFFFF',
      textAlign: 'center'
    }
  },
  secondaryStyles: {
    visible: true,
    content: {
      title: 'Estilos Complementares',
      description: 'Outros estilos que combinam com você'
    },
    style: {
      padding: '30px',
      backgroundColor: '#F8F7F5'
    }
  },
  offer: createOfferSectionConfig(),
  globalStyles: {
    primaryColor: '#B89B7A',
    secondaryColor: '#432818',
    textColor: '#432818',
    backgroundColor: '#FAF9F7',
    fontFamily: 'Playfair Display, serif'
  },
  blocks: []
};

export const getStyleDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    ...defaultResultTemplate,
    styleType,
    heroSection: {
      ...defaultResultTemplate.heroSection,
      title: `Seu Estilo: ${styleType}`,
      subtitle: `Descubra tudo sobre o estilo ${styleType} e como usar no seu dia a dia`
    }
  };
};
