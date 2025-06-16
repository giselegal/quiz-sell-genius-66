
import React from 'react';
import { CanvasHeader } from './CanvasHeader';
import { CanvasItem } from './CanvasItem';
import { VisualElement } from '@/types/visualEditor';
import { motion } from 'framer-motion';

interface EditableCanvasProps {
  elements: VisualElement[];
  selectedElementId: string | null;
  isPreviewMode: boolean;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  onElementSelect: (elementId: string) => void;
  onElementUpdate: (elementId: string, updates: any) => void;
  onElementDelete: (elementId: string) => void;
  currentStage: string;
}

export const EditableCanvas: React.FC<EditableCanvasProps> = ({
  elements,
  selectedElementId,
  isPreviewMode,
  viewportMode,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  currentStage
}) => {
  const getViewportStyles = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'max-w-6xl';
    }
  };

  const getViewportClasses = () => {
    return viewportMode === 'mobile' ? 'group-[.screen-mobile]:p-3' : '';
  };

  return (
    <div className="relative w-full overflow-auto z-10">
      <div className="h-full w-full rounded-[inherit]" style={{ overflow: 'hidden scroll' }}>
        <div className="group relative main-content w-full min-h-full mx-auto">
          <div className={`flex flex-col gap-4 md:gap-6 h-full justify-between p-3 ${getViewportClasses()} md:p-5 pb-10`}>
            {/* Header Section */}
            <div className="grid gap-4 opacity-100">
              <CanvasHeader 
                logoUrl="https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_96,h_96,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                logoAlt="Logo Gisele Galvão"
                currentStep={1}
                totalSteps={10}
                onBack={() => console.log('Back')}
              />
            </div>

            {/* Main Content */}
            <div className={`main-content w-full relative mx-auto customizable-width h-full ${getViewportStyles()}`}>
              <div className="flex flex-row flex-wrap pb-10">
                {elements
                  .filter(el => el.stageId === currentStage)
                  .sort((a, b) => a.order - b.order)
                  .map((element) => (
                    <motion.div
                      key={element.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ 
                        transform: 'translate3d(0px, 0px, 0px) scaleX(1) scaleY(1)', 
                        flexBasis: '100%' 
                      }}
                    >
                      <CanvasItem
                        id={element.id}
                        type={element.type}
                        content={element.content}
                        isSelected={selectedElementId === element.id}
                        isPreviewMode={isPreviewMode}
                        onSelect={() => onElementSelect(element.id)}
                      />
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Bottom Spacer */}
            <div className="pt-10 md:pt-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
