import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VisualEditor } from "@/components/visual-editor/VisualEditor";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Eye } from "lucide-react";
import type { VisualEditorData } from "@/types/visualEditor";

const VisualEditorPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [editorData, setEditorData] = useState<VisualEditorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const createDefaultEditorData = React.useCallback((): VisualEditorData => {
    const pageId = id || `page_${Date.now()}`;
    return {
      editorState: {
        elements: [],
        selectedElementId: null,
        globalStyles: {
          fontFamily: "Inter, sans-serif",
          primaryColor: "#B89B7A",
          secondaryColor: "#A38A69",
          backgroundColor: "#FAF9F7",
          textColor: "#333333",
        },
        settings: {
          snapToGrid: true,
          gridSize: 8,
          showGrid: false,
          responsiveMode: "desktop",
        },
      },
      pageInfo: {
        id: pageId,
        title: "Nova Página",
        description: "Descrição da página",
        slug: `pagina-${pageId}`,
        isPublished: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }, [id]);

  useEffect(() => {
    const loadEditorData = async () => {
      try {
        setLoading(true);
        
        // Se temos um ID, carregamos dados existentes
        if (id) {
          const storageKey = `visual_editor_page_${id}`;
          const savedData = localStorage.getItem(storageKey);
          
          if (savedData) {
            const parsedData = JSON.parse(savedData) as VisualEditorData;
            setEditorData(parsedData);
          } else {
            // Página não encontrada, redirecionar ou criar nova
            toast({
              title: "Página não encontrada",
              description: "Criando uma nova página.",
              variant: "default",
            });
            setEditorData(createDefaultEditorData());
          }
        } else {
          // Nova página
          setEditorData(createDefaultEditorData());
        }
      } catch (error) {
        console.error("Erro ao carregar dados do editor:", error);
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar os dados da página.",
          variant: "destructive",
        });
        setEditorData(createDefaultEditorData());
      } finally {
        setLoading(false);
      }
    };

    loadEditorData();
  }, [id, toast, createDefaultEditorData]);

  const createDefaultEditorData = (): VisualEditorData => {
    const pageId = id || `page_${Date.now()}`;
    return {
      editorState: {
        elements: [],
        selectedElementId: null,
        globalStyles: {
          fontFamily: "Inter, sans-serif",
          primaryColor: "#B89B7A",
          secondaryColor: "#A38A69",
          backgroundColor: "#FAF9F7",
          textColor: "#333333",
        },
        settings: {
          snapToGrid: true,
          gridSize: 8,
          showGrid: false,
          responsiveMode: "desktop",
        },
      },
      pageInfo: {
        id: pageId,
        title: "Nova Página",
        description: "Descrição da página",
        slug: `pagina-${pageId}`,
        isPublished: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  };

  const handleSave = async (data: VisualEditorData) => {
    try {
      setSaving(true);
      
      // Atualizar timestamp
      const updatedData = {
        ...data,
        pageInfo: {
          ...data.pageInfo,
          updatedAt: new Date().toISOString(),
        },
      };

      // Salvar no localStorage
      const storageKey = `visual_editor_page_${updatedData.pageInfo.id}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedData));

      // Manter lista de páginas salvas
      const pagesListKey = "visual_editor_pages_list";
      const existingPages = JSON.parse(localStorage.getItem(pagesListKey) || "[]");
      const pageIndex = existingPages.findIndex((p: { id: string }) => p.id === updatedData.pageInfo.id);
      
      if (pageIndex >= 0) {
        existingPages[pageIndex] = updatedData.pageInfo;
      } else {
        existingPages.push(updatedData.pageInfo);
      }
      
      localStorage.setItem(pagesListKey, JSON.stringify(existingPages));

      // Atualizar estado local
      setEditorData(updatedData);

      toast({
        title: "Página salva com sucesso",
        description: "Todas as alterações foram salvas.",
      });

      // Se for uma nova página, redirecionar com o ID
      if (!id) {
        navigate(`/visual-editor/${updatedData.pageInfo.id}`, { replace: true });
      }
    } catch (error) {
      console.error("Erro ao salvar página:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações da página.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (editorData) {
      // Abrir preview em nova aba
      const previewUrl = `/preview/${editorData.pageInfo.id}`;
      window.open(previewUrl, '_blank');
    }
  };

  const handlePublish = async () => {
    if (!editorData) return;

    try {
      setSaving(true);
      
      const publishedData = {
        ...editorData,
        pageInfo: {
          ...editorData.pageInfo,
          isPublished: !editorData.pageInfo.isPublished,
          updatedAt: new Date().toISOString(),
        },
      };

      await handleSave(publishedData);

      toast({
        title: publishedData.pageInfo.isPublished ? "Página publicada" : "Página despublicada",
        description: publishedData.pageInfo.isPublished 
          ? "Sua página está agora disponível publicamente."
          : "Sua página foi removida do acesso público.",
      });
    } catch (error) {
      console.error("Erro ao publicar/despublicar página:", error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status de publicação.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-[#B89B7A] border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-[#B89B7A]">Carregando editor visual...</div>
        </div>
      </div>
    );
  }

  if (!editorData) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <div className="text-red-500 mb-4">Erro ao carregar dados do editor</div>
          <Button onClick={() => navigate("/dashboard")}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#B89B7A]/20 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>
          
          <div className="h-6 w-px bg-[#B89B7A]/20" />
          
          <div className="flex flex-col">
            <h1 className="text-sm font-medium text-gray-900">
              {editorData.pageInfo.title}
            </h1>
            <p className="text-xs text-gray-500">
              {editorData.pageInfo.isPublished ? "Publicada" : "Rascunho"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePreview}
            className="border-[#B89B7A]/30 text-[#B89B7A] hover:bg-[#B89B7A]/5"
          >
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          
          <Button
            variant="outline"
            onClick={handlePublish}
            disabled={saving}
            className={`border-[#B89B7A]/30 ${
              editorData.pageInfo.isPublished
                ? "text-orange-600 hover:bg-orange-50"
                : "text-green-600 hover:bg-green-50"
            }`}
          >
            {editorData.pageInfo.isPublished ? "Despublicar" : "Publicar"}
          </Button>
          
          <Button
            onClick={() => handleSave(editorData)}
            disabled={saving}
            className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <VisualEditor
          initialData={editorData}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default VisualEditorPage;
