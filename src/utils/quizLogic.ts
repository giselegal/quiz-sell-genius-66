
import { StyleResult } from '@/types/quiz';

export const calculateStyleResult = (responses: any[]): { primaryStyle: StyleResult; secondaryStyles: StyleResult[] } | null => {
  if (!responses || responses.length === 0) return null;

  // Mock calculation for now - replace with actual logic
  const mockPrimaryStyle: StyleResult = {
    category: 'Romântico',
    percentage: 85
  };

  const mockSecondaryStyles: StyleResult[] = [
    { category: 'Elegante', percentage: 65 },
    { category: 'Natural', percentage: 45 }
  ];

  return {
    primaryStyle: mockPrimaryStyle,
    secondaryStyles: mockSecondaryStyles
  };
};
