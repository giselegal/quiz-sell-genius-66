
"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface VisualEditorPageProps {
  initialData?: any;
}

const VisualEditorPage: React.FC<VisualEditorPageProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const defaultConfig = {
    styleType: 'Elegante',
    header: {
      visible: true,
      style: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        borderRadius: '0'
      }
    },
    mainContent: {
      visible: true
    },
    offer: {
      visible: true,
      content: {
        title: 'Oferta Especial',
        description: 'Transforme seu estilo hoje mesmo'
      }
    },
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

  const handleSave = () => {
    try {
      console.log('Saving configuration...');
      setIsLoading(true);
      // Save logic here
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    try {
      console.log('Opening preview...');
    } catch (error) {
      console.error('Error opening preview:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-6">
        <Card className="h-full p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Editor Visual</h1>
            <p className="text-gray-600 mb-6">
              Configure sua página de resultados usando o editor visual.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handlePreview}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Visualizar
              </button>
              
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VisualEditorPage;
