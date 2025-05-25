import { 
  Type, 
  Image as ImageIcon, 
  Square, 
  Layout, 
  User,
  List,
  BarChart3,
  DollarSign,
  AlertTriangle,
  Calendar,
  Star,
  FileText,
  Target,
  Zap,
  Check
} from 'lucide-react';

export interface ComponentDefinition {
  id: string;
  type: string;
  label: string;
  icon: any;
  category: string;
  defaultProps: Record<string, any>;
  description: string;
}

export const COMPONENT_CATEGORIES = [
  { id: 'basic', label: 'Básico', icon: Layout },
  { id: 'content', label: 'Conteúdo', icon: FileText },
  { id: 'interactive', label: 'Interativo', icon: Target },
  { id: 'marketing', label: 'Marketing', icon: Zap },
  { id: 'quiz', label: 'Quiz', icon: Check }
];

export const COMPONENT_REGISTRY: ComponentDefinition[] = [
  // BÁSICO
  {
    id: 'text',
    type: 'text',
    label: 'Texto',
    icon: Type,
    category: 'basic',
    description: 'Bloco de texto simples',
    defaultProps: {
      content: 'Digite seu texto aqui...',
      fontSize: 16,
      color: '#432818',
      fontWeight: 'normal',
      textAlign: 'left',
      lineHeight: 1.5
    }
  },
  {
    id: 'heading',
    type: 'heading',
    label: 'Título',
    icon: Type,
    category: 'basic',
    description: 'Títulos e subtítulos',
    defaultProps: {
      content: 'Título Aqui',
      level: 1,
      fontSize: 32,
      color: '#432818',
      fontWeight: 'bold',
      textAlign: 'center',
      gradient: false,
      gradientFrom: '#B89B7A',
      gradientTo: '#aa6b5d'
    }
  },
  {
    id: 'image',
    type: 'image',
    label: 'Imagem',
    icon: ImageIcon,
    category: 'basic',
    description: 'Imagens com legendas',
    defaultProps: {
      src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400',
      alt: 'Imagem',
      width: 400,
      height: 300,
      borderRadius: 8,
      objectFit: 'cover',
      caption: '',
      shadow: false
    }
  },
  {
    id: 'spacer',
    type: 'spacer',
    label: 'Espaçador',
    icon: Layout,
    category: 'basic',
    description: 'Espaço em branco',
    defaultProps: {
      height: 40,
      backgroundColor: 'transparent'
    }
  },

  // CONTEÚDO
  {
    id: 'alert',
    type: 'alert',
    label: 'Alerta',
    icon: AlertTriangle,
    category: 'content',
    description: 'Caixas de alerta e avisos',
    defaultProps: {
      title: 'Atenção!',
      content: 'Esta é uma mensagem importante.',
      variant: 'info', // info, warning, error, success
      closable: false
    }
  },
  {
    id: 'testimonial',
    type: 'testimonial',
    label: 'Depoimento',
    icon: User,
    category: 'content',
    description: 'Depoimentos de clientes',
    defaultProps: {
      quote: 'Este produto mudou minha vida!',
      author: 'João Silva',
      role: 'Cliente Satisfeito',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 5
    }
  },
  {
    id: 'arguments',
    type: 'arguments',
    label: 'Lista de Argumentos',
    icon: List,
    category: 'content',
    description: 'Lista de benefícios ou características',
    defaultProps: {
      title: 'Principais Benefícios',
      items: [
        'Resultado garantido em 30 dias',
        'Suporte 24/7 incluso',
        'Acesso vitalício ao conteúdo',
        'Garantia de satisfação'
      ],
      icon: 'check', // check, star, arrow
      color: '#10B981'
    }
  },

  // INTERATIVO
  {
    id: 'button',
    type: 'button',
    label: 'Botão',
    icon: Square,
    category: 'interactive',
    description: 'Botões de ação',
    defaultProps: {
      text: 'Clique Aqui',
      backgroundColor: '#B89B7A',
      textColor: '#ffffff',
      borderRadius: 8,
      padding: '12px 24px',
      fontSize: 16,
      fontWeight: 'bold',
      fullWidth: false,
      gradient: false,
      gradientFrom: '#B89B7A',
      gradientTo: '#aa6b5d',
      link: '#'
    }
  },
  {
    id: 'input',
    type: 'input',
    label: 'Campo de Entrada',
    icon: FileText,
    category: 'interactive',
    description: 'Campos de formulário',
    defaultProps: {
      label: 'Seu email',
      type: 'text', // text, email, password, number
      placeholder: 'Digite aqui...',
      required: false,
      borderRadius: 8,
      borderColor: '#D1D5DB',
      backgroundColor: '#ffffff',
      padding: '12px 16px'
    }
  },

  // MARKETING
  {
    id: 'pricing',
    type: 'pricing',
    label: 'Preço',
    icon: DollarSign,
    category: 'marketing',
    description: 'Tabela de preços',
    defaultProps: {
      originalPrice: 297,
      discountPrice: 97,
      currency: 'R$',
      highlight: 'DESCONTO DE 67%',
      features: [
        'Acesso completo',
        'Suporte premium',
        'Garantia de 30 dias'
      ],
      popular: false
    }
  },
  {
    id: 'countdown',
    type: 'countdown',
    label: 'Contador',
    icon: Calendar,
    category: 'marketing',
    description: 'Contador regressivo',
    defaultProps: {
      title: 'Oferta por tempo limitado!',
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      backgroundColor: '#EF4444',
      textColor: '#ffffff',
      fontSize: 24
    }
  },

  // QUIZ
  {
    id: 'chart',
    type: 'chart',
    label: 'Gráfico',
    icon: BarChart3,
    category: 'quiz',
    description: 'Gráficos de resultados',
    defaultProps: {
      title: 'Seus Resultados',
      type: 'bar', // bar, pie, line
      data: [
        { label: 'Liderança', value: 85 },
        { label: 'Comunicação', value: 70 },
        { label: 'Criatividade', value: 90 }
      ],
      color: '#B89B7A',
      height: 300
    }
  },
  {
    id: 'progress',
    type: 'progress',
    label: 'Barra de Progresso',
    icon: Target,
    category: 'quiz',
    description: 'Barras de progresso',
    defaultProps: {
      title: 'Seu Progresso',
      percentage: 75,
      color: '#10B981',
      backgroundColor: '#E5E7EB',
      height: 20,
      showPercentage: true,
      animated: true
    }
  }
];

export const getComponentDefinition = (type: string): ComponentDefinition | undefined => {
  return COMPONENT_REGISTRY.find(comp => comp.type === type);
};

export const getComponentsByCategory = (category: string): ComponentDefinition[] => {
  return COMPONENT_REGISTRY.filter(comp => comp.category === category);
};
