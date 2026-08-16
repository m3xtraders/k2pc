"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createServiceAction, updateServiceAction } from "@/app/admin/actions";
import { ServiceInput } from "@/lib/validations/service";
import { getServiceCoverImage } from "@/lib/content/services";
import { ExternalLink, Save, Loader2, Bug } from "lucide-react";

interface ServiceFormProps {
  initialData?: any;
}

const ICON_OPTIONS = [
  { value: "ant", label: "Ant Icon" },
  { value: "rodent", label: "Rodent Icon" },
  { value: "cockroach", label: "Cockroach Icon" },
  { value: "bed-bug", label: "Bed Bug Icon" },
  { value: "wasp", label: "Wasp Icon" },
  { value: "spider", label: "Spider Icon" },
  { value: "shield", label: "Shield Icon" },
  { value: "building", label: "Building Icon" },
  { value: "home", label: "Home Icon" },
  { value: "calendar", label: "Calendar Icon" },
  { value: "bug", label: "General Bug Icon" },
];

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ServiceInput>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    icon: initialData?.icon || "bug",
    shortDescription: initialData?.shortDescription || "",
    content: initialData?.content || "",
    featuredImage: initialData?.featuredImage || null,
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    displayOrder: initialData?.displayOrder || 0,
    status: initialData?.status || "DRAFT",
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
        await updateServiceAction(initialData.id, formData);
        toast.success("Service updated successfully");
      } else {
        const created = await createServiceAction(formData);
        toast.success("Service created successfully");
      }

      router.refresh();

      if (viewLive && formData.slug) {
        window.open(`/services/${formData.slug}`, "_blank");
      } else {
        router.push("/admin/services");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <Bug className="w-5 h-5 text-[#BE2320]" />
            {initialData ? "Edit Service" : "Create New Service"}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Fill out service details, rich content, and SEO metadata.
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
            {initialData ? "Update Service" : "Publish Service"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <FormField label="Service Title" required>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Bed Bug Heat Treatment"
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="URL Slug" required hint="Unique URL identifier for the service page">
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => {
                setAutoSlug(false);
                setFormData((p) => ({ ...p, slug: e.target.value }));
              }}
              placeholder="e.g. bed-bug-heat-treatment"
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320] font-mono"
            />
          </FormField>

          <FormField label="Short Description" required hint="Brief summary shown on service cards">
            <textarea
              rows={3}
              required
              value={formData.shortDescription}
              onChange={(e) => setFormData((p) => ({ ...p, shortDescription: e.target.value }))}
              placeholder="Provide a concise 1-2 sentence description..."
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Full Service Description (Rich Text)" required>
            <RichTextEditor
              value={formData.content}
              onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
              placeholder="Detailed treatment process, signs of infestation, and guarantee details..."
            />
          </FormField>
        </div>

        {/* Right Col: Metadata, Status, Image */}
        <div className="space-y-6">
          {/* Status & Display Order Card */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
              Publish Settings
            </h3>

            <FormField label="Status">
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, status: e.target.value as "DRAFT" | "PUBLISHED" }))
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              >
                <option value="DRAFT">Draft (Invisible publicly)</option>
                <option value="PUBLISHED">Published (Live on site)</option>
              </select>
            </FormField>

            <FormField label="Display Order" hint="Lower numbers appear first">
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData((p) => ({ ...p, displayOrder: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>

            <FormField label="Icon Style">
              <select
                value={formData.icon || "bug"}
                onChange={(e) => setFormData((p) => ({ ...p, icon: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          {/* Service Cover Image Card */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-stone-900 border-b border-stone-100 pb-2">
                Service Cover Image
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Displayed on the service card on the public website and service page header. If left empty, the generic default image will be automatically used.
              </p>
            </div>
            <ImageUploader
              value={formData.featuredImage}
              onChange={(url) => setFormData((p) => ({ ...p, featuredImage: url }))}
              fallbackUrl={getServiceCoverImage({ icon: formData.icon, slug: formData.slug })}
            />
          </div>

          {/* SEO Metadata Card */}
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
