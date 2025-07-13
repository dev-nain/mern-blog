import { cn } from "@/lib/class-name";
import type React from "react";

import { useState } from "react";

export default function DescriptionInput({
  label,
  id,
  onChange,
  value,
  error
}: {
  onChange: (text: string) => void;
  value: string;
  label: string;
  id: string;
  error?: string
}) {
  const [description, setDescription] = useState(value);
  const maxLength = 200;
  const currentLength = description.length;
  const isNearLimit = currentLength > maxLength * 0.8;
  const isOverLimit = currentLength > maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setDescription(e.target.value);
      onChange(e.target.value);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          id={id}
          value={description}
          onChange={handleChange}
          placeholder="Enter a brief description or summary..."
          className={cn(
            "w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-1  transition-colors",
            {
              "border-red-500 focus:ring-red-500 focus:border-red-500":
                isOverLimit,
              "border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500":
                isNearLimit,
              "border-gray-300 focus:ring-green-700 focus:border-green-700":
                !isNearLimit,
            }
          )}
          rows={4}
        />
        <div className="flex justify-between items-center text-sm">
          <p className="text-red-600 text-sm">
            {error}
          </p>
          <span
            className={`font-medium ${
              isOverLimit
                ? "text-red-600"
                : isNearLimit
                ? "text-yellow-600"
                : "text-gray-600"
            }`}
          >
            {currentLength}/{maxLength} characters
          </span>
        </div>
      </div>
    </>
  );
}
