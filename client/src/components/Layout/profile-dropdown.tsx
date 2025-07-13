import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion";

import { Settings, BarChart3, LogOut, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context";
import type { User } from "@/services/types";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  showChevron?: boolean;
}

interface ProfileDropdownProps {
  user: User;
}

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

function maskEmail(email: string) {
  const [username, provider] = email.split("@");
  const maskedUsername =
    username.length <= 2
      ? username
      : username.slice(0, 2) + "*".repeat(username.length - 2);
  return `${maskedUsername}@${provider}`;
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      onClick: () => navigate("/me/setting"),
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: "Stats",
      onClick: () => navigate("/stats"),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-8 cursor-pointer rounded-full bg-pink-500 text-white font-medium text-lg flex items-center justify-center hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            {/* User Profile Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full text-white font-medium text-xl flex items-center justify-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <button
                    onClick={() => navigate(`/profile/${user.username}`)}
                    className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    View profile
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <span className="text-gray-500">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.showChevron && (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Sign Out Section */}
            <div className="border-t border-gray-100 py-2">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="cursor-pointer w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors text-gray-700"
              >
                <LogOut className="size-5 text-gray-500" />
                <div className="flex-1">
                  <div className="text-sm">Sign out</div>
                  <div className="text-xs text-gray-500">
                    {maskEmail(user.email)}
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
