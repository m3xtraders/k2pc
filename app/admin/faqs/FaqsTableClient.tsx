"use client";

import React, { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  createFaqAction,
  updateFaqAction,
  deleteFaqAction,
  toggleFaqStatusAction,
  reorderFaqsAction,
  seedFaqsAction,
} from "@/app/admin/actions";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  Sparkles,
  CheckCircle2,
  X,
  Layers,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  status: "PUBLISHED" | "DRAFT";
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface FaqsTableClientProps {
  faqs: FaqItem[];
}

const DEFAULT_CATEGORIES = [
  "General",
  "Safety & Eco",
  "Pricing & Guarantees",
  "Preparation",
  "Emergency Service",
  "Commercial",
];

export const FaqsTableClient: React.FC<FaqsTableClientProps> = ({ faqs }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Dialog states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formCategory, setFormCategory] = useState("General");
  const [customCategory, setCustomCategory] = useState("");
  const [formDisplayOrder, setFormDisplayOrder] = useState(0);
  const [formStatus, setFormStatus] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic list of all categories present in data
  const availableCategories = useMemo(() => {
    const cats = new Set<string>(DEFAULT_CATEGORIES);
    faqs.forEach((f) => {
      if (f.category) cats.add(f.category);
    });
    return Array.from(cats);
  }, [faqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || faq.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "ALL" || faq.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [faqs, searchQuery, selectedCategory, selectedStatus]);

  const openCreateModal = () => {
    setEditingFaq(null);
    setFormQuestion("");
    setFormAnswer("");
    setFormCategory("General");
    setCustomCategory("");
    setFormDisplayOrder(faqs.length);
    setFormStatus("PUBLISHED");
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    if (DEFAULT_CATEGORIES.includes(faq.category)) {
      setFormCategory(faq.category);
      setCustomCategory("");
    } else {
      setFormCategory("Custom");
      setCustomCategory(faq.category);
    }
    setFormDisplayOrder(faq.displayOrder);
    setFormStatus(faq.status);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim()) {
      toast.error("Please enter a question");
      return;
    }
    if (!formAnswer.trim()) {
      toast.error("Please enter an answer");
      return;
    }

    const finalCategory =
      formCategory === "Custom"
        ? customCategory.trim() || "General"
        : formCategory;

    setIsSubmitting(true);
    try {
      if (editingFaq) {
        await updateFaqAction(editingFaq.id, {
          question: formQuestion,
          answer: formAnswer,
          category: finalCategory,
          displayOrder: Number(formDisplayOrder),
          status: formStatus,
        });
        toast.success("FAQ updated successfully");
      } else {
        await createFaqAction({
          question: formQuestion,
          answer: formAnswer,
          category: finalCategory,
          displayOrder: Number(formDisplayOrder),
          status: formStatus,
        });
        toast.success("FAQ created successfully");
      }

      setIsModalOpen(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to save FAQ");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFaqAction(deleteId);
      toast.success("FAQ deleted successfully");
      startTransition(() => {
        router.refresh();
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete FAQ");
    } finally {
      setDeleteId(null);
    }
  };

  const handleToggleStatus = async (faq: FaqItem) => {
    try {
      const res = await toggleFaqStatusAction(faq.id, faq.status);
      toast.success(`FAQ set to ${res.status.toLowerCase()}`);
      startTransition(() => {
        router.refresh();
      });
    } catch (err: any) {
      toast.error("Failed to change FAQ status");
    }
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const currentFaq = faqs[index];
    const targetFaq = faqs[targetIndex];

    const updatedItems = [
      { id: currentFaq.id, displayOrder: targetFaq.displayOrder },
      { id: targetFaq.id, displayOrder: currentFaq.displayOrder },
    ];

    try {
      await reorderFaqsAction(updatedItems);
      toast.success("Order updated");
      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  const handleSeedDefaults = async () => {
    try {
      await seedFaqsAction();
      toast.success("Default FAQs seeded successfully");
      startTransition(() => {
        router.refresh();
      });
    } catch (err: any) {
      toast.error("Failed to seed FAQs");
    }
  };

  const publishedCount = faqs.filter((f) => f.status === "PUBLISHED").length;
  const draftCount = faqs.filter((f) => f.status === "DRAFT").length;

  return (
    <div className="space-y-6">
      {/* Top Stat Cards & Action Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500 block">Total FAQs</span>
          <span className="text-2xl font-bold text-stone-900 mt-1 block">{faqs.length}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500 block">Published (Live)</span>
          <span className="text-2xl font-bold text-emerald-600 mt-1 block">{publishedCount}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-medium text-stone-500 block">Draft / Hidden</span>
          <span className="text-2xl font-bold text-amber-600 mt-1 block">{draftCount}</span>
        </div>
      </div>

      {/* Empty State Banner if no DB FAQs exist */}
      {faqs.length === 0 && (
        <div className="bg-gradient-to-r from-red-50 via-amber-50 to-white border border-brand-red/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-5 h-5 text-[#BE2320]" />
              Initialize Default FAQs
            </h3>
            <p className="text-xs text-stone-600">
              Your database currently has 0 custom FAQs. Import the 6 built-in professional exterminator FAQs so you can immediately edit or reorder them.
            </p>
          </div>
          <button
            onClick={handleSeedDefaults}
            className="px-4 py-2.5 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-xs font-bold rounded-xl shadow-sm transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Load Default 6 FAQs</span>
          </button>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question, answer, or category..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320] bg-stone-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Add FAQ Button */}
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New FAQ</span>
          </button>
        </div>

        {/* Category Pills & Status Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-stone-400 mr-1 font-mono-data">Category:</span>
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                selectedCategory === "ALL"
                  ? "bg-stone-900 text-white font-semibold"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              All ({faqs.length})
            </button>
            {availableCategories.map((cat) => {
              const count = faqs.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? "bg-brand-red text-white font-semibold"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono-data">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs border border-stone-200 rounded-lg px-2.5 py-1 text-stone-700 bg-white focus:outline-none focus:ring-1 focus:ring-brand-red"
            >
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published Only</option>
              <option value="DRAFT">Drafts Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* FAQs List Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-stone-300 mx-auto" />
            <h4 className="font-bold text-stone-800 text-base">No FAQs found</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== "ALL" || selectedStatus !== "ALL"
                ? "Try clearing your search filters to view all FAQs."
                : "Get started by adding your first FAQ or seeding the default items."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {filteredFaqs.map((faq, index) => {
              const globalIndex = faqs.findIndex((f) => f.id === faq.id);
              return (
                <div
                  key={faq.id}
                  className="p-4 sm:p-5 hover:bg-stone-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Reorder & Content */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Order Controls */}
                    <div className="flex flex-col items-center justify-center space-y-1 bg-stone-100 px-2 py-1 rounded-lg shrink-0 mt-0.5">
                      <button
                        title="Move Up"
                        disabled={globalIndex === 0}
                        onClick={() => handleMoveOrder(globalIndex, "up")}
                        className="text-stone-400 hover:text-stone-900 disabled:opacity-20 disabled:hover:text-stone-400 p-0.5 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-mono-data font-bold text-stone-700">
                        {faq.displayOrder}
                      </span>
                      <button
                        title="Move Down"
                        disabled={globalIndex === faqs.length - 1}
                        onClick={() => handleMoveOrder(globalIndex, "down")}
                        className="text-stone-400 hover:text-stone-900 disabled:opacity-20 disabled:hover:text-stone-400 p-0.5 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Question & Answer Preview */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono-data font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                          {faq.category}
                        </span>
                        <StatusBadge status={faq.status} />
                      </div>

                      <h4 className="font-heading font-bold text-sm sm:text-base text-stone-900 pt-0.5 leading-snug">
                        {faq.question}
                      </h4>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      title={faq.status === "PUBLISHED" ? "Switch to Draft" : "Publish FAQ"}
                      onClick={() => handleToggleStatus(faq)}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
                        faq.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                      }`}
                    >
                      {faq.status === "PUBLISHED" ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">Live</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">Draft</span>
                        </>
                      )}
                    </button>

                    <button
                      title="Edit FAQ"
                      onClick={() => openEditModal(faq)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      title="Delete FAQ"
                      onClick={() => setDeleteId(faq.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-brand-red rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
              <h3 className="font-heading font-bold text-lg text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#BE2320]" />
                <span>{editingFaq ? "Edit FAQ Item" : "Create New FAQ Item"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Question */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Question <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="e.g. Are your pest control treatments safe for pets and children?"
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red font-medium text-stone-900"
                />
              </div>

              {/* Category & Status & Order Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white"
                  >
                    {DEFAULT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Custom">+ Custom Category</option>
                  </select>
                </div>

                {/* Display Order */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formDisplayOrder}
                    onChange={(e) => setFormDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red font-mono-data"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red bg-white font-medium"
                  >
                    <option value="PUBLISHED">Published (Live)</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Custom Category Input if selected */}
              {formCategory === "Custom" && (
                <div className="space-y-1.5 animate-in fade-in-50">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                    Custom Category Name
                  </label>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g. Wildlife Removal"
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                  />
                </div>
              )}

              {/* Answer */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Answer <span className="text-brand-red">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  placeholder="Provide a clear, detailed, reassuring answer for your customers..."
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red leading-relaxed text-stone-800"
                />
                <p className="text-[11px] text-stone-400">
                  Tip: Clear answers improve rich Google FAQ snippets and help convert site visitors.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSubmitting ? "Saving..." : editingFaq ? "Update FAQ" : "Create FAQ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete FAQ Item"
        message="Are you sure you want to permanently delete this FAQ? This action cannot be undone."
      />
    </div>
  );
};
