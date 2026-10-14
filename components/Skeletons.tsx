/** Data আসার আগে যে ধূসর "shimmer" বক্সগুলো দেখায় (loading state) */

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex gap-3">
        <div className="skeleton size-12 !rounded-xl" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-24" />
        </div>
        <div className="skeleton h-6 w-16 !rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="container-page flex flex-col gap-6 py-6" aria-busy="true" aria-label="লোড হচ্ছে">
      <div className="skeleton h-[283px] !rounded-3xl" />
      <div className="space-y-3">
        <div className="skeleton h-7 w-48" />
        <GridSkeleton />
      </div>
      <div className="space-y-3">
        <div className="skeleton h-7 w-48" />
        <GridSkeleton />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="container-page flex flex-col gap-6 py-6" aria-busy="true" aria-label="লোড হচ্ছে">
      <div className="skeleton h-[94px] !rounded-2xl" />
      <div className="skeleton h-[66px] !rounded-2xl" />
      <GridSkeleton count={6} />
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="container-page flex flex-col gap-6 py-6" aria-busy="true" aria-label="লোড হচ্ছে">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-[174px] !rounded-2xl" />
      <div className="skeleton h-[560px] !rounded-2xl" />
    </div>
  );
}
