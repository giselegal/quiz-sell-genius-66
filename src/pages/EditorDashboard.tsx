import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Eye,
  Copy,
  Trash2,
  Calendar,
  Users,
  BarChart3,
  Layers,
  Zap,
  Download,
  Upload,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface PageSummary {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  isPublished: boolean;
  views?: number;
  conversions?: number;
}

export const EditorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [filteredPages, setFilteredPages] = useState<PageSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showImportDialog, setShowImportDialog] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

  useEffect(() => {
    filterPages();
  }, [pages, searchQuery]);

  const loadPages = async () => {
    try {
      setLoading(true);
      const pagesList = JSON.parse(
        localStorage.getItem("quiz-editor-pages") || "[]"
      );
      setPages(pagesList);
    } catch (error) {
      console.error("Erro ao carregar páginas:", error);
      toast.error("Erro ao carregar páginas");
    } finally {
      setLoading(false);
    }
  };

  const filterPages = () => {
    if (!searchQuery.trim()) {
      setFilteredPages(pages);
    } else {
      const filtered = pages.filter(
        (page) =>
          page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          page.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPages(filtered);
    }
  };

  const handleCreateNew = () => {
    navigate("/editor/page/new");
  };

  const handleEditPage = (pageId: string) => {
    navigate(`/editor/page/${pageId}`);
  };

  const handlePreviewPage = (pageId: string) => {
    window.open(`/preview/${pageId}`, "_blank");
  };

  const handleDuplicatePage = async (pageId: string) => {
    try {
      const originalData = localStorage.getItem(`quiz-editor-page-${pageId}`);
      if (!originalData) {
        toast.error("Página não encontrada");
        return;
      }

      const parsedData = JSON.parse(originalData);
      const newId =
        Date.now().toString(36) + Math.random().toString(36).substr(2);

      const duplicatedData = {
        ...parsedData,
        id: newId,
        name: `${parsedData.name} (Cópia)`,
        lastModified: new Date().toISOString(),
        isPublished: false,
      };

      localStorage.setItem(
        `quiz-editor-page-${newId}`,
        JSON.stringify(duplicatedData)
      );

      const newPageSummary = {
        id: newId,
        name: duplicatedData.name,
        description: duplicatedData.description,
        lastModified: duplicatedData.lastModified,
        isPublished: false,
      };

      setPages((prev) => [...prev, newPageSummary]);
      localStorage.setItem(
        "quiz-editor-pages",
        JSON.stringify([...pages, newPageSummary])
      );

      toast.success("Página duplicada com sucesso!");
    } catch (error) {
      console.error("Erro ao duplicar página:", error);
      toast.error("Erro ao duplicar página");
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta página?")) return;

    try {
      localStorage.removeItem(`quiz-editor-page-${pageId}`);
      const updatedPages = pages.filter((page) => page.id !== pageId);
      setPages(updatedPages);
      localStorage.setItem("quiz-editor-pages", JSON.stringify(updatedPages));

      toast.success("Página excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir página:", error);
      toast.error("Erro ao excluir página");
    }
  };

  const handleImportPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);

        const newId =
          Date.now().toString(36) + Math.random().toString(36).substr(2);
        const pageData = {
          ...importedData,
          id: newId,
          name: `${importedData.name} (Importado)`,
          lastModified: new Date().toISOString(),
          isPublished: false,
        };

        localStorage.setItem(
          `quiz-editor-page-${newId}`,
          JSON.stringify(pageData)
        );

        const newPageSummary = {
          id: newId,
          name: pageData.name,
          description: pageData.description,
          lastModified: pageData.lastModified,
          isPublished: false,
        };

        setPages((prev) => [...prev, newPageSummary]);
        localStorage.setItem(
          "quiz-editor-pages",
          JSON.stringify([...pages, newPageSummary])
        );

        toast.success("Página importada com sucesso!");
        setShowImportDialog(false);
      } catch (error) {
        console.error("Erro ao importar:", error);
        toast.error(
          "Erro ao importar arquivo. Verifique se é um arquivo JSON válido."
        );
      }
    };
    reader.readAsText(file);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Quiz Editor
                </h1>
                <p className="text-sm text-gray-500">Dashboard de Páginas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Dialog
                open={showImportDialog}
                onOpenChange={setShowImportDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Importar Página</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Selecione um arquivo JSON exportado anteriormente para
                      importar uma página.
                    </p>
                    <Input
                      type="file"
                      accept=".json"
                      onChange={handleImportPage}
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                onClick={handleCreateNew}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Página
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar páginas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{filteredPages.length} página(s) encontrada(s)</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total de Páginas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {pages.length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Publicadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {pages.filter((p) => p.isPublished).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Rascunhos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {pages.filter((p) => !p.isPublished).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total de Visualizações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {pages.reduce((sum, p) => sum + (p.views || 0), 0)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pages Grid */}
        {filteredPages.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery
                  ? "Nenhuma página encontrada"
                  : "Nenhuma página criada"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? "Tente ajustar os termos de busca ou criar uma nova página."
                  : "Comece criando sua primeira página de quiz."}
              </p>
              {!searchQuery && (
                <Button
                  onClick={handleCreateNew}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Página
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {page.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {page.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditPage(page.id)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handlePreviewPage(page.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicatePage(page.id)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePage(page.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={page.isPublished ? "default" : "secondary"}>
                      {page.isPublished ? (
                        <>
                          <Zap className="w-3 h-3 mr-1" />
                          Publicado
                        </>
                      ) : (
                        "Rascunho"
                      )}
                    </Badge>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {page.views && (
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {page.views}
                        </div>
                      )}
                      {page.conversions && (
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          {page.conversions}%
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    Modificado em {formatDate(page.lastModified)}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEditPage(page.id)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreviewPage(page.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
