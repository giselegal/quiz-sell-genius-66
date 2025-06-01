import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cn } from '@/lib/utils';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/card';
import { PlusCircle, Trash2, Copy, Eye, Move, Settings, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionOptionEditor from '../quiz-editor/QuestionOptionEditor';
import { QuizOption as QuizOptionComponent } from '../quiz/QuizOption';

type ItemType = 'QUESTION' | 'OPTION';

interface DraggableItemProps {
  id: string;
  index: number;
  type: ItemType;
  moveItem: (dragIndex: number, hoverIndex: number, type: ItemType, parentId?: string) => void;
  children: React.ReactNode;
  parentId?: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ 
  id, 
  index, 
  type, 
  moveItem, 
  children,
  parentId 
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { id, index, type, parentId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (item: { id: string; index: number; type: ItemType; parentId?: string }, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex && item.parentId === parentId) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex, type, parentId);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref} 
      className={cn(
        "transition-opacity duration-200",
        isDragging ? "opacity-50" : "opacity-100"
      )}
    >
      {children}
    </div>
  );
};

interface QuestionBlockProps {
  question: QuizQuestion;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  updateQuestion: (id: string, updates: Partial<QuizQuestion>) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
  moveOption: (questionId: string, dragIndex: number, hoverIndex: number) => void;
  addOption: (questionId: string) => void;
  updateOption: (questionId: string, optionId: string, updates: Partial<QuizOption>) => void;
  deleteOption: (questionId: string, optionId: string) => void;
  previewMode: boolean;
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({
  question,
  index,
  moveQuestion,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
  moveOption,
  addOption,
  updateOption,
  deleteOption,
  previewMode
}) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleMoveOption = useCallback(
    (dragIndex: number, hoverIndex: number, type: ItemType, parentId?: string) => {
      if (type === 'OPTION' && parentId === question.id) {
        moveOption(question.id, dragIndex, hoverIndex);
      }
    },
    [moveOption, question.id]
  );

  if (previewMode) {
    return (
      <div className="mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-[#B89B7A]/20">
        <h3 className="text-xl font-medium text-[#432818] mb-4">{question.title}</h3>
        <div className={cn(
          "grid gap-4",
          question.options.length <= 2 ? "grid-cols-1 md:grid-cols-2" :
          question.options.length <= 4 ? "grid-cols-2 md:grid-cols-4" :
          "grid-cols-2 md:grid-cols-4"
        )}>
          {question.options.map((option) => (
            <QuizOptionComponent
              key={option.id}
              option={option}
              isSelected={option.id === selectedOptionId}
              onSelect={(id) => setSelectedOptionId(id)}
              type={question.type}
              questionId={question.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <DraggableItem
      id={question.id}
      index={index}
      type="QUESTION"
      moveItem={moveQuestion}
    >
      <Card className="mb-6 border-[#B89B7A]/20 shadow-sm overflow-hidden">
        <div className="bg-[#FAF9F7] p-3 border-b border-[#B89B7A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Move className="h-4 w-4 text-[#B89B7A] cursor-move" />
            <h3 className="font-medium text-[#432818]">
              Pergunta {index + 1}: {question.title}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpanded(!expanded)}
              className="h-8 w-8"
            >
              <Settings className="h-4 w-4 text-[#8F7A6A]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => duplicateQuestion(question.id)}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4 text-[#8F7A6A]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteQuestion(question.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CardContent className="p-4">
                <div className="mb-4">
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                    className="w-full p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30"
                    placeholder="Título da pergunta"
                  />
                </div>

                <div className="mb-4 flex gap-4">
                  <div>
                    <label className="block text-sm text-[#8F7A6A] mb-1">Tipo de pergunta</label>
                    <select
                      value={question.type}
                      onChange={(e) => updateQuestion(question.id, { type: e.target.value as 'text' | 'image' | 'both' })}
                      className="p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30"
                    >
                      <option value="text">Texto</option>
                      <option value="image">Imagem</option>
                      <option value="both">Texto e Imagem</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#8F7A6A] mb-1">Seleção múltipla</label>
                    <select
                      value={question.multiSelect}
                      onChange={(e) => updateQuestion(question.id, { multiSelect: parseInt(e.target.value) })}
                      className="p-2 border border-[#B89B7A]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]/30"
                    >
                      <option value="1">Única (1)</option>
                      <option value="2">Até 2 opções</option>
                      <option value="3">Até 3 opções</option>
                      <option value="4">Até 4 opções</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-[#432818] mb-2">Opções</h4>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <DraggableItem
                        key={option.id}
                        id={option.id}
                        index={optionIndex}
                        type="OPTION"
                        moveItem={handleMoveOption}
                        parentId={question.id}
                      >
                        <QuestionOptionEditor
                          option={option}
                          questionType={question.type}
                          onUpdate={(updatedOption) => updateOption(question.id, option.id, updatedOption)}
                          onDelete={() => deleteOption(question.id, option.id)}
                          index={optionIndex}
                        />
                      </DraggableItem>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => addOption(question.id)}
                  className="w-full mt-2 border-dashed border-[#B89B7A]/40 text-[#8F7A6A] hover:bg-[#FAF9F7]"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Adicionar Opção
                </Button>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </DraggableItem>
  );
};

interface DraggableQuizEditorProps {
  questions: QuizQuestion[];
  onQuestionsChange: (questions: QuizQuestion[]) => void;
  onSave?: (questions: QuizQuestion[]) => void;
}

const DraggableQuizEditor: React.FC<DraggableQuizEditorProps> = ({
  questions: initialQuestions = [],
  onQuestionsChange,
  onSave
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [draggedQuestionId, setDraggedQuestionId] = useState<string | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (onQuestionsChange) {
      onQuestionsChange(questions);
    }
  }, [questions, onQuestionsChange]);

  const createNewQuestion = (): QuizQuestion => {
    return {
      id: generateId(),
      title: 'Nova Pergunta',
      subtitle: '',
      imageUrl: '',
      options: [],
      multiSelect: 1,
      type: 'single' as const
    };
  };

  const addQuestion = () => {
    const newQuestion = createNewQuestion();
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    onQuestionsChange?.(updatedQuestions);
    setEditingQuestionId(newQuestion.id);
  };

  const updateQuestion = (questionId: string, updates: Partial<QuizQuestion>) => {
    const updatedQuestions = questions.map(q =>
      q.id === questionId ? { ...q, ...updates } : q
    );
    setQuestions(updatedQuestions);
    onQuestionsChange?.(updatedQuestions);
  };

  const deleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    onQuestionsChange?.(updatedQuestions);
    if (editingQuestionId === questionId) {
      setEditingQuestionId(null);
    }
  };

  const addOptionToQuestion = (questionId: string) => {
    const newOption: QuizOption = {
      id: generateId(),
      text: 'Nova opção',
      styleCategory: 'Natural',
      points: 1
    };

    updateQuestion(questionId, {
      options: [
        ...(questions.find(q => q.id === questionId)?.options || []),
        newOption
      ]
    });
  };

  const updateQuestionOption = (questionId: string, optionId: string, updates: Partial<QuizOption>) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.map(option =>
      option.id === optionId ? { ...option, ...updates } : option
    );

    updateQuestion(questionId, { options: updatedOptions });
  };

  const deleteQuestionOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.filter(option => option.id !== optionId);
    updateQuestion(questionId, { options: updatedOptions });
  };

  const moveQuestion = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedQuestion = questions[dragIndex];
      const newQuestions = [...questions];
      newQuestions.splice(dragIndex, 1);
      newQuestions.splice(hoverIndex, 0, draggedQuestion);
      setQuestions(newQuestions);
      onQuestionsChange?.(newQuestions);
    },
    [questions, onQuestionsChange]
  );

  const updateQuestion = useCallback(
    (id: string, updates: Partial<QuizQuestion>) => {
      const newQuestions = questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      );
      setQuestions(newQuestions);
      onQuestionsChange?.(newQuestions);
    },
    [questions, onQuestionsChange]
  );

  const deleteQuestion = useCallback(
    (id: string) => {
      const newQuestions = questions.filter((q) => q.id !== id);
      setQuestions(newQuestions);
      onQuestionsChange?.(newQuestions);
      if (editingQuestionId === id) {
        setEditingQuestionId(null);
      }
    },
    [questions, onQuestionsChange, editingQuestionId]
  );

  const duplicateQuestion = useCallback(
    (id: string) => {
      const questionToDuplicate = questions.find((q) => q.id === id);
      if (questionToDuplicate) {
        const duplicatedQuestion = {
          ...questionToDuplicate,
          id: `question-${Date.now()}`,
          options: questionToDuplicate.options.map((opt) => ({
            ...opt,
            id: `option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          })),
        };
        setQuestions([...questions, duplicatedQuestion]);
        onQuestionsChange?.([...questions, duplicatedQuestion]);
      }
    },
    [questions, onQuestionsChange]
  );

  const moveOption = useCallback(
    (questionId: string, dragIndex: number, hoverIndex: number) => {
      const newQuestions = questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          const draggedOption = newOptions[dragIndex];
          newOptions.splice(dragIndex, 1);
          newOptions.splice(hoverIndex, 0, draggedOption);
          return { ...q, options: newOptions };
        }
        return q;
      });
      setQuestions(newQuestions);
      onQuestionsChange?.(newQuestions);
    },
    [questions, onQuestionsChange]
  );

  const addOption = useCallback(
    (questionId: string) => {
      const newQuestions = questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [
              ...q.options,
              {
                id: `option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                text: 'Nova opção',
                styleCategory: 'Natural',
                points: 1,
              },
            ],
          };
        }
        return q;
      });
      setQuestions(newQuestions);
      onQuestionsChange?.(newQuestions);
    },
    [questions, onQuestionsChange]
  );

  const updateOption = useCallback(
    (questionId: string, optionId: string, updates: Partial<QuizOption>) => {
      const newQuestions = questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map((opt) =>
              opt.id === optionId ? { ...opt, ...updates } : opt
            ),
          };
        }
        return q;
      });
      setQuestions(newQuestions);
      onQuestionsChange?.(newQuestions);
    },
    [questions, onQuestionsChange]
  );

  const deleteOption = useCallback(
    (questionId: string, optionId: string) => {
      const newQuestions = questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.filter((opt) => opt.id !== optionId),
          };
        }
        return q;
      });
      setQuestions(newQuestions);
      onQuestionsChange?.(newQuestions);
    },
    [questions, onQuestionsChange]
  );

  const handleQuestionTypeChange = (questionId: string, newType: QuizQuestion['type']) => {
    updateQuestion(questionId, { type: newType });
  };

  const renderQuestionEditor = (question: QuizQuestion) => {
    return (
      <Card key={question.id} className="mb-4 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Pergunta {questions.indexOf(question) + 1}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingQuestionId(editingQuestionId === question.id ? null : question.id)}
              >
                {editingQuestionId === question.id ? 'Fechar' : 'Editar'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteQuestion(question.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {editingQuestionId === question.id ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor={`title-${question.id}`}>Título</Label>
                <Input
                  id={`title-${question.id}`}
                  value={question.title}
                  onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                  placeholder="Digite o título da pergunta"
                />
              </div>

              <div>
                <Label htmlFor={`subtitle-${question.id}`}>Subtítulo</Label>
                <Input
                  id={`subtitle-${question.id}`}
                  value={question.subtitle || ''}
                  onChange={(e) => updateQuestion(question.id, { subtitle: e.target.value })}
                  placeholder="Digite o subtítulo (opcional)"
                />
              </div>

              <div>
                <Label>Tipo de Pergunta</Label>
                <Select
                  value={question.type}
                  onValueChange={(value: QuizQuestion['type']) => handleQuestionTypeChange(question.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Escolha única</SelectItem>
                    <SelectItem value="multiple">Múltipla escolha</SelectItem>
                    <SelectItem value="text">Texto livre</SelectItem>
                    <SelectItem value="both">Mista</SelectItem>
                    <SelectItem value="image">Apenas imagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {question.type === 'multiple' && (
                <div>
                  <Label htmlFor={`multiSelect-${question.id}`}>Número máximo de seleções</Label>
                  <Input
                    id={`multiSelect-${question.id}`}
                    type="number"
                    min="2"
                    max={question.options.length}
                    value={question.multiSelect || 2}
                    onChange={(e) => updateQuestion(question.id, { multiSelect: parseInt(e.target.value) || 2 })}
                  />
                </div>
              )}

              {/* Options Section */}
              {['single', 'multiple', 'both', 'image'].includes(question.type) && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Opções</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addOptionToQuestion(question.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Opção
                    </Button>
                  </div>

                  {question.options.map((option, optionIndex) => (
                    <Card key={option.id} className="p-3 bg-gray-50">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">Opção {optionIndex + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestionOption(question.id, option.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div>
                          <Label>Texto</Label>
                          <Input
                            value={option.text}
                            onChange={(e) => updateQuestionOption(question.id, option.id, { text: e.target.value })}
                            placeholder="Digite o texto da opção"
                          />
                        </div>

                        <div>
                          <Label>Categoria de Estilo</Label>
                          <Select
                            value={option.styleCategory}
                            onValueChange={(value: QuizOption['styleCategory']) => 
                              updateQuestionOption(question.id, option.id, { styleCategory: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Natural">Natural</SelectItem>
                              <SelectItem value="Clássico">Clássico</SelectItem>
                              <SelectItem value="Contemporâneo">Contemporâneo</SelectItem>
                              <SelectItem value="Elegante">Elegante</SelectItem>
                              <SelectItem value="Romântico">Romântico</SelectItem>
                              <SelectItem value="Sexy">Sexy</SelectItem>
                              <SelectItem value="Dramático">Dramático</SelectItem>
                              <SelectItem value="Criativo">Criativo</SelectItem>
                              <SelectItem value="Strategic">Strategic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Pontos</Label>
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            value={option.points || 1}
                            onChange={(e) => updateQuestionOption(question.id, option.id, { points: parseInt(e.target.value) || 1 })}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="font-medium">{question.title}</h3>
              {question.subtitle && <p className="text-sm text-gray-600">{question.subtitle}</p>}
              <p className="text-xs text-gray-500">Tipo: {question.type} | Opções: {question.options.length}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const handleSave = () => {
    // Validate questions before saving
    const validQuestions = questions.filter(question => {
      if (!question.title.trim()) return false;
      if (['single', 'multiple', 'both', 'image'].includes(question.type) && question.options.length < 2) return false;
      return true;
    });

    if (validQuestions.length !== questions.length) {
      alert('Algumas perguntas estão incompletas e não serão salvas. Verifique se todas têm título e pelo menos 2 opções.');
    }

    onSave?.(validQuestions);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editor de Quiz Visual</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Editar' : 'Visualizar'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Quiz
          </Button>
        </div>
      </div>

      {previewMode ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Visualização do Quiz</h2>
          {questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">{question.title}</h3>
                {question.subtitle && <p className="text-gray-600 mb-4">{question.subtitle}</p>}
              </div>
              
              {question.type === 'text' ? (
                <textarea
                  placeholder="Digite sua resposta aqui..."
                  className="w-full p-3 border rounded-md"
                  rows={3}
                  disabled
                />
              ) : (
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <input
                        type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                        name={`question-${question.id}`}
                        disabled
                        className="form-checkbox"
                      />
                      <span>{option.text}</span>
                      {option.imageUrl && (
                        <img src={option.imageUrl} alt={option.text} className="w-16 h-16 object-cover rounded" />
                      )}
                    </label>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Perguntas ({questions.length})</h2>
            <Button onClick={addQuestion}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Pergunta
            </Button>
          </div>

          {questions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500 mb-4">Nenhuma pergunta criada ainda</p>
              <Button onClick={addQuestion}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Pergunta
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {questions.map(renderQuestionEditor)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableQuizEditor;
