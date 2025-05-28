import React from 'react';
import { 
  Type, 
  Image, 
  Square, 
  MousePointer, 
  List, 
  BarChart3, 
  User, 
  Star,
  Play,
  Volume2,
  ImageIcon,
  Zap,
  Palette,
  Monitor,
  Clock,
  TrendingUp,
  DollarSign,
  RefreshCw,
  PieChart,
  Anchor,
  Shield,
  Award,
  CheckCircle
} from 'lucide-react';

export interface ComponentDefinition {
  id: string;
  type: string;
  label: string;
  icon: any;
  category: string;
  description: string;
  defaultProps: Record<string, any>;
  requiredFeature?: string;
  isPremium?: boolean;
}

export const COMPONENT_CATEGORIES = [
  { id: 'basic', name: 'Básicos', icon: Type },
  { id: 'media', name: 'Mídia', icon: Play },
  { id: 'interactive', name: 'Interativos', icon: MousePointer },
  { id: 'advanced', name: 'Avançados', icon: Zap },
  { id: 'premium', name: 'Premium', icon: Star }
];

export const COMPONENT_REGISTRY: ComponentDefinition[] = [
  // COMPONENTES BÁSICOS
  {
    id: 'heading',
    type: 'heading',
    label: 'Título',
    icon: Type,
    category: 'basic',
    description: 'Títulos e subtítulos para estruturar o conteúdo',
    defaultProps: {
      content: 'Seu Título Aqui',
      level: 1,
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#1a1a1a',
      marginBottom: 20
    }
  },
  {
    id: 'text',
    type: 'text',
    label: 'Texto',
    icon: Type,
    category: 'basic',
    description: 'Parágrafos e textos corridos',
    defaultProps: {
      content: 'Adicione seu texto aqui...',
      fontSize: 16,
      lineHeight: 1.6,
      textAlign: 'left',
      color: '#4a4a4a',
      marginBottom: 16
    }
  },
  {
    id: 'button',
    type: 'button',
    label: 'Botão',
    icon: MousePointer,
    category: 'basic',
    description: 'Botões de ação e chamadas para ação',
    defaultProps: {
      text: 'Clique Aqui',
      url: '#',
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderRadius: 8,
      padding: '12px 24px',
      fontSize: 16,
      fontWeight: 'semibold',
      textAlign: 'center',
      marginTop: 20
    }
  },
  {
    id: 'image',
    type: 'image',
    label: 'Imagem',
    icon: Image,
    category: 'basic',
    description: 'Imagens estáticas simples',
    defaultProps: {
      src: 'https://via.placeholder.com/400x200',
      alt: 'Imagem',
      width: 400,
      height: 200,
      borderRadius: 8,
      objectFit: 'cover',
      marginBottom: 20
    }
  },

  // COMPONENTES DE MÍDIA (PREMIUM)
  {
    id: 'video',
    type: 'video',
    label: 'Vídeo',
    icon: Play,
    category: 'media',
    description: 'Player de vídeo com controles personalizados',
    isPremium: true,
    requiredFeature: 'videos',
    defaultProps: {
      src: '',
      poster: 'https://via.placeholder.com/640x360',
      width: 640,
      height: 360,
      autoplay: false,
      controls: true,
      muted: false,
      loop: false,
      borderRadius: 12,
      marginBottom: 20
    }
  },
  {
    id: 'audio',
    type: 'audio',
    label: 'Áudio',
    icon: Volume2,
    category: 'media',
    description: 'Player de áudio personalizado',
    isPremium: true,
    requiredFeature: 'audio',
    defaultProps: {
      src: '',
      title: 'Áudio',
      description: 'Descrição do áudio',
      autoplay: false,
      controls: true,
      backgroundColor: '#f3f4f6',
      accentColor: '#3b82f6',
      showWaveform: true,
      marginBottom: 20
    }
  },
  {
    id: 'image-carousel',
    type: 'image-carousel',
    label: 'Carrossel de Imagens',
    icon: ImageIcon,
    category: 'media',
    description: 'Galeria de imagens navegável',
    isPremium: true,
    requiredFeature: 'carousels',
    defaultProps: {
      images: [
        { src: 'https://via.placeholder.com/600x400', alt: 'Imagem 1', title: 'Título 1' },
        { src: 'https://via.placeholder.com/600x400', alt: 'Imagem 2', title: 'Título 2' },
        { src: 'https://via.placeholder.com/600x400', alt: 'Imagem 3', title: 'Título 3' }
      ],
      height: 400,
      showDots: true,
      showArrows: true,
      autoplay: false,
      autoplaySpeed: 3000,
      borderRadius: 12,
      marginBottom: 20
    }
  },

  // COMPONENTES INTERATIVOS
  {
    id: 'countdown',
    type: 'countdown',
    label: 'Countdown Timer',
    icon: Clock,
    category: 'interactive',
    description: 'Timer regressivo para criar urgência',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      title: 'Oferta Termina Em:',
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
      accentColor: '#ef4444',
      fontSize: 24,
      borderRadius: 12,
      marginBottom: 20
    }
  },
  {
    id: 'progress-bar',
    type: 'progress-bar',
    label: 'Barra de Progresso',
    icon: TrendingUp,
    category: 'interactive',
    description: 'Barra de progresso animada',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      label: 'Progresso',
      percentage: 75,
      showPercentage: true,
      animated: true,
      backgroundColor: '#e5e7eb',
      fillColor: '#10b981',
      height: 20,
      borderRadius: 10,
      animationDuration: 2000,
      marginBottom: 20
    }
  },

  // COMPONENTES AVANÇADOS (PREMIUM)
  {
    id: 'animated-text',
    type: 'animated-text',
    label: 'Texto Animado',
    icon: Zap,
    category: 'advanced',
    description: 'Texto com efeitos de animação',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      content: 'Texto Animado',
      animation: 'typewriter',
      speed: 100,
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1a1a1a',
      textAlign: 'center',
      marginBottom: 20
    }
  },
  {
    id: 'gradient-box',
    type: 'gradient-box',
    label: 'Caixa com Gradiente',
    icon: Palette,
    category: 'advanced',
    description: 'Container com fundo gradiente personalizado',
    isPremium: true,
    requiredFeature: 'custom-css',
    defaultProps: {
      content: 'Conteúdo da caixa',
      gradientFrom: '#3b82f6',
      gradientTo: '#8b5cf6',
      direction: 'to-r',
      padding: 32,
      borderRadius: 16,
      textColor: '#ffffff',
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 20
    }
  },
  {
    id: 'device-mockup',
    type: 'device-mockup',
    label: 'Mockup de Dispositivo',
    icon: Monitor,
    category: 'premium',
    description: 'Exiba conteúdo dentro de mockups de dispositivos',
    isPremium: true,
    requiredFeature: 'all-features',
    defaultProps: {
      device: 'iphone',
      content: 'https://via.placeholder.com/375x667',
      scale: 1,
      backgroundColor: '#f8fafc',
      marginBottom: 20
    }
  },

  // COMPONENTES DE VENDAS E PREÇOS
  {
    id: 'price-box',
    type: 'price-box',
    label: 'Caixa de Preço',
    icon: DollarSign,
    category: 'premium',
    description: 'Exibição de preços com destaque para ofertas',
    isPremium: true,
    requiredFeature: 'custom-css',
    defaultProps: {
      originalPrice: 497,
      currentPrice: 197,
      currency: 'R$',
      discount: 60,
      showDiscount: true,
      highlightSavings: true,
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      accentColor: '#ef4444',
      textAlign: 'center',
      padding: 24,
      borderRadius: 12,
      marginBottom: 20
    }
  },
  {
    id: 'value-anchor',
    type: 'value-anchor',
    label: 'Ancoragem de Valor',
    icon: Anchor,
    category: 'premium',
    description: 'Componente para estabelecer valor percebido',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      title: 'Valor Real do que Você Recebe:',
      items: [
        { name: 'Curso Completo', value: 297 },
        { name: 'Templates Exclusivos', value: 97 },
        { name: 'Suporte VIP', value: 197 },
        { name: 'Bônus Especiais', value: 147 }
      ],
      totalValue: 738,
      yourPrice: 197,
      showCalculation: true,
      highlightSavings: true,
      backgroundColor: '#f8fafc',
      borderColor: '#10b981',
      accentColor: '#10b981',
      marginBottom: 20
    }
  },
  {
    id: 'before-after',
    type: 'before-after',
    label: 'Antes e Depois',
    icon: RefreshCw,
    category: 'premium',
    description: 'Comparação visual de transformação',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      title: 'Sua Transformação',
      beforeTitle: 'ANTES',
      afterTitle: 'DEPOIS',
      beforeItems: [
        'Sem direção clara',
        'Resultados inconsistentes',
        'Baixa produtividade',
        'Falta de sistema'
      ],
      afterItems: [
        'Foco total no objetivo',
        'Resultados previsíveis',
        'Alta performance',
        'Sistema organizado'
      ],
      beforeColor: '#ef4444',
      afterColor: '#10b981',
      showArrow: true,
      backgroundColor: '#ffffff',
      borderRadius: 12,
      marginBottom: 20
    }
  },

  // COMPONENTES DE GRÁFICOS
  {
    id: 'bar-chart',
    type: 'bar-chart',
    label: 'Gráfico de Barras',
    icon: BarChart3,
    category: 'premium',
    description: 'Gráfico de barras customizável',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      title: 'Resultados dos Nossos Alunos',
      data: [
        { label: 'Mês 1', value: 25, color: '#3b82f6' },
        { label: 'Mês 2', value: 45, color: '#10b981' },
        { label: 'Mês 3', value: 70, color: '#f59e0b' },
        { label: 'Mês 4', value: 95, color: '#ef4444' }
      ],
      maxValue: 100,
      showValues: true,
      animated: true,
      backgroundColor: '#ffffff',
      gridColor: '#e5e7eb',
      marginBottom: 20
    }
  },
  {
    id: 'pie-chart',
    type: 'pie-chart',
    label: 'Gráfico de Pizza',
    icon: PieChart,
    category: 'premium',
    description: 'Gráfico circular para percentuais',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      title: 'Distribuição de Resultados',
      data: [
        { label: 'Excelente', value: 45, color: '#10b981' },
        { label: 'Bom', value: 35, color: '#3b82f6' },
        { label: 'Regular', value: 15, color: '#f59e0b' },
        { label: 'Ruim', value: 5, color: '#ef4444' }
      ],
      showPercentages: true,
      showLegend: true,
      animated: true,
      size: 300,
      marginBottom: 20
    }
  },

  // COMPONENTES DE SOCIAL PROOF
  {
    id: 'testimonial-card',
    type: 'testimonial-card',
    label: 'Depoimento',
    icon: User,
    category: 'premium',
    description: 'Card de depoimento com foto e avaliação',
    isPremium: true,
    requiredFeature: 'custom-css',
    defaultProps: {
      name: 'Maria Silva',
      role: 'Empreendedora',
      avatar: 'https://via.placeholder.com/80x80',
      rating: 5,
      testimonial: 'Este quiz mudou completamente minha perspectiva sobre negócios. Resultados incríveis em apenas 30 dias!',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      showStars: true,
      marginBottom: 20
    }
  },
  {
    id: 'guarantee-badge',
    type: 'guarantee-badge',
    label: 'Selo de Garantia',
    icon: Shield,
    category: 'premium',
    description: 'Badge de garantia para reduzir objeções',
    isPremium: true,
    requiredFeature: 'custom-css',
    defaultProps: {
      title: 'Garantia de 30 Dias',
      subtitle: '100% do seu dinheiro de volta',
      description: 'Se não ficar satisfeito, devolvemos todo o valor investido.',
      icon: 'shield',
      backgroundColor: '#fef3c7',
      borderColor: '#f59e0b',
      textColor: '#92400e',
      accentColor: '#f59e0b',
      size: 'large',
      marginBottom: 20
    }
  },
  {
    id: 'benefits-list',
    type: 'benefits-list',
    label: 'Lista de Benefícios',
    icon: CheckCircle,
    category: 'premium',
    description: 'Lista com checkmarks para destacar benefícios',
    isPremium: true,
    requiredFeature: 'custom-css',
    defaultProps: {
      title: 'O que você vai receber:',
      benefits: [
        'Acesso vitalício ao conteúdo',
        'Suporte direto com especialistas',
        'Certificado de conclusão',
        'Garantia de 30 dias',
        'Bônus exclusivos',
        'Comunidade VIP'
      ],
      checkColor: '#10b981',
      iconStyle: 'check',
      backgroundColor: '#f8fafc',
      padding: 24,
      borderRadius: 12,
      marginBottom: 20
    }
  },

  // COMPONENTES DE URGÊNCIA
  {
    id: 'scarcity-counter',
    type: 'scarcity-counter',
    label: 'Contador de Escassez',
    icon: Clock,
    category: 'premium',
    description: 'Contador de vagas ou tempo limitado',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      type: 'spots', // 'spots' ou 'time'
      title: 'Restam apenas',
      totalSpots: 100,
      remainingSpots: 23,
      updateInterval: 30000, // 30 segundos
      backgroundColor: '#fef2f2',
      borderColor: '#ef4444',
      textColor: '#991b1b',
      accentColor: '#ef4444',
      showProgress: true,
      marginBottom: 20
    }
  },
  {
    id: 'bonus-stack',
    type: 'bonus-stack',
    label: 'Stack de Bônus',
    icon: Award,
    category: 'premium',
    description: 'Empilhamento de bônus para aumentar valor',
    isPremium: true,
    requiredFeature: 'advanced-animations',
    defaultProps: {
      title: 'Bônus Exclusivos Para Você:',
      bonuses: [
        {
          name: 'E-book: Estratégias Avançadas',
          value: 97,
          description: 'Técnicas secretas dos experts'
        },
        {
          name: 'Planilha de Controle',
          value: 47,
          description: 'Template pronto para usar'
        },
        {
          name: 'Acesso ao Grupo VIP',
          value: 197,
          description: 'Networking com outros alunos'
        }
      ],
      showValues: true,
      animateReveal: true,
      backgroundColor: '#ffffff',
      borderColor: '#d97706',
      accentColor: '#d97706',
      marginBottom: 20
    }
  }
];

// Função para filtrar componentes baseado nas permissões do usuário
export const getAvailableComponents = (userFeatures: string[] = [], hasPremiumFeatures: boolean = false) => {
  return COMPONENT_REGISTRY.filter(component => {
    // Se não é premium, sempre disponível
    if (!component.isPremium) return true;
    
    // Se é premium mas usuário tem acesso premium
    if (component.isPremium && hasPremiumFeatures) {
      // Verificar se tem a feature específica
      if (component.requiredFeature) {
        return userFeatures.includes(component.requiredFeature) || userFeatures.includes('all-features');
      }
      return true;
    }
    
    return false;
  });
};

export default COMPONENT_REGISTRY;
