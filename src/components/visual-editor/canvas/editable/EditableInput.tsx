
import React, { useState } from 'react';

interface EditableInputProps {
  content: {
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
  };
  isSelected: boolean;
  isPreviewMode: boolean;
  onUpdate: (content: any) => void;
}

export const EditableInput: React.FC<EditableInputProps> = ({
  content,
  isSelected,
  isPreviewMode,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(content.label || 'NOME');
  const [placeholder, setPlaceholder] = useState(content.placeholder || 'Digite seu nome aqui...');

  const handleDoubleClick = () => {
    if (!isPreviewMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    onUpdate({
      ...content,
      label,
      placeholder
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 border-2 border-blue-500 rounded-lg bg-white space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Label:</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Placeholder:</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Salvar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`
        grid w-full items-center gap-1.5 transition-all duration-200
        ${!isPreviewMode ? 'hover:bg-gray-50 cursor-pointer p-2 rounded' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      onDoubleClick={handleDoubleClick}
    >
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label} {content.required !== false && <span>*</span>}
      </label>
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-inherit placeholder:opacity-50 text-base text-left p-4"
        placeholder={placeholder}
        type={content.type || 'text'}
        defaultValue=""
        disabled={!isPreviewMode}
      />
    </div>
  );
};
