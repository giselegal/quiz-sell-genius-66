
export interface BankImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  preloadPriority?: number;
}

export const imageBank: BankImage[] = [
  {
    id: 'quiz-bg-1',
    src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
    alt: 'Background Quiz 1',
    category: 'backgrounds'
  },
  {
    id: 'quiz-bg-2', 
    src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp',
    alt: 'Background Quiz 2',
    category: 'backgrounds'
  }
];

export const getAllImages = () => imageBank;
