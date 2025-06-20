/**
 * Tema otimizado baseado na análise da identidade visual atual
 * Combina a identidade da marca Gisele Galvão com elementos modernos do sistema atual
 */

export const quizTheme = {
  colors: {
    // Cores principais da marca
    primary: '#B89B7A',           // Bronze/dourado (marca Gisele)
    primaryHover: '#aa6b5d',      // Tom mais escuro para hover
    primaryLight: '#F4E9DD',      // Tom claro para backgrounds
    
    // Cores secundárias
    secondary: '#6B4F43',         // Marrom médio
    accent: '#3b82f6',            // Azul (sistema atual)
    accentLight: '#dbeafe',       // Azul claro
    
    // Backgrounds
    background: '#ffffff',        // Branco limpo
    surface: '#f8f9fa',          // Cinza muito claro
    muted: '#f5f5f5',            // Cinza claro
    
    // Borders
    border: '#e4e4e7',           // Zinc-200
    borderLight: '#f1f5f9',      // Border mais suave
    borderAccent: '#B89B7A',     // Border com cor da marca
    
    // Text colors
    text: {
      primary: '#432818',        // Marrom escuro
      secondary: '#6B4F43',      // Marrom médio  
      muted: '#8F7A6A',          // Marrom claro
      white: '#ffffff',          // Branco
      accent: '#3b82f6'          // Azul para links/actions
    },
    
    // Status colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    headingFamily: "'Playfair Display', Georgia, serif",
    monoFamily: "'JetBrains Mono', Consolas, monospace",
    
    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem'       // 48px
    },
    
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  spacing: {
    // Container sizes
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      quiz: '800px'  // Tamanho específico para quiz
    },
    
    // Common gaps
    gap: {
      xs: '0.25rem',    // 4px
      sm: '0.5rem',     // 8px
      md: '1rem',       // 16px
      lg: '1.5rem',     // 24px
      xl: '2rem',       // 32px
      '2xl': '3rem'     // 48px
    }
  },
  
  borderRadius: {
    none: '0',
    sm: '0.375rem',     // 6px
    md: '0.5rem',       // 8px
    lg: '0.75rem',      // 12px
    xl: '1rem',         // 16px
    '2xl': '1.5rem',    // 24px
    full: '9999px'
  },
  
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Shadows específicas da marca
    brand: '0 4px 12px rgba(184, 155, 122, 0.15)',
    brandLg: '0 8px 25px rgba(184, 155, 122, 0.2)',
    glow: '0 0 20px rgba(184, 155, 122, 0.3)'
  },
  
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
}

// CSS Variables para uso direto no CSS
export const cssVariables = {
  '--color-primary': quizTheme.colors.primary,
  '--color-primary-hover': quizTheme.colors.primaryHover,
  '--color-primary-light': quizTheme.colors.primaryLight,
  '--color-secondary': quizTheme.colors.secondary,
  '--color-accent': quizTheme.colors.accent,
  '--color-background': quizTheme.colors.background,
  '--color-surface': quizTheme.colors.surface,
  '--color-border': quizTheme.colors.border,
  '--color-text-primary': quizTheme.colors.text.primary,
  '--color-text-secondary': quizTheme.colors.text.secondary,
  '--color-text-muted': quizTheme.colors.text.muted,
  '--font-family': quizTheme.typography.fontFamily,
  '--font-heading': quizTheme.typography.headingFamily,
  '--container-quiz': quizTheme.spacing.container.quiz,
  '--radius-md': quizTheme.borderRadius.md,
  '--radius-lg': quizTheme.borderRadius.lg,
  '--shadow-brand': quizTheme.shadows.brand,
  '--animation-duration': quizTheme.animations.duration.normal
}

export type QuizTheme = typeof quizTheme
