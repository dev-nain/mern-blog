import UserAvatar from "@/components/Common/user-avatar";
import { MainContent, PageLayout } from "@/components/Layout";
import { withAuth } from "@/components/Layout/protected-route";
import { useGetBlogBySlug } from "@/lib/queries";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import { BlogSkeleton } from "@/components/Common/skeleton-loaders";

const Page = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [htmlstring, setHtmlString] = useState("");
  const { data, isLoading, error } = useGetBlogBySlug(params.slug!);
  const editor = useCreateBlockNote();

  useEffect(() => {
    (async () => {
      if (!data) return;
      let blocks;
      try {
        blocks = JSON.parse(data.data.content || "");
      } catch (err) {
        throw new Error("Invald Story content", { cause: err });
      }
      const html = await editor.blocksToFullHTML(blocks);
      setHtmlString(html);
    })();
  }, [data]);

  if (isLoading) {
    return (
      <PageLayout>
        <MainContent className="py-4 max-w-5xl mx-auto">
          <BlogSkeleton />
        </MainContent>
      </PageLayout>
    );
  }

  if (!data || error) {
    navigate("/not-found");
    return null;
  }

  const blog = data.data;

  return (
    <PageLayout>
      <MainContent className="py-4 max-w-5xl mx-auto">
        <section className="space-y-8">
          <img
            src={blog.thumbnail}
            alt=""
            className="rounded-4xl w-full aspect-video max-h-[calc(100vh-6rem)]"
          />
          <h1 className="text-3xl px-10 lg:text-5xl text-center font-semibold text-zinc-900">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center text-gray-600">
            <UserAvatar user={blog.author} size={10} />
            <span className="mx-3 block font-bold text-slate-500">·</span>

            <span>{blog.readingTime.text}</span>
            <span className="mx-3 block font-bold text-slate-500">·</span>
            <span>{format(new Date(blog.publishedAt), "MMM dd, yyyy")}</span>
          </div>

          <div dangerouslySetInnerHTML={{ __html: htmlstring }} />
        </section>
      </MainContent>
    </PageLayout>
  );
};

const BlogPage = withAuth(Page);

export default BlogPage;
