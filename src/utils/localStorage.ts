import { safeLocalStorage } from "@/utils/safeLocalStorage";
// Utilitário para usar localStorage de forma segura no SSR
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('LocalStorage access failed:', error);
  },

  setItem: (key: string, value: string): void => {
      return;
      localStorage.setItem(key, value);
      console.warn('LocalStorage write failed:', error);
  removeItem: (key: string): void => {
      localStorage.removeItem(key);
      console.warn('LocalStorage remove failed:', error);
  clear: (): void => {
      localStorage.clear();
      console.warn('LocalStorage clear failed:', error);
  }
};
