import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Edit3, Upload, Trash2 } from "lucide-react";
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
      setSelectedOptions(prev => prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]);
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
  const handleOptionTextChange = (optionId: string, newText: string) => {
    const updatedOptions = content.options?.map(option => option.id === optionId ? {
      ...option,
      text: newText
    } : option) || [];
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };
  const handleOptionPointsChange = (optionId: string, newPoints: number) => {
    const updatedOptions = content.options?.map(option => option.id === optionId ? {
      ...option,
      points: newPoints
    } : option) || [];
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };
  const handleOptionCategoryChange = (optionId: string, newCategory: string) => {
    const updatedOptions = content.options?.map(option => option.id === optionId ? {
      ...option,
      styleCategory: newCategory
    } : option) || [];
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };
  const handleOptionImageChange = (optionId: string, newImageUrl: string) => {
    const updatedOptions = content.options?.map(option => option.id === optionId ? {
      ...option,
      imageUrl: newImageUrl
    } : option) || [];
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };
  const handleAddOption = () => {
    const newOption: QuestionOption = {
      id: `option-${Date.now()}`,
      text: "Nova opção",
      styleCategory: "Clássico",
      points: 10,
      imageUrl: undefined
    };
    const updatedOptions = [...(content.options || []), newOption];
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };
  const handleRemoveOption = (optionId: string) => {
    const updatedOptions = content.options?.filter(option => option.id !== optionId) || [];
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };
  const handleMultiSelectToggle = () => {
    onUpdate({
      ...content,
      multiSelect: !content.multiSelect
    });
  };
  return <div className={`space-y-6 ${isSelected && !isPreviewMode ? "ring-2 ring-blue-500 ring-offset-2 rounded-lg p-4" : ""}`}>
      {/* Question Title - Always in preview mode for canvas */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {content.text || "Título da questão"}
        </h2>
        {!isPreviewMode && <div className="text-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
            Configure na coluna da direita →
          </div>}
      </div>

      {/* Question Options - Responsive Grid Layout */}
      <div className="space-y-4">
        {/* Grid container using custom CSS classes */}
        <div className="options-grid with-images">
          {content.options?.map((option, index) => <div key={option.id} className={`
                option-card group focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2
                ${selectedOptions.includes(option.id) ? "selected" : ""}
              `} onClick={() => handleOptionClick(option.id)} role="button" tabIndex={0} onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOptionClick(option.id);
          }
        }}>
              {/* Option Image using CSS classes */}
              {option.imageUrl && <div className="relative overflow-hidden">
                  <img src={option.imageUrl} alt={option.text} className="option-image" onError={e => {
              e.currentTarget.src = "https://via.placeholder.com/400x300/f8f9fa/6c757d?text=Imagem+Não+Encontrada";
            }} />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>}

              {/* Option Content using CSS classes */}
              <div className={`option-content ${option.imageUrl ? "with-image" : "text-only"}`}>
                <h4 className="option-title medium">
                  {/* Parse text to highlight strategic words */}
                  {option.text.split(" ").map((word, wordIndex) => {
                    // Strategic words to highlight
                    const strategicWords = ["elegante", "clássico", "moderno", "casual", "sofisticado", "romântico", "minimalista", "vintage", "luxo", "confortável", "estiloso", "chique", "trendy", "fashion", "contemporâneo", "tradicional"];
                    const isStrategic = strategicWords.some(sw => word.toLowerCase().replace(/[.,!?;]/g, "").includes(sw.toLowerCase()));
                    return <span key={wordIndex} className={isStrategic ? "strategic-word" : ""}>
                        {word}
                        {wordIndex < option.text.split(" ").length - 1 ? " " : ""}
                      </span>;
                  })}
                </h4>
              </div>
            </div>) || <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-base font-medium">
                  Nenhuma opção disponível
                </p>
                <p className="text-sm">
                  Configure as opções na coluna da direita →
                </p>
              </div>
            </div>}
        </div>
      </div>

      {/* Continue Button - Always preview style */}
      <div className="text-center pt-4">
        <div className="space-y-2">
          <Button className="px-8 py-3" disabled={selectedOptions.length === 0}>
            Continuar
          </Button>
          {selectedOptions.length === 0 && <p className="text-xs text-gray-500">
              {content.multiSelect ? "Selecione uma ou mais opções" : "Selecione uma opção"}{" "}
              para continuar
            </p>}
          {!isPreviewMode && <p className="text-xs text-blue-600">
              Edite na coluna da direita →
            </p>}
        </div>
      </div>
    </div>;
};