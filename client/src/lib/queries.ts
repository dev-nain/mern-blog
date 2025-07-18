import { getAllBlogs } from "@/services/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllBlogs = () =>
  useInfiniteQuery({
    queryKey: ["all", "blogs"],
    queryFn: ({ pageParam }) => getAllBlogs(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.totalItems / lastPage.limit);
      if (lastPage.page >= totalPages) {
        return undefined;
      }
      return lastPage.page + 1;
    },
  });
