
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Editor Visual
          </h1>
          <Button 
            onClick={() => navigate('/admin')}
            variant="outline"
          >
            ← Voltar ao Dashboard
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Editor Visual de Páginas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Use este editor para personalizar visualmente suas páginas de quiz e resultado.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Funcionalidades:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Editor drag-and-drop</li>
                  <li>Personalização de cores e tipografia</li>
                  <li>Preview em tempo real</li>
                  <li>Salvamento automático</li>
                </ul>
              </div>
              
              <Button className="w-full">
                Iniciar Editor Visual
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditorPage;
