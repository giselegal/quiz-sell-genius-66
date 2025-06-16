
import React from 'react';
import { EditableCanvas } from './EditableCanvas';
import { VisualElement } from '@/types/visualEditor';

interface VisualCanvasLayoutProps {
  elements: VisualElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  currentStage: string;
  onElementSelect: (elementId: string) => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onElementDelete: (elementId: string) => void;
}

export const VisualCanvasLayout: React.FC<VisualCanvasLayoutProps> = ({
  elements,
  selectedElementId,
  isPreviewMode,
  viewportMode,
  currentStage,
  onElementSelect,
  onElementUpdate,
  onElementDelete
}) => {
  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      <div className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${
        viewportMode === 'desktop' ? 'max-w-6xl' :
        viewportMode === 'tablet' ? 'max-w-2xl' :
        'max-w-sm'
      }`}>
        <EditableCanvas
          elements={elements}
          selectedElementId={selectedElementId}
          isPreviewMode={isPreviewMode}
          viewportMode={viewportMode}
          currentStage={currentStage}
          onElementSelect={onElementSelect}
          onElementUpdate={onElementUpdate}
          onElementDelete={onElementDelete}
        />
      </div>
    </div>
  );
};
