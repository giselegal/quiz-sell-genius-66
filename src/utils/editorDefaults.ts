
import { Block } from '@/types/editor';

export const getDefaultContentForType = (type: Block['type']): any => {
  switch (type) {
    case 'header':
      return {
        title: 'Novo Título',
        subtitle: 'Subtítulo opcional'
      };
    case 'hero-section':
      return {
        title: 'Parabéns!',
        subtitle: 'Descobrimos seu estilo único',
        description: 'Texto de descrição do hero'
      };
    case 'text':
      return {
        content: 'Novo texto'
      };
    case 'products':
      return {
        title: 'Nossos Produtos',
        items: []
      };
    case 'pricing':
      return {
        title: 'Escolha seu Plano',
        tiers: []
      };
    case 'testimonials':
      return {
        title: 'Depoimentos',
        testimonials: []
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        benefits: []
      };
    case 'guarantee':
      return {
        title: 'Garantia',
        description: 'Descrição da garantia'
      };
    case 'cta':
      return {
        title: 'Call to Action',
        buttonText: 'Clique Aqui'
      };
    default:
      return {};
  }
};
