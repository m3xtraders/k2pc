"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { updateLeadStatusAction, deleteLeadAction, sendLeadReplyAction } from "@/app/admin/actions";
import { LeadsKanbanBoard, PIPELINE_COLUMNS } from "./LeadsKanbanBoard";
import { LeadCard, LeadItem, getLeadSourceInfo } from "./LeadCard";
import { ManualLeadModal } from "./ManualLeadModal";
import {
  Eye,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  X,
  Bot,
  Globe,
  Kanban,
  ListFilter,
  Search,
  CheckCircle2,
  TrendingUp,
  Inbox,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  MessageSquareReply,
  UserPlus,
  PhoneCall,
  Camera,
  MessageCircle,
  Megaphone,
} from "lucide-react";

interface LeadsInboxClientProps {
  initialSubmissions: any[];
}

export const LeadsInboxClient: React.FC<LeadsInboxClientProps> = ({
  initialSubmissions,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [leads, setLeads] = useState<LeadItem[]>(initialSubmissions);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");
  const [tableStatusFilter, setTableStatusFilter] = useState<string>("ALL");

  // Email Reply State
  const [replyTab, setReplyTab] = useState<"direct" | "manual">("direct");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // When a lead is opened, set default reply template
  const handleOpenLead = (lead: LeadItem) => {
    setSelectedLead(lead);
    setRecipientEmail(lead.email || "");
    setReplySubject(`Re: Pest Control Inquiry - ${lead.service || "K2 Pest Control"}`);
    setReplyMessage(
      `Hi ${lead.name},\n\nThank you for reaching out to K2 Pest Control regarding your inquiry for ${lead.service || "pest inspection"}.\n\nOur certified technician can perform an on-site inspection and quote in ${lead.city || "your area"}. What day and time works best for you?\n\nBest regards,\nK2 Pest Control Dispatch Team\nPhone: (416) 555-0199`
    );
  };

  // Keep local state in sync if initialSubmissions changes
  React.useEffect(() => {
    setLeads(initialSubmissions);
  }, [initialSubmissions]);

  // Lead Filtering
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const source = getLeadSourceInfo(lead).label.toUpperCase();

      // Source Filter
      if (sourceFilter !== "ALL") {
        if (sourceFilter === "CHATBOT" && source !== "AI CHATBOT") return false;
        if (sourceFilter === "WEB" && source !== "WEB FORM") return false;
        if (sourceFilter === "CALL" && source !== "PHONE CALL") return false;
        if (sourceFilter === "INSTAGRAM" && source !== "INSTAGRAM") return false;
        if (sourceFilter === "WHATSAPP" && source !== "WHATSAPP") return false;
        if (sourceFilter === "ADS" && source !== "PAID ADS") return false;
      }

      // Table View Status Filter
      if (viewMode === "table" && tableStatusFilter !== "ALL") {
        if ((lead.status || "NEW").toUpperCase() !== tableStatusFilter) return false;
      }

      // Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = lead.name?.toLowerCase().includes(query);
        const matchesPhone = lead.phone?.toLowerCase().includes(query);
        const matchesCity = lead.city?.toLowerCase().includes(query);
        const matchesService = lead.service?.toLowerCase().includes(query);
        const matchesMsg = lead.message?.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesCity || matchesService || matchesMsg;
      }

      return true;
    });
  }, [leads, sourceFilter, tableStatusFilter, searchQuery, viewMode]);

  // Lead Statistics
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => (l.status || "NEW").toUpperCase() === "NEW").length;
    const inPipeline = leads.filter((l) =>
      ["CONTACTED", "SCHEDULED", "IN_PROGRESS"].includes((l.status || "").toUpperCase())
    ).length;
    const closedCount = leads.filter(
      (l) => (l.status || "").toUpperCase() === "CLOSED"
    ).length;
    const manualCount = leads.filter((l) => {
      const src = getLeadSourceInfo(l).label;
      return ["Phone Call", "Instagram", "WhatsApp", "Paid Ads", "Referral", "Manual Entry"].includes(src);
    }).length;

    return { total, newCount, inPipeline, closedCount, manualCount };
  }, [leads]);

  // Handle Drag & Drop / Quick Move status updates
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const previousLeads = [...leads];

    // Optimistic Update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );

    if (selectedLead && selectedLead.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await updateLeadStatusAction(id, newStatus);
      toast.success(
        `Lead moved to ${PIPELINE_COLUMNS.find((c) => c.key === newStatus)?.label || newStatus}`
      );
    } catch (error) {
      setLeads(previousLeads);
      toast.error("Failed to update status");
    }
  };

  // Handle Deleting Lead
  const handleDeleteLead = async () => {
    if (!deleteId) return;

    try {
      await deleteLeadAction(deleteId);
      setLeads((prev) => prev.filter((lead) => lead.id !== deleteId));
      if (selectedLead?.id === deleteId) {
        setSelectedLead(null);
      }
      toast.success("Lead removed successfully");
    } catch (error) {
      toast.error("Failed to delete lead");
    } finally {
      setDeleteId(null);
    }
  };

  const handleLeadCreated = (newLead: LeadItem) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  // Table Columns Definition
  const tableColumns: Column<LeadItem>[] = [
    {
      header: "Customer",
      cell: (item) => {
        const sourceInfo = getLeadSourceInfo(item);
        const SourceIcon = sourceInfo.icon;

        return (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-stone-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {(item.name || "C")[0].toUpperCase()}
            </div>
            <div>
              <span className="font-bold text-stone-900 block leading-tight">
                {item.name}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <a
                  href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-xs text-stone-500 hover:text-[#BE2320] hover:underline"
                >
                  {item.phone}
                </a>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded border ${sourceInfo.badgeClass}`}>
                  <SourceIcon className="w-2.5 h-2.5" /> {sourceInfo.label}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Service Requested",
      cell: (item) => (
        <span className="text-xs font-semibold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
          {item.service?.replace("AI Chatbot Inquiry", "Chat Inquiry") || "General Inspection"}
        </span>
      ),
    },
    {
      header: "City / Area",
      cell: (item) => (
        <span className="text-xs text-stone-600 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-stone-400" />
          {item.city || "Greater Toronto Area"}
        </span>
      ),
    },
    {
      header: "Pipeline Stage",
      cell: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: "Date Received",
      cell: (item) => (
        <span className="text-xs text-stone-500">
          {new Date(item.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleOpenLead(item)}
            className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" /> Reply
          </button>
          <button
            onClick={() => setDeleteId(item.id)}
            className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            title="Delete Lead"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-1">
            <span>Total Inquiries</span>
            <Inbox className="w-4 h-4 text-stone-400" />
          </div>
          <p className="text-2xl font-black text-stone-900 tracking-tight">{stats.total}</p>
        </div>

        <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 shadow-2xs">
          <div className="flex items-center justify-between text-rose-700 text-xs font-semibold mb-1">
            <span>New (Action Req.)</span>
            <Sparkles className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-700 tracking-tight">{stats.newCount}</p>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-semibold mb-1">
            <span>Active Pipeline</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-800 tracking-tight">{stats.inPipeline}</p>
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold mb-1">
            <span>Closed / Won</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800 tracking-tight">{stats.closedCount}</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-blue-50/60 p-4 rounded-xl border border-blue-200 shadow-2xs">
          <div className="flex items-center justify-between text-blue-800 text-xs font-semibold mb-1">
            <span>Manual &amp; Direct Leads</span>
            <UserPlus className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-800 tracking-tight">{stats.manualCount}</p>
        </div>
      </div>

      {/* Control Bar: View Toggle, Create Button, Search, and Source Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
        {/* Left: View Mode Toggle & Add Manual Lead Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setViewMode("kanban")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                viewMode === "kanban"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Kanban className="w-3.5 h-3.5 text-[#BE2320]" />
              Kanban Board
            </button>

            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                viewMode === "table"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-[#BE2320]" />
              Table List
            </button>
          </div>

          <button
            type="button"
            onClick={() => setManualModalOpen(true)}
            className="px-3.5 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Create Manual Lead</span>
          </button>
        </div>

        {/* Center/Right: Search and Source Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Source Filter Select */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg font-medium text-stone-800 focus:outline-none focus:border-[#BE2320]"
          >
            <option value="ALL">All Sources ({leads.length})</option>
            <option value="CHATBOT">🤖 AI Chatbot</option>
            <option value="WEB">🌐 Web Form</option>
            <option value="CALL">📱 Phone Call</option>
            <option value="INSTAGRAM">📷 Instagram</option>
            <option value="WHATSAPP">💬 WhatsApp</option>
            <option value="ADS">📢 Paid Ads</option>
          </select>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BE2320] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main View Area: Kanban vs Table */}
      {viewMode === "kanban" ? (
        <LeadsKanbanBoard
          leads={filteredLeads}
          onUpdateStatus={handleUpdateStatus}
          onViewLead={handleOpenLead}
          onDeleteLead={(id) => setDeleteId(id)}
        />
      ) : (
        <DataTable
          columns={tableColumns}
          data={filteredLeads}
          searchPlaceholder="Search leads in table..."
          emptyTitle="No Leads Found"
          emptyDescription="No customer inquiries match your filter criteria."
        />
      )}

      {/* Create Manual Lead Modal */}
      <ManualLeadModal
        isOpen={manualModalOpen}
        onClose={() => setManualModalOpen(false)}
        onLeadCreated={handleLeadCreated}
      />

      {/* Lead Details & Reply Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="fixed inset-0" onClick={() => setSelectedLead(null)} />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 z-10 max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-stone-900">
                    {selectedLead.name}
                  </h3>
                  <StatusBadge status={selectedLead.status} />
                  {(() => {
                    const src = getLeadSourceInfo(selectedLead);
                    const SrcIcon = src.icon;
                    return (
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${src.badgeClass}`}>
                        <SrcIcon className="w-3 h-3" /> {src.label}
                      </span>
                    );
                  })()}
                </div>
                <p className="text-xs text-stone-400">
                  Received on {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-stone-500 font-semibold block">PHONE NUMBER:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-stone-900 font-bold hover:text-[#BE2320] hover:underline flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      {selectedLead.phone}
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedLead.phone);
                        setCopiedPhone(true);
                        setTimeout(() => setCopiedPhone(false), 2000);
                        toast.success("Phone copied to clipboard");
                      }}
                      className="p-1 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-200/60"
                      title="Copy phone"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 font-semibold block">EMAIL ADDRESS:</span>
                  {selectedLead.email ? (
                    <div className="flex items-center gap-2 mt-0.5">
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="text-stone-800 font-medium hover:underline flex items-center gap-1.5 truncate max-w-[200px]"
                      >
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        {selectedLead.email}
                      </a>
                      <button
                        onClick={() => {
                          if (selectedLead.email) {
                            navigator.clipboard.writeText(selectedLead.email);
                            setCopiedEmail(true);
                            setTimeout(() => setCopiedEmail(false), 2000);
                            toast.success("Email copied to clipboard");
                          }
                        }}
                        className="p-1 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-200/60"
                        title="Copy email"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-stone-400 italic">Not provided</span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 font-semibold block">SERVICE NEEDED:</span>
                  <span className="font-semibold text-stone-900 bg-white px-2.5 py-0.5 rounded border border-stone-200 text-xs inline-block mt-0.5">
                    {selectedLead.service || "General Pest Inspection"}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-stone-500 font-semibold block">LOCATION / AREA:</span>
                  <span className="text-stone-800 font-medium flex items-center gap-1 mt-0.5 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {selectedLead.city || "Greater Toronto Area"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/80">
                <span className="text-[11px] text-stone-500 font-semibold block mb-1">INQUIRY / CALL DETAILS:</span>
                <p className="text-xs text-stone-800 bg-white p-2.5 rounded-lg border border-stone-200 leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message || "No extra comments provided."}
                </p>
              </div>
            </div>

            {/* Reply Options: Direct Admin Panel SMTP vs Manual External */}
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="flex border-b border-stone-200 bg-stone-50">
                <button
                  type="button"
                  onClick={() => setReplyTab("direct")}
                  className={`flex-1 py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    replyTab === "direct"
                      ? "bg-white text-[#BE2320] border-b-2 border-[#BE2320]"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  Reply via Email (Direct from Panel)
                </button>
                <button
                  type="button"
                  onClick={() => setReplyTab("manual")}
                  className={`flex-1 py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    replyTab === "manual"
                      ? "bg-white text-[#BE2320] border-b-2 border-[#BE2320]"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <MessageSquareReply className="w-3.5 h-3.5" />
                  Manual Options (Call / External App)
                </button>
              </div>

              <div className="p-4 space-y-3 bg-white">
                {replyTab === "direct" ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!replySubject.trim() || !replyMessage.trim() || !recipientEmail.trim()) {
                        toast.error("Please fill in recipient email, subject, and message");
                        return;
                      }
                      setSendingEmail(true);
                      try {
                        await sendLeadReplyAction({
                          leadId: selectedLead.id,
                          to: recipientEmail.trim(),
                          toName: selectedLead.name,
                          subject: replySubject,
                          replyMessage: replyMessage,
                          originalMessage: selectedLead.message,
                        });
                        toast.success(`Reply email sent directly to ${recipientEmail.trim()}`);
                        // Update local lead status & email
                        setLeads((prev) =>
                          prev.map((l) =>
                            l.id === selectedLead.id
                              ? { ...l, status: "CONTACTED", email: recipientEmail.trim() }
                              : l
                          )
                        );
                        setSelectedLead((p) =>
                          p
                            ? { ...p, status: "CONTACTED", email: recipientEmail.trim() }
                            : null
                        );
                      } catch (err: any) {
                        toast.error(
                          err.message || "Failed to send email reply. Check SMTP settings in .env."
                        );
                      } finally {
                        setSendingEmail(false);
                      }
                    }}
                    className="space-y-3"
                  >
                    {/* Quick Response Templates */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-stone-500">1-Click Templates:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setReplySubject(`Inspection Appointment - K2 Pest Control`);
                          setReplyMessage(
                            `Hi ${selectedLead.name},\n\nWe received your inquiry regarding ${selectedLead.service || "pest inspection"}.\n\nOur certified technician is available to perform an on-site inspection in ${selectedLead.city || "your area"}. Would tomorrow morning or afternoon work better for you?\n\nBest regards,\nK2 Pest Control Dispatch Team\nPhone: (416) 555-0199`
                          );
                        }}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] rounded-md font-medium cursor-pointer"
                      >
                        📅 Schedule Inspection
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReplySubject(`Pest Control Quote - ${selectedLead.service || "K2 Pest Control"}`);
                          setReplyMessage(
                            `Hi ${selectedLead.name},\n\nThank you for requesting a quote for ${selectedLead.service || "pest removal"}.\n\nOur standard treatment includes complete eradication, eco-safe application, and a 6-month written warranty. Please call us at (416) 555-0199 so we can finalize the booking.\n\nBest regards,\nK2 Pest Control Team`
                          );
                        }}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] rounded-md font-medium cursor-pointer"
                      >
                        💰 Quote Follow-up
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReplySubject(`Commercial Facility IPM Proposal - K2 Pest Control`);
                          setReplyMessage(
                            `Hi ${selectedLead.name},\n\nThank you for reaching out regarding commercial pest management for your facility in ${selectedLead.city || "the Greater Toronto Area"}.\n\nWe provide discrete, audit-ready IPM programs with digital health logbooks and 24/7 priority dispatch. Let us know when we can conduct your complimentary on-site walk-through.\n\nBest regards,\nK2 Commercial Division\nPhone: (416) 555-0199`
                          );
                        }}
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] rounded-md font-medium cursor-pointer"
                      >
                        🏢 Commercial Proposal
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                          Recipient Email Address <span className="text-[#BE2320]">*</span>
                        </label>
                        <input
                          type="email"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          placeholder="e.g. customer@example.com"
                          required
                          className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#BE2320] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                          Email Subject <span className="text-[#BE2320]">*</span>
                        </label>
                        <input
                          type="text"
                          value={replySubject}
                          onChange={(e) => setReplySubject(e.target.value)}
                          required
                          className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#BE2320] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                        Your Reply Message <span className="text-[#BE2320]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        required
                        placeholder="Write your email reply to the customer..."
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#BE2320] focus:bg-white leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-stone-400">
                        Dispatched live via SMTP credentials in <code className="bg-stone-100 px-1 py-0.5 rounded">.env</code>
                      </span>
                      <button
                        type="submit"
                        disabled={sendingEmail}
                        className="px-4 py-2 bg-[#BE2320] hover:bg-[#961c1a] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        {sendingEmail ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending Email...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Email to Customer</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                    <a
                      href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, "")}`}
                      className="p-3 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="text-xs font-bold block">Call Phone Directly</span>
                          <span className="text-[11px] text-emerald-700">{selectedLead.phone}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                    </a>

                    {selectedLead.email ? (
                      <a
                        href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(
                          `K2 Pest Control - ${selectedLead.service || "Inquiry"}`
                        )}`}
                        className="p-3 bg-sky-50 hover:bg-sky-100/80 border border-sky-200 rounded-xl text-sky-900 flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-sky-600" />
                          <div>
                            <span className="text-xs font-bold block">Open in Email App</span>
                            <span className="text-[11px] text-sky-700 truncate max-w-[150px] block">
                              {selectedLead.email}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                      </a>
                    ) : (
                      <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 text-xs flex items-center justify-center">
                        No email provided for mailto
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Status Movement */}
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-stone-500 font-medium">Pipeline Stage:</span>
                {PIPELINE_COLUMNS.map((col) => (
                  <button
                    key={col.key}
                    onClick={() => handleUpdateStatus(selectedLead.id, col.key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedLead.status === col.key
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setDeleteId(selectedLead.id)}
                className="text-xs text-red-600 hover:text-red-800 font-semibold p-1 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Lead Record"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        confirmLabel="Delete Lead"
        onConfirm={handleDeleteLead}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
};
