"use client";

import { MaterialsList } from "@/components/dashboard/materials-list";
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
              <p>
                <span>Loading... </span>
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
