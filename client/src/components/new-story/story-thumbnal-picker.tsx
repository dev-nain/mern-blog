import React, { useEffect, useRef, useState } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "../Common/Button";
import { IMAGE_SCHEMA } from "@/validations";
import toast from "react-hot-toast";

const StoryThumbnailPicker = ({
  onChange,
  value,
}: {
  onChange: (file: File) => void;
  value: File | null;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { success, error } = IMAGE_SCHEMA.safeParse(file);
    if (!success) {
      toast.error(error.flatten().formErrors.join(", "));
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    onChange(file);
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (value) {
      const fileUrl = URL.createObjectURL(value);
      setPreview(fileUrl);

      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [value]);

  return (
    <div className="font-inter">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Story thumbnail"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Button variant="secondary" onClick={handleClick}>
              <Upload className="h-4 w-4 mr-2" />
              Change Image
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Click to upload thumbnail</p>
          <p className="text-gray-400 text-sm mt-1">Recommended: 1200x630px</p>
        </div>
      )}
    </div>
  );
};

export default StoryThumbnailPicker;
