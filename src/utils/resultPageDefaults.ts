
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    heroSection: {
      title: 'Parabéns!',
      subtitle: 'Descobrimos seu estilo único',
      backgroundColor: '#FAF9F7'
    },
    mainContent: {
      primaryStyle: {
        title: 'Seu estilo predominante é',
        backgroundColor: '#FFFFFF'
      },
      secondaryStyles: {
        title: 'Seus estilos secundários',
        backgroundColor: '#F5F2ED'
      }
    },
    offerSection: {
      title: 'Transforme seu Estilo',
      subtitle: 'Oferta especial para você',
      backgroundColor: '#FFFFFF'
    },
    blocks: [],
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#8F7A6A',
      fontFamily: 'Inter'
    }
  };
};
