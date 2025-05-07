import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left side - Photo skeleton with yellow background */}
      <div className="relative w-1/2 bg-yellow-300 flex items-center justify-center">
        <div className="absolute top-0 right-0 h-16 w-16 bg-yellow-400"></div>
        <div className="absolute bottom-0 left-0 h-16 w-16 bg-yellow-400"></div>
        <div className="w-4/5 h-4/5 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-none bg-yellow-200/50" />
        </div>
      </div>

      {/* Right side - User information skeleton */}
      <div className="w-1/2 bg-white p-12 flex items-center">
        <div className="w-full space-y-10">
          {/* Name section skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-gray-200" />
            <Skeleton className="h-9 w-48 bg-gray-300" />
          </div>

          {/* Position section skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-gray-200" />
            <Skeleton className="h-8 w-36 bg-gray-300" />
          </div>

          {/* Followers/Following section skeleton */}
          <div className="flex space-x-12">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-8 w-12 bg-gray-300" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-8 w-12 bg-gray-300" />
            </div>
          </div>

          {/* Team section skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-12 bg-gray-200" />
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Additional user info skeleton */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12 bg-gray-200" />
              <Skeleton className="h-5 w-40 bg-gray-300" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-gray-200" />
              <Skeleton className="h-5 w-32 bg-gray-300" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-gray-200" />
              <Skeleton className="h-5 w-24 bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
