
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface QuestionOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory: string;
  points: number;
}

interface EditableQuestionProps {
  content: {
    text?: string;
    options?: QuestionOption[];
    multiSelect?: boolean;
  };
  isSelected: boolean;
  isPreviewMode: boolean;
  onUpdate: (content: {
    text?: string;
    options?: QuestionOption[];
    multiSelect?: boolean;
  }) => void;
}

export const EditableQuestion: React.FC<EditableQuestionProps> = ({
  content,
  isSelected,
  isPreviewMode,
  onUpdate
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (optionId: string) => {
    if (isPreviewMode) return;

    if (content.multiSelect) {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleQuestionTextChange = (newText: string) => {
    onUpdate({
      ...content,
      text: newText
    });
  };

  return (
    <div className={`space-y-6 ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg p-4' : ''}`}>
      {/* Question Title */}
      <div className="text-center">
        {isPreviewMode ? (
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {content.text || 'Título da questão'}
          </h2>
        ) : (
          <input
            type="text"
            value={content.text || ''}
            onChange={(e) => handleQuestionTextChange(e.target.value)}
            className="text-2xl font-bold text-gray-900 mb-4 w-full text-center bg-transparent border-b-2 border-dashed border-gray-300 focus:border-blue-500 focus:outline-none"
            placeholder="Digite o título da questão..."
          />
        )}
      </div>

      {/* Question Options */}
      <div className={`grid gap-4 ${
        content.options?.some(option => option.imageUrl) 
          ? 'grid-cols-1 md:grid-cols-2' 
          : 'grid-cols-1'
      }`}>
        {content.options?.map((option, index) => (
          <div
            key={option.id}
            className={`
              relative group border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300
              ${selectedOptions.includes(option.id) 
                ? 'border-[#B89B7A] bg-gradient-to-br from-[#B89B7A]/5 to-[#B89B7A]/10 shadow-lg scale-105' 
                : 'border-gray-200 hover:border-[#B89B7A]/50 hover:shadow-md'
              }
              ${!isPreviewMode ? 'hover:scale-102' : ''}
            `}
            onClick={() => handleOptionClick(option.id)}
          >
            {/* Option Label */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`
                text-xs font-bold px-2 py-1 rounded-full shadow-sm
                ${selectedOptions.includes(option.id) 
                  ? 'bg-[#B89B7A] text-white' 
                  : 'bg-white text-gray-700 border border-gray-200'
                }
              `}>
                {String.fromCharCode(65 + index)}
              </span>
            </div>

            {/* Selection Indicator */}
            {selectedOptions.includes(option.id) && (
              <div className="absolute top-3 right-3 z-10">
                <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            {/* Option Image */}
            {option.imageUrl && (
              <div className="relative overflow-hidden">
                <img
                  src={option.imageUrl}
                  alt={option.text}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Imagem+Não+Encontrada';
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Option Content */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {option.text}
              </h4>

              {/* Style Category & Points (only in edit mode) */}
              {!isPreviewMode && (
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {option.styleCategory}
                  </span>
                  <span className="text-xs font-medium text-[#B89B7A]">
                    {option.points} pts
                  </span>
                </div>
              )}
            </div>

            {/* Interactive hover effect */}
            <div className={`
              absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300
              ${!isPreviewMode ? 'group-hover:border-[#B89B7A]/30' : ''}
            `} />
          </div>
        )) || (
          <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">Nenhuma opção disponível</p>
              <p className="text-sm">Configure as opções para esta questão</p>
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="text-center pt-4">
        <Button 
          className="px-8 py-3"
          disabled={selectedOptions.length === 0}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
