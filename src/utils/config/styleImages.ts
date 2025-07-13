
import { optimizeImageKitUrl } from '@/utils/imageKitUtils';

export const getStyleImage = (styleType: string): string => {
  const styleImages: Record<string, string> = {
    'Natural': 'GUIA_NATURAL_fzp6fc.webp',
    'Clássico': 'GUIA_CLASSICO_ux1yhf.webp',
    'Contemporâneo': 'GUIA_CONTEMPORANEO_vcklxe.webp',
    'Elegante': 'GUIA_ELEGANTE_asez1q.webp',
    'Romântico': 'GUIA_ROMANTICO_ci4hgk.webp',
    'Sexy': 'GUIA_SEXY_t5x2ov.webp',
    'Dramático': 'GUIA_DRAMATICO_mpn60d.webp',
    'Criativo': 'GUIA_CRIATIVO_ntbzph.webp'
  };
  
  const imagePath = styleImages[styleType] || styleImages['Natural'];
  return optimizeImageKitUrl(imagePath, { quality: 90, format: 'auto' });
};
