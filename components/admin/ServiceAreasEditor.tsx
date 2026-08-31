"use client";

import React, { useState } from "react";
import { Plus, Trash2, MapPin, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { ServiceAreaItem } from "@/lib/validations/businessInfo";

interface ServiceAreasEditorProps {
  areas: ServiceAreaItem[];
  onChange: (areas: ServiceAreaItem[]) => void;
}

const DEFAULT_SASKATOON_AREAS: ServiceAreaItem[] = [
  { name: "Saskatoon (Central & Suburbs)", region: "City of Saskatoon", badge: "Central Dispatch HQ" },
  { name: "Warman", region: "Saskatoon Metro Corridor", badge: "~15-20 min dispatch" },
  { name: "Martensville", region: "Saskatoon Metro Corridor", badge: "~15 min dispatch" },
  { name: "Osler", region: "Saskatoon Metro Corridor", badge: "~20-25 min dispatch" },
  { name: "Dalmeny", region: "Saskatoon Metro Corridor", badge: "~25 min dispatch" },
  { name: "Langham", region: "Saskatoon Metro Corridor", badge: "~30 min dispatch" },
  { name: "Vanscoy", region: "Saskatoon Metro Corridor", badge: "~25 min dispatch" },
  { name: "Corman Park", region: "Rural Municipality", badge: "~15-30 min dispatch" },
  { name: "Dundurn", region: "Saskatoon Metro Corridor", badge: "~35 min dispatch" },
  { name: "Clavet", region: "Saskatoon Metro Corridor", badge: "~25 min dispatch" },
  { name: "Greenbryre", region: "Saskatoon South Corridor", badge: "~10-15 min dispatch" },
  { name: "The Willows", region: "Saskatoon South Corridor", badge: "~10-15 min dispatch" },
  { name: "Riverside Estates", region: "Saskatoon South Corridor", badge: "~15 min dispatch" },
  { name: "Grasswood", region: "Saskatoon South Corridor", badge: "~15 min dispatch" },
];

export const ServiceAreasEditor: React.FC<ServiceAreasEditorProps> = ({ areas, onChange }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newItem: ServiceAreaItem = {
      name: "",
      region: "Saskatoon & Area",
      badge: "Fast Response",
    };
    onChange([...areas, newItem]);
    setExpandedIndex(areas.length);
  };

  const handleRemove = (index: number) => {
    const updated = areas.filter((_, i) => i !== index);
    onChange(updated);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleUpdateItem = (index: number, field: keyof ServiceAreaItem, value: string) => {
    const updated = areas.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleAddPreset = (presetAreas: ServiceAreaItem[]) => {
    const existingNames = new Set(areas.map((a) => a.name.toLowerCase()));
    const toAdd = presetAreas.filter((p) => !existingNames.has(p.name.toLowerCase()));
    onChange([...areas, ...toAdd]);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...areas];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onChange(updated);
    setExpandedIndex(index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index === areas.length - 1) return;
    const updated = [...areas];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onChange(updated);
    setExpandedIndex(index + 1);
  };

  return (
    <div className="space-y-4">
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleAddPreset(DEFAULT_SASKATOON_AREAS)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-[#BE2320]" />
          Load All Saskatoon Defaults
        </button>
        <button
          type="button"
          onClick={() => onChange([])}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      {/* Areas List */}
      <div className="space-y-2">
        {areas.length === 0 && (
          <div className="text-center py-8 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-xl">
            No service areas added yet. Click &quot;Load All Saskatoon Defaults&quot; or add manually.
          </div>
        )}

        {areas.map((area, index) => (
          <div key={index} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
            {/* Row Header */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <GripVertical className="w-4 h-4 text-stone-300 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-stone-800 truncate block">
                  {area.name || <span className="text-stone-400 italic">Unnamed Area</span>}
                </span>
                <span className="text-xs text-stone-400 truncate block">{area.region}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-stone-100 disabled:opacity-30 transition-colors"
                  title="Move up"
                >
                  <ChevronUp className="w-3.5 h-3.5 text-stone-500" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === areas.length - 1}
                  className="p-1 rounded hover:bg-stone-100 disabled:opacity-30 transition-colors"
                  title="Move down"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="px-2 py-1 rounded text-xs font-mono-data text-stone-500 hover:bg-stone-100 transition-colors"
                >
                  {expandedIndex === index ? "Close" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1 rounded hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Expanded Edit Form */}
            {expandedIndex === index && (
              <div className="border-t border-stone-100 px-4 py-3 bg-stone-50 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">City / Area Name *</label>
                  <input
                    type="text"
                    value={area.name}
                    onChange={(e) => handleUpdateItem(index, "name", e.target.value)}
                    placeholder="e.g. Mississauga"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Region / Municipality</label>
                  <input
                    type="text"
                    value={area.region || ""}
                    onChange={(e) => handleUpdateItem(index, "region", e.target.value)}
                    placeholder="e.g. Peel Region"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Badge Label</label>
                  <input
                    type="text"
                    value={area.badge || ""}
                    onChange={(e) => handleUpdateItem(index, "badge", e.target.value)}
                    placeholder="e.g. 2h Fast Response"
                    className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Button */}
      <button
        type="button"
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-stone-300 hover:border-[#BE2320] rounded-xl text-sm font-semibold text-stone-500 hover:text-[#BE2320] transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Service Area
      </button>

      <p className="text-xs text-stone-400">
        {areas.length} area{areas.length !== 1 ? "s" : ""} configured. These appear in the &quot;Areas We Serve&quot; section on the homepage.
      </p>
    </div>
  );
};
