
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { Button } from '@/components/ui/button';
import { createOfferSectionConfig } from '@/utils/config/offerDefaults';

export const EditorPage = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const { style } = useParams<{ style?: string }>();
  
  const styleCategory = (style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo") || 'Natural';
  
  const selectedStyle = {
    category: styleCategory,
    score: 100,
    percentage: 100
  };
  
  // Complete initialConfig with all required properties
  const initialConfig = {
    styleType: styleCategory,
    heroSection: {
      title: "Descubra Seu Estilo",
      subtitle: "Transforme seu visual com nosso quiz personalizado",
      imageUrl: "",
      ctaText: "Começar Quiz",
      backgroundColor: "#FAF9F7"
    },
    aboutSection: {
      title: "Sobre Seu Estilo",
      description: "Entenda melhor suas preferências e descubra looks perfeitos para você",
      imageUrl: ""
    },
    header: {
      visible: true,
      style: {
        borderRadius: '0',
        padding: '20px',
        backgroundColor: '#FAF9F7',
        textColor: '#432818'
      },
      content: {
        title: 'Quiz de Estilo',
        logo: ''
      }
    },
    mainContent: {
      visible: true,
      style: {
        padding: '40px'
      },
      content: {
        title: 'Seu Resultado',
        description: 'Descubra seu estilo único'
      }
    },
    offer: createOfferSectionConfig(),
    secondaryStyles: {
      visible: true,
      content: {},
      style: {
        padding: '20px'
      }
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Playfair Display, serif'
    },
    blocks: []
  };
  
  return (
    <div className="h-screen">
      {showTemplates ? (
        <div className="p-8 max-w-4xl mx-auto">
          <Button
            onClick={() => setShowTemplates(false)}
            variant="outline"
            className="mb-4"
          >
            Voltar ao Editor
          </Button>
          <TemplateList onSelectTemplate={() => setShowTemplates(false)} />
        </div>
      ) : (
        <ResultPageVisualEditor 
          selectedStyle={selectedStyle} 
          onShowTemplates={() => setShowTemplates(true)}
          initialConfig={initialConfig}
        />
      )}
    </div>
  );
};

export default EditorPage;
