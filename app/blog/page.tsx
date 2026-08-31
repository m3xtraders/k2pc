import { Metadata } from "next";
import { getPublishedBlogPosts } from "@/lib/content-db";
import { BlogCard } from "@/components/ui/BlogCard";
import CTABand from "@/components/sections/CTABand";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Pest Control Blog & Prevention Guides | Saskatoon & Area",
  description:
    "Expert articles on Saskatchewan fall rodent migrations, bed bug tenant rights, spring carpenter ant identification, and eco-friendly IPM tips.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Pest Control Blog & Prevention Guides | K2PC Saskatoon & Area",
    description:
      "Expert articles on Saskatchewan fall rodent migrations, bed bug tenant rights, spring carpenter ant identification, and eco-friendly IPM tips.",
    url: "https://www.k2pc.ca/blog",
  },
};

export default async function BlogListPage() {
  const posts = await getPublishedBlogPosts();

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header Banner */}
      <section className="bg-ink text-white py-14 border-b border-[#1C4E75]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <BookOpen className="w-4 h-4" />
            Entomology & Prevention Resource
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Pest Control Intelligence & Guides
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Practical, evidence-backed advice from licensed Saskatchewan exterminators to protect your home, family, and tenants.
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
