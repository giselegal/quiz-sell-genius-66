
import React from 'react';

const ResultSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffaf7] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl relative z-10">
        {/* Header Loading */}
        <div className="text-center mb-8">
          <div className="h-8 bg-[#B89B7A]/20 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-[#B89B7A]/10 rounded w-48 mx-auto animate-pulse"></div>
        </div>

        {/* Main Content Loading */}
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border border-[#B89B7A]/30 rounded-xl p-6 sm:p-8 md:p-10 mb-12">
          <div className="space-y-6">
            {/* Title skeleton */}
            <div className="h-6 bg-[#B89B7A]/20 rounded w-3/4 mx-auto animate-pulse"></div>
            
            {/* Progress bar skeleton */}
            <div className="max-w-md mx-auto">
              <div className="h-3 bg-[#B89B7A]/20 rounded-full animate-pulse"></div>
            </div>

            {/* Content grid skeleton */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="h-4 bg-[#B89B7A]/20 rounded animate-pulse"></div>
                <div className="h-4 bg-[#B89B7A]/20 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-[#B89B7A]/20 rounded w-4/6 animate-pulse"></div>
              </div>
              <div className="h-64 bg-[#B89B7A]/20 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Additional sections loading */}
        <div className="space-y-8">
          <div className="h-32 bg-white/90 rounded-xl border border-[#B89B7A]/20 animate-pulse"></div>
          <div className="h-24 bg-white/90 rounded-xl border border-[#B89B7A]/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ResultSkeleton;
