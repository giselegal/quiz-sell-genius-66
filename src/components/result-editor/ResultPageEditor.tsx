// @lovable

"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StyleResult } from '@/types/quiz';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';
import { toast } from '@/components/ui/use-toast';
import EditorToolbar from './EditorToolbar';
import EditableSection from './EditableSection';
import { Eye, EyeOff, Save, Undo } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import StyleEditor from './StyleEditor';
import GlobalStyleEditor from './GlobalStyleEditor';
import HeaderEditor from './editors/HeaderEditor';
import MainContentEditor from './editors/MainContentEditor';
import OfferHeroEditor from './editors/OfferHeroEditor';
import PricingEditor from './editors/PricingEditor';
import { set, get } from 'lodash';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/components/ui/use-toast';

interface ResultPageEditorProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const ResultPageEditor: React.FC<ResultPageEditorProps> = ({
  primaryStyle,
  secondaryStyles
}) => {
  const [previewMode, setPreviewMode] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingStyles, setEditingStyles] = useState(false);
  const [globalStylesOpen, setGlobalStylesOpen] = useState(false);
  
  const { 
    resultPageConfig, 
    updateSection, 
    saveConfig,
    resetConfig,
    importConfig,
    loading 
  } = useResultPageConfig(primaryStyle.category);

  const handleSave = async () => {
    try {
      await saveConfig();
      toast({
        title: 'Configurações salvas',
        description: 'As alterações foram salvas com sucesso',
      });
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as alterações',
        variant: 'destructive'
      });
    }
  };

  const handleReset = () => {
    resetConfig(primaryStyle.category);
    toast({
      title: 'Configurações redefinidas',
      description: 'As configurações foram redefinidas para os valores padrão',
    });
  };

  const handleUpdateConfig = (newConfig: any) => {
    if (newConfig) {
      try {
        importConfig(newConfig);
        toast({
          title: "Configuração atualizada",
          description: "A configuração foi aplicada com sucesso",
        });
      } catch (error) {
        console.error('Error updating config:', error);
        toast({
          title: "Erro ao atualizar configuração",
          description: "Ocorreu um erro ao aplicar a configuração",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" color="#B89B7A" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <EditorToolbar 
        onPreviewToggle={() => setPreviewMode(!previewMode)}
        isPreviewMode={previewMode}
        onSave={handleSave}
        onReset={handleReset}
        onEditGlobalStyles={() => setGlobalStylesOpen(true)}
        resultPageConfig={resultPageConfig}
        onUpdateConfig={handleUpdateConfig}
      />
      
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className={"transition-all duration-300 " + (previewMode ? '' : 'border-2 border-dashed border-gray-300 p-4 rounded-lg')}>
          {/* Main Content Section */}
          <EditableSection
            title="Estilo Principal"
            sectionPath="mainContent"
            content={resultPageConfig.mainContent?.content || {}}
            style={resultPageConfig.mainContent?.style || {}}
            visible={resultPageConfig.mainContent?.visible !== false}
            isPreview={previewMode}
            onEdit={() => setEditingSection('mainContent')}
            onToggleVisibility={() => {}}
            onStyleEdit={() => {
              setEditingStyles(true);
              setEditingSection('mainContent');
            }}
            primaryStyle={primaryStyle}
          />
        </div>
      </div>

      {/* Content Editor Sheet */}
      <Sheet open={!!editingSection && !editingStyles} onOpenChange={() => setEditingSection(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              Editar Conteúdo
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <div className="space-y-4">
              <p>Editor de conteúdo em desenvolvimento...</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Style Editor Sheet */}
      <Sheet open={!!editingSection && editingStyles} onOpenChange={() => {
        setEditingSection(null);
        setEditingStyles(false);
      }}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              Editar Estilos
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <StyleEditor 
              style={{}}
              onUpdate={(style) => {
                console.log('Style updated:', style);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Global Styles Sheet */}
      <Sheet open={globalStylesOpen} onOpenChange={setGlobalStylesOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Estilos Globais</SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <GlobalStyleEditor 
              globalStyles={resultPageConfig.globalStyles || {}}
              onUpdate={(styles) => {
                updateSection('globalStyles', styles);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ResultPageEditor;
