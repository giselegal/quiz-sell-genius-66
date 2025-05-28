
import { EditableContent } from "@/types/editor";
export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título do Bloco',
        subtitle: 'Um subtítulo opcional para seu bloco',
        style: {
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#432818'
        }
      };
    case 'text':
        text: 'Este é um bloco de texto que você pode editar. Personalize o conteúdo conforme necessário.',
          fontSize: '1rem',
          lineHeight: '1.5',
          color: '#3A3A3A'
    case 'image':
        imageUrl: 'https://placehold.co/600x400/png',
        imageAlt: 'Imagem de exemplo',
        caption: '',
          width: '100%',
          borderRadius: '8px'
    case 'style-result':
        title: 'Seu Estilo Principal',
        description: 'Descrição personalizada do seu estilo predominante.',
        customImage: '',
          backgroundColor: '#FAF9F7',
          padding: '1.5rem',
    case 'secondary-styles':
        title: 'Seus Estilos Secundários',
        description: 'Estes estilos complementam seu estilo principal e ajudam a criar seu visual único.',
          backgroundColor: '#FFFFFF',
    case 'benefits':
        title: 'Benefícios',
        items: [
          { title: 'Benefício 1', description: 'Descrição do primeiro benefício' },
          { title: 'Benefício 2', description: 'Descrição do segundo benefício' },
          { title: 'Benefício 3', description: 'Descrição do terceiro benefício' }
        ],
          padding: '1rem'
    case 'cta':
        title: 'Aproveite Essa Oportunidade',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
          backgroundColor: '#B89B7A',
          color: '#FFFFFF',
          padding: '2rem',
    case 'spacer':
        height: '2rem'
    default:
        title: 'Novo Bloco',
        text: 'Conteúdo do bloco',
        style: {}
  }
};
