
import { EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'heading':
    case 'headline':
      return {
        title: 'Novo Título',
        subtitle: 'Subtítulo opcional',
        alignment: 'center'
      };
      
    case 'paragraph':
    case 'text':
      return {
        text: 'Digite seu texto aqui...',
        alignment: 'left'
      };
      
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Descrição da imagem',
        caption: ''
      };
      
    case 'button':
    case 'cta':
      return {
        buttonText: 'Clique aqui',
        buttonUrl: '#',
        alignment: 'center'
      };
      
    case 'benefits':
      return {
        title: 'Benefícios',
        items: [
          'Primeiro benefício',
          'Segundo benefício', 
          'Terceiro benefício'
        ]
      };
      
    case 'testimonial':
      return {
        text: 'Depoimento incrível do cliente...',
        title: 'Nome do Cliente',
        subtitle: 'Cargo/Empresa'
      };
      
    default:
      return {
        title: 'Novo Componente',
        text: 'Conteúdo padrão'
      };
  }
};
