
"use client";

import { useState, useCallback } from 'react';
import { BankImage, getAllImages, getImagesByCategory, addImage } from '@/data/imageBank';

export const useImageBank = () => {
  const [images, setImages] = useState<BankImage[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllImages = useCallback(() => {
    setLoading(true);
    try {
      const allImages = getAllImages();
      setImages(allImages);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadImagesByCategory = useCallback((category: string) => {
    setLoading(true);
    try {
      const categoryImages = getImagesByCategory(category);
      setImages(categoryImages);
    } catch (error) {
      console.error('Error loading category images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadImage = useCallback((image: BankImage) => {
    try {
      const uploadedImage = addImage(image);
      setImages(prev => [...prev, uploadedImage]);
      return uploadedImage;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }, []);

  const searchImages = useCallback((query: string) => {
    setLoading(true);
    try {
      const allImages = getAllImages();
      const filteredImages = allImages.filter(image =>
        image.alt.toLowerCase().includes(query.toLowerCase()) ||
        image.category.toLowerCase().includes(query.toLowerCase())
      );
      setImages(filteredImages);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getImageUrl = useCallback((imageId: string) => {
    const allImages = getAllImages();
    const image = allImages.find(img => img.id === imageId);
    return image?.url || '';
  }, []);

  return {
    images,
    loading,
    loadAllImages,
    loadImagesByCategory,
    uploadImage,
    searchImages,
    getImageUrl
  };
};
