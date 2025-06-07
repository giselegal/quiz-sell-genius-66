
import React from 'react';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation?: 'fade' | 'scale' | 'slide' | 'none';
  show?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  animation = 'fade',
  show = true,
  duration = 300,
  delay = 0,
  className = ''
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default AnimatedWrapper;
