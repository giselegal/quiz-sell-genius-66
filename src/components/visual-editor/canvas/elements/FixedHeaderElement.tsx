import React from "react";
import { EditorElement } from "@/hooks/useModernEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FixedHeaderElementProps {
  element: EditorElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<EditorElement>) => void;
}

export const FixedHeaderElement: React.FC<FixedHeaderElementProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
}) => {
  const {
    logoUrl = "https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png",
    logoAlt = "Logo",
    showBackButton = true,
    showProgress = true,
    currentStep = 1,
    totalSteps = 7,
    backgroundColor = "#FFFFFF",
    logoSize = "96px",
  } = element.content;

  const progressValue = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  const handleBackClick = () => {
    // Implementar lógica de voltar
    console.log("Back button clicked");
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        !isPreviewMode ? "cursor-pointer hover:ring-2 hover:ring-blue-200" : ""
      } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={{
        backgroundColor,
        ...element.style,
      }}
      onClick={() => !isPreviewMode && onSelect()}
    >
      <div className="grid gap-4 p-4">
        <div className="flex flex-row w-full h-auto justify-center relative">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 hover:bg-primary hover:text-foreground"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}

          <div className="flex flex-col w-full max-w-sm justify-start items-center gap-4">
            <img
              width={logoSize}
              height={logoSize}
              className="max-w-24 object-cover rounded"
              alt={logoAlt}
              src={logoUrl}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjZjFmMWYxIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkxvZ288L3RleHQ+Cjwvc3ZnPg==";
              }}
            />

            {showProgress && (
              <div className="w-full">
                <Progress
                  value={progressValue}
                  className="w-full h-2 bg-zinc-300"
                />
                <div className="text-xs text-center mt-1 text-gray-600">
                  {currentStep} de {totalSteps}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selection indicator for editor mode */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Cabeçalho Fixo
        </div>
      )}
    </div>
  );
};
