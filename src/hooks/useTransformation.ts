
"use client";

import { useState, useCallback } from 'react';

interface TransformationState {
  isVisible: boolean;
  isAnimating: boolean;
  currentStep: number;
}

export const useTransformation = () => {
  const [state, setState] = useState<TransformationState>({
    isVisible: false,
    isAnimating: false,
    currentStep: 0
  });

  const showTransformation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isVisible: true,
      isAnimating: true,
      currentStep: 0
    }));
  }, []);

  const hideTransformation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isVisible: false,
      isAnimating: false,
      currentStep: 0
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1
    }));
  }, []);

  const resetTransformation = useCallback(() => {
    setState({
      isVisible: false,
      isAnimating: false,
      currentStep: 0
    });
  }, []);

  return {
    ...state,
    showTransformation,
    hideTransformation,
    nextStep,
    resetTransformation
  };
};
