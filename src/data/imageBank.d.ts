
export interface ImageBankCategory {
  id: string;
  name: string;
  description: string;
}

export interface ImageBankItem {
  id: string;
  url: string;
  alt: string;
  category: string;
  tags: string[];
  styleCategory: 'Natural' | 'Clássico' | 'Romântico' | 'Dramático' | 'Criativo' | 'Sensual';
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ImageBank {
  categories: ImageBankCategory[];
  items: ImageBankItem[];
}
