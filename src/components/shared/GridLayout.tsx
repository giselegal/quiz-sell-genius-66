
import React from 'react';

interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  className = '',
  columns = 2,
  gap = '4'
}) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClass = `gap-${gap}`;
  const colClass = gridColsClass[columns as keyof typeof gridColsClass] || gridColsClass[2];

  return (
    <div className={`grid ${colClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};

export default GridLayout;
