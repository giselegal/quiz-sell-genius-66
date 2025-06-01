// src/utils/builderAnalytics.ts
import { ComponentType } from 'react';

// Função de tracking que você já tem no projeto
const trackButtonClick = (trackingId: string, additionalData?: any) => {
  // Esta função deve se conectar com seu sistema de analytics existente
  // Por exemplo, Google Analytics, Facebook Pixel, etc.
  console.log('Builder.io Button Click:', { trackingId, additionalData });
  
  // Exemplo de integração com seu sistema de analytics:
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'builder_component_click', {
      custom_parameter_1: trackingId,
      custom_parameter_2: additionalData
    });
  }
};

// Wrapper para tracking em componentes Builder.io
export const withBuilderTracking = <T extends object>(
  Component: ComponentType<T>
) => {
  return (props: T & { trackingId?: string; [key: string]: any }) => {
    const handleClick = (event: React.MouseEvent) => {
      // Rastrear o clique
      trackButtonClick(props.trackingId || 'builder-component', {
        componentType: Component.displayName || Component.name || 'UnknownComponent',
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
      
      // Executar o onClick original se existir
      if (props.onClick) {
        props.onClick(event);
      }
    };

    return <Component {...props} onClick={handleClick} />;
  };
};

// Função para rastrear interações específicas do quiz
export const trackQuizInteraction = (action: string, data: any) => {
  console.log('Quiz Interaction:', { action, data });
  
  // Integração com seu sistema de analytics existente
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'quiz_interaction', {
      action,
      quiz_data: JSON.stringify(data),
      timestamp: new Date().toISOString()
    });
  }
};

// Função para rastrear visualizações de conteúdo Builder.io
export const trackBuilderContentView = (contentId: string, contentType: string) => {
  console.log('Builder Content View:', { contentId, contentType });
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'builder_content_view', {
      content_id: contentId,
      content_type: contentType,
      timestamp: new Date().toISOString()
    });
  }
};

export { trackButtonClick };
