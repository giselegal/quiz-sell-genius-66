
import React from 'react';
import FileLoadingScreen from '@/components/loaders/FileLoadingScreen';

const AccessLoaderPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <FileLoadingScreen />
    </div>
  );
};

export default AccessLoaderPage;
