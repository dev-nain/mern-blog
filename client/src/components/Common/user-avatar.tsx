import { cn } from "@/lib/class-name";
import type { User } from "@/services/types";
import { useNavigate, Link } from "react-router";

interface UserAvatarProps {
  user: User;
  size?: number;
  showViewProfile?: boolean;
  className?: string;
  textClass?: string;
}

const UserAvatar = ({
  user,
  size = 10,
  showViewProfile = false,
  className,
  textClass,
}: UserAvatarProps) => {
  const navigate = useNavigate();

  const getSizeClass = (size: number) => `w-${size} h-${size}`;

  const avatarSize = getSizeClass(size);

  return (
    <Link
      to={`/profile/${user.username}`}
      className={cn("flex items-center space-x-3", className)}
    >
      <div
        className={`${avatarSize} rounded-full text-white font-medium text-xl flex items-center justify-center`}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className={cn("font-semibold text-zinc-950", textClass)}>
          {user.name}
        </div>
        {showViewProfile && (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/profile/${user.username}`);
            }}
            className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            View profile
          </button>
        )}
      </div>
    </Link>
  );
};

export default UserAvatar;
