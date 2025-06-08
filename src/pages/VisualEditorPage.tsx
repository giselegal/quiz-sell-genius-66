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
    return {
      editorState: {
        elements: [],
        selectedElementId: null,
        hoveredElementId: null,
        viewport: "desktop",
        zoomLevel: 1,
        isPreviewMode: false,
        globalStyles: {
          fontFamily: "Inter, sans-serif",
          primaryColor: "#B89B7A",
          secondaryColor: "#A38A69",
          backgroundColor: "#FAF9F7",
          containerMaxWidth: "1200px",
          customCSS: "",
        },
        settings: {
          snapToGrid: true,
          gridSize: 8,
          showGrid: false,
          showRulers: false,
          showBoundingBoxes: false,
          autoSave: true,
          autoSaveInterval: 30,
        },
      },
      pageInfo: {
        title: "Nova Página",
        description: "Descrição da página",
        slug: `pagina-${Date.now()}`,
        published: false,
      },
    };
  }, []);

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

  const handleSave = async (data: VisualEditorData) => {
    try {
      setSaving(true);

      // Usar o ID da URL ou gerar um novo se não existir
      const pageId = id || `page_${Date.now()}`;

      // Atualizar dados com timestamp
      const updatedData = {
        ...data,
        pageInfo: {
          ...data.pageInfo,
          // Adicionar timestamp para rastrear mudanças
        },
      };

      // Salvar no localStorage
      const storageKey = `visual_editor_page_${pageId}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedData));

      // Manter lista de páginas salvas
      const pagesListKey = "visual_editor_pages_list";
      const existingPages = JSON.parse(
        localStorage.getItem(pagesListKey) || "[]"
      );

      const pageInfo = {
        id: pageId,
        ...updatedData.pageInfo,
        updatedAt: new Date().toISOString(),
      };

      const pageIndex = existingPages.findIndex(
        (p: { id: string }) => p.id === pageId
      );

      if (pageIndex >= 0) {
        existingPages[pageIndex] = pageInfo;
      } else {
        existingPages.push(pageInfo);
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
        navigate(`/visual-editor/${pageId}`, { replace: true });
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
      // Usar o ID da URL ou gerar um temporário
      const pageId = id || "preview";
      const previewUrl = `/preview/${pageId}`;
      window.open(previewUrl, "_blank");
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
          published: !editorData.pageInfo.published,
        },
      };

      await handleSave(publishedData);

      toast({
        title: publishedData.pageInfo.published
          ? "Página publicada"
          : "Página despublicada",
        description: publishedData.pageInfo.published
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
          <div className="text-red-500 mb-4">
            Erro ao carregar dados do editor
          </div>
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
              {editorData.pageInfo.published ? "Publicada" : "Rascunho"}
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
              editorData.pageInfo.published
                ? "text-orange-600 hover:bg-orange-50"
                : "text-green-600 hover:bg-green-50"
            }`}
          >
            {editorData.pageInfo.published ? "Despublicar" : "Publicar"}
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
        <VisualEditor initialData={editorData} onSave={handleSave} />
      </div>
    </div>
  );
};

export default VisualEditorPage;
