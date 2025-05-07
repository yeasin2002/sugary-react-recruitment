'use client';

import { useState, useCallback, useEffect } from 'react';
import { Material } from '@/lib/types';
import { fetchMaterials } from '@/lib/api';

const ITEMS_PER_PAGE = 20;

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(0);
  const [tags, setTags] = useState<{ Id: number, Title: string }[]>([]);
  const [deliveryAreas, setDeliveryAreas] = useState<{ Id: number, Name: string }[]>([]);

  const hasMore = remainingCount > 0;

  const fetchInitialMaterials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMaterials(0, ITEMS_PER_PAGE);
      setMaterials(data.Materials);
      setTotalCount(data.TotalCount);
      setRemainingCount(data.RemainingCount);
      setTags(data.Tags || []);
      setDeliveryAreas(data.DeliveryAreas || []);
      setSkip(ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch materials'));
      console.error('Error fetching materials:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const data = await fetchMaterials(skip, ITEMS_PER_PAGE);
      setMaterials((prev) => [...prev, ...data.Materials]);
      setRemainingCount(data.RemainingCount);
      setSkip((prev) => prev + ITEMS_PER_PAGE);

      // Update tags and delivery areas if needed
      if (data.Tags && data.Tags.length > 0) {
        setTags((prev) => {
          const existingTagIds = new Set(prev.map(tag => tag.Id));
          const newTags = data.Tags.filter(tag => !existingTagIds.has(tag.Id));
          return [...prev, ...newTags];
        });
      }

      if (data.DeliveryAreas && data.DeliveryAreas.length > 0) {
        setDeliveryAreas((prev) => {
          const existingAreaIds = new Set(prev.map(area => area.Id));
          const newAreas = data.DeliveryAreas.filter(area => !existingAreaIds.has(area.Id));
          return [...prev, ...newAreas];
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more materials'));
      console.error('Error loading more materials:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, skip]);

  useEffect(() => {
    fetchInitialMaterials();
  }, [fetchInitialMaterials]);

  return {
    materials,
    isLoading,
    error,
    loadMore,
    hasMore,
    totalCount,
    remainingCount,
    tags,
    deliveryAreas,
  };
}