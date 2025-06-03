import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { blockTemplates, getTemplatesByCategory, getAllCategories, BlockTemplate } from '@/data/blockTemplates';

interface BlockTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: BlockTemplate) => void;
}

const BlockTemplateModal: React.FC<BlockTemplateModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = getAllCategories();

  const filteredTemplates = blockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template: BlockTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'marketing': return '📈';
      case 'content': return '📝';
      case 'social': return '👥';
      case 'design': return '🎨';
      default: return '📦';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'marketing': return 'bg-red-100 text-red-800';
      case 'content': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-green-100 text-green-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#432818] mb-4">
            🧱 Galeria de Templates
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Barra de pesquisa */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs por categoria */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="text-sm">
                📦 Todos
              </TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {getCategoryIcon(category)} {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-2">
                {filteredTemplates.map(template => (
                  <Card
                    key={template.id}
                    className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-[#B89B7A]/50"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div className="space-y-3">
                      {/* Header do template */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{template.icon}</span>
                          <div>
                            <h3 className="font-semibold text-[#432818] text-sm">
                              {template.name}
                            </h3>
                            <Badge 
                              className={`text-xs ${getCategoryColor(template.category)}`}
                            >
                              {template.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Descrição */}
                      <p className="text-xs text-[#8F7A6A] leading-relaxed">
                        {template.description}
                      </p>

                      {/* Preview dos blocos */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-[#6B5B4E]">
                          Contém {template.blocks.length} bloco{template.blocks.length !== 1 ? 's' : ''}:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {template.blocks.map((block, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {block.type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Botão de ação */}
                      <Button
                        className="w-full text-xs bg-[#B89B7A] hover:bg-[#A1835D] text-white"
                        size="sm"
                      >
                        Usar Template
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12 text-[#8F7A6A]">
                  <p className="text-lg mb-2">🔍</p>
                  <p>Nenhum template encontrado</p>
                  <p className="text-sm">Tente ajustar sua pesquisa ou categoria</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-[#8F7A6A]">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} encontrado{filteredTemplates.length !== 1 ? 's' : ''}
          </p>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockTemplateModal;
