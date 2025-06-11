
import React from 'react';
import { tokens } from '@/config/designTokens';

interface NavigationDotsProps {
  isVisible: boolean;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const sections = [
  { id: "primary-style", label: "Seu Estilo" },
  { id: "transformations", label: "Transformações" },
  { id: "motivation", label: "Motivação" },
  { id: "bonuses", label: "Bônus" },
  { id: "testimonials", label: "Depoimentos" },
  { id: "guarantee", label: "Garantia" },
  { id: "cta", label: "Adquirir" },
];

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  isVisible,
  activeSection,
  onSectionClick,
}) => (
  <div
    className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ${
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
    }`}
  >
    <div 
      className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
      style={{
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: tokens.shadows.lg
      }}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`group relative w-2 h-2 rounded-full transition-all duration-300 ${
            activeSection === section.id
              ? "scale-125 shadow-md"
              : "hover:scale-110"
          }`}
          style={{
            backgroundColor: activeSection === section.id
              ? tokens.colors.primary
              : tokens.colors.textLight
          }}
          aria-label={`Ir para seção ${section.label}`}
        >
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div 
              className="text-white text-xs px-2 py-1 rounded whitespace-nowrap"
              style={{ backgroundColor: tokens.colors.text }}
            >
              {section.label}
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);
