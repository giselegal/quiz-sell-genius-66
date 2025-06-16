
import React from 'react';
import { EditorElement } from '@/hooks/useModernEditor';

interface TestimonialItem {
  id: string;
  name: string;
  username: string;
  avatar: string;
  content: string;
}

interface MarqueeElementProps {
  element: EditorElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<EditorElement>) => void;
}

export const MarqueeElement: React.FC<MarqueeElementProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate
}) => {
  const {
    testimonials = [
      {
        id: '1',
        name: 'Jack',
        username: '@jack',
        avatar: 'https://avatar.vercel.sh/jack',
        content: 'Nunca vi nada como isso antes. É incrível. Eu amei!'
      },
      {
        id: '2',
        name: 'Jill',
        username: '@jill',
        avatar: 'https://avatar.vercel.sh/jill',
        content: 'Não sei o que dizer. Estou sem palavras. Isso é incrível.'
      },
      {
        id: '3',
        name: 'John',
        username: '@john',
        avatar: 'https://avatar.vercel.sh/john',
        content: 'Produto fantástico! Superou todas as minhas expectativas.'
      }
    ],
    duration = '40s',
    gap = '1rem',
    direction = 'left',
    pauseOnHover = true,
    showGradients = true,
    cardWidth = '256px'
  } = element.content;

  const TestimonialCard: React.FC<{ testimonial: TestimonialItem }> = ({ testimonial }) => (
    <figure 
      className="relative h-full cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] flex-shrink-0"
      style={{ width: cardWidth }}
    >
      <div className="flex flex-row items-center gap-2">
        <img 
          className="rounded-full" 
          width="32" 
          height="32" 
          alt={testimonial.name}
          src={testimonial.avatar}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {testimonial.name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">
            {testimonial.username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">
        {testimonial.content}
      </blockquote>
    </figure>
  );

  const MarqueeRow: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => (
    <div 
      className={`group flex overflow-hidden p-2 [gap:var(--gap)] flex-row`}
      style={{
        '--duration': duration,
        '--gap': gap
      } as React.CSSProperties}
    >
      {[...Array(4)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row ${
            pauseOnHover ? 'group-hover/marquee:[animation-play-state:paused]' : ''
          } ${reverse ? '[animation-direction:reverse]' : ''}`}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={`${rowIndex}-${testimonial.id}`} testimonial={testimonial} />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`min-h-[1.25rem] min-w-full relative self-auto box-border transition-all duration-200 ${
        !isPreviewMode ? 'cursor-pointer hover:ring-2 hover:ring-blue-200' : ''
      } ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => !isPreviewMode && onSelect()}
    >
      <div className="group/marquee relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        {/* First marquee row */}
        <MarqueeRow />
        
        {/* Second marquee row (reverse direction) */}
        <MarqueeRow reverse />

        {/* Fade gradients */}
        {showGradients && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent"></div>
          </>
        )}
      </div>

      {/* Selection indicator for editor mode */}
      {!isPreviewMode && isSelected && (
        <div className="absolute -top-8 left-0 z-50 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Marquee
        </div>
      )}
    </div>
  );
};
