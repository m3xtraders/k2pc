"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { deleteBlogPostAction } from "@/app/admin/actions";
import { Edit2, Trash2, ExternalLink, Plus } from "lucide-react";

interface BlogTableClientProps {
  posts: any[];
}

export const BlogTableClient: React.FC<BlogTableClientProps> = ({ posts }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteBlogPostAction(deleteId);
      toast.success("Blog post deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete blog post");
    } finally {
      setDeleteId(null);
    }
  };

  const filteredPosts = React.useMemo(() => {
    if (categoryFilter === "ALL") return posts;
    return posts.filter((p) => p.category === categoryFilter);
  }, [posts, categoryFilter]);

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));

  const columns: Column<any>[] = [
    {
      header: "Title & Slug",
      cell: (item) => (
        <div className="max-w-md">
          <span className="font-semibold text-stone-900 line-clamp-1 block">{item.title}</span>
          <span className="text-xs text-stone-500 font-mono">/{item.slug}</span>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-stone-100 font-medium text-stone-700">
          {item.category || "General"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} />,
    },
    {
      header: "Published / Created",
      cell: (item) => (
        <span className="text-xs text-stone-500">
          {item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString()
            : new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/blog/${item.slug}`}
            target="_blank"
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            title="View Live"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <Link
            href={`/admin/blog/${item.id}/edit`}
            className="p-1.5 text-stone-600 hover:text-[#BE2320] rounded-lg hover:bg-red-50 transition-colors"
            title="Edit Post"
          >
            <Edit2 className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setDeleteId(item.id)}
            className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            title="Delete Post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Category Filter Pills */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setCategoryFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              categoryFilter === "ALL"
                ? "bg-stone-900 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
            }`}
          >
            All Categories ({posts.length})
          </button>
          {categories.map((cat) => {
            const count = posts.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? "bg-[#BE2320] text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      <DataTable
        columns={columns}
        data={filteredPosts}
        searchPlaceholder="Search blog posts by title or slug..."
        searchFilter={(item, query) =>
          item.title.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query)
        }
        emptyTitle="No Blog Posts Found"
        emptyDescription="No articles match your category filter or search query."
        emptyAction={
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#BE2320] text-white text-xs font-semibold rounded-lg hover:bg-[#8E1A18] transition-colors"
          >
            <Plus className="w-4 h-4" /> Write First Post
          </Link>
        }
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This will permanently remove it from your blog."
        confirmLabel="Delete Post"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
};
