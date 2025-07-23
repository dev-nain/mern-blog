import type { Blog } from "@/services/types";
import { Heart, MessageCircle, Bookmark, ClockIcon } from "lucide-react";
import { Button } from "../Common/Button";
import { getDateDistance } from "@/lib/date-utils";
import { Link } from "react-router";
import UserAvatar from "../Common/user-avatar";

type Props = {
  blog: Blog;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <article className="flex gap-x-16 pb-8">
      <div className="flex-1">
        <UserAvatar
          size={5}
          user={blog.author}
          className="mb-4 space-x-1"
          textClass="text-gray-600 font-medium text-sm"
        />

        <Link to={`/blog/${blog.slug}`}>
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
          onError={(e) => (e.currentTarget.src = "/placeholder-image")}
        />
      </div>
    </article>
  );
};

export default BlogCard;
