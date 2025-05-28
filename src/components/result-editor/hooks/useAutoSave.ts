"use client";
import { useCallback, useEffect, useRef } from 'react';

interface UseAutoSaveProps {
  data: any;
  onSave: (data: any) => Promise<void> | void;
  delay?: number;
  enabled?: boolean;
}
export const useAutoSave = ({ 
  data, 
  onSave, 
  delay = 30000, // 30 segundos
  enabled = true 
}: UseAutoSaveProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');
  const saveData = useCallback(async () => {
    const dataString = JSON.stringify(data);
    
    // Só salva se os dados mudaram
    if (dataString !== lastSavedRef.current) {
      try {
        await onSave(data);
        lastSavedRef.current = dataString;
        console.log('Auto-save realizado com sucesso');
      } catch (error) {
        console.error('Erro no auto-save:', error);
      }
    }
  }, [data, onSave]);
  useEffect(() => {
    if (!enabled) return;
    // Limpa timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    // Agenda novo save
    timeoutRef.current = setTimeout(saveData, delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    };
  }, [data, delay, enabled, saveData]);
  // Cleanup no unmount
  }, []);
  return { saveData };
};
