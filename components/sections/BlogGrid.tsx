import React from "react";
import { BLOG_POSTS } from "@/lib/content/blog";
import { BlogCard } from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/Button";

interface BlogGridProps {
  limit?: number;
  showHeading?: boolean;
}

export default function BlogGrid({ limit, showHeading = true }: BlogGridProps) {
  const posts = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;

  return (
    <section className="py-16 bg-surface-warm border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Pest Intelligence & Guides
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
              Latest Advice for Canadian Homeowners
            </h2>
            <p className="text-base text-neutral-text">
              Expert seasonal pest advice, tenant guides, and eco-friendly prevention strategies written by our licensed entomology team.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {limit && BLOG_POSTS.length > limit && (
          <div className="text-center mt-12">
            <Button href="/blog" variant="outline" size="lg">
              Explore All Articles & Guides
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
