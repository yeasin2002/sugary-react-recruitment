'use client';

import { useEffect, useRef, useState } from 'react';
import { MaterialCard } from './material-card';
import { MaterialsSkeleton } from './materials-skeleton';
import { useMaterials } from '@/hooks/use-materials';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MaterialsList() {
  const { 
    materials, 
    isLoading, 
    error, 
    loadMore, 
    hasMore, 
    totalCount 
  } = useMaterials();
  
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          setIsLoadingMore(true);
          await loadMore();
          setIsLoadingMore(false);
        }
      },
      { threshold: 0.5 }
    );

    const currentObserverTarget = observerTarget.current;

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [hasMore, isLoading, isLoadingMore, loadMore]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load materials. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && materials.length === 0 ? (
          <MaterialsSkeleton count={8} />
        ) : (
          <>
            {materials.map((material) => (
              <MaterialCard key={material.Id} material={material} />
            ))}
            {isLoadingMore && <MaterialsSkeleton count={4} />}
          </>
        )}
      </div>
      
      {materials.length > 0 && (
        <div className="text-center text-sm text-muted-foreground py-4">
          Showing {materials.length} of {totalCount} materials
        </div>
      )}
      
      {hasMore && (
        <div 
          ref={observerTarget} 
          className="h-8 flex items-center justify-center"
        >
          {isLoadingMore && (
            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
          )}
        </div>
      )}
      
      {!hasMore && materials.length > 0 && (
        <div className="text-center text-sm text-muted-foreground py-4">
          No more materials to load
        </div>
      )}
    </div>
  );
}