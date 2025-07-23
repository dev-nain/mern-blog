import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/class-name";

export interface Tab {
  id: string;
  label: string;
}

interface CustomTabsProps {
  tabs: Tab[];
  activeTabId?: string;
  onTabClick: (tabId: string) => void;
  className?: string;
}

export function TabsList({
  tabs,
  activeTabId,
  onTabClick,
  className,
}: CustomTabsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  React.useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [tabs]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center bg-white border-b border-gray-200",
        className
      )}
    >
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="cursor-pointer flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={cn(
                "relative flex-shrink-0 py-3 px-1 text-sm transition-colors whitespace-nowrap",
                "hover:text-gray-900",
                "cursor-pointer",
                activeTabId === tab.id ? "text-gray-900" : "text-gray-500"
              )}
            >
              {tab.label}
              {activeTabId === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="cursor-pointer flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
