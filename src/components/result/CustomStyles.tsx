
import React from 'react';
import { tokens } from '@/config/designTokens';

export const CustomStyles: React.FC = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${tokens.colors.borderLight};
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, ${tokens.colors.primary}, ${tokens.colors.secondary});
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, ${tokens.colors.secondary}, ${tokens.colors.primary});
        }
        html {
          scroll-behavior: smooth;
        }
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid ${tokens.colors.primary};
          outline-offset: 2px;
        }
      `,
    }}
  />
);
