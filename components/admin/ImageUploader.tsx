"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  fallbackUrl?: string;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  fallbackUrl,
  helperText,
}) => {
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
        <div className="space-y-2">
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-stone-200 bg-stone-50 group">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <label className="px-3 py-1.5 bg-white text-stone-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-stone-100 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" /> Replace
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-red-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
          <span className="text-[11px] text-emerald-600 font-mono-data flex items-center gap-1">
            ✓ Custom image active
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50/60 hover:bg-stone-50 hover:border-[#BE2320]/60 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center justify-center pt-4 pb-4 px-4 text-center">
              {isUploading ? (
                <Loader2 className="w-7 h-7 text-[#BE2320] animate-spin mb-2" />
              ) : (
                <Upload className="w-7 h-7 text-stone-400 group-hover:text-[#BE2320] mb-2 transition-colors" />
              )}
              <p className="text-xs font-medium text-stone-700">
                {isUploading ? "Uploading image..." : "Upload custom cover image"}
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          {fallbackUrl && (
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
              <div className="relative w-12 h-10 rounded-md overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                <Image
                  src={fallbackUrl}
                  alt="Default fallback preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-stone-700 truncate">
                  Default Generic Cover Applied
                </p>
                <p className="text-[11px] text-stone-500 truncate">
                  This generic image will be displayed until you upload a custom one.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {helperText && <p className="text-xs text-stone-500">{helperText}</p>}
    </div>
  );
};
