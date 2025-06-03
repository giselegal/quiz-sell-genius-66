
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

interface BeforeAfterTransformationProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  subtitle: string;
  ctaText: string;
  handleCtaClick: () => void;
}

const BeforeAfterTransformation: React.FC<BeforeAfterTransformationProps> = ({
  beforeImage,
  afterImage,
  title,
  subtitle,
  ctaText,
  handleCtaClick
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries && entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const nextStep = () => {
    setCurrentStep(prev => (prev + 1) % 3);
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev - 1 + 3) % 3);
  };

  const getImageStyle = () => {
    if (currentStep === 0) {
      return { clipPath: 'inset(0 0 0 0)' };
    } else if (currentStep === 1) {
      return { clipPath: `inset(0 ${100 - (containerWidth / 2)}px 0 0)` };
    } else {
      return { clipPath: 'inset(0 0 0 50%)' };
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-xl transition-all duration-500 ease-in-out">
      <div className="absolute inset-0 bg-black opacity-60 z-10 transition-opacity duration-500 ease-in-out" />

      <div className="relative flex flex-col items-center justify-center p-6 text-center text-white z-20">
        <motion.h2
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-md mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="relative" ref={containerRef}>
        <img
          src={beforeImage}
          alt="Imagem original"
          className="block w-full object-cover transition-opacity duration-500 ease-in-out"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
        />
        <AnimatePresence>
          {imageLoaded && (
            <motion.img
              src={afterImage}
              alt="Imagem transformada"
              className="absolute inset-0 w-full object-cover"
              style={{ ...getImageStyle() }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {currentStep === 1 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-white text-xl font-semibold">
                Analisando seu estilo...
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 z-30">
        <Button
          variant="secondary"
          size="icon"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={nextStep}
          disabled={currentStep === 2}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            className="w-full"
            onClick={() => {
              trackButtonClick('cta_final_resultado');
              handleCtaClick();
            }}
          >
            {ctaText}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BeforeAfterTransformation;
