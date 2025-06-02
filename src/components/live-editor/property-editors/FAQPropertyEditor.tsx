import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

interface FAQPropertyEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

export const FAQPropertyEditor: React.FC<FAQPropertyEditorProps> = ({ 
  block, 
  onUpdate 
}) => {
  const content = block.content || {};
  const faqs = content.faqs || [
    { question: 'Pergunta exemplo', answer: 'Resposta exemplo' }
  ];

  const handleUpdate = (field: string, value: any) => {
    onUpdate({
      ...content,
      [field]: value
    });
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFAQs = [...faqs];
    updatedFAQs[index] = { ...updatedFAQs[index], [field]: value };
    handleUpdate('faqs', updatedFAQs);
  };

  const addFAQ = () => {
    const newFAQs = [...faqs, { question: '', answer: '' }];
    handleUpdate('faqs', newFAQs);
  };

  const removeFAQ = (index: number) => {
    const newFAQs = faqs.filter((_: any, i: number) => i !== index);
    handleUpdate('faqs', newFAQs);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
        <MessageSquare className="h-4 w-4 text-[#B89B7A]" />
        <div>
          <div className="font-medium text-sm text-[#432818]">FAQ</div>
          <div className="text-xs text-[#8F7A6A]">Perguntas e respostas frequentes</div>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-[#432818]">
          Título da Seção
        </Label>
        <Input
          id="title"
          value={content.title || ''}
          onChange={(e) => handleUpdate('title', e.target.value)}
          placeholder="Perguntas Frequentes"
        />
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-[#432818]">
            Perguntas e Respostas
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFAQ}
            className="h-8"
          >
            <Plus className="h-3 w-3 mr-1" />
            Adicionar
          </Button>
        </div>

        {faqs.map((faq: any, index: number) => (
          <div key={index} className="p-4 border border-[#B89B7A]/20 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#432818]">
                Pergunta {index + 1}
              </span>
              {faqs.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFAQ(index)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Input
                value={faq.question || ''}
                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                placeholder="Digite a pergunta..."
              />
              <Textarea
                rows={2}
                value={faq.answer || ''}
                onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                placeholder="Digite a resposta..."
                className="resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
