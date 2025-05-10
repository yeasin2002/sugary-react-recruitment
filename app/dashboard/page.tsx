"use client";

import { MaterialsList } from "@/components/dashboard/materials-list";
import { MaterialsSkeleton } from "@/components/dashboard/materials-skeleton";
import { LoadingIcon } from "@/components/ui/custom/loading";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Suspense } from "react";

export default function Dashboard() {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {Array.from({ length: 12 }).map((_, index) => (
          <MaterialsSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto py-6">
      <div className="border-none shadow-none space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold leading-none tracking-tight font-ubuntu">
            Materials Dashboard
          </h1>
          <p className="text-lg text-muted-foreground font-montserrat">
            Browse through our collection of materials
          </p>
        </div>

        <div>
          <Suspense
            fallback={
              <p className="animate-pulse text-black dark:text-white">
                <span>Loading...</span>
                <LoadingIcon />
              </p>
            }
          >
            <MaterialsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
