"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
      if (data.warning) {
        toast.info(data.warning);
      } else {
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-stone-200 bg-stone-50 group">
          <Image
            src={value}
            alt="Uploaded preview"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-red-700 transition-colors"
            >
              <X className="w-4 h-4" /> Remove Image
            </button>
          </div>
        </div>
      ) : (
        <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50/50 hover:bg-stone-50 hover:border-[#BE2320]/50 transition-colors cursor-pointer group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-[#BE2320] animate-spin mb-2" />
            ) : (
              <Upload className="w-8 h-8 text-stone-400 group-hover:text-[#BE2320] mb-2 transition-colors" />
            )}
            <p className="text-sm font-medium text-stone-700">
              {isUploading ? "Uploading image..." : "Click or drag image to upload"}
            </p>
            <p className="text-xs text-stone-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};
