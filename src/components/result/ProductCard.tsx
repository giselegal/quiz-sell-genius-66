
import React from 'react';
import { tokens } from '@/config/designTokens';
import ProgressiveImage from '@/components/ui/progressive-image';

interface ProductCardProps {
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  originalPrice: string;
  priority?: boolean;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  src,
  title,
  subtitle,
  badge,
  originalPrice,
  priority = false,
  index,
}) => (
  <div
    className={`group bg-white rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative ${
      index === 2 ? "md:col-span-2 xl:col-span-1" : ""
    }`}
    style={{ boxShadow: tokens.shadows.lg }}
  >
    {/* Badge premium */}
    <div className="absolute -top-4 -right-4 z-10">
      <span
        className={`text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 ${
          index === 0
            ? "bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
            : "bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]"
        }`}
      >
        {badge}
      </span>
    </div>

    {/* Imagem do produto */}
    <div
      className="relative mb-6 bg-gradient-to-br from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 overflow-hidden"
      style={{
        boxShadow: tokens.shadows.sm,
        aspectRatio:
          index === 0
            ? "4.6/5"
            : index === 1
            ? "6/3.5"
            : "3/4.5",
      }}
    >
      <ProgressiveImage
        src={src}
        alt={title}
        className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
      />

      {/* Overlay de hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#B89B7A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
    </div>

    {/* Conteúdo do produto */}
    <div className="text-left space-y-4">
      <h4 className="font-bold text-[#2C1810] text-lg lg:text-xl leading-tight">
        {title}
      </h4>
      <p className="text-sm lg:text-base text-[#5D4A3A] leading-relaxed">
        {subtitle}
      </p>

      {/* Preço original */}
      <div className="pt-4 border-t border-[#B89B7A]/10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#8F7A6A]">
            Valor individual:
          </span>
          <span className="text-lg font-bold text-[#B89B7A] line-through">
            {originalPrice}
          </span>
        </div>
      </div>
    </div>
  </div>
);
