import { motion } from "motion/react";
import type { Variants } from "motion";
import { NavLink } from "react-router";
import { Home, Users, Bookmark, FileText, X } from "lucide-react";
import { cn } from "@/lib/class-name";
import { AppLogo } from "./main-layout";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Users, label: "Following", href: "/me/following" },
  { icon: Bookmark, label: "Library", href: "/me/lists" },
  { icon: FileText, label: "Stories", href: "/me/stories/draft" },
] as const;

const sidebarVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const overlayVariants: Variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden h-full"
          onClick={onClose}
        />
      )}

      <motion.aside
        variants={isMobile ? sidebarVariants : {}}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
        className={cn(
          "top-0 left-0  w-64 bg-white border-r border-gray-200 z-50",
          isMobile ? "fixed h-full" : "sticky h-[calc(100vh-3.5rem)]",
          isMobile && "lg:relative lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {isMobile && (
            <div className="flex justify-between p-4 lg:hidden">
              <AppLogo />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <NavItem item={item} />
              ))}
            </ul>
          </nav>
        </div>
      </motion.aside>
    </>
  );
}

function NavItem({ item }: { item: (typeof navigationItems)[number] }) {
  return (
    <li key={item.label}>
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          cn(
            "flex items-center space-x-3 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors",
            {
              "bg-gray-100 text-zinc-900 fill-current": isActive,
            }
          )
        }
      >
        {({ isActive }) => (
          <>
            <item.icon
              className={cn("w-5 h-5", {
                "fill-zinc-900": isActive,
              })}
            />
            <span className="font-inter text-sm">{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}
