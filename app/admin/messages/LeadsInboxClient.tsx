"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { updateLeadStatusAction, deleteLeadAction, sendLeadReplyAction } from "@/app/admin/actions";
import { LeadsKanbanBoard, PIPELINE_COLUMNS } from "./LeadsKanbanBoard";
import { LeadItem } from "./LeadCard";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"ALL" | "CHATBOT" | "WEB">("ALL");
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
      `Hi ${lead.name},\n\nThank you for reaching out to K2 Pest Control regarding your inquiry for ${lead.service || "pest inspection"}.\n\nOur certified technician can perform an on-site inspection and quote. What day and time works best for you?\n\nBest regards,\nK2 Pest Control Dispatch Team\nPhone: (416) 555-0199`
    );
  };

  // Keep local state in sync if initialSubmissions changes
  React.useEffect(() => {
    setLeads(initialSubmissions);
  }, [initialSubmissions]);

  // Lead Filtering
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const isChatbot =
        (lead.message && lead.message.includes("[Captured via AI Chatbot]")) ||
        (lead.service && lead.service.includes("AI Chatbot"));

      // Source Filter
      if (sourceFilter === "CHATBOT" && !isChatbot) return false;
      if (sourceFilter === "WEB" && isChatbot) return false;

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
    const chatbotCount = leads.filter(
      (l) =>
        (l.message && l.message.includes("[Captured via AI Chatbot]")) ||
        (l.service && l.service.includes("AI Chatbot"))
    ).length;

    return { total, newCount, inPipeline, closedCount, chatbotCount };
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
      const stageName =
        PIPELINE_COLUMNS.find((c) => c.key === newStatus)?.label || newStatus;
      toast.success(`Lead moved to ${stageName}`);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setLeads(previousLeads);
      toast.error("Failed to update lead status. Reverting changes.");
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    const previousLeads = [...leads];

    // Optimistic Removal
    setLeads((prev) => prev.filter((l) => l.id !== deleteId));
    if (selectedLead?.id === deleteId) {
      setSelectedLead(null);
    }

    try {
      await deleteLeadAction(deleteId);
      toast.success("Lead record deleted successfully");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setLeads(previousLeads);
      toast.error("Failed to delete lead");
    } finally {
      setDeleteId(null);
    }
  };

  // Table Columns Definition
  const tableColumns: Column<LeadItem>[] = [
    {
      header: "Customer",
      cell: (item) => {
        const isChatbot =
          (item.message && item.message.includes("[Captured via AI Chatbot]")) ||
          (item.service && item.service.includes("AI Chatbot"));

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
                {isChatbot && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                    <Bot className="w-2.5 h-2.5" /> Bot
                  </span>
                )}
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
            onClick={() => setSelectedLead(item)}
            className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> View
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

        <div className="col-span-2 lg:col-span-1 bg-purple-50/60 p-4 rounded-xl border border-purple-200 shadow-2xs">
          <div className="flex items-center justify-between text-purple-800 text-xs font-semibold mb-1">
            <span>AI Bot Captured</span>
            <Bot className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-800 tracking-tight">{stats.chatbotCount}</p>
        </div>
      </div>

      {/* Control Bar: View Toggle, Search, and Source Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg w-fit">
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

        {/* Center/Right: Search and Source Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Source Filter Chips */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setSourceFilter("ALL")}
              className={`px-2.5 py-1.5 rounded-lg font-medium border transition-colors ${
                sourceFilter === "ALL"
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
              }`}
            >
              All Sources
            </button>
            <button
              onClick={() => setSourceFilter("CHATBOT")}
              className={`px-2.5 py-1.5 rounded-lg font-medium border flex items-center gap-1 transition-colors ${
                sourceFilter === "CHATBOT"
                  ? "bg-purple-700 text-white border-purple-700"
                  : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              }`}
            >
              <Bot className="w-3 h-3" /> AI Chatbot
            </button>
            <button
              onClick={() => setSourceFilter("WEB")}
              className={`px-2.5 py-1.5 rounded-lg font-medium border flex items-center gap-1 transition-colors ${
                sourceFilter === "WEB"
                  ? "bg-stone-700 text-white border-stone-700"
                  : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
              }`}
            >
              <Globe className="w-3 h-3" /> Web Form
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BE2320] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Views */}
      {viewMode === "kanban" ? (
        <LeadsKanbanBoard
          leads={filteredLeads}
          onUpdateStatus={handleUpdateStatus}
          onViewLead={handleOpenLead}
          onDeleteLead={(id) => setDeleteId(id)}
        />
      ) : (
        <div className="space-y-4">
          {/* Status Filter Pills for Table */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["ALL", ...PIPELINE_COLUMNS.map((c) => c.key)].map((st) => {
              const label =
                st === "ALL"
                  ? "All Stages"
                  : PIPELINE_COLUMNS.find((c) => c.key === st)?.label || st;
              const count =
                st === "ALL"
                  ? leads.length
                  : leads.filter((s) => (s.status || "NEW").toUpperCase() === st).length;

              return (
                <button
                  key={st}
                  onClick={() => setTableStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    tableStatusFilter === st
                      ? "bg-[#BE2320] text-white"
                      : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>

          <DataTable
            columns={tableColumns}
            data={filteredLeads}
            searchPlaceholder="Search leads in table..."
            emptyTitle="No Leads Found"
            emptyDescription="There are no inquiries matching your active filters."
          />
        </div>
      )}

      {/* Lead Details & Reply Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-5 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-4 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-stone-900">{selectedLead.name}</h3>
                  {selectedLead.message?.includes("[Captured via AI Chatbot]") && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      <Bot className="w-3 h-3" /> AI Chatbot
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500">
                  Received {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
              <StatusBadge status={selectedLead.status} />
            </div>

            {/* Lead Summary Grid */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 font-semibold block">PHONE NUMBER:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${selectedLead.phone.replace(/[^0-9+]/g, "")}`}
                      className="font-bold text-[#BE2320] hover:underline flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
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
                    <span className="text-xs text-stone-400 italic">Not provided by customer</span>
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
                <span className="text-[11px] text-stone-500 font-semibold block mb-1">CUSTOMER INQUIRY:</span>
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
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] rounded-md font-medium"
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
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] rounded-md font-medium"
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
                        className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] rounded-md font-medium"
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
                      <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-400 flex items-center gap-2 text-xs">
                        <Mail className="w-4 h-4" />
                        <span>No Email Provided</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stage Status Updater */}
            <div className="pt-3 border-t border-stone-100 space-y-2">
              <span className="text-xs font-bold text-stone-600 block">
                Update Workflow Progress Stage:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PIPELINE_COLUMNS.map((col) => {
                  const isCurrent =
                    (selectedLead.status || "NEW").toUpperCase() === col.key;
                  return (
                    <button
                      key={col.key}
                      onClick={() => handleUpdateStatus(selectedLead.id, col.key)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                        isCurrent
                          ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                          : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {col.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delete Trigger */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setDeleteId(selectedLead.id);
                }}
                className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete this lead
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Lead Record"
        message="Are you sure you want to delete this lead from your CRM pipeline? This action cannot be undone."
        confirmLabel="Delete Lead"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
};
