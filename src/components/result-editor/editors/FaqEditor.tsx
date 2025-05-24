import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

interface FaqEditorProps {
  content: any;
  onUpdate: (content: any) => void;
}

interface FaqItem {
  question: string;
  answer: string;
  id: string;
}

const FaqEditor: React.FC<FaqEditorProps> = ({ content, onUpdate }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>(
    content.faqs || [
      {
        id: '1',
        question: 'Por que só R$ 39,00? É confiável?',
        answer: 'Sim, é 100% confiável! O preço é baixo porque é uma versão digital, sem custos de impressão ou envio. Nosso objetivo é ajudar o máximo de mulheres possível a descobrir seu estilo autêntico.'
      },
      {
        id: '2', 
        question: 'Não preciso pagar mais nada depois?',
        answer: 'Não! O valor de R$ 39,90 é único e você tem acesso completo e vitalício ao seu guia personalizado + todos os bônus inclusos.'
      },
      {
        id: '3',
        question: 'Como funciona o acesso?',
        answer: 'Após o pagamento, você recebe o acesso imediato por email. Todo o material é digital e fica disponível 24h para você baixar quando quiser.'
      },
      {
        id: '4',
        question: 'É realmente completo por esse preço?',
        answer: 'Sim! Você recebe o guia personalizado do seu estilo + 2 bônus exclusivos. É o mesmo conteúdo que custaria R$ 800-1500 com uma consultora presencial.'
      },
      {
        id: '5',
        question: 'E se eu não gostar?',
        answer: 'Você tem 7 dias para testar. Se não ficar satisfeita, devolvemos 100% do seu dinheiro, sem perguntas e sem burocracia.'
      }
    ]
  );

  const addFaq = () => {
    const newFaq: FaqItem = {
      id: Date.now().toString(),
      question: '',
      answer: ''
    };
    const updatedFaqs = [...faqs, newFaq];
    setFaqs(updatedFaqs);
    onUpdate({ ...content, faqs: updatedFaqs });
  };

  const updateFaq = (id: string, field: 'question' | 'answer', value: string) => {
    const updatedFaqs = faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    );
    setFaqs(updatedFaqs);
    onUpdate({ ...content, faqs: updatedFaqs });
  };

  const removeFaq = (id: string) => {
    const updatedFaqs = faqs.filter(faq => faq.id !== id);
    setFaqs(updatedFaqs);
    onUpdate({ ...content, faqs: updatedFaqs });
  };

  const updateTitle = (title: string) => {
    onUpdate({ ...content, title });
  };

  const updateSubtitle = (subtitle: string) => {
    onUpdate({ ...content, subtitle });
  };

  return (
    <div className="space-y-6">
      {/* Header Settings */}
      <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
        <div className="flex items-center gap-2 text-blue-700">
          <HelpCircle className="w-4 h-4" />
          <span className="font-medium text-sm">Configurações do FAQ</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-blue-900">Título da Seção</label>
            <input
              type="text"
              value={content.title || 'Perguntas Frequentes'}
              onChange={(e) => updateTitle(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="Ex: Dúvidas Sobre o Guia de Estilo"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-blue-900">Subtítulo</label>
            <textarea
              value={content.subtitle || 'Esclarecemos as principais dúvidas sobre nosso método'}
              onChange={(e) => updateSubtitle(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md min-h-[60px]"
              placeholder="Breve descrição da seção"
            />
          </div>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Perguntas e Respostas</h3>
          <Button 
            onClick={addFaq}
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar FAQ
          </Button>
        </div>

        {faqs.map((faq, index) => (
          <div key={faq.id} className="p-4 border rounded-lg space-y-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">FAQ #{index + 1}</span>
              <Button
                onClick={() => removeFaq(faq.id)}
                size="sm"
                variant="destructive"
                className="flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            
            <div>
              <label className="text-sm font-medium">Pergunta</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Ex: Por que só R$ 39,00?"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Resposta</label>
              <textarea
                value={faq.answer}
                onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                className="w-full p-2 mt-1 border rounded-md min-h-[80px]"
                placeholder="Resposta completa e tranquilizadora..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-medium text-green-800 mb-2">💡 Dicas para FAQ de R$ 39,00</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Foque em remover desconfiança sobre o preço baixo</li>
          <li>• Explique claramente o que está incluído</li>
          <li>• Tranquilize sobre a qualidade do produto</li>
          <li>• Seja específico sobre garantias e acessos</li>
        </ul>
      </div>
    </div>
  );
};

export default FaqEditor;
