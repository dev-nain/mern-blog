import {
  MainContent,
  PageLayout,
  RightSidebar,
} from "@/components/Layout/index.tsx";
import { useGetAllBlogs } from "@/lib/queries.ts";
import BlogList from "@/components/blog-list/list";
import { withAuth } from "@/components/Layout/protected-route";
import { useMemo } from "react";

const Page = () => {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    useGetAllBlogs();

  const blogs = useMemo(
    () => data?.pages.map((page) => [...page.data]).flat() || [],
    [data?.pages]
  );

  return (
    <PageLayout>
      <MainContent>
        <BlogList
          blogs={blogs}
          hasMore={hasNextPage}
          onEndReached={fetchNextPage}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </MainContent>
      <RightSidebar></RightSidebar>
    </PageLayout>
  );
};

const HomePage = withAuth(Page);

export default HomePage;
