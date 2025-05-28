
import React from 'react';
import { cn } from '@/lib/utils';

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 2,
  gap = 'md',
  className
}) => {
  const getGridClasses = () => {
    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6'
    };

    return `grid ${colClasses[columns]} ${gapClasses[gap]}`;
  };

  return (
    <div className={cn(getGridClasses(), className)}>
      {children}
    </div>
  );
};
