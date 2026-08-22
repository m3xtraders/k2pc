"use client";

import React, { useState } from "react";
import { LeadCard, LeadItem } from "./LeadCard";
import {
  Inbox,
  PhoneCall,
  CalendarCheck,
  Wrench,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

export interface PipelineColumn {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentBar: string;
}

export const PIPELINE_COLUMNS: PipelineColumn[] = [
  {
    key: "NEW",
    label: "New Leads",
    description: "Fresh inquiries from Chatbot & Forms",
    icon: Inbox,
    color: "rose",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700 border-rose-200",
    borderColor: "border-rose-200",
    accentBar: "bg-rose-500",
  },
  {
    key: "CONTACTED",
    label: "Contacted",
    description: "Initial follow-up in progress",
    icon: PhoneCall,
    color: "sky",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700 border-sky-200",
    borderColor: "border-sky-200",
    accentBar: "bg-sky-500",
  },
  {
    key: "SCHEDULED",
    label: "Scheduled",
    description: "Inspection / Treatment appointment set",
    icon: CalendarCheck,
    color: "amber",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800 border-amber-300",
    borderColor: "border-amber-200",
    accentBar: "bg-amber-500",
  },
  {
    key: "IN_PROGRESS",
    label: "In Progress",
    description: "Active pest treatment / Quote review",
    icon: Wrench,
    color: "purple",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700 border-purple-200",
    borderColor: "border-purple-200",
    accentBar: "bg-purple-500",
  },
  {
    key: "CLOSED",
    label: "Closed / Won",
    description: "Job completed & customer satisfied",
    icon: CheckCircle,
    color: "emerald",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700 border-emerald-200",
    borderColor: "border-emerald-200",
    accentBar: "bg-emerald-500",
  },
  {
    key: "LOST",
    label: "Lost / Cancelled",
    description: "Unqualified, unreachable, or cancelled",
    icon: XCircle,
    color: "stone",
    badgeBg: "bg-stone-100",
    badgeText: "text-stone-600 border-stone-200",
    borderColor: "border-stone-200",
    accentBar: "bg-stone-400",
  },
];

interface LeadsKanbanBoardProps {
  leads: LeadItem[];
  onUpdateStatus: (leadId: string, newStatus: string) => Promise<void>;
  onViewLead: (lead: LeadItem) => void;
  onDeleteLead: (leadId: string) => void;
}

export const LeadsKanbanBoard: React.FC<LeadsKanbanBoardProps> = ({
  leads,
  onUpdateStatus,
  onViewLead,
  onDeleteLead,
}) => {
  const [activeDropColumn, setActiveDropColumn] = useState<string | null>(null);

  const availableStatuses = PIPELINE_COLUMNS.map((c) => ({
    key: c.key,
    label: c.label,
    color: c.color,
  }));

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, colKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (activeDropColumn !== colKey) {
      setActiveDropColumn(colKey);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>, colKey: string) => {
    // Only reset if leaving the column container entirely
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (activeDropColumn === colKey) {
      setActiveDropColumn(null);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, colKey: string) => {
    e.preventDefault();
    setActiveDropColumn(null);
    const leadId = e.dataTransfer.getData("text/plain");

    if (!leadId) return;

    const targetLead = leads.find((l) => l.id === leadId);
    if (targetLead && targetLead.status !== colKey) {
      await onUpdateStatus(leadId, colKey);
    }
  };

  return (
    <div className="overflow-x-auto pb-6">
      <div className="inline-flex gap-4 min-w-full items-start">
        {PIPELINE_COLUMNS.map((column) => {
          const columnLeads = leads.filter(
            (l) => (l.status || "NEW").toUpperCase() === column.key
          );
          const Icon = column.icon;
          const isOver = activeDropColumn === column.key;

          return (
            <div
              key={column.key}
              onDragOver={(e) => handleDragOver(e, column.key)}
              onDragLeave={(e) => handleDragLeave(e, column.key)}
              onDrop={(e) => handleDrop(e, column.key)}
              className={`w-80 shrink-0 bg-stone-100/70 rounded-2xl p-3 flex flex-col max-h-[calc(100vh-220px)] border transition-all duration-200 ${
                isOver
                  ? "border-[#BE2320] bg-red-50/40 ring-2 ring-[#BE2320]/20 scale-[1.01]"
                  : "border-stone-200/80 shadow-2xs"
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-stone-200/80 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.accentBar}`} />
                  <Icon className="w-4 h-4 text-stone-700" />
                  <h3 className="font-bold text-sm text-stone-900">{column.label}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold border ${column.badgeBg} ${column.badgeText}`}
                >
                  {columnLeads.length}
                </span>
              </div>

              {/* Column Description */}
              <p className="text-[11px] text-stone-500 px-1 mb-3 truncate" title={column.description}>
                {column.description}
              </p>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                {columnLeads.length > 0 ? (
                  columnLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onView={onViewLead}
                      onDelete={onDeleteLead}
                      onUpdateStatus={onUpdateStatus}
                      availableStatuses={availableStatuses}
                    />
                  ))
                ) : (
                  <div
                    className={`h-32 rounded-xl border border-dashed flex flex-col items-center justify-center p-4 text-center transition-colors ${
                      isOver
                        ? "border-[#BE2320] bg-red-50 text-[#BE2320]"
                        : "border-stone-300/80 bg-white/40 text-stone-400"
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1 opacity-50" />
                    <span className="text-xs font-medium">
                      {isOver ? "Drop Lead Here" : "No leads in this stage"}
                    </span>
                    <span className="text-[10px] text-stone-400 mt-0.5">
                      Drag cards here to advance
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
