import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Save, RefreshCw, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Header } from '@/components/result/Header';
import { useToast } from '@/hooks/use-toast';

const HeaderEditorPage: React.FC = () => {
  const [headerConfig, setHeaderConfig] = useState({
    logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
    logoAlt: "Logo Gisele Galvão",
    title: "Olá",
    logoHeight: 80,
    userName: "Visitante"
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Carregar configurações salvas do localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('headerConfig');
    if (savedConfig) {
      try {
        setHeaderConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Erro ao carregar configuração do header:', error);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setHeaderConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Salvar no localStorage (em produção, isso seria uma API)
      localStorage.setItem('headerConfig', JSON.stringify(headerConfig));
      
      toast({
        title: "Configurações Salvas",
        description: "As alterações do header foram salvas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setHeaderConfig({
      logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
      logoAlt: "Logo Gisele Galvão",
      title: "Olá",
      logoHeight: 80,
      userName: "Visitante"
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header da página */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-2 text-[#B89B7A] hover:text-[#432818] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Painel
            </Link>
            <h1 className="text-2xl font-bold text-[#432818]">
              Editor do Header - Página de Resultado
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {previewMode ? 'Editar' : 'Preview'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Painel de Edição */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#432818]">
              Configurações do Header
            </h2>

            <div className="space-y-4">
              {/* Logo URL */}
              <div>
                <Label htmlFor="logo" className="text-sm font-medium text-[#432818]">
                  URL da Logo
                </Label>
                <Input
                  id="logo"
                  value={headerConfig.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                  className="mt-1"
                />
              </div>

              {/* Logo Alt Text */}
              <div>
                <Label htmlFor="logoAlt" className="text-sm font-medium text-[#432818]">
                  Texto Alternativo da Logo
                </Label>
                <Input
                  id="logoAlt"
                  value={headerConfig.logoAlt}
                  onChange={(e) => handleInputChange('logoAlt', e.target.value)}
                  placeholder="Logo da Empresa"
                  className="mt-1"
                />
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
                  Título de Saudação
                </Label>
                <Input
                  id="title"
                  value={headerConfig.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Olá"
                  className="mt-1"
                />
              </div>

              {/* User Name for Preview */}
              <div>
                <Label htmlFor="userName" className="text-sm font-medium text-[#432818]">
                  Nome do Usuário (Preview)
                </Label>
                <Input
                  id="userName"
                  value={headerConfig.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  placeholder="Nome do usuário"
                  className="mt-1"
                />
              </div>

              {/* Logo Height */}
              <div>
                <Label htmlFor="logoHeight" className="text-sm font-medium text-[#432818]">
                  Altura da Logo (px)
                </Label>
                <Input
                  id="logoHeight"
                  type="number"
                  value={headerConfig.logoHeight}
                  onChange={(e) => handleInputChange('logoHeight', parseInt(e.target.value) || 80)}
                  placeholder="80"
                  min="40"
                  max="200"
                  className="mt-1"
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Botões de Ação */}
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#B89B7A] hover:bg-[#8F7A6A]"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>

              <Button
                onClick={handleReset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Resetar
              </Button>
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#432818]">
              Preview do Header
            </h2>
            
            <div className="border rounded-lg p-4 bg-[#FAF9F7]">
              <Header
                logo={headerConfig.logo}
                logoAlt={headerConfig.logoAlt}
                title={headerConfig.title}
                logoHeight={headerConfig.logoHeight}
                userName={headerConfig.userName}
                primaryStyle={{
                  category: "Elegante",
                  score: 0,
                  percentage: 100,
                  description: "Preview do estilo"
                }}
              />
            </div>

            {/* Informações úteis */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">💡 Dicas:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• A logo ideal tem formato transparente (PNG)</li>
                <li>• Altura recomendada: 60-120px</li>
                <li>• Teste diferentes tamanhos para melhor visualização</li>
                <li>• O nome do usuário será dinâmico na aplicação real</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Link para visualizar na página real */}
        <Card className="mt-6 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#432818]">Testar na Página Real</h3>
              <p className="text-sm text-[#8F7A6A]">
                Veja como o header aparece na página de resultado completa
              </p>
            </div>
            <Link
              to="/resultado"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#B89B7A] text-white rounded hover:bg-[#8F7A6A] transition-colors"
            >
              <Eye className="h-4 w-4" />
              Ver Página Completa
            </Link>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default HeaderEditorPage;
