
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { preloadImages } from '@/utils/imageManager';

export interface ImageBankItem {
  id: string;
  name: string;
  url: string;
  category?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export const useImageBank = () => {
  const [images, setImages] = useState<ImageBankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('image_bank')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setImages(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (imageData: Omit<ImageBankItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('image_bank')
        .insert(imageData)
        .select()
        .single();

      if (error) throw error;

      setImages(prev => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateImage = async (id: string, updates: Partial<ImageBankItem>) => {
    try {
      const { data, error } = await supabase
        .from('image_bank')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setImages(prev => prev.map(img => img.id === id ? data : img));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('image_bank')
        .update({ active: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setImages(prev => prev.filter(img => img.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const preloadCategoryImages = async (category: string, priority: number = 3) => {
    const categoryImages = images
      .filter(img => img.category === category)
      .slice(0, 10)
      .map(img => ({
        src: img.url,
        id: img.id,
        alt: img.name,
        category: 'image-bank' as const,
        preloadPriority: priority
      }));

    if (categoryImages.length > 0) {
      await preloadImages(categoryImages, { quality: 85 });
    }
  };

  const preloadAllImages = async () => {
    const allImages = images.map(img => ({
      src: img.url,
      id: img.id,
      alt: img.name,
      category: 'image-bank' as const,
      preloadPriority: 1
    }));

    if (allImages.length > 0) {
      await preloadImages(allImages, { 
        quality: 80,
        batchSize: 5 
      });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    fetchImages,
    addImage,
    updateImage,
    deleteImage,
    preloadCategoryImages,
    preloadAllImages
  };
};
