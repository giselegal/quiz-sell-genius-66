
import React from 'react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import { tokens } from '@/config/designTokens';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  variant?: "primary" | "secondary" | "simple";
  centered?: boolean;
}

export const SectionTitle = React.memo<SectionTitleProps>(({
  children,
  subtitle,
  size = "xl",
  className = "",
  variant = "simple",
  centered = true,
}) => (
  <AnimatedWrapper
    className={`${centered ? "text-center" : ""} mb-12 lg:mb-16 ${className}`}
    animation="fade"
    show={true}
    duration={600}
  >
    {/* Decoração superior refinada */}
    {variant === "primary" && (
      <div className="inline-flex items-center gap-3 mb-8">
        <div 
          className="w-12 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${tokens.colors.primary}, transparent)`
          }}
        ></div>
        <div 
          className="w-12 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${tokens.colors.primary}, transparent)`
          }}
        ></div>
      </div>
    )}

    {/* Título com melhor hierarquia */}
    <h2
      className={`font-playfair font-bold leading-tight tracking-tight ${
        variant === "primary"
          ? "bg-gradient-to-r bg-clip-text text-transparent mb-8"
          : "mb-6"
      } ${
        size === "xl"
          ? "text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
          : size === "lg"
          ? "text-xl md:text-2xl lg:text-3xl xl:text-4xl"
          : "text-lg md:text-xl lg:text-2xl xl:text-3xl"
      }`}
      style={{
        color: variant === "primary" ? 'transparent' : tokens.colors.text,
        backgroundImage: variant === "primary" 
          ? `linear-gradient(to right, ${tokens.colors.text}, ${tokens.colors.secondary}, ${tokens.colors.text})`
          : undefined
      }}
    >
      {children}
    </h2>

    {/* Subtítulo melhorado */}
    {subtitle && (
      <div className="max-w-4xl mx-auto">
        <p 
          className="text-base md:text-lg lg:text-xl leading-relaxed font-medium"
          style={{ color: tokens.colors.textSecondary }}
        >
          {subtitle}
        </p>
      </div>
    )}

    {/* Linha decorativa */}
    {variant === "primary" && (
      <div 
        className="w-24 h-1 rounded-full mx-auto mt-8 shadow-sm"
        style={{
          background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary}, ${tokens.colors.primary})`
        }}
      ></div>
    )}
  </AnimatedWrapper>
));

SectionTitle.displayName = 'SectionTitle';
