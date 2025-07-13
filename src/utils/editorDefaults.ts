
import { BlockType, EditableContent } from '@/types/editor';
import { BorderRadiusType } from '@/types/styleTypes';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo ou descrição',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'text':
      return {
        text: 'Este é um bloco de texto. Clique para editar.',
        alignment: 'left' as const,
        style: {
          backgroundColor: '#F9F5F1',
          color: '#8F7A6A',
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'image':
      return {
        imageUrl: 'https://via.placeholder.com/800x400?text=Imagem',
        imageAlt: 'Descrição da imagem',
        alignment: 'center' as const,
        style: {
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'pricing':
      return {
        title: 'Oferta Especial',
        price: 'R$ 197',
        regularPrice: 'R$ 397',
        ctaText: 'Comprar Agora',
        ctaUrl: '#comprar',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          buttonColor: '#B89B7A',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        benefits: [
          'Benefício 1: Descrição do primeiro benefício.',
          'Benefício 2: Descrição do segundo benefício.',
          'Benefício 3: Descrição do terceiro benefício.'
        ],
        alignment: 'left' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'testimonials':
      return {
        title: 'Depoimentos',
        testimonials: [
          {
            id: '1',
            name: 'Ana Silva',
            text: 'Adorei o resultado do quiz! Realmente reflete meu estilo pessoal.',
            image: 'https://via.placeholder.com/100'
          },
          {
            id: '2',
            name: 'Carlos Mendes',
            text: 'A consultoria foi incrível, agora sei exatamente o que combina comigo.',
            image: 'https://via.placeholder.com/100'
          }
        ],
        alignment: 'center' as const,
        style: {
          backgroundColor: '#F9F5F1',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'guarantee':
      return {
        title: 'Garantia de Satisfação',
        text: '7 dias de garantia incondicional. Se você não ficar satisfeito, devolvemos seu dinheiro.',
        imageUrl: 'https://via.placeholder.com/200?text=Selo+de+Garantia',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'header':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo da marca',
        alignment: 'center' as const,
        style: {
          backgroundColor: 'transparent',
          color: '#432818',
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'none' as BorderRadiusType
        }
      };
      
    // Add more default content types as needed
    default:
      return {
        text: 'Conteúdo para editar',
        alignment: 'left' as const,
        style: {
          paddingY: '16px',
          paddingX: '16px'
        }
      };
  }
};
