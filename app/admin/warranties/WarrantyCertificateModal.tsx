"use client";

import React, { useRef } from "react";
import { ShieldCheck, Award, Printer, X, CheckCircle2, Calendar, MapPin, Phone, Mail, User } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";

interface WarrantyRecord {
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

interface WarrantyCertificateModalProps {
  record: WarrantyRecord | null;
  isOpen: boolean;
  onClose: () => void;
  licenseNumber?: string;
}

export const WarrantyCertificateModal: React.FC<WarrantyCertificateModalProps> = ({
  record,
  isOpen,
  onClose,
  licenseNumber = "A-003789",
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !record) return null;

  const startDate = new Date(record.createdAt);
  const expiryDate = new Date(startDate.getTime() + 180 * 24 * 60 * 60 * 1000);
  const isExpired = new Date() > expiryDate;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto space-y-6 animate-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#BE2320]" />
            <span className="font-heading font-bold text-lg text-stone-900">
              Official Service Warranty &amp; Guarantee Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Box */}
        <div
          ref={certificateRef}
          className="border-4 border-double border-stone-800 p-6 sm:p-10 rounded-xl bg-gradient-to-b from-stone-50 via-white to-stone-50 space-y-8 relative overflow-hidden"
        >
          {/* Subtle Watermark Badge in Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none -z-0">
            <ShieldCheck className="w-[500px] h-[500px] text-stone-900" />
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 border-b-2 border-stone-200 pb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BE2320]/10 text-[#BE2320] text-xs font-mono-data font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Saskatchewan Ministry Licensed &amp; Insured</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-stone-950 tracking-tight">
              {COMPANY_DETAILS.name || "K2 Pest Control"}
            </h1>

            <p className="text-xs font-mono-data text-stone-600">
              Certificate ID: <strong className="text-stone-900">{record.id.slice(0, 10).toUpperCase()}</strong> &bull; License No: <strong className="text-[#BE2320]">{licenseNumber}</strong>
            </p>
          </div>

          {/* Customer & Service Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 text-xs sm:text-sm">
            <div className="bg-white/80 p-4 rounded-xl border border-stone-200 space-y-2">
              <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-stone-500 block">
                Customer &amp; Property Information
              </span>
              <div className="space-y-1 text-stone-800">
                <div className="flex items-center gap-2 font-bold text-stone-950 text-base">
                  <User className="w-4 h-4 text-stone-500" />
                  <span>{record.name}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{record.phone}</span>
                </div>
                {record.email && (
                  <div className="flex items-center gap-2 text-stone-600">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{record.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{record.city || "Saskatoon & Area"}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded-xl border border-stone-200 space-y-2">
              <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-stone-500 block">
                Warranty &amp; Service Coverage
              </span>
              <div className="space-y-1.5 text-stone-800">
                <div>
                  <span className="text-xs text-stone-500 block">Service Performed:</span>
                  <span className="font-bold text-stone-900 text-sm">{record.service || "Pest Extermination & Exclusion"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono-data text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block">SERVICE DATE</span>
                    <span className="font-semibold text-stone-800">{startDate.toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block">WARRANTY EXPIRES</span>
                    <span className={`font-bold ${isExpired ? "text-stone-500" : "text-emerald-700"}`}>
                      {expiryDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee Terms Box */}
          <div className="bg-[#BE2320]/5 border border-[#BE2320]/20 rounded-xl p-5 space-y-3 relative z-10">
            <h3 className="font-heading font-bold text-sm text-[#BE2320] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Written 6-Month Re-treatment &amp; Money-Back Terms</span>
            </h3>
            <ul className="text-xs text-stone-700 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Free Re-treatments:</strong> If covered pests re-appear within the 6-month period, K2 Pest Control will re-treat the treated areas at zero additional cost.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>100% Money-Back Guarantee:</strong> If the pest problem cannot be eliminated after necessary follow-up treatments, a full refund is issued upon customer request.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Ministry Licensed:</strong> Executed in accordance with Saskatchewan Ministry of Environment pesticide application regulations.</span>
              </li>
            </ul>
          </div>

          {/* Signatures & Verification */}
          <div className="pt-6 border-t border-stone-200 grid grid-cols-2 gap-8 text-center relative z-10">
            <div className="space-y-1">
              <div className="h-10 border-b border-stone-400 flex items-end justify-center pb-1">
                <span className="font-heading font-bold text-stone-900 text-sm">K2 Pest Control Dispatch</span>
              </div>
              <span className="text-[10px] font-mono-data text-stone-500 uppercase">Authorized Technician / Officer</span>
            </div>

            <div className="space-y-1">
              <div className="h-10 border-b border-stone-400 flex items-end justify-center pb-1">
                <span className="font-mono-data text-stone-700 text-xs">{record.name}</span>
              </div>
              <span className="text-[10px] font-mono-data text-stone-500 uppercase">Customer Verification</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-[10px] font-mono-data text-stone-400 pt-2">
            K2 Pest Control Ltd &bull; 1200 Central Ave, Saskatoon, SK &bull; Phone: (306) 407-0007 &bull; www.k2pc.ca
          </div>
        </div>
      </div>
    </div>
  );
};
