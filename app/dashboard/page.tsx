"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

import { MaterialsList } from "@/components/dashboard/materials-list";
import { MaterialsSkeleton } from "@/components/dashboard/materials-skeleton";
import { LoadingIcon } from "@/components/ui/custom";

import { useAuth } from "@/lib/auth-context";

export default function Dashboard() {
  const { user, status } = useAuth();
  const router = useRouter();

  // const [searchValue, setSearchValue] = useState("");
  // const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (!user) return null;

  return (
    <div className="container mx-auto py-6">
      <div className="border-none shadow-none space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold leading-none tracking-tight font-ubuntu">
              Materials Dashboard
            </h1>
            <p className="text-lg text-muted-foreground font-montserrat">
              Browse through our collection of materials
            </p>
          </div>
          {/* 
          <SearchInput
            placeholder="Search..."
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          */}
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto py-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <MaterialsSkeleton key={index} />
            ))}
          </div>
        )}

        <div>
          <Suspense fallback={`Loading...`}>
            <MaterialsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
