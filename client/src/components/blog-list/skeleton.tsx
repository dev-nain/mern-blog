const BlogCardSkeleton = () => {
  return (
    <article className="flex gap-x-16 pb-8 animate-pulse">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>

        <div className="mb-2">
          <div className="h-6 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        </div>

        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-6"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-6"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div className="size-36 bg-gray-300 flex-shrink-0 rounded"></div>
    </article>
  );
};

export const BlogListSkeleton = ({ length = 5 }) => {
  return Array.from({ length }).map((_, i) => (
    <li key={i}>
      <BlogCardSkeleton />
    </li>
  ));
};
