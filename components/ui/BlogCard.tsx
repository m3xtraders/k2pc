import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-brand-red/50 transition-all flex flex-col justify-between group">
      <div>
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            quality={65}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="red">{post.category}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-4 text-xs font-mono-data text-neutral-text">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h3 className="font-heading font-bold text-xl text-ink group-hover:text-brand-red transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-sm text-neutral-text line-clamp-3 leading-relaxed">
            {post.content ? post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : ""}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 pt-0 flex items-center justify-between">
        <span className="text-xs font-mono-data text-stone-500">By {post.author.name}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-bold text-brand-red hover:text-brand-red-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};
