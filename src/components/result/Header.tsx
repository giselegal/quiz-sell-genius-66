// src/components/result/Header.tsx

import React from 'react';
import { Crown } from 'lucide-react'; // Keeping this import, though not used in the final version of the Header.
import { StyleResult } from '@/types/quiz';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';

interface HeaderProps {
  primaryStyle?: StyleResult;
  logoHeight?: number;
  logo?: string;
  logoAlt?: string;
  userName?: string;
  isScrolled?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  primaryStyle,
  logoHeight = 50,
  logo,
  logoAlt = "Logo",
  userName,
  isScrolled,
  className = ''
}) => {
  const { user } = useAuth();
  const displayName = userName || user?.userName || 'Visitante';

  return (
    // Card with adjusted padding and reduced bottom margin for the next section
    <Card className={`bg-white shadow-sm p-4 sm:p-6 mb-4 md:mb-6 border-0 ${className}`}>
      <div className="flex flex-col items-center gap-y-4 sm:gap-y-6"> {/* Adjusted vertical gap */}
        {/* Logo Section */}
        <div className="flex justify-center w-full">
          {/* Using a standard Logo component if available, otherwise img tag */}
          {/* Assuming you have a Logo component. If not, use <img /> directly */}
          {/* <Logo 
            src={logo} 
            alt={logoAlt} 
            className="h-auto w-auto max-w-[200px] mx-auto" // Added max-w for better control
            style={{ height: `${logoHeight}px` }} 
          /> */}
          <img
            src={logo}
            alt={logoAlt}
            className="h-auto mx-auto"
            style={{ height: `${logoHeight}px`, maxWidth: '100%' }} // Keep existing img styles
          />
        </div>

        {/* Dynamic Greeting and Setup for Style Reveal */}
        <div className="text-center w-full">
          <p className="text-base sm:text-lg font-normal text-[#432818] mb-1 leading-normal"> {/* Smaller, normal weight for greeting */}
            Parabéns, <span className="font-bold text-[#aa6b5d]">{displayName}</span>! {/* Name remains bold and gets a highlight color */}
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-playfair text-[#432818] leading-tight"> {/* Larger for the main statement */}
            Descobrimos o seu Estilo de Ser:
          </h1>
          {/* IMPORTANT: The actual style name (e.g., "Elegante") will be displayed in the PersonalizedHook component below this Header. */}
        </div>
      </div>
    </Card>
  );
};