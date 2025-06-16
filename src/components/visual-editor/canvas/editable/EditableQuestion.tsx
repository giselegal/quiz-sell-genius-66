import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Upload, Edit3 } from "lucide-react";

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
  onUpdate,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (optionId: string) => {
    if (isPreviewMode) return;

    if (content.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleQuestionTextChange = (newText: string) => {
    onUpdate({
      ...content,
      text: newText,
    });
  };

  const handleOptionTextChange = (optionId: string, newText: string) => {
    const updatedOptions = content.options?.map(option => 
      option.id === optionId ? { ...option, text: newText } : option
    ) || [];
    
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };

  const handleOptionPointsChange = (optionId: string, newPoints: number) => {
    const updatedOptions = content.options?.map(option => 
      option.id === optionId ? { ...option, points: newPoints } : option
    ) || [];
    
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };

  const handleOptionCategoryChange = (optionId: string, newCategory: string) => {
    const updatedOptions = content.options?.map(option => 
      option.id === optionId ? { ...option, styleCategory: newCategory } : option
    ) || [];
    
    onUpdate({
      ...content,
      options: updatedOptions
    });
  };

  const handleOptionImageChange = (optionId: string, newImageUrl: string) => {
    const updatedOptions = content.options?.map(option => 
      option.id === optionId ? { ...option, imageUrl: newImageUrl } : option
    ) || [];
    
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

  return (
    <div
      className={`space-y-6 ${
        isSelected && !isPreviewMode
          ? "ring-2 ring-blue-500 ring-offset-2 rounded-lg p-4"
          : ""
      }`}
    >
      {/* Question Title */}
      <div className="text-center">
        {isPreviewMode ? (
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {content.text || "Título da questão"}
          </h2>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={content.text || ""}
              onChange={(e) => handleQuestionTextChange(e.target.value)}
              className="text-2xl font-bold text-gray-900 mb-4 w-full text-center bg-transparent border-b-2 border-dashed border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Digite o título da questão..."
            />
            
            {/* Question Settings */}
            <div className="flex justify-center items-center gap-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.multiSelect || false}
                  onChange={handleMultiSelectToggle}
                  className="rounded border-gray-300"
                />
                <span className="text-gray-600">Seleção múltipla</span>
              </label>
              
              <span className="text-gray-400">|</span>
              
              <span className="text-gray-600">
                {content.options?.length || 0} opções
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Question Options */}
      <div
        className={`grid gap-4 ${
          content.options?.some((option) => option.imageUrl)
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {content.options?.map((option, index) => (
          <div
            key={option.id}
            className={`
              relative group border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300
              ${
                selectedOptions.includes(option.id)
                  ? "border-[#B89B7A] bg-gradient-to-br from-[#B89B7A]/5 to-[#B89B7A]/10 shadow-lg scale-105"
                  : "border-gray-200 hover:border-[#B89B7A]/50 hover:shadow-md"
              }
              ${!isPreviewMode ? "hover:scale-102" : ""}
            `}
            onClick={() => handleOptionClick(option.id)}
          >
            {/* Option Label */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`
                text-xs font-bold px-2 py-1 rounded-full shadow-sm
                ${
                  selectedOptions.includes(option.id)
                    ? "bg-[#B89B7A] text-white"
                    : "bg-white text-gray-700 border border-gray-200"
                }
              `}
              >
                {String.fromCharCode(65 + index)}
              </span>
            </div>

            {/* Selection Indicator */}
            {selectedOptions.includes(option.id) && (
              <div className="absolute top-3 right-3 z-10">
                <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
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
                    e.currentTarget.src =
                      "https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=Imagem+Não+Encontrada";
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Option Content */}
            <div className="p-4">
              {isPreviewMode ? (
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {option.text}
                </h4>
              ) : (
                <div className="space-y-3">
                  {/* Editable Text */}
                  <Input
                    value={option.text}
                    onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                    className="font-semibold text-gray-900 border-dashed"
                    placeholder="Texto da opção..."
                  />
                  
                  {/* Image URL Input */}
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500">URL da Imagem (opcional)</label>
                    <div className="flex gap-2">
                      <Input
                        value={option.imageUrl || ""}
                        onChange={(e) => handleOptionImageChange(option.id, e.target.value)}
                        className="text-xs"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2"
                        title="Upload de imagem"
                      >
                        <Upload className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Style Category & Points */}
              {!isPreviewMode && (
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100 gap-2">
                  <Select 
                    value={option.styleCategory} 
                    onValueChange={(value) => handleOptionCategoryChange(option.id, value)}
                  >
                    <SelectTrigger className="text-xs h-7 w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clássico">Clássico</SelectItem>
                      <SelectItem value="Moderno">Moderno</SelectItem>
                      <SelectItem value="Romântico">Romântico</SelectItem>
                      <SelectItem value="Casual">Casual</SelectItem>
                      <SelectItem value="Elegante">Elegante</SelectItem>
                      <SelectItem value="Minimalista">Minimalista</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={option.points}
                      onChange={(e) => handleOptionPointsChange(option.id, parseInt(e.target.value) || 0)}
                      className="text-xs font-medium text-[#B89B7A] w-12 h-7 text-center border-dashed"
                      min="0"
                      max="100"
                    />
                    <span className="text-xs text-gray-400">pts</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveOption(option.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-7 w-7"
                    title="Remover opção"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
              
              {/* Preview mode points display */}
              {isPreviewMode && (
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
            <div
              className={`
              absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300
              ${!isPreviewMode ? "group-hover:border-[#B89B7A]/30" : ""}
            `}
            />
          </div>
        )) || (
          <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">Nenhuma opção disponível</p>
              <p className="text-sm">Configure as opções para esta questão</p>
              {!isPreviewMode && (
                <Button
                  onClick={handleAddOption}
                  className="mt-4"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeira Opção
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Add Option Button - Only in Edit Mode */}
        {!isPreviewMode && content.options && content.options.length > 0 && (
          <div className="col-span-full">
            <Button
              variant="outline"
              onClick={handleAddOption}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Nova Opção
            </Button>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="text-center pt-4">
        {isPreviewMode ? (
          <div className="space-y-2">
            <Button 
              className="px-8 py-3" 
              disabled={selectedOptions.length === 0}
            >
              Continuar
            </Button>
            {selectedOptions.length === 0 && (
              <p className="text-xs text-gray-500">
                {content.multiSelect ? "Selecione uma ou mais opções" : "Selecione uma opção"} para continuar
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total de opções: {content.options?.length || 0}</span>
              <span>Tipo: {content.multiSelect ? "Múltipla seleção" : "Seleção única"}</span>
            </div>
            
            {(content.options?.length || 0) === 0 && (
              <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                ⚠️ Adicione pelo menos uma opção para que a questão funcione
              </p>
            )}
            
            <Button 
              variant="secondary"
              size="sm"
              className="w-full"
              disabled
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Modo de Edição - Preview para testar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
