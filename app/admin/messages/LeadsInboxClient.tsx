"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { updateLeadStatusAction, deleteLeadAction } from "@/app/admin/actions";
import { Eye, Trash2, Phone, Mail, MapPin, Calendar, X, CheckCircle } from "lucide-react";

interface LeadsInboxClientProps {
  initialSubmissions: any[];
}

export const LeadsInboxClient: React.FC<LeadsInboxClientProps> = ({ initialSubmissions }) => {
  const router = useRouter();
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredSubmissions = React.useMemo(() => {
    if (statusFilter === "ALL") return initialSubmissions;
    return initialSubmissions.filter((s) => s.status === statusFilter);
  }, [initialSubmissions, statusFilter]);

  const handleUpdateStatus = async (id: string, status: "NEW" | "CONTACTED" | "CLOSED") => {
    try {
      await updateLeadStatusAction(id, status);
      toast.success(`Lead status updated to ${status}`);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev: any) => ({ ...prev, status }));
      }
      router.refresh();
    } catch (error) {
      toast.error("Failed to update lead status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteLeadAction(deleteId);
      toast.success("Lead submission deleted");
      if (selectedLead?.id === deleteId) {
        setSelectedLead(null);
      }
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete lead");
    } finally {
      setDeleteId(null);
    }
  };

  const columns: Column<any>[] = [
    {
      header: "Customer Name",
      cell: (item) => (
        <div>
          <span className="font-semibold text-stone-900 block">{item.name}</span>
          <span className="text-xs text-stone-500">{item.phone}</span>
        </div>
      ),
    },
    {
      header: "Service Requested",
      cell: (item) => (
        <span className="text-xs font-medium text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
          {item.service || item.serviceNeeded || "General"}
        </span>
      ),
    },
    {
      header: "City / Address",
      cell: (item) => (
        <span className="text-xs text-stone-600">
          {item.city || item.addressOrCity || "GTA"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: "Date Received",
      cell: (item) => (
        <span className="text-xs text-stone-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-2">
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
    <div className="space-y-4">
      {/* Status Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["ALL", "NEW", "CONTACTED", "CLOSED"].map((st) => {
          const count =
            st === "ALL"
              ? initialSubmissions.length
              : initialSubmissions.filter((s) => s.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? "bg-[#BE2320] text-white"
                  : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      <DataTable
        columns={columns}
        data={filteredSubmissions}
        searchPlaceholder="Search leads by customer name, phone, city, or service..."
        searchFilter={(item, query) =>
          item.name.toLowerCase().includes(query) ||
          item.phone.toLowerCase().includes(query) ||
          (item.city && item.city.toLowerCase().includes(query)) ||
          (item.service && item.service.toLowerCase().includes(query))
        }
        emptyTitle="No Leads Found"
        emptyDescription="There are no contact form submissions matching this filter."
      />

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 p-6 space-y-6">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{selectedLead.name}</h3>
                <p className="text-xs text-stone-500">
                  Received {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
              <StatusBadge status={selectedLead.status} />
            </div>

            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#BE2320]" />
                <a href={`tel:${selectedLead.phone}`} className="font-semibold text-stone-900 hover:underline">
                  {selectedLead.phone}
                </a>
              </div>

              {selectedLead.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <a href={`mailto:${selectedLead.email}`} className="text-stone-700 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-stone-400" />
                <span>Location: {selectedLead.city || selectedLead.addressOrCity || "Not provided"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span>Service: {selectedLead.service || selectedLead.serviceNeeded || "General Inspection"}</span>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Customer Message</p>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message || "No additional comments left by customer."}
                </div>
              </div>
            </div>

            {/* Quick Status Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-stone-500">Update Lead Status:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedLead.id, "NEW")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    selectedLead.status === "NEW"
                      ? "bg-rose-600 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Mark New
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedLead.id, "CONTACTED")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    selectedLead.status === "CONTACTED"
                      ? "bg-sky-600 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedLead.id, "CLOSED")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    selectedLead.status === "CLOSED"
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Mark Closed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Lead Submission"
        message="Are you sure you want to delete this contact submission?"
        confirmLabel="Delete Lead"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
};
