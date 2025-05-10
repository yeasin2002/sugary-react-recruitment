"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";

interface MaterialsSkeletonProps {
  count?: number;
}

export function MaterialsSkeleton({ count = 8 }: MaterialsSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <Card className="overflow-hidden">
            <Skeleton className="h-80 w-full" />
            <CardContent className="p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Skeleton className="h-4 w-1/4" />
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
}
