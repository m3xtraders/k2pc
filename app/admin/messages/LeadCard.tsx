"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Bot,
  Globe,
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle2,
  ArrowRight,
  GripVertical,
  Camera,
  MessageCircle,
  PhoneCall,
  Megaphone,
  Users,
  UserPlus,
} from "lucide-react";

export interface LeadItem {
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

interface LeadCardProps {
  lead: LeadItem;
  onView: (lead: LeadItem) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: string) => void;
  availableStatuses: { key: string; label: string; color: string }[];
  isDragging?: boolean;
}

export function getLeadSourceInfo(lead: LeadItem) {
  const msg = lead.message || "";
  const srv = lead.service || "";

  if (msg.includes("[Captured via AI Chatbot]") || srv.includes("AI Chatbot")) {
    return { label: "AI Chatbot", icon: Bot, badgeClass: "bg-purple-50 text-purple-700 border-purple-200" };
  }
  if (msg.includes("[Source: Instagram]") || msg.toLowerCase().includes("instagram")) {
    return { label: "Instagram", icon: Camera, badgeClass: "bg-pink-50 text-pink-700 border-pink-200" };
  }
  if (msg.includes("[Source: WhatsApp]") || msg.toLowerCase().includes("whatsapp")) {
    return { label: "WhatsApp", icon: MessageCircle, badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200" };
  }
  if (msg.includes("[Source: Phone Call]") || msg.includes("[Source: Call]")) {
    return { label: "Phone Call", icon: PhoneCall, badgeClass: "bg-blue-50 text-blue-700 border-blue-200" };
  }
  if (msg.includes("[Source: Ads]") || msg.includes("[Source: Google Ads]") || msg.includes("[Source: Facebook Ads]")) {
    return { label: "Paid Ads", icon: Megaphone, badgeClass: "bg-amber-50 text-amber-800 border-amber-200" };
  }
  if (msg.includes("[Source: Referral]")) {
    return { label: "Referral", icon: Users, badgeClass: "bg-teal-50 text-teal-700 border-teal-200" };
  }
  if (msg.includes("[Source: Walk-in]") || msg.includes("[Source: Manual]")) {
    return { label: "Manual Entry", icon: UserPlus, badgeClass: "bg-stone-100 text-stone-800 border-stone-300" };
  }
  return { label: "Web Form", icon: Globe, badgeClass: "bg-stone-100 text-stone-700 border-stone-200" };
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onView,
  onDelete,
  onUpdateStatus,
  availableStatuses,
  isDragging = false,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const sourceInfo = getLeadSourceInfo(lead);
  const SourceIcon = sourceInfo.icon;

  const getCleanMessage = (msg?: string | null) => {
    if (!msg) return "";
    return msg
      .replace(/\[Captured via AI Chatbot[^\]]*\]:?\s*/i, "")
      .replace(/\[Source:[^\]]*\]:?\s*/i, "")
      .replace(/Full user inquiry:\s*"?/i, "")
      .replace(/"$/, "")
      .trim();
  };

  const cleanMessage = getCleanMessage(lead.message);

  const formatTimeAgo = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", lead.id);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`group relative bg-white rounded-xl border p-4 shadow-xs transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-stone-400 ${
        isDragging
          ? "opacity-50 scale-95 border-dashed border-[#BE2320]"
          : "border-stone-200/90"
      }`}
    >
      {/* Header with Source & Menu */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          <GripVertical className="w-3.5 h-3.5 text-stone-300 group-hover:text-stone-500 shrink-0 transition-colors" />
          
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${sourceInfo.badgeClass}`}>
            <SourceIcon className="w-3 h-3" />
            {sourceInfo.label}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[11px] font-medium text-stone-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTimeAgo(lead.createdAt)}
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
              title="Quick Actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-6 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 text-xs">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onView(lead);
                    }}
                    className="w-full px-3 py-1.5 text-left text-stone-700 hover:bg-stone-100 flex items-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    View Details &amp; Reply
                  </button>

                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-t border-stone-100 mt-1">
                    Move Stage To:
                  </div>

                  {availableStatuses
                    .filter((st) => st.key !== lead.status)
                    .map((st) => (
                      <button
                        key={st.key}
                        onClick={() => {
                          setShowMenu(false);
                          onUpdateStatus(lead.id, st.key);
                        }}
                        className="w-full px-3 py-1.5 text-left text-stone-600 hover:bg-stone-50 flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3 text-stone-400" />
                        {st.label}
                      </button>
                    ))}

                  <div className="border-t border-stone-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDelete(lead.id);
                      }}
                      className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Lead
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Customer Name & Initials */}
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-stone-800 to-stone-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
          {getInitials(lead.name || "Customer")}
        </div>
        <div className="min-w-0 flex-1">
          <h4
            onClick={() => onView(lead)}
            className="text-sm font-bold text-stone-900 truncate hover:text-[#BE2320] cursor-pointer transition-colors"
          >
            {lead.name}
          </h4>
          <p className="text-xs text-stone-500 truncate flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 text-stone-400 shrink-0" />
            <a
              href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-[#BE2320] hover:underline"
            >
              {lead.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Service & City Tags */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
        {lead.service && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-800 border border-stone-200 truncate max-w-[180px]">
            {lead.service.replace("AI Chatbot Inquiry", "Chat Inquiry")}
          </span>
        )}
        {lead.city && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-50 text-stone-600 border border-stone-200">
            <MapPin className="w-2.5 h-2.5 text-stone-400" />
            {lead.city}
          </span>
        )}
      </div>

      {/* Message Snippet */}
      {cleanMessage && (
        <p className="text-xs text-stone-600 line-clamp-2 bg-stone-50/70 p-2 rounded-lg border border-stone-100/90 leading-relaxed mb-2.5">
          {cleanMessage}
        </p>
      )}

      {/* Completed Job Warranty Callout */}
      {lead.status === "CLOSED" && (
        <div className="mb-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-[11px] text-emerald-900">
          <span className="font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            6-Month Warranty Active
          </span>
          <a
            href="/admin/warranties"
            onClick={(e) => e.stopPropagation()}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline text-[10px]"
          >
            View Record &rarr;
          </a>
        </div>
      )}

      {/* Footer Quick Action Buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100 gap-2">
        <a
          href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
        >
          <Phone className="w-3 h-3" />
          Call
        </a>

        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-lg transition-colors"
            title={lead.email}
          >
            <Mail className="w-3 h-3" />
            Email
          </a>
        )}

        <button
          type="button"
          onClick={() => onView(lead)}
          className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-[#BE2320] hover:text-[#961c1a] hover:bg-red-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
        >
          <Eye className="w-3 h-3" />
          Reply
        </button>
      </div>
    </div>
  );
};
