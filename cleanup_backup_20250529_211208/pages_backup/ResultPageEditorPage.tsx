
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { TemplateList } from '@/components/editor/templates/TemplateList';
import { Button } from '@/components/ui/button';
import { defaultResultTemplate } from '@/config/resultPageTemplates';
import { createOfferSectionConfig } from '@/utils/config/offerDefaults';

export const ResultPageEditorPage = () => {
  const [showTemplates, setShowTemplates] = useState(false);
  const router = useRouter();
  const { style } = router.query;
  
  const styleCategory = (style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo") || 'Natural';
  const selectedStyle = {
    category: styleCategory,
    score: 100,
    percentage: 100
  };

  const initialConfig = {
    styleType: styleCategory,
    header: {
      ...defaultResultTemplate.header,
      visible: true,
      style: {
        ...defaultResultTemplate.header.style,
        borderRadius: '0'
      }
    },
    mainContent: {
      ...defaultResultTemplate.mainContent,
      visible: true
    },
    offer: createOfferSectionConfig(),
    secondaryStyles: {
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

  const handleError = (error: Error) => {
    console.error('Error in ResultPageEditorPage:', error);
  };

  useEffect(() => {
    try {
      // Initialize any required setup
    } catch (error) {
      handleError(error as Error);
    }
  }, []);

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

export default ResultPageEditorPage;
