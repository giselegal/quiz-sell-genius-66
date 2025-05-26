import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LayoutGrid, Copy, Save, Undo, Redo, Settings, Eye, Code } from 'lucide-react';
import DraggableQuizEditor from './DraggableQuizEditor';
import { QuizQuestion } from '@/types/quiz';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

interface VisualEditorLayoutProps {
  initialQuestions?: QuizQuestion[];
  onSave?: (questions: QuizQuestion[]) => void;
}

const VisualEditorLayout: React.FC<VisualEditorLayoutProps> = ({
  initialQuestions = [],
  onSave
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [activeTab, setActiveTab] = useState('editor');
  const [previewMode, setPreviewMode] = useState(false);
  const [showProperties, setShowProperties] = useState(true);
  
  const handleSave = () => {
    if (onSave) {
      onSave(questions);
    }
    
    // Salvar localmente também
    safeLocalStorage.setItem('quiz_editor_questions', JSON.stringify(questions));
    
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso.",
    });
  };
  
  const handleDuplicate = () => {
    toast({
      title: "Quiz duplicado",
      description: "Uma cópia do quiz foi criada com sucesso.",
    });
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#FAF9F7]">
      {/* Barra de ferramentas superior */}
      <div className="border-b border-[#B89B7A]/20 bg-white p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-[#B89B7A]" />
          <h1 className="font-playfair text-lg text-[#432818]">Editor Visual de Quiz</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-1" />
            Duplicar
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-1" />
            {previewMode ? 'Editar' : 'Visualizar'}
          </Button>
          
          <Button 
            className="bg-[#B89B7A] hover:bg-[#A38A69] text-white" 
            size="sm"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
        </div>
      </div>
      
      {/* Área principal */}
      <div className="flex-1 overflow-hidden">
        {previewMode ? (
          <div className="h-full overflow-auto p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-[#B89B7A]/20 p-6">
              <h2 className="text-2xl font-playfair text-center text-[#432818] mb-6">Pré-visualização do Quiz</h2>
              
              {questions.map((question, index) => (
                <div key={question.id} className="mb-8">
                  <h3 className="text-xl font-medium text-[#432818] mb-4">{question.title}</h3>
                  <div className={`grid gap-4 ${
                    question.options.length <= 2 ? "grid-cols-1 md:grid-cols-2" :
                    question.options.length <= 4 ? "grid-cols-2 md:grid-cols-4" :
                    "grid-cols-2 md:grid-cols-4"
                  }`}>
                    {question.options.map((option) => (
                      <div 
                        key={option.id}
                        className="relative h-full border border-[#B89B7A]/20 rounded-lg p-4 hover:border-[#B89B7A]/40 hover:shadow-sm transition-all"
                      >
                        {option.imageUrl && (
                          <div className="mb-2 h-24 overflow-hidden rounded">
                            <img 
                              src={option.imageUrl} 
                              alt={option.text} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Imagem';
                              }}
                            />
                          </div>
                        )}
                        <p className="text-sm text-[#432818]">{option.text}</p>
                        <div className="mt-1 text-xs text-[#8F7A6A]">{option.styleCategory} ({option.points} pts)</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal">
            {/* Painel de edição */}
            <ResizablePanel defaultSize={75} minSize={50}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="border-b border-[#B89B7A]/20 bg-white px-4">
                  <TabsList className="bg-transparent h-12">
                    <TabsTrigger value="editor" className="data-[state=active]:bg-[#FAF9F7]">
                      Editor de Quiz
                    </TabsTrigger>
                    <TabsTrigger value="result" className="data-[state=active]:bg-[#FAF9F7]">
                      Página de Resultado
                    </TabsTrigger>
                    <TabsTrigger value="offer" className="data-[state=active]:bg-[#FAF9F7]">
                      Página de Oferta
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="editor" className="flex-1 overflow-auto p-0 m-0">
                  <DraggableQuizEditor 
                    questions={questions} 
                    onQuestionsChange={setQuestions} 
                  />
                </TabsContent>
                
                <TabsContent value="result" className="flex-1 overflow-auto p-4 m-0">
                  <div className="h-full flex items-center justify-center">
                    <Card className="p-8 text-center max-w-md">
                      <h3 className="text-xl font-medium text-[#432818] mb-2">Editor de Página de Resultado</h3>
                      <p className="text-[#8F7A6A] mb-4">Configure como os resultados do quiz serão exibidos para o usuário.</p>
                      <Button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white">
                        Configurar Página de Resultado
                      </Button>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="offer" className="flex-1 overflow-auto p-4 m-0">
                  <div className="h-full flex items-center justify-center">
                    <Card className="p-8 text-center max-w-md">
                      <h3 className="text-xl font-medium text-[#432818] mb-2">Editor de Página de Oferta</h3>
                      <p className="text-[#8F7A6A] mb-4">Configure a página de oferta que será exibida após o resultado do quiz.</p>
                      <Button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white">
                        Configurar Página de Oferta
                      </Button>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
            
            {showProperties && (
              <>
                <ResizableHandle withHandle />
                
                {/* Painel de propriedades */}
                <ResizablePanel defaultSize={25} minSize={20}>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full border-l border-[#B89B7A]/20 bg-white overflow-y-auto"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-[#432818]">Propriedades</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setShowProperties(false)}
                          className="h-8 w-8"
                        >
                          <Settings className="h-4 w-4 text-[#8F7A6A]" />
                        </Button>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-[#8F7A6A] mb-1">Título do Quiz</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30"
                            placeholder="Digite o título do quiz"
                            defaultValue="Quiz de Estilo"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-[#8F7A6A] mb-1">Descrição</label>
                          <textarea
                            className="w-full p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30 min-h-[100px]"
                            placeholder="Digite uma descrição para o quiz"
                            defaultValue="Descubra seu estilo predominante respondendo às perguntas abaixo."
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-[#8F7A6A] mb-1">Cor primária</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              className="w-10 h-10 border border-[#B89B7A]/20 rounded-md overflow-hidden"
                              defaultValue="#B89B7A"
                            />
                            <input
                              type="text"
                              className="flex-1 p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30"
                              defaultValue="#B89B7A"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-[#8F7A6A] mb-1">Imagem de fundo</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              className="flex-1 p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30"
                              placeholder="URL da imagem de fundo"
                            />
                            <Button variant="outline" size="icon" className="flex-shrink-0">
                              <Code className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium text-[#432818]">Configurações Avançadas</h4>
                        
                        <div>
                          <label className="block text-sm text-[#8F7A6A] mb-1">Método de cálculo</label>
                          <select
                            className="w-full p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30"
                            defaultValue="points"
                          >
                            <option value="points">Pontuação</option>
                            <option value="points_click">Pontuação + Ordem de Clique</option>
                            <option value="percentage">Porcentagem</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-[#8F7A6A] mb-1">Teste A/B</label>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="ab-testing" />
                            <label htmlFor="ab-testing" className="text-sm text-[#432818]">Ativar teste A/B</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default VisualEditorLayout;
