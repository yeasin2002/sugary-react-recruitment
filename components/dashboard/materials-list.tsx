"use client";

import { fetchMaterials } from "@/helper/fetch-materials";
import type { Material } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { MaterialCard } from "./material-card";

export function MaterialsList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 500px 0px",
  });

  const MoreMaterialsLoaderFn = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetchMaterials(skip, limit);

      if (response.Materials.length === 0) {
        setHasMore(false);
        return;
      }

      setMaterials((prev) => [...prev, ...response.Materials]);
      setSkip((prevSkip) => prevSkip + limit);

      if (response.RemainingCount <= 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading materials:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadMoreMaterials = useCallback(MoreMaterialsLoaderFn, [
    hasMore,
    isLoading,
    skip,
  ]);

  useEffect(() => {
    loadMoreMaterials();
  }, [loadMoreMaterials]);

  useEffect(() => {
    if (inView) {
      loadMoreMaterials();
    }
  }, [inView, loadMoreMaterials]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {materials.map((material) => (
          <MaterialCard key={material.Id} material={material} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-pulse text-center">
            Loading more materials...
          </div>
        </div>
      )}

      {!isLoading && hasMore && <div ref={ref} className="h-10" />}

      {!hasMore && materials.length > 0 && (
        <div className="text-center my-8 text-gray-500">
          No more materials to load
        </div>
      )}
    </div>
  );
}
