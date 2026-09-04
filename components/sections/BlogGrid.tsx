import React from "react";
import { BlogPost } from "@/lib/types";
import { getPublishedBlogPosts } from "@/lib/content-db";
import { BlogCard } from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/Button";

interface BlogGridProps {
  posts?: BlogPost[];
  limit?: number;
  showHeading?: boolean;
}

export default async function BlogGrid({ posts: passedPosts, limit, showHeading = true }: BlogGridProps) {
  const allPosts = passedPosts || (await getPublishedBlogPosts());
  const posts = limit ? allPosts.slice(0, limit) : allPosts;

  if (!posts || posts.length === 0) {
    return null;
  }

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

        {limit && allPosts.length > limit && (
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
