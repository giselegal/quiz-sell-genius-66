
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
  onUpdate: (content: any) => void;
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.options?.map((option, index) => (
          <div
            key={option.id}
            className={`
              border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
              ${selectedOptions.includes(option.id) 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
              }
              ${!isPreviewMode ? 'hover:shadow-md' : ''}
            `}
            onClick={() => handleOptionClick(option.id)}
          >
            {/* Option Label */}
            <div className="flex items-center mb-2">
              <span className="bg-gray-800 text-white text-sm font-bold px-2 py-1 rounded mr-2">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="font-medium text-gray-900">
                Opção {index + 1}
              </span>
            </div>

            {/* Option Image */}
            {option.imageUrl && (
              <div className="mb-3">
                <img
                  src={option.imageUrl}
                  alt={option.text}
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/200x150/ccc/666?text=Imagem';
                  }}
                />
              </div>
            )}

            {/* Option Text */}
            <p className="text-gray-700 text-sm">
              {option.text}
            </p>

            {/* Style Category & Points (only in edit mode) */}
            {!isPreviewMode && (
              <div className="mt-2 text-xs text-gray-500">
                <div>Categoria: {option.styleCategory}</div>
                <div>Pontos: {option.points}</div>
              </div>
            )}
          </div>
        )) || (
          <div className="col-span-2 text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            Nenhuma opção disponível para esta questão
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
