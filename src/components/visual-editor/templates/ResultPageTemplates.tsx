
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StyleResult } from '@/types/quiz';
import { VisualElement } from '@/types/visualEditor';

interface ResultPageTemplatesProps {
  onSelectTemplate: (elements: VisualElement[]) => void;
  primaryStyle: StyleResult;
}

export const ResultPageTemplates: React.FC<ResultPageTemplatesProps> = ({
  onSelectTemplate,
  primaryStyle
}) => {
  const createBasicTemplate = (): VisualElement[] => [
    {
      id: 'header-1',
      type: 'title',
      stageId: 'result-stage',
      order: 0,
      content: {
        text: `Seu Estilo é ${primaryStyle.category}`,
        level: 'h1'
      },
      style: {
        textAlign: 'center',
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#432818',
        marginBottom: '2rem'
      },
      visible: true,
      locked: false
    },
    {
      id: 'subtitle-1',
      type: 'text',
      stageId: 'result-stage',
      order: 1,
      content: {
        text: `Parabéns! Você tem ${primaryStyle.percentage}% de compatibilidade com o estilo ${primaryStyle.category}`
      },
      style: {
        textAlign: 'center',
        fontSize: '1.25rem',
        color: '#8F7A6A',
        marginBottom: '3rem'
      },
      visible: true,
      locked: false
    },
    {
      id: 'image-1',
      type: 'image',
      stageId: 'result-stage',
      order: 2,
      content: {
        src: 'https://via.placeholder.com/400x300?text=Seu+Estilo',
        alt: 'Seu Estilo'
      },
      style: {
        width: '400px',
        height: 'auto',
        margin: '0 auto 3rem auto',
        display: 'block'
      },
      visible: true,
      locked: false
    },
    {
      id: 'cta-1',
      type: 'button',
      stageId: 'result-stage',
      order: 3,
      content: {
        text: 'Descobrir Como Aplicar Meu Estilo'
      },
      style: {
        display: 'block',
        margin: '0 auto',
        padding: '1rem 2rem',
        fontSize: '1.1rem'
      },
      visible: true,
      locked: false
    }
  ];

  const createDetailedTemplate = (): VisualElement[] => [
    {
      id: 'header-detailed',
      type: 'title',
      stageId: 'result-stage',
      order: 0,
      content: {
        text: 'Descobrimos Seu Estilo Único!',
        level: 'h1'
      },
      style: {
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#432818',
        marginBottom: '1rem'
      },
      visible: true,
      locked: false
    },
    {
      id: 'style-badge',
      type: 'text',
      stageId: 'result-stage',
      order: 1,
      content: {
        text: primaryStyle.category
      },
      style: {
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#B89B7A',
        padding: '1rem 2rem',
        borderRadius: '1rem',
        display: 'inline-block',
        margin: '0 auto 2rem auto'
      },
      visible: true,
      locked: false
    },
    {
      id: 'description',
      type: 'text',
      stageId: 'result-stage',
      order: 2,
      content: {
        text: 'Baseado nas suas respostas, identificamos que você tem uma forte conexão com este estilo. Agora vamos te ajudar a aplicá-lo no seu dia a dia!'
      },
      style: {
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#8F7A6A',
        marginBottom: '3rem',
        maxWidth: '600px',
        margin: '0 auto 3rem auto'
      },
      visible: true,
      locked: false
    },
    {
      id: 'spacer-1',
      type: 'spacer',
      stageId: 'result-stage',
      order: 3,
      content: {},
      style: {
        height: '2rem'
      },
      visible: true,
      locked: false
    },
    {
      id: 'offer-title',
      type: 'title',
      stageId: 'result-stage',
      order: 4,
      content: {
        text: 'Transforme Seu Estilo Agora',
        level: 'h2'
      },
      style: {
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#432818',
        marginBottom: '1rem'
      },
      visible: true,
      locked: false
    },
    {
      id: 'offer-description',
      type: 'text',
      stageId: 'result-stage',
      order: 5,
      content: {
        text: 'Acesso completo ao guia personalizado para seu estilo, com looks, dicas e muito mais!'
      },
      style: {
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#8F7A6A',
        marginBottom: '2rem'
      },
      visible: true,
      locked: false
    },
    {
      id: 'cta-main',
      type: 'button',
      stageId: 'result-stage',
      order: 6,
      content: {
        text: 'QUERO MEU GUIA PERSONALIZADO'
      },
      style: {
        display: 'block',
        margin: '0 auto',
        padding: '1.5rem 3rem',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      },
      visible: true,
      locked: false
    }
  ];

  const templates = [
    {
      name: 'Básico',
      description: 'Template simples com resultado e CTA',
      preview: 'https://via.placeholder.com/200x150?text=Básico',
      elements: createBasicTemplate()
    },
    {
      name: 'Detalhado',
      description: 'Template completo com oferta',
      preview: 'https://via.placeholder.com/200x150?text=Detalhado',
      elements: createDetailedTemplate()
    }
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-[#432818] mb-4">
        Templates para Página de Resultado
      </h3>
      
      <div className="grid gap-4">
        {templates.map((template, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-4">
              <img 
                src={template.preview} 
                alt={template.name}
                className="w-20 h-15 rounded border border-[#B89B7A]/20"
              />
              <div className="flex-1">
                <h4 className="font-medium text-[#432818]">{template.name}</h4>
                <p className="text-sm text-[#8F7A6A] mb-3">{template.description}</p>
                <Button
                  size="sm"
                  onClick={() => onSelectTemplate(template.elements)}
                  className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
                >
                  Usar Template
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
