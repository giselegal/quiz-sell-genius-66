
import React from 'react';
import Logo from '../ui/logo';

interface ResultHeaderProps {
  userName: string;
  customTitle?: string;
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ userName, customTitle }) => (
  <div className="text-center space-y-3">
    <Logo className="h-10 md:h-14 mx-auto" />
    <h1 className="font-playfair text-lg md:text-2xl font-semibold text-[#432818] px-2">
      {customTitle || `Olá, ${userName}, seu Estilo Predominante é:`}
    </h1>
  </div>
);

export default ResultHeader;
