
export interface ResultPageConfig {
  styleType: string;
  header: any;
  mainContent: any;
  offer: any;
  globalStyles: any;
  blocks: any[];
}

const STORAGE_KEY = 'result-page-config';

export const resultPageStorage = {
  save: (config: ResultPageConfig): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving result page config:', error);
    }
  },

  load: (): ResultPageConfig | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading result page config:', error);
      return null;
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing result page config:', error);
    }
  },

  export: (): string => {
    try {
      const config = resultPageStorage.load();
      return JSON.stringify(config, null, 2);
    } catch (error) {
      console.error('Error exporting result page config:', error);
      return '{}';
    }
  },

  import: (jsonString: string): boolean => {
    try {
      const config = JSON.parse(jsonString);
      resultPageStorage.save(config);
      return true;
    } catch (error) {
      console.error('Error importing result page config:', error);
      return false;
    }
  }
};
