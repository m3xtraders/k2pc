"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deleteServiceAction } from "@/app/admin/actions";
import { getServiceCoverImage } from "@/lib/content/services";
import { Edit2, Trash2, ExternalLink, Plus, Building2, Bug } from "lucide-react";

interface ServicesTableClientProps {
  services: any[];
}

export const ServicesTableClient: React.FC<ServicesTableClientProps> = ({ services }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"ALL" | "COMMERCIAL" | "RESIDENTIAL">("ALL");

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteServiceAction(deleteId);
      toast.success("Service deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete service");
    } finally {
      setDeleteId(null);
    }
  };

  const isCommercialService = (item: any) => {
    return (
      item.icon === "building" ||
      (item.title && item.title.toLowerCase().includes("commercial")) ||
      (item.slug && item.slug.toLowerCase().includes("commercial"))
    );
  };

  const filteredServices = useMemo(() => {
    if (filterType === "COMMERCIAL") {
      return services.filter(isCommercialService);
    }
    if (filterType === "RESIDENTIAL") {
      return services.filter((item) => !isCommercialService(item));
    }
    return services;
  }, [services, filterType]);

  const columns: Column<any>[] = [
    {
      header: "Cover",
      cell: (item) => {
        const imgUrl = getServiceCoverImage(item);
        return (
          <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
            <Image
              src={imgUrl}
              alt={item.title}
              fill
              sizes="48px"
              className="object-cover"
              unoptimized={imgUrl.startsWith("data:")}
            />
          </div>
        );
      },
    },
    {
      header: "Title & Slug",
      cell: (item) => {
        const isComm = isCommercialService(item);
        return (
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-900">{item.title}</span>
              {isComm ? (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono-data font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  <Building2 className="w-3 h-3 text-amber-600" /> Commercial
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono-data font-bold bg-stone-100 text-stone-700">
                  <Bug className="w-3 h-3 text-stone-500" /> Residential
                </span>
              )}
            </div>
            <span className="text-xs text-stone-500 font-mono">/{item.slug}</span>
          </div>
        );
      },
    },
    {
      header: "Icon",
      cell: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-stone-100 font-mono text-stone-700">
          {item.icon || "default"}
        </span>
      ),
    },
    {
      header: "Display Order",
      cell: (item) => (
        <span className="text-xs font-semibold text-stone-600">#{item.displayOrder}</span>
      ),
    },
    {
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: "Last Updated",
      cell: (item) => (
        <span className="text-xs text-stone-500">
          {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (item) => {
        const isComm = isCommercialService(item);
        return (
          <div className="flex items-center gap-2">
            <Link
              href={isComm ? "/commercial" : `/services/${item.slug}`}
              target="_blank"
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              title="View Live"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>

            <Link
              href={`/admin/services/${item.id}/edit`}
              className="p-1.5 text-stone-600 hover:text-[#BE2320] rounded-lg hover:bg-red-50 transition-colors"
              title="Edit Service"
            >
              <Edit2 className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setDeleteId(item.id)}
              className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Delete Service"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl max-w-md">
        <button
          type="button"
          onClick={() => setFilterType("ALL")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
            filterType === "ALL"
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          All ({services.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType("COMMERCIAL")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
            filterType === "COMMERCIAL"
              ? "bg-white text-amber-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-amber-600" />
          <span>Commercial ({services.filter(isCommercialService).length})</span>
        </button>
        <button
          type="button"
          onClick={() => setFilterType("RESIDENTIAL")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
            filterType === "RESIDENTIAL"
              ? "bg-white text-stone-900 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Bug className="w-3.5 h-3.5 text-stone-500" />
          <span>Residential ({services.filter((s) => !isCommercialService(s)).length})</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredServices}
        searchPlaceholder="Search services by title or slug..."
        searchFilter={(item, query) =>
          item.title.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query)
        }
        emptyTitle="No Services Found"
        emptyDescription="No pest control services match your filter."
        emptyAction={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/services/new?type=commercial"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Building2 className="w-4 h-4" /> Add Commercial Program
            </Link>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#BE2320] text-white text-xs font-semibold rounded-lg hover:bg-[#8E1A18] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Residential Service
            </Link>
          </div>
        }
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Service"
        message="Are you sure you want to delete this service? This will permanently remove it from the public site."
        confirmLabel="Delete Service"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
};
