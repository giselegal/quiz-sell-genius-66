
import React from 'react';
import { Card } from '@/components/ui/card';

const ResultSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2ED] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="text-center space-y-4 py-8">
          <div className="w-32 h-12 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          <div className="w-3/4 h-8 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          <div className="w-24 h-1 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Style Result Card Skeleton */}
        <Card className="p-6 bg-white shadow-sm">
          <div className="space-y-4">
            <div className="w-full max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 animate-pulse"></div>
            </div>

            <div className="flex gap-4">
              <div className="w-32 h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Cards Skeleton */}
        <Card className="p-6 bg-white shadow-sm">
          <div className="space-y-4">
            <div className="w-1/3 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultSkeleton;
