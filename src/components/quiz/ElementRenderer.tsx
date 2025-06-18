import React from "react";
import { EditorElement } from "@/types/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ElementRendererProps {
  element: EditorElement;
  onAction?: (action: string, data?: unknown) => void;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  onAction,
}) => {
  const handleAction = (action: string, data?: unknown) => {
    if (onAction) {
      onAction(action, data);
    }
  };

  const getStyles = () => {
    const styles: React.CSSProperties = {};

    if (element.styles?.color) {
      styles.color = element.styles.color;
    }

    if (element.styles?.backgroundColor) {
      styles.backgroundColor = element.styles.backgroundColor;
    }

    if (element.styles?.fontSize) {
      styles.fontSize = `${element.styles.fontSize}px`;
    }

    if (element.styles?.fontWeight) {
      styles.fontWeight = element.styles.fontWeight;
    }

    if (element.styles?.textAlign) {
      styles.textAlign = element.styles.textAlign;
    }

    if (element.styles?.padding) {
      styles.padding = `${element.styles.padding}px`;
    }

    if (element.styles?.margin) {
      styles.margin = `${element.styles.margin}px`;
    }

    if (element.styles?.borderRadius) {
      styles.borderRadius = `${element.styles.borderRadius}px`;
    }

    return styles;
  };

  switch (element.type) {
    case "heading": {
      const HeadingTag = `h${
        element.content.level || 1
      }` as keyof JSX.IntrinsicElements;
      return (
        <HeadingTag style={getStyles()} className="font-bold">
          {element.content.text}
        </HeadingTag>
      );
    }

    case "text":
      return (
        <p style={getStyles()} className="text-base">
          {element.content.text}
        </p>
      );

    case "button":
      return (
        <Button
          style={getStyles()}
          onClick={() =>
            handleAction(element.content.action || "next", element.content)
          }
          className="w-full"
        >
          {element.content.text}
        </Button>
      );

    case "input":
      return (
        <div className="space-y-2">
          {element.content.label && (
            <Label htmlFor={element.id}>{element.content.label}</Label>
          )}
          <Input
            id={element.id}
            type={element.content.type || "text"}
            placeholder={element.content.placeholder}
            required={element.content.required}
            name={element.content.name}
            style={getStyles()}
            onChange={(e) =>
              handleAction("input-change", {
                name: element.content.name,
                value: e.target.value,
              })
            }
          />
        </div>
      );

    case "image":
      return (
        <img
          src={element.content.src}
          alt={element.content.alt}
          style={getStyles()}
          className="max-w-full h-auto"
        />
      );

    case "video":
      return (
        <video
          src={element.content.src}
          controls={element.content.controls}
          autoPlay={element.content.autoplay}
          style={getStyles()}
          className="max-w-full h-auto"
        />
      );

    case "spacer":
      return (
        <div
          style={{
            height: `${element.content.height || 50}px`,
            ...getStyles(),
          }}
        />
      );

    default:
      return (
        <div
          style={getStyles()}
          className="p-4 border border-dashed border-gray-300 text-center text-gray-500"
        >
          Elemento desconhecido: {element.type}
        </div>
      );
  }
};
