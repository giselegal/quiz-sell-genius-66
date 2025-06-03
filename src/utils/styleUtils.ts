import { StyleResult } from '@/types/quiz';

interface StyleConfiguration {
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  // Add other style properties as needed
}

const styleConfigurations: Record<string, StyleConfiguration> = {
  Natural: {
    colors: {
      primary: '#f2f1ed',
      secondary: '#e3e1de',
      text: '#54494b',
    },
  },
  Clássico: {
    colors: {
      primary: '#e9ecef',
      secondary: '#dee2e6',
      text: '#495057',
    },
  },
  Contemporâneo: {
    colors: {
      primary: '#f8f9fa',
      secondary: '#e9ecef',
      text: '#343a40',
    },
  },
  Elegante: {
    colors: {
      primary: '#f0f0f0',
      secondary: '#d3d3d3',
      text: '#212529',
    },
  },
  Romântico: {
    colors: {
      primary: '#f9f5f6',
      secondary: '#f0e6ef',
      text: '#503a3f',
    },
  },
  Sexy: {
    colors: {
      primary: '#f8e8e5',
      secondary: '#f1d0cc',
      text: '#664d03',
    },
  },
  Dramático: {
    colors: {
      primary: '#e6e6e6',
      secondary: '#cccccc',
      text: '#000000',
    },
  },
  Criativo: {
    colors: {
      primary: '#e9faed',
      secondary: '#d1eada',
      text: '#2a623d',
    },
  },
};

export const getFallbackStyle = (styleCategory: string) => {
  const styleConfig = styleConfigurations[styleCategory];
  if (!styleConfig) {
    return {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      color: '#333'
    };
  }

  return {
    background: `linear-gradient(135deg, ${styleConfig.colors.primary} 0%, ${styleConfig.colors.secondary} 100%)`,
    color: styleConfig.colors.text
  };
};

export const calculatePercentages = (styleCounts: Record<string, number>, totalSelections: number): StyleResult[] => {
  return Object.entries(styleCounts)
    .map(([category, score]) => ({
      category,
      score,
      percentage: totalSelections > 0 ? Math.round((score / totalSelections) * 100) : 0
    }))
    .sort((a, b) => b.score - a.score);
};
