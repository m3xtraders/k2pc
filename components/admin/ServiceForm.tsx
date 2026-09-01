"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createServiceAction, updateServiceAction } from "@/app/admin/actions";
import { ServiceInput } from "@/lib/validations/service";
import { SERVICES, getServiceCoverImage } from "@/lib/content/services";
import {
  ExternalLink,
  Save,
  Loader2,
  Bug,
  Building2,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ListOrdered,
  DollarSign,
  ShieldCheck,
  Tag,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

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
  { value: "mosquito", label: "🦟 Mosquito Icon" },
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
    shortDescription: "Zero-tolerance pest defense for commercial kitchens, bars, and food preparation areas. Saskatchewan Health Authority audit compliant.",
    content: "<h3>Commercial Food Safety &amp; Kitchen Sanitation</h3><p>Ensure your food service establishment passes every municipal health audit. Our non-toxic micro-gel baiting and organic enzyme drain treatments target fruit flies, German cockroaches, and rodents without food contact contamination.</p><ul><li>Nightly Cockroach Matrix Baits</li><li>Organic Kitchen Drain Bio-Sanitation</li><li>Tamper-Proof Rodent Station Grids</li><li>Digital Health Inspection Logbook</li></ul>",
    signs: [
      "Drain flies or fruit flies hovering near bar beverage taps or dishwashing stations",
      "German cockroach activity observed in warm refrigeration motor housings",
      "Grease rub marks or rodent droppings along baseboards behind storage racks",
      "Unpleasant sour or oily odors near garbage disposal areas",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Kitchen Sanitation & Drain Audit",
        description: "Comprehensive inspection of floor drains, grease interceptors, and refrigeration motor bays to detect moisture and harborage zones.",
      },
      {
        step: 2,
        title: "Non-Toxic Gel Matrix & Bio-Enzyme Inoculation",
        description: "Application of food-grade insect growth regulators and organic drain probiotics to consume organic waste and eliminate larvae.",
      },
      {
        step: 3,
        title: "Tamper-Proof Perimeter Grids & Digital Logbook",
        description: "Installation of locked exterior monitoring stations and issuance of Saskatchewan Health Authority audit compliance sign-offs.",
      },
    ],
  },
  {
    name: "🏭 Warehouse & Logistics Facility",
    title: "Commercial Warehouse & Logistics IPM",
    slug: "commercial-warehouse-logistics",
    icon: "building",
    shortDescription: "Dock-to-rack perimeter pest barrier and high-bay exclusion sealing for distribution centers, manufacturing plants, and storage facilities.",
    content: "<h3>Industrial Warehouse Pest Defense</h3><p>Protect valuable inventory, raw materials, and packaging from rodent contamination and stored product beetles. Comprehensive exterior perimeter stations and loading dock door sweeps.</p><ul><li>Loading Dock Exclusion Seals</li><li>High-Bay Bird Deterrents</li><li>Barcode Tracked Bait Stations</li><li>HACCP &amp; BRC Audit Reports</li></ul>",
    signs: [
      "Chewed cardboard corners or packaging leaks on palletized inventory",
      "Bird nesting or droppings in high-bay steel rafters and joists",
      "Rodent gnaw marks on loading dock door bottom seals and weatherstripping",
      "Small beetles or larvae found inside dry bulk storage zones",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Dock-to-Rack Perimeter Vulnerability Mapping",
        description: "High-bay scanning, loading dock seal audits, and exterior perimeter assessment to identify structural ingress pathways.",
      },
      {
        step: 2,
        title: "Heavy-Duty Exclusion & Barcode Bait Station Array",
        description: "Industrial weatherproofing of overhead doors and strategic placement of tamper-resistant barcode tracking stations.",
      },
      {
        step: 3,
        title: "Automated Trend Analysis & Audit Certification",
        description: "Real-time portal updates with digital activity logs designed for third-party HACCP, BRC, and organic handling audits.",
      },
    ],
  },
  {
    name: "🏬 Multi-Unit & Property Management",
    title: "Commercial Property Management & Rentals",
    slug: "commercial-property-management",
    icon: "building",
    shortDescription: "Proactive pest management programs for apartment buildings, condo towers, and rental portfolios with fast 24-hour turnaround.",
    content: "<h3>Multi-Unit Residential &amp; Tenant Defense</h3><p>Protect your rental portfolio and building reputation. Discrete, unmarked vehicles and same-day response for tenant pest inquiries across Saskatoon and surrounding communities.</p><ul><li>Suite-by-Suite Bed Bug Targeted Audits</li><li>Trash Chute &amp; Compactor Bio-Treatments</li><li>Common Area Perimeter Baits</li><li>Landlord Compliance Sign-Off Certificates</li></ul>",
    signs: [
      "Tenant complaints of nocturnal bites or itchy skin welts",
      "Dark fecal spotting or shed skins on mattress seams or baseboards",
      "Pest movement through shared plumbing penetrations between suites",
      "Persistent odor or fly issues around trash chutes and compactor rooms",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Multi-Suite Visual & Canine Detection",
        description: "Coordinated inspections of reported suites and adjacent units to contain pest migration before cross-contamination occurs.",
      },
      {
        step: 2,
        title: "Targeted Thermal & Micro-Residual Eradication",
        description: "Eco-friendly targeted insecticide application and perimeter wall cavity dusting with child- and pet-safe protocols.",
      },
      {
        step: 3,
        title: "Trash Chute Remediation & Tenant Guarantee",
        description: "Biological foam cleaning of garbage chutes and delivery of tenant clearance certificates with full warranty.",
      },
    ],
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

  const staticFallback = SERVICES.find((s) => s.slug === initialData?.slug);

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
    pricingStartsAt: initialData?.pricingStartsAt || staticFallback?.pricingStartsAt || (isCommercialParam ? "Custom Quote" : "$189"),
    warranty: initialData?.warranty || staticFallback?.warranty || "6-Month Written Warranty",
    pestCategory: initialData?.pestCategory || staticFallback?.pestCategory || (isCommercialParam ? "commercial" : "insects"),
    faqs: initialData?.faqs || [],
    signsOfInfestation: initialData?.signsOfInfestation || [],
    treatmentProcess: initialData?.treatmentProcess || [],
  });

  const parseInitialArray = <T,>(data: any): T[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const parsedDbFaqs = parseInitialArray<any>(initialData?.faqs);
  const fallbackFaqs = SERVICES.find((s) => s.slug === initialData?.slug)?.faqs || [];
  const initialFaqs = parsedDbFaqs.length > 0 ? parsedDbFaqs : fallbackFaqs;

  const [serviceFaqs, setServiceFaqs] = useState<Array<{ question: string; answer: string }>>(
    initialFaqs.map((f: any) => ({
      question: f.question || "",
      answer: f.answer || "",
    }))
  );

  const parsedDbSigns = parseInitialArray<string>(initialData?.signsOfInfestation);
  const fallbackSigns = SERVICES.find((s) => s.slug === initialData?.slug)?.signsOfInfestation || [
    "Sawdust-like frass accumulated near baseboards or wooden structures.",
    "Visible trails of pests along kitchen counters or foundation lines.",
    "Winged swarmer insects appearing indoors during spring months.",
    "Faint rustling noises within hollow walls or window frames.",
  ];

  const initialSigns = parsedDbSigns.length > 0 ? parsedDbSigns : fallbackSigns;

  const [signsOfInfestation, setSignsOfInfestation] = useState<string[]>(
    initialSigns.map((s: any) => (typeof s === "string" ? s : ""))
  );

  const parsedDbProcess = parseInitialArray<any>(initialData?.treatmentProcess);
  const fallbackProcess = SERVICES.find((s) => s.slug === initialData?.slug)?.treatmentProcess || [
    {
      step: 1,
      title: "Comprehensive Inspection",
      description:
        "Our certified exterminator conducts a full interior and exterior perimeter evaluation to detect nesting spots and access points.",
    },
    {
      step: 2,
      title: "Targeted Eradication Treatment",
      description:
        "Application of Health Canada approved, pet and child safe IPM solutions specifically calibrated for long-lasting elimination.",
    },
    {
      step: 3,
      title: "Exclusion & Perimeter Sealing",
      description:
        "Sealing entry points and applying heavy-duty barrier protection to ensure pests cannot re-enter your property.",
    },
  ];

  const initialProcess = parsedDbProcess.length > 0 ? parsedDbProcess : fallbackProcess;

  const [treatmentSteps, setTreatmentSteps] = useState<Array<{ title: string; description: string }>>(
    initialProcess.map((item: any) => ({
      title: item.title || "",
      description: item.description || "",
    }))
  );

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

  const handleAddSign = () => {
    setSignsOfInfestation((prev) => [...prev, ""]);
  };

  const handleRemoveSign = (index: number) => {
    setSignsOfInfestation((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSignChange = (index: number, value: string) => {
    setSignsOfInfestation((prev) =>
      prev.map((sign, i) => (i === index ? value : sign))
    );
  };

  const handleMoveSign = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= signsOfInfestation.length) return;
    setSignsOfInfestation((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const handleAddTreatmentStep = () => {
    setTreatmentSteps((prev) => [...prev, { title: "", description: "" }]);
  };

  const handleRemoveTreatmentStep = (index: number) => {
    setTreatmentSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTreatmentStepChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setTreatmentSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, [field]: value } : step))
    );
  };

  const handleMoveTreatmentStep = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= treatmentSteps.length) return;
    setTreatmentSteps((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const handleAddFaq = () => {
    setServiceFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index: number) => {
    setServiceFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    setServiceFaqs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };

  const handleMoveFaq = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= serviceFaqs.length) return;
    setServiceFaqs((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
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
      pricingStartsAt: "Custom Quote",
      warranty: "Audit-Ready Guarantee",
      pestCategory: "commercial",
    }));
    if (tpl.signs && tpl.signs.length > 0) {
      setSignsOfInfestation(tpl.signs);
    }
    if (tpl.treatmentProcess && tpl.treatmentProcess.length > 0) {
      setTreatmentSteps(
        tpl.treatmentProcess.map((t: any) => ({
          title: t.title,
          description: t.description,
        }))
      );
    }
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

    const cleanFaqs = serviceFaqs
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question && f.answer);

    const cleanSigns = signsOfInfestation
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const cleanTreatment = treatmentSteps
      .map((step, idx) => ({
        step: idx + 1,
        title: step.title.trim(),
        description: step.description.trim(),
      }))
      .filter((step) => step.title && step.description);

    const payload = {
      ...formData,
      faqs: cleanFaqs,
      signsOfInfestation: cleanSigns,
      treatmentProcess: cleanTreatment,
    };

    try {
      if (initialData?.id) {
        await updateServiceAction(initialData.id, payload);
        toast.success("Service updated successfully");
      } else {
        await createServiceAction(payload);
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

          {/* Key Signs of Infestation / Symptoms Builder Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#BE2320]" />
                  <span>Key Signs &amp; Symptoms of Infestation ({signsOfInfestation.length})</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Symptoms displayed in the &quot;Key Signs of {formData.title || "This Service"} Needed&quot; section on the public website.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddSign}
                className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-[#BE2320] border border-red-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Sign / Symptom</span>
              </button>
            </div>

            {signsOfInfestation.length === 0 ? (
              <div className="p-6 text-center bg-stone-50 rounded-xl border border-dashed border-stone-200 space-y-2">
                <p className="text-xs text-stone-500">
                  No signs or symptoms added for this service yet. Add symptoms to help customers recognize if they have an active infestation.
                </p>
                <button
                  type="button"
                  onClick={handleAddSign}
                  className="text-xs font-bold text-[#BE2320] hover:underline cursor-pointer"
                >
                  + Add first symptom / sign
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {signsOfInfestation.map((sign, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-full bg-red-100 text-[#BE2320] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={sign}
                      onChange={(e) => handleSignChange(idx, e.target.value)}
                      placeholder={`e.g. ${
                        idx === 0
                          ? "Sawdust-like frass accumulated near baseboards or wooden structures."
                          : idx === 1
                          ? "Visible trails of pests along kitchen counters or foundation lines."
                          : idx === 2
                          ? "Winged swarmer insects appearing indoors during spring months."
                          : "Faint rustling noises within hollow walls or window frames."
                      }`}
                      className="flex-1 px-3.5 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
                    />
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveSign(idx, "up")}
                        className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === signsOfInfestation.length - 1}
                        onClick={() => handleMoveSign(idx, "down")}
                        className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSign(idx)}
                        className="p-1 text-red-500 hover:text-red-700 rounded cursor-pointer ml-0.5"
                        title="Remove Symptom"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Our Extermination & Treatment Protocol Builder Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-[#BE2320]" />
                  <span>Our Extermination &amp; Treatment Protocol ({treatmentSteps.length} Steps)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Step-by-step treatment methodology displayed in the &quot;Our Extermination &amp; Treatment Protocol&quot; section on the public service page.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddTreatmentStep}
                className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-[#BE2320] border border-red-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Protocol Step</span>
              </button>
            </div>

            {treatmentSteps.length === 0 ? (
              <div className="p-6 text-center bg-stone-50 rounded-xl border border-dashed border-stone-200 space-y-2">
                <p className="text-xs text-stone-500">
                  No custom treatment steps added for this service yet. Add steps to explain your inspection, eradication, and exclusion protocols.
                </p>
                <button
                  type="button"
                  onClick={handleAddTreatmentStep}
                  className="text-xs font-bold text-[#BE2320] hover:underline cursor-pointer"
                >
                  + Add first treatment step
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {treatmentSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#BE2320] text-white font-mono-data font-bold text-xs flex items-center justify-center shadow-2xs">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-mono-data font-bold text-stone-700">
                          Step #{idx + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveTreatmentStep(idx, "up")}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === treatmentSteps.length - 1}
                          onClick={() => handleMoveTreatmentStep(idx, "down")}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveTreatmentStep(idx)}
                          className="p-1 text-red-500 hover:text-red-700 rounded cursor-pointer ml-1"
                          title="Remove Step"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                        Step Title
                      </label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleTreatmentStepChange(idx, "title", e.target.value)}
                        placeholder={`e.g. ${
                          idx === 0
                            ? "Comprehensive Inspection"
                            : idx === 1
                            ? "Targeted Eradication Treatment"
                            : "Exclusion & Perimeter Sealing"
                        }`}
                        className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                        Step Description
                      </label>
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => handleTreatmentStepChange(idx, "description", e.target.value)}
                        placeholder="Explain the specific tools, IPM methods, and safety procedures used in this step..."
                        className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320] leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Service-Specific FAQs Builder Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#BE2320]" />
                  <span>Service-Specific FAQs ({serviceFaqs.length})</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Custom questions &amp; answers for this specific service. If left empty, the service page will show your universal FAQs from the FAQ page.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-[#BE2320] border border-red-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add FAQ Item</span>
              </button>
            </div>

            {serviceFaqs.length === 0 ? (
              <div className="p-6 text-center bg-stone-50 rounded-xl border border-dashed border-stone-200 space-y-2">
                <p className="text-xs text-stone-500">
                  No custom FAQs added for this service yet. The public page will automatically display your universal FAQs.
                </p>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="text-xs font-bold text-[#BE2320] hover:underline cursor-pointer"
                >
                  + Add first custom FAQ for this service
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {serviceFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono-data font-bold text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200">
                        FAQ #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveFaq(idx, "up")}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === serviceFaqs.length - 1}
                          onClick={() => handleMoveFaq(idx, "down")}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(idx)}
                          className="p-1 text-red-500 hover:text-red-700 rounded cursor-pointer ml-1"
                          title="Remove FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                        placeholder="e.g. How long does treatment take?"
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#BE2320]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                        Answer
                      </label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                        placeholder="Provide a specific answer for this pest service..."
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#BE2320] leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Metadata, Status, Image */}
        <div className="space-y-6">
          {/* Pricing, Category & Warranty Card */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
              <DollarSign className="w-4 h-4 text-[#BE2320]" />
              <h3 className="text-sm font-bold text-stone-900">
                Pricing &amp; Guarantee Badges
              </h3>
            </div>

            <FormField
              label="Starting Price Tag"
              hint="Shown on public cards as 'From $XXX'"
            >
              <input
                type="text"
                value={formData.pricingStartsAt || ""}
                onChange={(e) => setFormData((p) => ({ ...p, pricingStartsAt: e.target.value }))}
                placeholder="e.g. $189 or Custom Quote"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono-data font-bold text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>

            <FormField
              label="Warranty / Guarantee Tag"
              hint="Shown on public card & detail page header"
            >
              <input
                type="text"
                value={formData.warranty || ""}
                onChange={(e) => setFormData((p) => ({ ...p, warranty: e.target.value }))}
                placeholder="e.g. 6-Month Written Warranty"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>

            <FormField
              label="Pest Category Pill"
              hint="Pill tag shown on image banner"
            >
              <select
                value={formData.pestCategory || (isCommercial ? "commercial" : "insects")}
                onChange={(e) => setFormData((p) => ({ ...p, pestCategory: e.target.value }))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              >
                <option value="insects">Insects (Ants, Wasps, Spiders, Roaches)</option>
                <option value="rodents">Rodents (Mice, Rats, Field Pests)</option>
                <option value="wildlife">Wildlife (Birds, Bats, Raccoons)</option>
                <option value="commercial">Commercial (Facilities, Kitchens, Warehouses)</option>
                <option value="seasonal">Seasonal (Fall Ingress, Spring Prevention)</option>
              </select>
            </FormField>
          </div>

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
