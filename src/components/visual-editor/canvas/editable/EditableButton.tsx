
import React, { useState } from 'react';

interface EditableButtonProps {
  content: {
    text?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
  };
  isSelected: boolean;
  isPreviewMode: boolean;
  onUpdate: (content: any) => void;
}

export const EditableButton: React.FC<EditableButtonProps> = ({
  content,
  isSelected,
  isPreviewMode,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content.text || 'Continuar');

  const handleDoubleClick = () => {
    if (!isPreviewMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    onUpdate({
      ...content,
      text
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 border-2 border-blue-500 rounded-lg bg-white space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Texto do Botão:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
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
        transition-all duration-200
        ${!isPreviewMode ? 'hover:bg-gray-50 cursor-pointer p-2 rounded' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      onDoubleClick={handleDoubleClick}
    >
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 min-w-full h-14"
        disabled={!isPreviewMode}
      >
        {text}
      </button>
    </div>
  );
};
