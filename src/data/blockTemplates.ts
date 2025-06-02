import { BlockData } from '@/types/resultPageConfig';

export interface BlockTemplate {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'content' | 'social' | 'design';
  icon: string;
  blocks: Omit<BlockData, 'id' | 'order'>[];
}

export const blockTemplates: BlockTemplate[] = [
  {
    id: 'hero-simple',
    name: 'Hero Simples',
    description: 'Seção hero básica com título e subtítulo',
    category: 'marketing',
    icon: '🎯',
    blocks: [{
      type: 'hero',
      title: 'Hero Simples',
      content: {
        title: 'Título Principal',
        subtitle: 'Subtítulo explicativo'
      },
      style: {
        backgroundColor: 'white',
        padding: '3rem',
        textAlign: 'center'
      },
      visible: true,
      editable: true
    }]
  },
  {
    id: 'cta-urgency',
    name: 'CTA com Urgência',
    description: 'Call to action com elementos de urgência',
    category: 'marketing',
    icon: '🚀',
    blocks: [{
      type: 'cta',
      title: 'CTA Urgência',
      content: {
        title: '⏰ Oferta Por Tempo Limitado!',
        description: 'Não perca esta oportunidade única. Restam apenas 24 horas!',
        ctaText: 'Quero Aproveitar Agora',
        price: 'R$ 97,00',
        regularPrice: 'R$ 197,00'
      },
      style: {
        backgroundColor: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        padding: '2rem',
        textAlign: 'center',
        color: 'white'
      },
      visible: true,
      editable: true
    }]
  },
  {
    id: 'testimonial-card',
    name: 'Depoimento Card',
    description: 'Depoimento em formato de card elegante',
    category: 'social',
    icon: '💬',
    blocks: [{
      type: 'testimonials',
      title: 'Depoimento',
      content: {
        title: 'O que nossos clientes dizem',
        description: 'Produto incrível! Superou todas as minhas expectativas. Recomendo para todos!',
        userName: 'Maria Silva',
        userRole: 'Empresária',
        rating: 5
      },
      style: {
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '1rem'
      },
      visible: true,
      editable: true
    }]
  },
  {
    id: 'pricing-table',
    name: 'Tabela de Preços',
    description: 'Seção de preços com destaque na oferta',
    category: 'marketing',
    icon: '💰',
    blocks: [{
      type: 'pricing',
      title: 'Preços',
      content: {
        title: 'Investimento',
        description: 'Escolha o plano ideal para você',
        price: 'R$ 97,00',
        regularPrice: 'R$ 197,00',
        features: [
          'Acesso vitalício',
          'Suporte por email',
          'Garantia de 30 dias'
        ]
      },
      style: {
        backgroundColor: 'white',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '1rem'
      },
      visible: true,
      editable: true
    }]
  },
  {
    id: 'bonus-grid',
    name: 'Grid de Bônus',
    description: 'Seção de bônus com layout em grid',
    category: 'marketing',
    icon: '🎁',
    blocks: [{
      type: 'bonus',
      title: 'Bônus Exclusivos',
      content: {
        title: '🎁 Bônus Especiais',
        description: 'Além do conteúdo principal, você recebe materiais extras',
        bonuses: [
          {
            title: 'E-book Exclusivo',
            description: 'Guia completo em PDF',
            value: 'R$ 49,90'
          },
          {
            title: 'Planilhas Práticas',
            description: 'Templates prontos para usar',
            value: 'R$ 29,90'
          }
        ]
      },
      style: {
        backgroundColor: '#fff7f3',
        padding: '2rem'
      },
      visible: true,
      editable: true
    }]
  },
  {
    id: 'text-image-split',
    name: 'Texto + Imagem',
    description: 'Layout dividido com texto e imagem',
    category: 'content',
    icon: '📝',
    blocks: [
      {
        type: 'text',
        title: 'Texto Principal',
        content: {
          title: 'Sobre Nosso Método',
          description: 'Nossa abordagem única combina técnicas comprovadas com inovação, garantindo resultados excepcionais para nossos clientes.'
        },
        style: {
          backgroundColor: 'white',
          padding: '1.5rem'
        },
        visible: true,
        editable: true
      },
      {
        type: 'image',
        title: 'Imagem Ilustrativa',
        content: {
          imageUrl: 'https://via.placeholder.com/600x400',
          alt: 'Imagem ilustrativa'
        },
        style: {
          backgroundColor: 'white',
          padding: '1rem',
          textAlign: 'center'
        },
        visible: true,
        editable: true
      }
    ]
  },
  {
    id: 'guarantee-shield',
    name: 'Garantia com Selo',
    description: 'Seção de garantia com visual de segurança',
    category: 'marketing',
    icon: '🛡️',
    blocks: [{
      type: 'guarantee',
      title: 'Garantia',
      content: {
        title: '🛡️ Garantia Incondicional',
        description: 'Teste por 30 dias sem riscos. Se não ficar satisfeito, devolvemos 100% do seu investimento.',
        period: '30 dias',
        type: 'Incondicional'
      },
      style: {
        backgroundColor: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        padding: '2rem',
        textAlign: 'center',
        color: 'white',
        borderRadius: '1rem'
      },
      visible: true,
      editable: true
    }]
  },
  {
    id: 'mentor-intro',
    name: 'Apresentação do Mentor',
    description: 'Seção para apresentar o mentor/especialista',
    category: 'content',
    icon: '👨‍🏫',
    blocks: [{
      type: 'mentor',
      title: 'Mentor',
      content: {
        title: 'Conheça Seu Mentor',
        description: 'Especialista com mais de 10 anos de experiência, já ajudou mais de 5.000 pessoas a alcançarem seus objetivos.',
        name: 'Dr. João Silva',
        credentials: 'PhD em Desenvolvimento Pessoal',
        experience: '10+ anos de experiência'
      },
      style: {
        backgroundColor: '#f8f9fa',
        padding: '2rem'
      },
      visible: true,
      editable: true
    }]
  }
];

export const getTemplatesByCategory = (category: BlockTemplate['category']) => {
  return blockTemplates.filter(template => template.category === category);
};

export const getAllCategories = (): BlockTemplate['category'][] => {
  return ['marketing', 'content', 'social', 'design'];
};

export const getTemplateById = (id: string) => {
  return blockTemplates.find(template => template.id === id);
};
