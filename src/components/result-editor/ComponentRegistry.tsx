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
  TrendingUp
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
