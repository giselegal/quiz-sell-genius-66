import React from "react";
import { EditorElement } from "@/types/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuizElementRendererProps {
  element: EditorElement;
  onButtonClick?: (action: string) => void;
  onInputChange?: (name: string, value: string) => void;
  className?: string;
}

export const QuizElementRenderer: React.FC<QuizElementRendererProps> = ({
  element,
  onButtonClick,
  onInputChange,
  className = ""
}) => {
  const renderElement = () => {
    switch (element.type) {
      case "heading": {
        const HeadingTag = `h${element.content.level || 1}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            className={`font-bold text-white ${getHeadingClasses(element.content.level || 1)}`}
            style={element.style}
          >
            {element.content.text}
          </HeadingTag>
        );
      }

      case "text":
        return (
          <p 
            className="text-white" 
            style={element.style}
          >
            {element.content.text}
          </p>
        );

      case "button":
        return (
          <Button
            onClick={() => onButtonClick?.(element.content.action || "next")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            style={element.style}
          >
            {element.content.text}
          </Button>
        );

      case "input":
        return (
          <div className="space-y-2">
            {element.content.label && (
              <Label htmlFor={element.content.name} className="text-white">
                {element.content.label}
                {element.content.required && <span className="text-red-400 ml-1">*</span>}
              </Label>
            )}
            <Input
              id={element.content.name}
              name={element.content.name}
              type={element.content.type || "text"}
              placeholder={element.content.placeholder}
              required={element.content.required}
              onChange={(e) => onInputChange?.(element.content.name, e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              style={element.style}
            />
          </div>
        );

      case "image":
        return (
          <img
            src={element.content.src}
            alt={element.content.alt}
            className="max-w-full h-auto rounded-lg"
            style={element.style}
          />
        );

      case "video":
        return (
          <video
            src={element.content.src}
            controls={element.content.controls}
            autoPlay={element.content.autoplay}
            className="max-w-full h-auto rounded-lg"
            style={element.style}
          />
        );

      case "spacer":
        return (
          <div
            style={{
              height: element.content.height || 20,
              ...element.style
            }}
          />
        );

      case "quiz-options":
        return (
          <div className="space-y-3" style={element.style}>
            {element.content.options?.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left p-4 h-auto bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white"
                onClick={() => onButtonClick?.(`option-${index}`)}
              >
                <span className="mr-3 text-purple-400 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option.text}
              </Button>
            ))}
          </div>
        );

      default:
        return (
          <div className="p-4 bg-zinc-800 border border-zinc-700 rounded text-white text-center">
            Elemento não suportado: {element.type}
          </div>
        );
    }
  };

  return (
    <div className={`quiz-element ${className}`} data-element-id={element.id}>
      {renderElement()}
    </div>
  );
};

// Helper para classes de heading
function getHeadingClasses(level: number): string {
  switch (level) {
    case 1: return "text-4xl md:text-5xl";
    case 2: return "text-3xl md:text-4xl";
    case 3: return "text-2xl md:text-3xl";
    case 4: return "text-xl md:text-2xl";
    case 5: return "text-lg md:text-xl";
    case 6: return "text-base md:text-lg";
    default: return "text-2xl md:text-3xl";
  }
}
