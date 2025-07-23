import { useGetBlogBySlug } from "@/lib/queries";
import { useCreateBlockNote } from "@blocknote/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { BlogSkeleton } from "../Common/skeleton-loaders";
import UserAvatar from "../Common/user-avatar";
import { MarkdownRenderer } from "./markdown-renderer";

export function BlogContent() {
  const params = useParams();
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState("");
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
      const markdown = await editor.blocksToMarkdownLossy(blocks);

      setMarkdownContent(markdown);
    })();
  }, [data]);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  if (!data || error) {
    navigate("/not-found");
    return null;
  }

  const blog = data.data;

  return (
    <section className="space-y-8 prose prose-pre:bg-transparent prose-pre:p-0 max-w-full">
      <img
        src={blog.thumbnail || "/placeholder.svg"}
        alt=""
        className="rounded-2xl w-full aspect-video max-h-[calc(100vh-6rem)]"
      />
      <h1 className="text-center">{blog.title}</h1>
      <div className="flex items-center justify-center text-gray-600">
        <UserAvatar user={blog.author} size={10} />
        <span className="mx-3 block font-bold text-slate-500">·</span>
        <span>{blog.readingTime.text}</span>
        <span className="mx-3 block font-bold text-slate-500">·</span>
        <span>{format(new Date(blog.publishedAt), "MMM dd, yyyy")}</span>
      </div>
      <div className="prose max-w-full">
        <MarkdownRenderer markdown={markdownContent} />
      </div>
    </section>
  );
}
