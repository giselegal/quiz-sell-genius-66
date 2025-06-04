import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FileLoadingScreenProps {
  fileUrl: string;
  onFileLoaded: (file: Blob) => void;
  onError: (error: string) => void;
}

const FileLoadingScreen: React.FC<FileLoadingScreenProps> = ({ fileUrl, onFileLoaded, onError }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFile = async () => {
      try {
        const response = await fetch(fileUrl);
        const contentLength = response.headers.get('content-length');
        const total = parseInt(contentLength || '0', 10);
        let loaded = 0;

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('ReadableStream not supported');
        }

        const chunks: Uint8Array[] = [];

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          chunks.push(value);
          loaded += value.length;
          const currentProgress = total ? Math.round((loaded / total) * 100) : 0;
          setProgress(currentProgress);
        }

        const blob = new Blob(chunks);
        onFileLoaded(blob);
        setIsLoading(false);
      } catch (e: any) {
        onError(e.message || 'Failed to load file');
        setIsLoading(false);
      }
    };

    loadFile();
  }, [fileUrl, onFileLoaded, onError]);

  // Fix the CSS custom property issue
  const progressBarStyle = {
    '--progress-width': `${progress}%`
  } as React.CSSProperties & { '--progress-width': string };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-50 z-50">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Carregando arquivo...</h2>
        <p className="text-gray-600">Por favor, aguarde enquanto o arquivo é carregado.</p>
      </div>

      <div className="relative w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-brand-primary rounded-full"
          style={progressBarStyle}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-gray-700">
          {progress}%
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 text-sm text-gray-500">
          <span className="animate-pulse">Carregando...</span>
        </div>
      )}
    </div>
  );
};

export default FileLoadingScreen;
