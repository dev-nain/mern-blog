import { useState } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";

interface TagsInputProps {
  placeholder?: string;
  maxTags?: number;
  onTagsChange?: (tags: string[]) => void;
  initialTags?: string[];
}

export default function TagsInput({
  placeholder = "Add a tag...",
  maxTags = 5,
  onTagsChange,
  initialTags = [],
}: TagsInputProps) {
  const [tagsSet, setTagsSet] = useState<Set<string>>(new Set(initialTags));
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag || tagsSet.has(trimmedTag) || tagsSet.size >= maxTags)
      return;

    const updatedSet = new Set(tagsSet);
    updatedSet.add(trimmedTag);
    setTagsSet(updatedSet);
    onTagsChange?.(Array.from(updatedSet));
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    const tagsArray = Array.from(tagsSet);
    const tagToRemove = tagsArray[indexToRemove];
    if (!tagToRemove) return;

    const updatedSet = new Set(tagsArray.filter((_, i) => i !== indexToRemove));
    setTagsSet(updatedSet);
    onTagsChange?.(Array.from(updatedSet));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tagsSet.size > 0) {
      removeTag(tagsSet.size - 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) addTag(inputValue);
  };

  const tags = Array.from(tagsSet);
  const isMaxReached = tagsSet.size >= maxTags;

  return (
    <>
      <div className="min-h-[2.5rem] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-within:ring focus-within:ring-green-700 focus-within:border-green-700">
        <div className="flex flex-wrap gap-1 items-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="cursor-pointer inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label={`Remove ${tag} tag`}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          ))}
          {!isMaxReached && (
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleInputBlur}
              placeholder={tags.length === 0 ? placeholder : ""}
              className="flex-1 min-w-[120px] outline-none bg-transparent text-sm placeholder-gray-400"
            />
          )}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>
          {tags.length} / {maxTags} tags
        </span>
        {isMaxReached && (
          <span className="text-amber-600 font-medium">
            Maximum tags reached
          </span>
        )}
      </div>
    </>
  );
}
