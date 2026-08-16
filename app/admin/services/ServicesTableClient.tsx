"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deleteServiceAction } from "@/app/admin/actions";
import { getServiceCoverImage } from "@/lib/content/services";
import { Edit2, Trash2, ExternalLink, Plus } from "lucide-react";

interface ServicesTableClientProps {
  services: any[];
}

export const ServicesTableClient: React.FC<ServicesTableClientProps> = ({ services }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
      cell: (item) => (
        <div>
          <span className="font-semibold text-stone-900 block">{item.title}</span>
          <span className="text-xs text-stone-500 font-mono">/{item.slug}</span>
        </div>
      ),
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
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/services/${item.slug}`}
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
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={services}
        searchPlaceholder="Search services by title or slug..."
        searchFilter={(item, query) =>
          item.title.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query)
        }
        emptyTitle="No Services Found"
        emptyDescription="No pest control services match your search or none have been added yet."
        emptyAction={
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#BE2320] text-white text-xs font-semibold rounded-lg hover:bg-[#8E1A18] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add First Service
          </Link>
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
    </>
  );
};
