"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import { createBlogPostAction, updateBlogPostAction } from "@/app/admin/actions";
import { BlogPostInput } from "@/lib/validations/blogPost";
import { ExternalLink, Save, Loader2, FileText } from "lucide-react";

interface BlogPostFormProps {
  initialData?: any;
}

const CATEGORY_OPTIONS = [
  "Seasonal Advice",
  "Prevention Tips",
  "Tenant Guides",
  "Eco-Friendly IPM",
  "Commercial Safety",
  "General News",
];

export const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<BlogPostInput>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    featuredImage: initialData?.featuredImage || null,
    category: initialData?.category || "Seasonal Advice",
    tags: initialData?.tags || [],
    authorName: initialData?.authorName || "K2PC Specialist",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    status: initialData?.status || "DRAFT",
    publishedAt: initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  const [autoSlug, setAutoSlug] = useState(!initialData);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (autoSlug) {
        updated.slug = val
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-");
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent, viewLive = false) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      if (initialData?.id) {
        await updateBlogPostAction(initialData.id, formData);
        toast.success("Blog post updated successfully");
      } else {
        await createBlogPostAction(formData);
        toast.success("Blog post published successfully");
      }

      router.refresh();

      if (viewLive && formData.slug) {
        window.open(`/blog/${formData.slug}`, "_blank");
      } else {
        router.push("/admin/blog");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#BE2320]" />
            {initialData ? "Edit Blog Post" : "Write New Blog Post"}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Create advice articles and pest prevention guides for homeowners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {initialData?.slug && (
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5 border border-stone-300"
            >
              <ExternalLink className="w-4 h-4" /> Save & View Live
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-medium rounded-xl shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {initialData ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Content */}
        <div className="lg:col-span-2 space-y-6">
          <FormField label="Article Title" required>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Saskatchewan Fall Rodent Migration: 5 Prevention Steps"
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="URL Slug" required hint="Unique URL identifier for the article">
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => {
                setAutoSlug(false);
                setFormData((p) => ({ ...p, slug: e.target.value }));
              }}
              placeholder="e.g. fall-rodent-migration-saskatchewan"
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320] font-mono"
            />
          </FormField>

          <FormField label="Article Body Content (Rich Text)" required>
            <RichTextEditor
              value={formData.content}
              onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
              placeholder="Write the full article content here..."
            />
          </FormField>
        </div>

        {/* Right Col: Settings & Image */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
              Publishing Options
            </h3>

            <FormField label="Status">
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, status: e.target.value as "DRAFT" | "PUBLISHED" }))
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </FormField>

            <FormField label="Category">
              <select
                value={formData.category || "Seasonal Advice"}
                onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Author Name">
              <input
                type="text"
                value={formData.authorName || ""}
                onChange={(e) => setFormData((p) => ({ ...p, authorName: e.target.value }))}
                placeholder="e.g. Dr. Marcus Vance"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>

            <FormField label="Publish Date">
              <input
                type="date"
                value={formData.publishedAt || ""}
                onChange={(e) => setFormData((p) => ({ ...p, publishedAt: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>

            <FormField label="Tags">
              <TagInput
                tags={formData.tags || []}
                onChange={(tags) => setFormData((p) => ({ ...p, tags }))}
                placeholder="Add tag (e.g. Mice, Saskatoon)..."
              />
            </FormField>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
            <h3 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
              Featured Image
            </h3>
            <ImageUploader
              value={formData.featuredImage}
              onChange={(url) => setFormData((p) => ({ ...p, featuredImage: url }))}
            />
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
              SEO Optimization
            </h3>

            <FormField
              label="Meta Title"
              hint={`${formData.metaTitle?.length || 0}/70 characters`}
            >
              <input
                type="text"
                maxLength={70}
                value={formData.metaTitle || ""}
                onChange={(e) => setFormData((p) => ({ ...p, metaTitle: e.target.value }))}
                placeholder="Title tag for search engines..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>

            <FormField
              label="Meta Description"
              hint={`${formData.metaDescription?.length || 0}/160 characters`}
            >
              <textarea
                rows={3}
                maxLength={160}
                value={formData.metaDescription || ""}
                onChange={(e) => setFormData((p) => ({ ...p, metaDescription: e.target.value }))}
                placeholder="Meta snippet for search engines..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>
          </div>
        </div>
      </div>
    </form>
  );
};
