"use client";

import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Building2,
  RefreshCw,
} from "lucide-react";
import { ServiceAreaItem } from "@/lib/validations/businessInfo";

interface ServiceAreasEditorProps {
  areas: ServiceAreaItem[];
  onChange: (areas: ServiceAreaItem[]) => void;
}

const REGION_OPTIONS = [
  "City of Toronto",
  "Peel Region",
  "York Region",
  "Halton Region",
  "Durham Region",
  "Simcoe County",
  "Waterloo Region",
  "Niagara Region",
  "Greater Toronto Area",
];

const DEFAULT_GTA_AREAS: ServiceAreaItem[] = [
  { name: "Toronto (Downtown & East/West)", region: "City of Toronto", badge: "2h Emergency Dispatch" },
  { name: "North York", region: "City of Toronto", badge: "2h Fast Response" },
  { name: "Etobicoke", region: "City of Toronto", badge: "Local Unit on Standby" },
  { name: "Scarborough", region: "City of Toronto", badge: "2h Fast Response" },
  { name: "Mississauga", region: "Peel Region", badge: "2h Emergency Dispatch" },
  { name: "Brampton", region: "Peel Region", badge: "2h Fast Response" },
  { name: "Vaughan", region: "York Region", badge: "Local Unit on Standby" },
  { name: "Markham", region: "York Region", badge: "2h Fast Response" },
  { name: "Oakville", region: "Halton Region", badge: "2h Fast Response" },
  { name: "Richmond Hill", region: "York Region", badge: "Local Unit on Standby" },
  { name: "Burlington", region: "Halton Region", badge: "2h Fast Response" },
];

const PRESETS = [
  {
    label: "Peel Region (+3)",
    areas: [
      { name: "Mississauga", region: "Peel Region", badge: "2h Fast Response" },
      { name: "Brampton", region: "Peel Region", badge: "2h Fast Response" },
      { name: "Caledon", region: "Peel Region", badge: "Mobile Unit" },
    ],
  },
  {
    label: "York Region (+5)",
    areas: [
      { name: "Vaughan", region: "York Region", badge: "2h Fast Response" },
      { name: "Markham", region: "York Region", badge: "2h Fast Response" },
      { name: "Richmond Hill", region: "York Region", badge: "Local Unit" },
      { name: "Newmarket", region: "York Region", badge: "Mobile Unit" },
      { name: "Aurora", region: "York Region", badge: "Mobile Unit" },
    ],
  },
  {
    label: "Halton (+4)",
    areas: [
      { name: "Oakville", region: "Halton Region", badge: "2h Fast Response" },
      { name: "Burlington", region: "Halton Region", badge: "2h Fast Response" },
      { name: "Milton", region: "Halton Region", badge: "Mobile Unit" },
      { name: "Halton Hills", region: "Halton Region", badge: "Mobile Unit" },
    ],
  },
  {
    label: "Durham (+4)",
    areas: [
      { name: "Pickering", region: "Durham Region", badge: "2h Fast Response" },
      { name: "Ajax", region: "Durham Region", badge: "2h Fast Response" },
      { name: "Whitby", region: "Durham Region", badge: "Mobile Unit" },
      { name: "Oshawa", region: "Durham Region", badge: "Mobile Unit" },
    ],
  },
];

export const ServiceAreasEditor: React.FC<ServiceAreasEditorProps> = ({ areas, onChange }) => {
  const [newName, setNewName] = useState("");
  const [newRegion, setNewRegion] = useState("City of Toronto");
  const [customRegion, setCustomRegion] = useState("");
  const [newBadge, setNewBadge] = useState("");
  const [showCustomRegion, setShowCustomRegion] = useState(false);

  const handleAddArea = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    const finalRegion = showCustomRegion && customRegion.trim() ? customRegion.trim() : newRegion;
    const newItem: ServiceAreaItem = {
      name: trimmedName,
      region: finalRegion || "Greater Toronto Area",
      badge: newBadge.trim() || undefined,
    };

    // Check if already exists
    if (areas.some((a) => a.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert(`"${trimmedName}" is already in your service areas list.`);
      return;
    }

    onChange([...areas, newItem]);
    setNewName("");
    setNewBadge("");
  };

  const handleRemove = (index: number) => {
    const updated = areas.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= areas.length) return;

    const updated = [...areas];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleUpdateItem = (index: number, field: keyof ServiceAreaItem, value: string) => {
    const updated = areas.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [field]: value || (field === "badge" ? undefined : item[field]),
        };
      }
      return item;
    });
    onChange(updated);
  };

  const handleLoadDefaults = () => {
    if (confirm("Replace current list with standard 11 GTA Core Municipalities?")) {
      onChange(DEFAULT_GTA_AREAS);
    }
  };

  const handleAddPreset = (presetAreas: ServiceAreaItem[]) => {
    const existingNames = new Set(areas.map((a) => a.name.toLowerCase()));
    const toAdd = presetAreas.filter((p) => !existingNames.has(p.name.toLowerCase()));
    if (toAdd.length === 0) {
      alert("All areas in this preset are already added.");
      return;
    }
    onChange([...areas, ...toAdd]);
  };

  // Grouping stats
  const uniqueRegions = Array.from(new Set(areas.map((a) => a.region)));

  return (
    <div className="space-y-6">
      {/* Header telemetry / summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-[#BE2320]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-stone-900 font-heading">
                Active Service Coverage Areas
              </h4>
              <span className="bg-[#BE2320] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {areas.length} {areas.length === 1 ? "City" : "Cities"}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Covering {uniqueRegions.length} {uniqueRegions.length === 1 ? "Region" : "Regions"} across Southern Ontario
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLoadDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg border border-stone-300 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#BE2320]" />
          Reset to GTA Defaults
        </button>
      </div>

      {/* Quick Region Presets */}
      <div>
        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
          ⚡ Quick Add Regional Presets:
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleAddPreset(preset.areas)}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg border border-stone-200 transition-colors"
            >
              <Plus className="w-3 h-3 text-[#BE2320]" />
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Area Card */}
      <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3">
        <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#BE2320]" /> Add New Service City / Municipality
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-4">
            <label className="block text-xs font-medium text-stone-600 mb-1">
              City / Township Name *
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddArea();
                }
              }}
              placeholder="e.g. Pickering or Newmarket"
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Region / County
            </label>
            {!showCustomRegion ? (
              <div className="flex gap-1.5">
                <select
                  value={newRegion}
                  onChange={(e) => {
                    if (e.target.value === "__custom__") {
                      setShowCustomRegion(true);
                    } else {
                      setNewRegion(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#BE2320]"
                >
                  {REGION_OPTIONS.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                  <option value="__custom__">+ Custom Region...</option>
                </select>
              </div>
            ) : (
              <div className="flex gap-1">
                <input
                  type="text"
                  value={customRegion}
                  onChange={(e) => setCustomRegion(e.target.value)}
                  placeholder="Enter region name"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#BE2320]"
                />
                <button
                  type="button"
                  onClick={() => setShowCustomRegion(false)}
                  className="px-2 text-xs text-stone-500 hover:text-stone-800"
                >
                  List
                </button>
              </div>
            )}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Badge / ETA (Optional)
            </label>
            <input
              type="text"
              value={newBadge}
              onChange={(e) => setNewBadge(e.target.value)}
              placeholder="e.g. 2h Fast Response"
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </div>

          <div className="sm:col-span-1 flex items-end">
            <button
              type="button"
              onClick={() => handleAddArea()}
              disabled={!newName.trim()}
              className="w-full py-2 bg-[#BE2320] hover:bg-[#a61e1b] disabled:bg-stone-200 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center"
              title="Add this area"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* List of Current Areas */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">
          Configured Locations List ({areas.length})
        </label>

        {areas.length === 0 ? (
          <div className="text-center py-8 bg-stone-50 border border-dashed border-stone-300 rounded-xl">
            <MapPin className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-700">No service areas configured yet</p>
            <p className="text-xs text-stone-500 mt-1">
              Click &quot;Reset to GTA Defaults&quot; or add cities using the form above.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {areas.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center gap-3 p-3 bg-white hover:bg-stone-50/70 border border-stone-200 rounded-xl transition-colors group"
              >
                {/* Index / Reorder */}
                <div className="flex flex-col items-center gap-0.5 shrink-0 text-stone-400">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 hover:text-stone-900 disabled:opacity-25 transition-opacity"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-stone-400 font-bold">{idx + 1}</span>
                  <button
                    type="button"
                    disabled={idx === areas.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 hover:text-stone-900 disabled:opacity-25 transition-opacity"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* City Name */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateItem(idx, "name", e.target.value)}
                    className="w-full font-heading font-bold text-sm text-stone-900 bg-transparent border-b border-transparent hover:border-stone-300 focus:border-[#BE2320] focus:outline-none px-1 py-0.5 rounded"
                  />
                </div>

                {/* Region */}
                <div className="w-36 sm:w-44 shrink-0">
                  <input
                    type="text"
                    value={item.region}
                    onChange={(e) => handleUpdateItem(idx, "region", e.target.value)}
                    className="w-full text-xs font-mono text-stone-600 bg-stone-100/70 px-2 py-1 rounded border border-transparent hover:border-stone-300 focus:border-[#BE2320] focus:outline-none"
                    placeholder="Region name"
                  />
                </div>

                {/* Badge */}
                <div className="hidden sm:block w-36 shrink-0">
                  <input
                    type="text"
                    value={item.badge || ""}
                    onChange={(e) => handleUpdateItem(idx, "badge", e.target.value)}
                    placeholder="Optional badge"
                    className="w-full text-xs text-stone-500 bg-transparent px-2 py-1 rounded border border-dashed border-stone-200 hover:border-stone-300 focus:border-[#BE2320] focus:outline-none"
                  />
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  title="Remove location"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
