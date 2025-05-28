
import React from 'react';
import { Card } from '@/components/ui/card';

const ResultSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffaf7] p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header skeleton */}
        <Card className="p-6 mb-6 bg-white">
          <div className="flex flex-col items-center gap-5">
            <div className="w-48 h-20 bg-gray-200 rounded-md animate-pulse" />
            <div className="w-full max-w-md h-8 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </Card>
        
        {/* Main content skeleton */}
        <Card className="p-6 mb-10 bg-white">
          <div className="flex flex-col gap-6">
            <div className="w-full h-8 bg-gray-200 rounded-md animate-pulse" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-full h-32 bg-gray-200 rounded-md animate-pulse" />
                <div className="w-full h-24 bg-gray-200 rounded-md animate-pulse" />
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-80 bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Additional sections skeleton */}
        <div className="space-y-10">
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-6 bg-white">
              <div className="w-full h-8 bg-gray-200 rounded-md animate-pulse mb-6" />
              <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultSkeleton;
