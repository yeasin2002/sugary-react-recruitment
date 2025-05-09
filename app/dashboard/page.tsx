"use client";

import { MaterialsList } from "@/components/dashboard/materials-list";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

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

  if (!user) return null;

  return (
    <div className="container mx-auto py-6">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Materials Dashboard</CardTitle>
          <CardDescription>
            Browse through our collection of materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p>Loading materials...</p>}>
            <MaterialsList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
