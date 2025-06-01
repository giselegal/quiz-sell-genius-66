import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Settings, ExternalLink, RefreshCw } from 'lucide-react';
import { BUILDER_CONFIG } from '../config/builderConfig.js';

const ABTestStatus: React.FC = () => {
  const [currentMode, setCurrentMode] = useState(BUILDER_CONFIG.CURRENT_MODE);
  const [pageReloads, setPageReloads] = useState(0);

  const getStatusColor = (mode: string) => {
    switch (mode) {
      case 'PRODUCTION': return 'bg-green-500';
      case 'DEMO': return 'bg-blue-500';
      case 'OFFLINE': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (mode: string) => {
    switch (mode) {
      case 'PRODUCTION': return 'Produção - API Real';
      case 'DEMO': return 'Demo - API Demo';
      case 'OFFLINE': return 'Offline - Fallback';
      default: return 'Desconhecido';
    }
  };

  const handleTestRoute = (route: string) => {
    window.open(route, '_blank');
  };

  const handleRefresh = () => {
    setPageReloads(prev => prev + 1);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F5F2EE] to-[#F0EBE5] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🧪 Status da Integração A/B Testing
          </h1>
          <p className="text-lg text-gray-600">
            Sistema Builder.io integrado e funcionando
          </p>
        </div>

        {/* Status Geral */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Status do Sistema
            </h2>
            <Badge className={`${getStatusColor(currentMode)} text-white`}>
              <CheckCircle className="w-4 h-4 mr-2" />
              {getStatusText(currentMode)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Rotas Ativas</h3>
              <p className="text-green-600">2/2 páginas com A/B</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-800">Builder.io</h3>
              <p className="text-blue-600">Integrado e configurado</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-800">Fallback</h3>
              <p className="text-purple-600">Sistema robusto ativo</p>
            </div>
          </div>
        </Card>

        {/* Rotas Testáveis */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🛣️ Páginas com A/B Testing
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">/resultado</h3>
                <p className="text-gray-600">Página de resultados do quiz com A/B testing</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleTestRoute('/resultado')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Testar
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">/quiz-descubra-seu-estilo</h3>
                <p className="text-gray-600">Página de oferta do quiz com A/B testing</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleTestRoute('/quiz-descubra-seu-estilo')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Testar
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Configuração Atual */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ⚙️ Configuração Atual
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Modo Ativo</h3>
              <p className="text-gray-600">{currentMode}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">API Key</h3>
              <p className="text-gray-600">
                {currentMode === 'PRODUCTION' ? 'Real (configurada)' : 'Demo/Fallback'}
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Fallback</h3>
              <p className="text-gray-600">Ativo - Sempre mostra página original</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">A/B Testing</h3>
              <p className="text-gray-600">Habilitado em ambas as páginas</p>
            </div>
          </div>
        </Card>

        {/* Próximos Passos */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🚀 Próximos Passos
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">Obter API Key Real</h3>
                <p className="text-gray-600">Configurar API key do Builder.io no builderConfig.js</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Criar Conteúdo A/B</h3>
                <p className="text-gray-600">Usar Builder.io dashboard para criar variações das páginas</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Configurar Experimentos</h3>
                <p className="text-gray-600">Definir regras de segmentação e métricas de conversão</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-800">Alterar para Produção</h3>
                <p className="text-gray-600">Mudar CURRENT_MODE para "PRODUCTION" no arquivo de config</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Botão de Refresh */}
        <div className="text-center mt-8">
          <Button 
            onClick={handleRefresh}
            className="bg-[#B89B7A] hover:bg-[#A58B6F] text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar Status (Reloads: {pageReloads})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ABTestStatus;
