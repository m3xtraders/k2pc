"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { updateLegalPageAction } from "@/app/admin/actions";
import {
  LegalPageData,
  DEFAULT_PRIVACY_POLICY,
  DEFAULT_TERMS_OF_SERVICE,
} from "@/lib/content/legal";
import {
  ShieldCheck,
  FileText,
  Save,
  Loader2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Lock,
  FileCheck2,
} from "lucide-react";

interface LegalPagesClientProps {
  initialPrivacy: LegalPageData;
  initialTerms: LegalPageData;
}

export const LegalPagesClient: React.FC<LegalPagesClientProps> = ({
  initialPrivacy,
  initialTerms,
}) => {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
  const [loading, setLoading] = useState(false);

  const [privacyForm, setPrivacyForm] = useState<LegalPageData>(initialPrivacy);
  const [termsForm, setTermsForm] = useState<LegalPageData>(initialTerms);

  const currentForm = activeTab === "privacy" ? privacyForm : termsForm;
  const setCurrentForm = activeTab === "privacy" ? setPrivacyForm : setTermsForm;
  const liveUrl = activeTab === "privacy" ? "/privacy" : "/terms";

  const handleFieldChange = (field: keyof LegalPageData, value: string) => {
    setCurrentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetToDefault = () => {
    const isPrivacy = activeTab === "privacy";
    const template = isPrivacy ? DEFAULT_PRIVACY_POLICY : DEFAULT_TERMS_OF_SERVICE;
    if (
      window.confirm(
        `Are you sure you want to reset the ${
          isPrivacy ? "Privacy Policy" : "Terms of Service"
        } content to the default Canadian/Saskatchewan exterminator template? Unsaved custom changes will be overwritten.`
      )
    ) {
      setCurrentForm(template);
      toast.success(
        `Loaded default ${isPrivacy ? "Privacy Policy" : "Terms of Service"} template. Click "Save & Publish" to apply.`
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentForm.title || !currentForm.content) {
      toast.error("Please fill in the title and content fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await updateLegalPageAction(currentForm.slug, {
        title: currentForm.title,
        subtitle: currentForm.subtitle,
        content: currentForm.content,
        metaTitle: currentForm.metaTitle,
        metaDescription: currentForm.metaDescription,
      });

      if (res.success) {
        toast.success(
          `${activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"} updated successfully!`
        );
      } else {
        toast.error("Failed to save legal page.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Tab Navigator & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "privacy"
                ? "bg-white text-[#BE2320] shadow-xs ring-1 ring-black/5"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "terms"
                ? "bg-white text-[#BE2320] shadow-xs ring-1 ring-black/5"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Terms of Service &amp; Warranty</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-stone-300 shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Page</span>
          </a>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-stone-300 shadow-2xs cursor-pointer"
            title="Reset to default legal boilerplate template"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset Template</span>
          </button>
        </div>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-900 flex items-center gap-2">
                {activeTab === "privacy" ? (
                  <Lock className="w-5 h-5 text-[#BE2320]" />
                ) : (
                  <FileCheck2 className="w-5 h-5 text-[#BE2320]" />
                )}
                <span>Editing {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"}</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Public URL: <code className="text-[#BE2320] font-mono">{liveUrl}</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save &amp; Publish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <FormField label="Page Title" required hint="Primary headline displayed in the hero banner">
              <input
                type="text"
                required
                value={currentForm.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder={activeTab === "privacy" ? "Privacy Policy" : "Terms of Service & Warranty Policy"}
                className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
              />
            </FormField>

            <FormField
              label="Page Subtitle / Tagline"
              hint="Short introductory summary displayed beneath the main heading"
            >
              <textarea
                rows={2}
                value={currentForm.subtitle || ""}
                onChange={(e) => handleFieldChange("subtitle", e.target.value)}
                placeholder="Brief summary of policy scope and compliance..."
                className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320] leading-relaxed"
              />
            </FormField>

            <FormField
              label="Legal Document Body (Rich Text)"
              required
              hint="Use the editor toolbar below to format headings (H2, H3), bulleted lists, bold text, links, and paragraphs."
            >
              <RichTextEditor
                value={currentForm.content}
                onChange={(html) => handleFieldChange("content", html)}
                placeholder="Enter detailed legal sections, warranty clauses, payment terms, or privacy disclosures..."
              />
            </FormField>
          </div>
        </div>

        {/* SEO Meta Tags Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h4 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#BE2320]" />
              <span>Search Engine Optimization (SEO)</span>
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Customize title tags and meta descriptions for search engine crawlers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Meta Title"
              hint={`${currentForm.metaTitle?.length || 0}/70 characters`}
            >
              <input
                type="text"
                maxLength={70}
                value={currentForm.metaTitle || ""}
                onChange={(e) => handleFieldChange("metaTitle", e.target.value)}
                placeholder="Title tag displayed in search results..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>

            <FormField
              label="Meta Description"
              hint={`${currentForm.metaDescription?.length || 0}/160 characters`}
            >
              <textarea
                rows={2}
                maxLength={160}
                value={currentForm.metaDescription || ""}
                onChange={(e) => handleFieldChange("metaDescription", e.target.value)}
                placeholder="Meta snippet displayed in search result summaries..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#BE2320] leading-relaxed"
              />
            </FormField>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save &amp; Publish Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LegalPagesClient;
