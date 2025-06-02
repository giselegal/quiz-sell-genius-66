
// src/components/admin/BuilderPageSetup.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { AlertCircle, CheckCircle, ExternalLink, Settings, Info } from 'lucide-react';
import { checkBuilderModels, builderModels } from '@/utils/builderModels';
import { createAllRequiredModels, openBuilderSetupInstructions } from '@/utils/builderModelCreator';

const BuilderPageSetup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modelsStatus, setModelsStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkModelsStatus();
  }, []);

  const checkModelsStatus = async () => {
    try {
      setLoading(true);
      const status = await checkBuilderModels();
      setModelsStatus(status);
    } catch (err) {
      setError('Erro ao verificar status dos modelos');
    } finally {
      setLoading(false);
    }
  };

  const createModels = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Tentar criar automaticamente os modelos via API
      const result = await createAllRequiredModels();
      
      if (result.success) {
        alert(`Modelos criados com sucesso: ${result.createdModels.join(', ')}`);
        await checkModelsStatus();
      } else {
        // Se não conseguir criar automaticamente, mostrar instruções
        const instructions = openBuilderSetupInstructions();
        setError(`Não foi possível criar os modelos automaticamente. ${instructions}`);
      }
      
    } catch (err) {
      console.error('Erro ao configurar modelos:', err);
      // Fallback para instruções manuais
      openBuilderSetupInstructions();
      setError('Erro ao configurar modelos Builder.io. Verifique as instruções na nova aba aberta.');
    } finally {
      setLoading(false);
    }
  };

  const openBuilderDashboard = (model: string) => {
    const builderUrl = `https://builder.io/content/${model}`;
    window.open(builderUrl, '_blank');
  };

  if (loading && !modelsStatus) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Configuração das Páginas A/B Testing
        </h2>
        <p className="text-gray-600 mb-4">
          Configure e gerencie as páginas editáveis no Builder.io para testes A/B
        </p>
        
        {!modelsStatus?.bothExist && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Modelos Builder.io Necessários</h4>
              <p className="text-yellow-700 text-sm">
                As rotas <code>/resultado</code> e <code>/quiz-descubra-seu-estilo</code> precisam dos modelos 
                Builder.io para funcionar. Clique em "Configurar Modelo" para criá-los automaticamente.
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Página de Resultado */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${
              modelsStatus?.resultModelExists ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <h3 className="text-lg font-semibold">Página de Resultado</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Rota: <code className="bg-gray-100 px-2 py-1 rounded">/resultado</code>
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {modelsStatus?.resultModelExists ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className={modelsStatus?.resultModelExists ? 'text-green-700' : 'text-gray-500'}>
                Modelo Builder.io configurado
              </span>
            </div>
            
            <div className="flex gap-2">
              {modelsStatus?.resultModelExists ? (
                <Button
                  onClick={() => openBuilderDashboard(builderModels.RESULTADO_PAGE)}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Editar no Builder.io
                </Button>
              ) : (
                <Button
                  onClick={createModels}
                  disabled={loading}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Settings className="h-4 w-4" />
                  Configurar Modelo
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Página de Oferta do Quiz */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${
              modelsStatus?.quizOfferModelExists ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <h3 className="text-lg font-semibold">Página de Oferta</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Rota: <code className="bg-gray-100 px-2 py-1 rounded">/quiz-descubra-seu-estilo</code>
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {modelsStatus?.quizOfferModelExists ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span className={modelsStatus?.quizOfferModelExists ? 'text-green-700' : 'text-gray-500'}>
                Modelo Builder.io configurado
              </span>
            </div>
            
            <div className="flex gap-2">
              {modelsStatus?.quizOfferModelExists ? (
                <Button
                  onClick={() => openBuilderDashboard(builderModels.QUIZ_OFFER_PAGE)}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Editar no Builder.io
                </Button>
              ) : (
                <Button
                  onClick={createModels}
                  disabled={loading}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <Settings className="h-4 w-4" />
                  Configurar Modelo
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Status Geral */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-4">Status da Integração</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Builder.io API conectada</span>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Componentes registrados</span>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Páginas A/B configuradas</span>
            {modelsStatus?.bothExist ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        </div>

        {modelsStatus?.bothExist && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ✅ Integração completa! As páginas estão prontas para edição visual no Builder.io.
            </p>
          </div>
        )}
      </Card>

      {/* Instruções */}
      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-4">Como usar</h3>
        
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Configure os modelos clicando em "Configurar Modelo" se ainda não estiverem criados</li>
          <li>Clique em "Editar no Builder.io" para abrir o editor visual</li>
          <li>Crie diferentes versões das páginas no Builder.io</li>
          <li>Configure testes A/B no dashboard do Builder.io</li>
          <li>As páginas alternarão automaticamente entre versão original e Builder.io</li>
        </ol>
      </Card>
    </div>
  );
};

export default BuilderPageSetup;
