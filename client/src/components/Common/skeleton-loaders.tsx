export const BlogSkeleton = () => {
  return (
    <section className="space-y-8">
      {/* Image skeleton */}
      <div className="rounded-4xl w-full aspect-video max-h-[calc(100vh-6rem)] bg-gray-200 animate-pulse" />

      {/* Title skeleton */}
      <div className="px-10 flex justify-center">
        <div className="h-8 lg:h-12 bg-gray-200 animate-pulse rounded-lg w-3/4 max-w-2xl" />
      </div>

      {/* Meta info skeleton */}
      <div className="flex items-center justify-center gap-3">
        {/* Avatar skeleton */}
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />

        {/* Separator */}
        <span className="block font-bold text-slate-300">·</span>

        {/* Reading time skeleton */}
        <div className="h-4 bg-gray-200 animate-pulse rounded w-16" />

        {/* Separator */}
        <span className="block font-bold text-slate-300">·</span>

        {/* Date skeleton */}
        <div className="h-4 bg-gray-200 animate-pulse rounded w-20" />
      </div>
    </section>
  );
};
