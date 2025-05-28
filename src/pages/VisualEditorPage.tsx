import React, { useState, useEffect } from 'react';
import VisualEditorLayout from '@/components/visual-editor/VisualEditorLayout';
import { QuizQuestion } from '@/types/quiz';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

const VisualEditorPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar perguntas do localStorage ou de uma API
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const savedQuestions = localStorage.getItem('quiz_editor_questions');
        
        if (savedQuestions) {
          setQuestions(JSON.parse(savedQuestions));
        } else {
          // Se não houver perguntas salvas, criar algumas de exemplo
          const defaultQuestions: QuizQuestion[] = [
            {
              id: `question-${Date.now()}-1`,
              title: 'Qual estilo de roupa você prefere no dia a dia?',
              type: 'image',
              multiSelect: 1,
              options: [
                {
                  id: `option-${Date.now()}-1`,
                  text: 'Roupas confortáveis e práticas',
                  styleCategory: 'Natural',
                  points: 3,
                  imageUrl: 'https://placehold.co/300x400?text=Estilo+Natural'
                },
                {
                  id: `option-${Date.now()}-2`,
                  text: 'Peças elegantes e sofisticadas',
                  styleCategory: 'Clássico',
                  points: 3,
                  imageUrl: 'https://placehold.co/300x400?text=Estilo+Clássico'
                },
                {
                  id: `option-${Date.now()}-3`,
                  text: 'Looks modernos e minimalistas',
                  styleCategory: 'Contemporâneo',
                  points: 3,
                  imageUrl: 'https://placehold.co/300x400?text=Estilo+Contemporâneo'
                },
                {
                  id: `option-${Date.now()}-4`,
                  text: 'Peças românticas e delicadas',
                  styleCategory: 'Romântico',
                  points: 3,
                  imageUrl: 'https://placehold.co/300x400?text=Estilo+Romântico'
                }
              ]
            },
            {
              id: `question-${Date.now()}-2`,
              title: 'Como você descreveria sua personalidade?',
              type: 'text',
              multiSelect: 2,
              options: [
                {
                  id: `option-${Date.now()}-5`,
                  text: 'Prática e objetiva',
                  styleCategory: 'Natural',
                  points: 2
                },
                {
                  id: `option-${Date.now()}-6`,
                  text: 'Sofisticada e tradicional',
                  styleCategory: 'Clássico',
                  points: 2
                },
                {
                  id: `option-${Date.now()}-7`,
                  text: 'Criativa e expressiva',
                  styleCategory: 'Criativo',
                  points: 2
                },
                {
                  id: `option-${Date.now()}-8`,
                  text: 'Sensual e marcante',
                  styleCategory: 'Sexy',
                  points: 2
                }
              ]
            }
          ];
          
          setQuestions(defaultQuestions);
        }
      } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar as perguntas do quiz.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [toast]);

  const handleSave = async (updatedQuestions: QuizQuestion[]) => {
    try {
      // Salvar no localStorage
      localStorage.setItem('quiz_editor_questions', JSON.stringify(updatedQuestions));
      
      // Aqui você poderia salvar em uma API também
      
      toast({
        title: "Quiz salvo com sucesso",
        description: "Todas as alterações foram salvas."
      });
    } catch (error) {
      console.error('Erro ao salvar quiz:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações do quiz.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateQuiz = () => {
    // Implementar a lógica de duplicação do quiz
    const duplicatedQuiz = JSON.parse(JSON.stringify(questions));
    
    // Gerar novos IDs para todas as perguntas e opções
    const newQuiz = duplicatedQuiz.map((question: QuizQuestion) => ({
      ...question,
      id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      options: question.options.map(option => ({
        ...option,
        id: `option-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }))
    }));
    
    // Salvar o quiz duplicado com um novo nome
    localStorage.setItem('quiz_editor_questions_duplicate', JSON.stringify(newQuiz));
    
    toast({
      title: "Quiz duplicado",
      description: "Uma cópia do quiz foi criada com sucesso."
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="animate-pulse text-[#B89B7A]">Carregando editor...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-[#B89B7A]/20 p-2 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            className="bg-[#B89B7A] hover:bg-[#A38A69] text-white" 
            onClick={() => handleSave(questions)}
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar Quiz
          </Button>
        </div>
      </div>
      
      <div className="flex-1">
        <VisualEditorLayout 
          initialQuestions={questions} 
          onSave={handleSave} 
        />
      </div>
    </div>
  );
};

export default VisualEditorPage;