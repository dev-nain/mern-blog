import type { ReactNode } from "react";
import { LinkButton } from "./Button";

type EmptyListProps = {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

const EmptyList = ({
  icon,
  title = "No items found",
  description = "It looks like there's nothing here yet.",
  action,
  className = "",
}: EmptyListProps) => {
  return (
    <div
      className={`flex flex-col items-center px-4 text-center w-full ${className}`}
    >
      {icon && <div className="mb-6 text-gray-400">{icon}</div>}

      <h3 className="text-xl font-semibold text-zinc-900 mb-2">{title}</h3>

      <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
        {description}
      </p>

      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyList;

export const EmptyBlogList = () => (
  <EmptyList
    icon={
      <svg
        className="w-16 h-16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    }
    title="No blog posts yet"
    description="Start sharing your thoughts and ideas with the world. Create your first blog post to get started."
    action={<LinkButton to={"/new-story"}>Write your first blog</LinkButton>}
  />
);
