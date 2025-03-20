import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        {/* Employee Header Skeleton */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Skeleton className="h-32 w-32 rounded-full" />

          <div className="flex-1">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-36" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <Skeleton className="h-10 w-full mb-6" />

        {/* Content Skeleton */}
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  )
}

