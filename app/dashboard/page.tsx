"use client";

import { MaterialsList } from "@/components/dashboard/materials-list";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Materials</h1>
        <p className="text-muted-foreground">
          Browse through our collection of materials
        </p>
        <Separator className="my-2" />
        <MaterialsList />
      </div>
    </main>
  );
}
