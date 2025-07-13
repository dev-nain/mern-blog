import { cn } from "@/lib/class-name";
import React from "react";

function StoryTitleInput({
  onChange,
  value,
  error,
}: {
  onChange: (text: string) => void;
  value: string;
  error?: string;
}) {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const input = e.target;
    input.style.height = input.scrollHeight + "px";
    onChange(input.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.code === "13") {
      event.preventDefault();
    }
  };

  return (
    <>
      <textarea
        placeholder="Title.."
        className={cn(
          "border-l border-l-gray-100 pl-4 text-zinc-800 text-4xl font-medium w-full outline-none resize-none leading-tight placeholder:opacity-60 mb-0",
          {
            "border-l-red-300": error,
          }
        )}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
      />
      <p className="text-red-600 text-xs">{error}</p>
    </>
  );
}

export default StoryTitleInput;
