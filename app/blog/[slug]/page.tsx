import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPosts, getPublishedBlogPostBySlug, getCompanyDetails, getPublishedServices } from "@/lib/content-db";
import CTABand from "@/components/sections/CTABand";
import { BlogCard } from "@/components/ui/BlogCard";
import { Badge } from "@/components/ui/Badge";
import { PestIcon } from "@/components/ui/PestIcon";
import { Clock, Calendar, ArrowLeft, Phone, ArrowRight, ShieldCheck } from "lucide-react";

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

  const canonicalUrl = `https://www.k2pc.ca/blog/${post.slug}`;
  const description =
    post.content
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160) || post.title;

  return {
    title: `${post.title} | K2PC Pest Control Blog`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "K2PC Specialist"],
      images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const [post, company, allPosts, services] = await Promise.all([
    getPublishedBlogPostBySlug(resolvedParams.slug),
    getCompanyDetails(),
    getPublishedBlogPosts(),
    getPublishedServices(),
  ]);

  if (!post) {
    notFound();
  }

  const pageUrl = `https://www.k2pc.ca/blog/${post.slug}`;
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.k2pc.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.k2pc.ca/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: pageUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: post.title,
    description:
      post.content
        ?.replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160) || post.title,
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
        url: "https://www.k2pc.ca/assets/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
                quality={70}
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
              Don't let pest infestations worsen. K2PC Pest Control provides licensed, guaranteed extermination across Saskatoon &amp; surrounding communities.
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

          {/* Recommended Pest Treatments for Readers */}
          {services.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4 my-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    Recommended Eradication Programs
                  </h3>
                  <p className="text-xs text-neutral-text font-mono-data mt-0.5">
                    Licensed IPM extermination with a 6-month written warranty
                  </p>
                </div>
                <Link
                  href="/services"
                  className="text-xs font-mono-data font-bold text-brand-red hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {services.slice(0, 3).map((srv) => (
                  <Link
                    key={srv.id}
                    href={`/services/${srv.slug}`}
                    className="group p-3.5 rounded-xl bg-surface-warm hover:bg-red-50/60 border border-stone-200 hover:border-brand-red/40 transition-all block space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-red-100 text-brand-red flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                        <PestIcon name={srv.icon} size={15} />
                      </div>
                      <span className="font-heading font-bold text-xs text-ink group-hover:text-brand-red transition-colors truncate">
                        {srv.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono-data text-emerald-700 font-semibold block">
                      {srv.pricingStartsAt ? `From ${srv.pricingStartsAt}` : "Custom Quote"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="pt-8 border-t border-stone-200 space-y-6">
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
