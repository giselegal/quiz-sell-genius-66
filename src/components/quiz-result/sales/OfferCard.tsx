
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface OfferCardProps {
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  ctaText?: string;
  ctaUrl?: string;
  className?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  title,
  description,
  originalPrice,
  discountedPrice,
  features,
  ctaText = "Garantir Minha Consultoria",
  ctaUrl = "#",
  className = ""
}) => {
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Card className="relative overflow-hidden border-2 border-[#B89B7A] shadow-xl">
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        
        <CardHeader className="text-center bg-[#FAF9F7]">
          <CardTitle className="text-2xl font-playfair text-[#432818]">
            {title}
          </CardTitle>
          <CardDescription className="text-[#8F7A6A]">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            {originalPrice > discountedPrice && (
              <div className="text-lg text-gray-500 line-through mb-2">
                De R$ {originalPrice.toFixed(2)}
              </div>
            )}
            <div className="text-4xl font-bold text-[#B89B7A]">
              R$ {discountedPrice.toFixed(2)}
            </div>
          </div>
          
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-[#432818]">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full bg-[#B89B7A] hover:bg-[#A38A69] text-white py-4 text-lg font-semibold"
            onClick={() => window.open(ctaUrl, '_blank')}
          >
            {ctaText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OfferCard;
