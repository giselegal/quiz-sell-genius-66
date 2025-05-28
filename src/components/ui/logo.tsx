
import React from 'react';

interface LogoProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean; // Added priority prop but we'll ignore it since we're not using Next.js Image
}

const Logo: React.FC<LogoProps> = ({ 
  src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  alt = "Logo Gisele Galvão",
  className = "h-14", 
  style,
  priority // This will be ignored but won't cause type errors
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
};

export default Logo;
