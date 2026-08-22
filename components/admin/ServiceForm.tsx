"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createServiceAction, updateServiceAction } from "@/app/admin/actions";
import { ServiceInput } from "@/lib/validations/service";
import { getServiceCoverImage } from "@/lib/content/services";
import { ExternalLink, Save, Loader2, Bug, Building2, Sparkles } from "lucide-react";

interface ServiceFormProps {
  initialData?: any;
}

const ICON_OPTIONS = [
  { value: "building", label: "🏢 Building / Commercial Icon" },
  { value: "ant", label: "🐜 Ant Icon" },
  { value: "rodent", label: "🐭 Rodent / Rat Icon" },
  { value: "cockroach", label: "🪳 Cockroach Icon" },
  { value: "bed-bug", label: "🛏️ Bed Bug Icon" },
  { value: "wasp", label: "🐝 Wasp Icon" },
  { value: "spider", label: "🕷️ Spider Icon" },
  { value: "shield", label: "🛡️ Shield Icon" },
  { value: "home", label: "🏡 Home / Residential Icon" },
  { value: "calendar", label: "📅 Calendar / Seasonal Icon" },
  { value: "bug", label: "🐞 General Bug Icon" },
];

const COMMERCIAL_TEMPLATES = [
  {
    name: "🍽️ Restaurant & Food Service Program",
    title: "Commercial Restaurant & Kitchen Defense",
    slug: "commercial-restaurant-defense",
    icon: "building",
    shortDescription: "Zero-tolerance pest defense for commercial kitchens, bars, and food preparation areas. Toronto Public Health DineSafe audit compliant.",
    content: "<h3>Commercial Food Safety &amp; Kitchen Sanitation</h3><p>Ensure your food service establishment passes every municipal health audit. Our non-toxic micro-gel baiting and organic enzyme drain treatments target fruit flies, German cockroaches, and rodents without food contact contamination.</p><ul><li>Nightly Cockroach Matrix Baits</li><li>Organic Kitchen Drain Bio-Sanitation</li><li>Tamper-Proof Rodent Station Grids</li><li>Digital DineSafe Inspection Logbook</li></ul>",
  },
  {
    name: "🏭 Warehouse & Logistics Facility",
    title: "Commercial Warehouse & Logistics IPM",
    slug: "commercial-warehouse-logistics",
    icon: "building",
    shortDescription: "Dock-to-rack perimeter pest barrier and high-bay exclusion sealing for distribution centers, manufacturing plants, and storage facilities.",
    content: "<h3>Industrial Warehouse Pest Defense</h3><p>Protect valuable inventory, raw materials, and packaging from rodent contamination and stored product beetles. Comprehensive exterior perimeter stations and loading dock door sweeps.</p><ul><li>Loading Dock Exclusion Seals</li><li>High-Bay Bird Deterrents</li><li>Barcode Tracked Bait Stations</li><li>HACCP &amp; BRC Audit Reports</li></ul>",
  },
  {
    name: "🏬 Multi-Unit & Property Management",
    title: "Commercial Property Management & Rentals",
    slug: "commercial-property-management",
    icon: "building",
    shortDescription: "Proactive pest management programs for apartment buildings, condo towers, and rental portfolios with fast 24-hour turnaround.",
    content: "<h3>Multi-Unit Residential &amp; Tenant Defense</h3><p>Protect your rental portfolio and building reputation. Discrete, unmarked vehicles and same-day response for tenant pest inquiries across Toronto and the GTA.</p><ul><li>Suite-by-Suite Bed Bug Thermal Audits</li><li>Trash Chute &amp; Compactor Bio-Treatments</li><li>Common Area Perimeter Baits</li><li>Landlord Compliance Sign-Off Certificates</li></ul>",
  },
];

export const ServiceForm: React.FC<ServiceFormProps> = ({ initialData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCommercialParam = searchParams?.get("type") === "commercial";

  const [loading, setLoading] = useState(false);
  const [isCommercial, setIsCommercial] = useState<boolean>(
    initialData?.icon === "building" ||
    (initialData?.title && initialData.title.toLowerCase().includes("commercial")) ||
    isCommercialParam
  );

  const [formData, setFormData] = useState<ServiceInput>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    icon: initialData?.icon || (isCommercialParam ? "building" : "bug"),
    shortDescription: initialData?.shortDescription || "",
    content: initialData?.content || "",
    featuredImage: initialData?.featuredImage || null,
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    displayOrder: initialData?.displayOrder || 0,
    status: initialData?.status || "DRAFT",
  });

  const [autoSlug, setAutoSlug] = useState(!initialData);

  useEffect(() => {
    if (isCommercialParam && !initialData) {
      setIsCommercial(true);
      setFormData((prev) => ({
        ...prev,
        icon: "building",
      }));
    }
  }, [isCommercialParam, initialData]);

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

  const handleApplyTemplate = (tpl: typeof COMMERCIAL_TEMPLATES[0]) => {
    setFormData((prev) => ({
      ...prev,
      title: tpl.title,
      slug: tpl.slug,
      icon: tpl.icon,
      shortDescription: tpl.shortDescription,
      content: tpl.content,
      status: "PUBLISHED",
    }));
    setIsCommercial(true);
    setAutoSlug(false);
    toast.success(`Loaded template: ${tpl.name}`);
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
        await createServiceAction(formData);
        toast.success("Service created successfully");
      }

      router.refresh();

      if (viewLive && formData.slug) {
        if (isCommercial) {
          window.open("/commercial", "_blank");
        } else {
          window.open(`/services/${formData.slug}`, "_blank");
        }
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
            {isCommercial ? (
              <Building2 className="w-5 h-5 text-[#BE2320]" />
            ) : (
              <Bug className="w-5 h-5 text-[#BE2320]" />
            )}
            {initialData
              ? `Edit ${isCommercial ? "Commercial" : ""} Service`
              : `Create New ${isCommercial ? "Commercial" : ""} Service`}
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            {isCommercial
              ? "This service will be displayed in the Commercial Service Catalog on /commercial."
              : "Fill out service details, rich content, and SEO metadata."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {initialData?.slug && (
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium rounded-xl transition-colors flex items-center gap-1.5 border border-stone-300"
            >
              <ExternalLink className="w-4 h-4" /> Save &amp; View Live
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

      {/* Commercial Quick-Fill Templates Banner (Visible on new service) */}
      {!initialData && (
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase font-mono-data">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Commercial Quick-Start Templates (1-Click Fill)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMMERCIAL_TEMPLATES.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyTemplate(tpl)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-300 text-xs font-semibold text-stone-800 shadow-2xs transition-colors cursor-pointer"
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Classification Selector */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <label className="block text-xs font-bold text-stone-700 uppercase font-mono-data">
              Target Audience / Classification
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCommercial(false);
                  if (formData.icon === "building") setFormData((p) => ({ ...p, icon: "bug" }));
                }}
                className={`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-bold ${
                  !isCommercial
                    ? "bg-white border-[#BE2320] text-[#BE2320] shadow-xs ring-1 ring-[#BE2320]"
                    : "bg-stone-100 text-stone-600 border-stone-300 hover:bg-white"
                }`}
              >
                <span>🏠 Residential &amp; General</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCommercial(true);
                  setFormData((p) => ({ ...p, icon: "building" }));
                }}
                className={`p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-bold ${
                  isCommercial
                    ? "bg-white border-[#BE2320] text-[#BE2320] shadow-xs ring-1 ring-[#BE2320]"
                    : "bg-stone-100 text-stone-600 border-stone-300 hover:bg-white"
                }`}
              >
                <span>🏢 Commercial &amp; Facility IPM</span>
              </button>
            </div>
          </div>

          <FormField label="Service Title" required>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder={isCommercial ? "e.g. Commercial Restaurant & Kitchen Defense" : "e.g. Bed Bug Heat Treatment"}
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
              placeholder={isCommercial ? "commercial-restaurant-defense" : "bed-bug-heat-treatment"}
              className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320] font-mono"
            />
          </FormField>

          <FormField label="Short Description" required hint="Concise summary shown on public cards">
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
              placeholder="Detailed treatment protocols, audit compliance features, and guarantee details..."
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
                value={formData.icon || (isCommercial ? "building" : "bug")}
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
                Displayed on the service card on the public website and service page header.
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
