import type { Blog } from "@/services/types";
import { useEffect } from "react";
import BlogCard from "./blog-card";
import { useIntersectionObserver } from "usehooks-ts";
import { BlogListSkeleton } from "./skeleton";
import { EmptyBlogList } from "../Common/empty-state";

type Props = {
  blogs: Blog[];
  onEndReached?: () => void;
  isFetching?: boolean;
  isLoading?: boolean;
  hasMore?: boolean;
  showFooter?: boolean;
};

const BlogList = ({
  blogs,
  onEndReached,
  isFetching,
  hasMore,
  isLoading,
  showFooter = true,
}: Props) => {
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (!onEndReached) return;

    if (isIntersecting && !isFetching && hasMore) {
      onEndReached();
    }
  }, [isIntersecting, isFetching, hasMore, onEndReached]);

  if (!isLoading && blogs.length === 0) {
    return <EmptyBlogList />;
  }

  function renderBlogs() {
    return blogs?.map((blog) => (
      <li key={blog._id}>
        <BlogCard blog={blog} />
      </li>
    ));
  }

  return (
    <>
      <ul className="space-y-8 divide-y-1 divide-gray-200">
        {isLoading ? <BlogListSkeleton /> : renderBlogs()}
        {hasMore && isFetching && <BlogListSkeleton length={2} />}
        {!hasMore && showFooter && (
          <p className="text-center text-zinc-900 font-semibold">
            You're all caught up
          </p>
        )}
      </ul>
      <div ref={ref} />
    </>
  );
};

export default BlogList;
