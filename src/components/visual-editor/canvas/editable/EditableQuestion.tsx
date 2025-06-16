import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
    const updatedOptions =
      content.options?.map((option) =>
        option.id === optionId ? { ...option, text: newText } : option
      ) || [];

    onUpdate({
      ...content,
      options: updatedOptions,
    });
  };

  const handleOptionPointsChange = (optionId: string, newPoints: number) => {
    const updatedOptions =
      content.options?.map((option) =>
        option.id === optionId ? { ...option, points: newPoints } : option
      ) || [];

    onUpdate({
      ...content,
      options: updatedOptions,
    });
  };

  const handleOptionCategoryChange = (
    optionId: string,
    newCategory: string
  ) => {
    const updatedOptions =
      content.options?.map((option) =>
        option.id === optionId
          ? { ...option, styleCategory: newCategory }
          : option
      ) || [];

    onUpdate({
      ...content,
      options: updatedOptions,
    });
  };

  const handleOptionImageChange = (optionId: string, newImageUrl: string) => {
    const updatedOptions =
      content.options?.map((option) =>
        option.id === optionId ? { ...option, imageUrl: newImageUrl } : option
      ) || [];

    onUpdate({
      ...content,
      options: updatedOptions,
    });
  };

  const handleAddOption = () => {
    const newOption: QuestionOption = {
      id: `option-${Date.now()}`,
      text: "Nova opção",
      styleCategory: "Clássico",
      points: 10,
      imageUrl: undefined,
    };

    const updatedOptions = [...(content.options || []), newOption];

    onUpdate({
      ...content,
      options: updatedOptions,
    });
  };

  const handleRemoveOption = (optionId: string) => {
    const updatedOptions =
      content.options?.filter((option) => option.id !== optionId) || [];

    onUpdate({
      ...content,
      options: updatedOptions,
    });
  };

  const handleMultiSelectToggle = () => {
    onUpdate({
      ...content,
      multiSelect: !content.multiSelect,
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
      {/* Question Title - Always in preview mode for canvas */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {content.text || "Título da questão"}
        </h2>
        {!isPreviewMode && (
          <div className="text-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
            Configure na coluna da direita →
          </div>
        )}
      </div>

      {/* Question Options - Responsive Grid Layout */}
      <div className="space-y-4">
        {/* Grid container with responsive columns */}
        <div
          className={`
          grid gap-3 w-full
          ${
            content.options?.some((option) => option.imageUrl)
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
              : "grid-cols-1"
          }
        `}
        >
          {content.options?.map((option, index) => (
            <div
              key={option.id}
              className={`
                relative group border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300
                ${
                  selectedOptions.includes(option.id)
                    ? "border-[#B89B7A] bg-gradient-to-br from-[#B89B7A]/5 to-[#B89B7A]/10 shadow-lg scale-[1.02]"
                    : "border-gray-200 hover:border-[#B89B7A]/50 hover:shadow-md hover:scale-[1.01]"
                }
                ${!isPreviewMode ? "hover:scale-[1.01]" : ""}
                ${
                  option.imageUrl
                    ? "min-h-[240px] sm:min-h-[280px]"
                    : "min-h-[60px]"
                }
              `}
              onClick={() => handleOptionClick(option.id)}
            >
              {/* Option Label - Better positioning */}
              <div className="absolute top-2 left-2 z-20">
                <span
                  className={`
                  text-xs font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm
                  ${
                    selectedOptions.includes(option.id)
                      ? "bg-[#B89B7A] text-white"
                      : "bg-white/90 text-gray-700 border border-gray-200"
                  }
                `}
                >
                  {String.fromCharCode(65 + index)}
                </span>
              </div>

              {/* Selection Indicator - Better visibility */}
              {selectedOptions.includes(option.id) && (
                <div className="absolute top-2 right-2 z-20">
                  <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className="w-3.5 h-3.5 text-white"
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

              {/* Option Image - Improved responsive sizing */}
              {option.imageUrl && (
                <div className="relative overflow-hidden">
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    className={`
                      w-full object-cover transition-transform duration-300 group-hover:scale-105
                      ${option.imageUrl ? "h-36 sm:h-44" : "h-24"}
                    `}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x280/f3f4f6/9ca3af?text=Imagem+Não+Encontrada";
                    }}
                  />
                  {/* Improved overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Option Content - Better spacing and typography */}
              <div className={`p-3 ${option.imageUrl ? "space-y-2" : "py-4"}`}>
                <h4
                  className={`
                  font-semibold text-gray-900 leading-tight
                  ${
                    option.imageUrl
                      ? "text-sm sm:text-base"
                      : "text-base sm:text-lg"
                  }
                  ${option.imageUrl ? "line-clamp-2" : "line-clamp-3"}
                `}
                >
                  {option.text}
                </h4>

                {/* Category and Points - Improved layout */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {option.styleCategory}
                  </span>
                  <span className="text-xs font-medium text-[#B89B7A] bg-[#B89B7A]/10 px-2 py-1 rounded-full">
                    {option.points} pts
                  </span>
                </div>
              </div>

              {/* Interactive hover effect border */}
              <div
                className={`
                absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 pointer-events-none
                ${!isPreviewMode ? "group-hover:border-[#B89B7A]/30" : ""}
              `}
              />
            </div>
          )) || (
            <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-base font-medium">
                  Nenhuma opção disponível
                </p>
                <p className="text-sm">
                  Configure as opções na coluna da direita →
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button - Always preview style */}
      <div className="text-center pt-4">
        <div className="space-y-2">
          <Button className="px-8 py-3" disabled={selectedOptions.length === 0}>
            Continuar
          </Button>
          {selectedOptions.length === 0 && (
            <p className="text-xs text-gray-500">
              {content.multiSelect
                ? "Selecione uma ou mais opções"
                : "Selecione uma opção"}{" "}
              para continuar
            </p>
          )}
          {!isPreviewMode && (
            <p className="text-xs text-blue-600">
              Edite na coluna da direita →
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
