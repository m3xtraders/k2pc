import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPosts, getPublishedBlogPostBySlug, getCompanyDetails } from "@/lib/content-db";
import CTABand from "@/components/sections/CTABand";
import { BlogCard } from "@/components/ui/BlogCard";
import { Badge } from "@/components/ui/Badge";
import { Clock, Calendar, ArrowLeft, Phone } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPublishedBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | K2PC Pest Control Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "K2PC Specialist"],
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPublishedBlogPostBySlug(resolvedParams.slug);
  const company = await getCompanyDetails();

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "K2PC Specialist",
      jobTitle: post.author?.role || "Extermination Expert",
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: {
        "@type": "ImageObject",
        url: "https://www.k2pc.ca/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="py-12 bg-surface-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:underline font-mono-data"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Guides
          </Link>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="red">{post.category}</Badge>
              <span className="text-xs font-mono-data text-neutral-text flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-ink leading-tight">
              {post.title}
            </h1>

            {/* Author Meta Row */}
            <div className="flex items-center gap-4 pt-2 border-y border-stone-200 py-4 font-mono-data text-xs text-neutral-text">
              <div className="w-10 h-10 rounded-full overflow-hidden relative bg-stone-200">
                <Image
                  src={post.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={post.author?.name || "Author"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-bold text-ink block text-sm">{post.author?.name || "K2PC Specialist"}</span>
                <span>{post.author?.role || "Extermination Expert"}</span>
              </div>
              <span className="ml-auto flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt}
              </span>
            </div>
          </header>

          {/* Hero Banner Image */}
          {post.image && (
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg prose-stone max-w-none text-ink leading-relaxed space-y-6">
            <div
              className="prose-html-content"
              dangerouslySetInnerHTML={{
                __html: post.content.includes("<p>")
                  ? post.content
                  : post.content.replace(/\n\n/g, "<br/><br/>"),
              }}
            />
          </div>

          {/* In-Article Callout Box */}
          <div className="bg-surface-warm p-8 rounded-2xl border-2 border-brand-red/30 space-y-4 my-10">
            <h3 className="font-heading font-bold text-2xl text-ink">
              Need Professional Pest Extermination?
            </h3>
            <p className="text-sm text-neutral-text">
              Don't let pest infestations worsen. K2PC Pest Control provides licensed, guaranteed extermination across Toronto & the GTA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-action-yellow text-ink font-bold rounded-lg hover:bg-amber-400 font-mono-data text-sm"
              >
                Get Free Online Quote
              </Link>
              <a
                href={`tel:${company.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-bold rounded-lg hover:bg-brand-red-dark font-mono-data text-sm"
              >
                <Phone className="w-4 h-4" />
                Call {company.phone}
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-12 border-t border-stone-200 space-y-6">
              <h3 className="font-heading font-bold text-2xl text-ink">
                Related Pest Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((rPost) => (
                  <BlogCard key={rPost.id} post={rPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTABand />
    </>
  );
}
