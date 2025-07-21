import { getAllBlogs, getBlog } from "@/services/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

export const useGetBlogBySlug = (slug: string) =>
  useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlog(slug),
  });
