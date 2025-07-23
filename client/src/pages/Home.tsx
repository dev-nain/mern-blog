import {
  MainContent,
  PageLayout,
  RightSidebar,
} from "@/components/Layout/index.tsx";
import { useGetAllBlogs } from "@/lib/queries.ts";
import BlogList from "@/components/blog-list/list";
import { withAuth } from "@/components/Layout/protected-route";
import { useMemo } from "react";
import { TabsList } from "@/components/Common/tab-list";
import { useNavigate, useSearchParams } from "react-router";

const Page = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    useGetAllBlogs();

  const blogs = useMemo(
    () => data?.pages.map((page) => [...page.data]).flat() || [],
    [data?.pages]
  );

  const activeTab = searchParams.get("feed") || "foryou";
  const handleTabChange = (tabId: string) => navigate(`?feed=${tabId}`);

  return (
    <PageLayout>
      <MainContent className="max-w-3xl mx-auto space-y-8 px-10 py-6">
        <TabsList
          tabs={[
            { id: "foryou", label: "For You" },
            { id: "following", label: "Following" },
          ]}
          activeTabId={activeTab}
          onTabClick={handleTabChange}
        />
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
