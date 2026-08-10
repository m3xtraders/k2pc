import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogTableClient } from "./BlogTableClient";
import { Plus, FileText } from "lucide-react";

export const revalidate = 0;

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#BE2320]" />
            Blog Posts Management
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Write advice articles, filter by category or tags, and publish pest prevention guides.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-medium rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Write New Post
        </Link>
      </div>

      <BlogTableClient posts={posts} />
    </div>
  );
}
