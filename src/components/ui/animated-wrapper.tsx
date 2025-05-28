
"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsLowPerformanceDevice } from "@/hooks/use-mobile";

interface AnimatedWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  show?: boolean;
  delay?: number;
  duration?: number;
  animation?: "fade" | "slide" | "scale" | "none";
  disableOnLowPerformance?: boolean;
}

export const AnimatedWrapper = ({
  children,
  show = true,
  delay = 0,
  duration = 300,
  animation = "fade",
  disableOnLowPerformance = true,
  className,
  ...props
}: AnimatedWrapperProps) => {
  const [mounted, setMounted] = useState(false);
  const isLowPerformance = useIsLowPerformanceDevice();
  
  // Skip animations on low performance devices if configured
  const shouldAnimate = !(disableOnLowPerformance && isLowPerformance);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determine animation classes based on type
  const getAnimationClasses = () => {
    if (!shouldAnimate || animation === "none") return "";
    
    const baseClasses = `transition-all duration-${duration}`;
    
    switch (animation) {
      case "fade":
        return `${baseClasses} ${show && mounted ? "opacity-100" : "opacity-0"}`;
      case "slide":
        return `${baseClasses} ${show && mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;
      case "scale":
        return `${baseClasses} ${show && mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`;
      default:
        return `${baseClasses} ${show && mounted ? "opacity-100" : "opacity-0"}`;
    }
  };
  
  const animationStyles = {
    transitionDelay: delay > 0 && shouldAnimate ? `${delay}ms` : undefined,
    transitionDuration: shouldAnimate ? `${duration}ms` : undefined
  };

  return (
    <div
      className={cn(
        getAnimationClasses(),
        className
      )}
      style={animationStyles}
      {...props}
    >
      {children}
    </div>
  );
};
