"use client";

import { fetchMaterials } from "@/helper/fetch-materials";
import type { Material } from "@/lib/types";
import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { MaterialCard } from "./material-card";
import { MaterialsSkeleton } from "./materials-skeleton";

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

  const loadMoreMaterials = useCallback(async () => {
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
  }, [hasMore, isLoading, skip]);

  useEffect(() => {
    if (inView) {
      loadMoreMaterials();
    }
  }, [inView, loadMoreMaterials]);

  return (
    <div className="pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[80vh]">
        {materials.map((material) => (
          <MaterialCard key={material.Id} material={material} />
        ))}

        <AnimatePresence>
          {isLoading &&
            Array.from({ length: limit }).map((_, index) => (
              <MaterialsSkeleton key={index} />
            ))}
        </AnimatePresence>
      </div>

      {!isLoading && hasMore && <div ref={ref} className="h-10" />}
    </div>
  );
}
