import type { Blog } from "@/services/types";
import { Heart, MessageCircle, Bookmark, ClockIcon } from "lucide-react";
import { Button } from "../Common/Button";
import { getDateDistance } from "@/lib/date-utils";
import { Link } from "react-router";

type Props = {
  blog: Blog;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <article className="flex gap-x-16 pb-8">
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
          <img
            className="w-5 h-5 bg-gray-300 rounded-full"
            src={blog.author.avatar}
            alt={`${blog.author.name} avatar`}
          />
          <span>{blog.author.name}</span>
        </div>

        <Link to={`/@${blog.author.username}/${blog.slug}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
            {blog.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">{blog.summary}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ClockIcon className="size-4" />
              {blog.publishedAt && (
                <span>{getDateDistance(blog.publishedAt)}</span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 fill-current" />
              <span>10</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>2</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant={"naked"} size={"sm"}>
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="size-36 bg-gray-200 flex-shrink-0">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
    </article>
  );
};

export default BlogCard;
