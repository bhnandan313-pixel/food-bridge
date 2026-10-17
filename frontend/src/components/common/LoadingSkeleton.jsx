import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white dark:bg-dark-card rounded-2xl p-5 h-[280px] animate-pulse border border-gray-100 dark:border-gray-800 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
            </div>
            <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
            </div>
            <div className="mt-auto h-11 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
          </div>
        );

      case 'stat':
        return (
          <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col animate-pulse h-[104px]">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          </div>
        );

      case 'list':
        return (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-800 gap-4 animate-pulse">
            <div className="flex items-start gap-4 w-full">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg shrink-0"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-24 sm:w-32"></div>
          </div>
        );

      default:
        return (
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse"></div>
        );
    }
  };

  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
}