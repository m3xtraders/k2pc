"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ShieldCheck,
  Award,
  Search,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  RotateCcw,
  CircleDollarSign,
  Printer,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Eye,
  Send,
  Loader2,
  Trash2,
} from "lucide-react";
import { updateLeadStatusAction, updateLeadNotesAction, sendLeadReplyAction, deleteLeadAction } from "@/app/admin/actions";
import { WarrantyCertificateModal } from "./WarrantyCertificateModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

interface WarrantyItem {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  service?: string | null;
  message?: string | null;
  status: string;
  createdAt: string | Date;
}

interface WarrantiesClientProps {
  initialRecords: WarrantyItem[];
  companyDetails?: any;
}

export const WarrantiesClient: React.FC<WarrantiesClientProps> = ({
  initialRecords,
  companyDetails,
}) => {
  const [records, setRecords] = useState<WarrantyItem[]>(initialRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"ALL" | "ACTIVE" | "EXPIRED" | "RETREATMENT" | "REFUND">("ALL");
  const [selectedRecord, setSelectedRecord] = useState<WarrantyItem | null>(null);
  const [certificateRecord, setCertificateRecord] = useState<WarrantyItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Claim Re-treatment modal state
  const [retreatmentModalOpen, setRetreatmentModalOpen] = useState(false);
  const [retreatmentRecord, setRetreatmentRecord] = useState<WarrantyItem | null>(null);
  const [retreatmentNotes, setRetreatmentNotes] = useState("");
  const [retreatmentDate, setRetreatmentDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSavingRetreatment, setIsSavingRetreatment] = useState(false);

  // Money back refund modal state
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundRecord, setRefundRecord] = useState<WarrantyItem | null>(null);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [isSavingRefund, setIsSavingRefund] = useState(false);

  // Email state
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailRecord, setEmailRecord] = useState<WarrantyItem | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Calculate warranty metrics & countdowns
  const processedRecords = useMemo(() => {
    return records.map((record) => {
      const serviceDate = new Date(record.createdAt);
      const warrantyExpiry = new Date(serviceDate.getTime() + 180 * 24 * 60 * 60 * 1000);
      const isExpired = new Date() > warrantyExpiry;
      const daysRemaining = isExpired
        ? 0
        : Math.max(0, Math.ceil((warrantyExpiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

      const hasRetreatment = record.message?.includes("[Warranty Re-treatment]");
      const hasRefund = record.message?.includes("[100% Money-Back Refund]");

      return {
        ...record,
        serviceDate,
        warrantyExpiry,
        isExpired,
        daysRemaining,
        hasRetreatment,
        hasRefund,
      };
    });
  }, [records]);

  // Filter records
  const filteredRecords = useMemo(() => {
    return processedRecords.filter((rec) => {
      if (filterTab === "ACTIVE" && rec.isExpired) return false;
      if (filterTab === "EXPIRED" && !rec.isExpired) return false;
      if (filterTab === "RETREATMENT" && !rec.hasRetreatment) return false;
      if (filterTab === "REFUND" && !rec.hasRefund) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = rec.name?.toLowerCase().includes(q);
        const matchesPhone = rec.phone?.toLowerCase().includes(q);
        const matchesEmail = rec.email?.toLowerCase().includes(q);
        const matchesCity = rec.city?.toLowerCase().includes(q);
        const matchesService = rec.service?.toLowerCase().includes(q);
        const matchesMsg = rec.message?.toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesEmail || matchesCity || matchesService || matchesMsg;
      }

      return true;
    });
  }, [processedRecords, filterTab, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = processedRecords.length;
    const active = processedRecords.filter((r) => !r.isExpired).length;
    const expired = processedRecords.filter((r) => r.isExpired).length;
    const retreatments = processedRecords.filter((r) => r.hasRetreatment).length;
    const refunds = processedRecords.filter((r) => r.hasRefund).length;
    return { total, active, expired, retreatments, refunds };
  }, [processedRecords]);

  // Handle Log Warranty Re-treatment
  const handleSaveRetreatment = async () => {
    if (!retreatmentRecord) return;
    setIsSavingRetreatment(true);

    const logEntry = `\n\n[Warranty Re-treatment Logged on ${new Date().toLocaleDateString()}] Scheduled for: ${retreatmentDate}. Reason/Notes: ${retreatmentNotes.trim() || "Customer requested warranty check."}`;
    const updatedMessage = (retreatmentRecord.message || "") + logEntry;

    try {
      await updateLeadNotesAction(retreatmentRecord.id, updatedMessage);
      setRecords((prev) =>
        prev.map((r) => (r.id === retreatmentRecord.id ? { ...r, message: updatedMessage } : r))
      );
      toast.success("Free Warranty Re-treatment visit logged successfully!");
      setRetreatmentModalOpen(false);
      setRetreatmentNotes("");
    } catch (error) {
      toast.error("Failed to log re-treatment visit.");
    } finally {
      setIsSavingRetreatment(false);
    }
  };

  // Handle Money-Back Refund
  const handleSaveRefund = async () => {
    if (!refundRecord) return;
    setIsSavingRefund(true);

    const logEntry = `\n\n[100% Money-Back Refund Processed on ${new Date().toLocaleDateString()}] Amount: ${refundAmount || "Full Refund"}. Reason: ${refundReason.trim() || "100% Satisfaction Guarantee Claimed"}`;
    const updatedMessage = (refundRecord.message || "") + logEntry;

    try {
      await updateLeadNotesAction(refundRecord.id, updatedMessage);
      setRecords((prev) =>
        prev.map((r) => (r.id === refundRecord.id ? { ...r, message: updatedMessage } : r))
      );
      toast.success("Money-Back Guarantee refund record saved!");
      setRefundModalOpen(false);
      setRefundAmount("");
      setRefundReason("");
    } catch (error) {
      toast.error("Failed to save refund record.");
    } finally {
      setIsSavingRefund(false);
    }
  };

  // Re-open job back to active pipeline
  const handleReopenJob = async (id: string) => {
    try {
      await updateLeadStatusAction(id, "IN_PROGRESS");
      setRecords((prev) => prev.filter((r) => r.id !== id));
      toast.success("Job re-opened and moved back to Active Bookings Pipeline!");
    } catch (error) {
      toast.error("Failed to re-open job.");
    }
  };

  // Delete Record
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteLeadAction(deleteId);
      setRecords((prev) => prev.filter((r) => r.id !== deleteId));
      toast.success("Record deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete record.");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono-data font-bold uppercase tracking-wider border border-emerald-200 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>6-Month Guarantee Registry</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            Warranty &amp; Completed Service Records
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Track 6-month written warranty windows, free re-treatment claims, official certificates, and 100% money-back guarantee records for completed jobs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/admin/bookings"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>&larr; View Active Bookings</span>
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium mb-1">
            <span>Completed Jobs</span>
            <FileCheck className="w-4 h-4 text-stone-400" />
          </div>
          <p className="text-2xl font-black text-stone-900 tracking-tight">{stats.total}</p>
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-semibold mb-1">
            <span>Active Warranties</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800 tracking-tight">{stats.active}</p>
        </div>

        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-stone-600 text-xs font-medium mb-1">
            <span>Expired Warranties</span>
            <Clock className="w-4 h-4 text-stone-400" />
          </div>
          <p className="text-2xl font-black text-stone-700 tracking-tight">{stats.expired}</p>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-semibold mb-1">
            <span>Re-treatments Logged</span>
            <RotateCcw className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-800 tracking-tight">{stats.retreatments}</p>
        </div>

        <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 shadow-2xs">
          <div className="flex items-center justify-between text-rose-800 text-xs font-semibold mb-1">
            <span>Refund Records</span>
            <CircleDollarSign className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-800 tracking-tight">{stats.refunds}</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs">
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterTab("ALL")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filterTab === "ALL"
                ? "bg-stone-900 text-white shadow-xs"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All Records ({records.length})
          </button>
          <button
            onClick={() => setFilterTab("ACTIVE")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filterTab === "ACTIVE"
                ? "bg-emerald-700 text-white shadow-xs"
                : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            Active 6-Mo Warranty ({stats.active})
          </button>
          <button
            onClick={() => setFilterTab("EXPIRED")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filterTab === "EXPIRED"
                ? "bg-stone-700 text-white shadow-xs"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Expired ({stats.expired})
          </button>
          <button
            onClick={() => setFilterTab("RETREATMENT")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filterTab === "RETREATMENT"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            Re-treatments ({stats.retreatments})
          </button>
          <button
            onClick={() => setFilterTab("REFUND")}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filterTab === "REFUND"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100"
            }`}
          >
            Refunds ({stats.refunds})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customer, phone, notes..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BE2320] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Record Cards List */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-lg text-stone-900">
            No Warranty Records Found
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            When bookings or quote requests in your pipeline are converted to <strong>"Closed / Won"</strong> or <strong>"Completed"</strong>, they automatically appear here with full 6-month warranty tracking and money-back guarantee records.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-xs font-bold rounded-xl transition-colors"
            >
              <span>Go to Bookings Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRecords.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all p-5 sm:p-6 space-y-4"
            >
              {/* Card Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-stone-100">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-2xs">
                    {(item.name || "C")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading font-bold text-lg text-stone-950">
                        {item.name}
                      </h3>
                      {item.isExpired ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-mono-data font-bold border border-stone-200">
                          <Clock className="w-3 h-3" />
                          <span>Warranty Expired</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono-data font-bold border border-emerald-200 shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active Warranty ({item.daysRemaining} days left)</span>
                        </span>
                      )}

                      {item.hasRetreatment && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-mono-data font-bold border border-amber-300">
                          <RotateCcw className="w-3 h-3 text-amber-700" />
                          <span>Re-treatment Claimed</span>
                        </span>
                      )}

                      {item.hasRefund && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 text-[10px] font-mono-data font-bold border border-rose-300">
                          <CircleDollarSign className="w-3 h-3 text-rose-700" />
                          <span>Refunded</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-stone-500 font-mono-data">
                      <span>Service: <strong className="text-stone-900">{item.service || "General Inspection"}</strong></span>
                      <span>&bull;</span>
                      <span>Completed: <strong className="text-stone-900">{item.serviceDate.toLocaleDateString()}</strong></span>
                      <span>&bull;</span>
                      <span>Expires: <strong className="text-stone-900">{item.warrantyExpiry.toLocaleDateString()}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCertificateRecord(item)}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-action-yellow" />
                    <span>Certificate</span>
                  </button>

                  <button
                    onClick={() => {
                      setRetreatmentRecord(item);
                      setRetreatmentModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                    <span>Claim Re-treatment</span>
                  </button>

                  <button
                    onClick={() => {
                      setRefundRecord(item);
                      setRefundModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CircleDollarSign className="w-3.5 h-3.5 text-rose-700" />
                    <span>Money-Back Record</span>
                  </button>

                  <button
                    onClick={() => handleReopenJob(item.id)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                    title="Move back to Active Pipeline"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Customer Contact & Treatment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
                  <span className="text-[10px] font-mono-data font-bold uppercase text-stone-400 block">Contact Info</span>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <a href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`} className="font-bold text-stone-900 hover:text-[#BE2320] hover:underline">
                      {item.phone}
                    </a>
                  </div>
                  {item.email && (
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <a href={`mailto:${item.email}`} className="text-stone-700 hover:underline truncate">
                        {item.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.city || "Saskatoon & Area"}</span>
                  </div>
                </div>

                <div className="md:col-span-2 p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
                  <span className="text-[10px] font-mono-data font-bold uppercase text-stone-400 block">
                    Service Details &amp; Warranty Log
                  </span>
                  <p className="text-stone-800 leading-relaxed whitespace-pre-wrap line-clamp-3">
                    {item.message || "Standard treatment completed. Backed by 6-month written warranty."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      <WarrantyCertificateModal
        record={certificateRecord}
        isOpen={Boolean(certificateRecord)}
        onClose={() => setCertificateRecord(null)}
        licenseNumber={companyDetails?.licenseNumber}
      />

      {/* Claim Free Warranty Re-treatment Modal */}
      {retreatmentModalOpen && retreatmentRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setRetreatmentModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-amber-600" />
                <h3 className="font-heading font-bold text-base text-stone-900">
                  Log Free Warranty Re-treatment
                </h3>
              </div>
              <button
                onClick={() => setRetreatmentModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">Customer: {retreatmentRecord.name} ({retreatmentRecord.phone})</p>
              <p>Service: {retreatmentRecord.service || "Pest Extermination"}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Scheduled Re-treatment Date
                </label>
                <input
                  type="date"
                  value={retreatmentDate}
                  onChange={(e) => setRetreatmentDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Re-treatment Notes / Reported Pest Activity
                </label>
                <textarea
                  rows={3}
                  value={retreatmentNotes}
                  onChange={(e) => setRetreatmentNotes(e.target.value)}
                  placeholder="e.g. Customer reported sighting ants near basement wall. Technician dispatched for complimentary perimeter touch-up."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setRetreatmentModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRetreatment}
                disabled={isSavingRetreatment}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                {isSavingRetreatment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                <span>Save Re-treatment Visit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 100% Money-Back Guarantee Refund Modal */}
      {refundModalOpen && refundRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setRefundModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="w-5 h-5 text-rose-600" />
                <h3 className="font-heading font-bold text-base text-stone-900">
                  Log 100% Money-Back Guarantee Refund
                </h3>
              </div>
              <button
                onClick={() => setRefundModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
              <p className="font-bold">Customer: {refundRecord.name} ({refundRecord.phone})</p>
              <p>Service: {refundRecord.service || "Pest Extermination"}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Refund Amount ($)
                </label>
                <input
                  type="text"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="e.g. $250.00 (Full 100% Refund)"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Refund Reason / Guarantee Terms
                </label>
                <textarea
                  rows={3}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="e.g. Customer exercised 100% money-back guarantee in writing after 2 follow-ups. Full refund sent via E-transfer."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setRefundModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRefund}
                disabled={isSavingRefund}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                {isSavingRefund ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CircleDollarSign className="w-3.5 h-3.5" />}
                <span>Record Refund</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Warranty Record"
        message="Are you sure you want to permanently delete this completed record? This cannot be undone."
        confirmLabel="Delete Record"
        isDestructive
      />
    </div>
  );
};
