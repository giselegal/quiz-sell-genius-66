
import React, { useState } from 'react';

interface EditableImageProps {
  content: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  isSelected: boolean;
  isPreviewMode: boolean;
  onUpdate: (content: any) => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  content,
  isSelected,
  isPreviewMode,
  onUpdate
}) => {
  const [imageError, setImageError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSrc, setNewSrc] = useState(content.src || '');

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDoubleClick = () => {
    if (!isPreviewMode) {
      setIsEditing(true);
      setNewSrc(content.src || '');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImageError(false);
    onUpdate({ ...content, src: newSrc });
    setIsEditing(false);
  };

  const defaultSrc = content.src || 'https://cakto-quiz-br01.b-cdn.net/uploads/ecbe689b-1c0a-4071-98d3-4d391b6dd98f.png';

  if (isEditing) {
    return (
      <div className="p-4 border-2 border-blue-500 rounded-lg bg-white">
        <form onSubmit={handleUrlSubmit} className="space-y-3">
          <label className="block text-sm font-medium">URL da Imagem:</label>
          <input
            type="url"
            value={newSrc}
            onChange={(e) => setNewSrc(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://exemplo.com/imagem.jpg"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div 
      className={`
        grid transition-all duration-200
        ${!isPreviewMode ? 'hover:bg-gray-50 cursor-pointer' : ''}
        ${isSelected && !isPreviewMode ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg' : ''}
      `}
      onDoubleClick={handleDoubleClick}
    >
      <div className="text-lg">
        <div className="text-lg flex items-center justify-center">
          {imageError ? (
            <div className="w-96 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              <span>Erro ao carregar imagem</span>
            </div>
          ) : (
            <img
              src={defaultSrc}
              width={content.width || 640}
              height={content.height || 480}
              alt={content.alt || 'Imagem'}
              className="object-cover w-full h-auto rounded-lg max-w-96"
              onError={handleImageError}
            />
          )}
        </div>
      </div>
    </div>
  );
};
