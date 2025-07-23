import { MainContent, PageLayout } from "@/components/Layout";
import { withAuth } from "@/components/Layout/protected-route";
import { AnimatePresence } from "motion/react";
import { useScrollPosition } from "@/lib/hooks";
import { ActionBar } from "@/components/blog/action-bar";
import { BlogContent } from "@/components/blog/blog-content";

const Page = () => {
  const scrollYPosition = useScrollPosition("main-content-container");

  return (
    <PageLayout className="relative">
      <MainContent
        id="main-content-container"
        className="py-4 max-w-5xl lg:max-w-7xl mx-auto space-y-8"
      >
        <BlogContent />

        <AnimatePresence>
          {scrollYPosition > 50 && <ActionBar />}
        </AnimatePresence>
      </MainContent>
    </PageLayout>
  );
};

const BlogPage = withAuth(Page);

export default BlogPage;
