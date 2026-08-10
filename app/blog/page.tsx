import React from "react";
import { getPublishedBlogPosts } from "@/lib/content-db";
import { BlogCard } from "@/components/ui/BlogCard";
import CTABand from "@/components/sections/CTABand";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Pest Control Blog & Prevention Guides | Toronto & GTA",
  description:
    "Expert articles on Ontario fall rodent migrations, bed bug tenant rights, spring carpenter ant identification, and eco-friendly IPM tips.",
};

export default async function BlogListPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      {/* Header Banner */}
      <section className="bg-ink text-white py-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <BookOpen className="w-4 h-4" />
            Entomology & Prevention Resource
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Pest Control Intelligence & Guides
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Practical, evidence-backed advice from licensed Ontario exterminators to protect your home, family, and tenants.
          </p>
        </div>
      </section>

      {/* Main Blog List */}
      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
