import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Bug, FileText, MessageSquare, Plus, ArrowUpRight, Clock, HelpCircle, Scale } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [servicesCount, publishedPosts, draftPosts, leadsCount, faqsCount, recentLeads, recentServices] =
    await Promise.all([
      prisma.service.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.faq.count(),
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.service.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
      }),
    ]);

  return (
    <div className="space-y-8">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-stone-500 mt-1">
            Welcome back! Here is a summary of your website content and customer leads.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/legal"
            className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-sm font-medium rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Scale className="w-4 h-4 text-[#BE2320]" /> Legal Pages
          </Link>
          <Link
            href="/admin/faqs"
            className="px-4 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-sm font-medium rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-[#BE2320]" /> Manage FAQs
          </Link>
          <Link
            href="/admin/services/new"
            className="px-4 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-medium rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Service
          </Link>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Write Post
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Services"
          value={servicesCount}
          description="Displayed on services grid"
          icon={Bug}
        />
        <StatCard
          title="Published Blog Posts"
          value={publishedPosts}
          description={`${draftPosts} saved drafts`}
          icon={FileText}
        />
        <StatCard
          title="FAQs"
          value={faqsCount}
          description="Live customer Q&As"
          icon={HelpCircle}
        />
        <StatCard
          title="New Leads (Action Req.)"
          value={leadsCount}
          description="Inquiries requiring initial response"
          icon={MessageSquare}
          trend={leadsCount > 0 ? "Action required" : "All caught up"}
        />
      </div>

      {/* Grid of Recent Activity & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contact Form Leads */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#BE2320]" />
              Recent Pipeline Leads
            </h3>
            <Link
              href="/admin/messages"
              className="text-xs font-semibold text-[#BE2320] hover:underline"
            >
              Open Kanban Pipeline &rarr;
            </Link>
          </div>

          {recentLeads.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {recentLeads.map((lead: any) => (
                <div key={lead.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{lead.name}</p>
                    <p className="text-xs text-stone-500">{lead.phone} • {lead.service || "General Inquiry"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={lead.status} />
                    <span className="text-xs text-stone-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500 py-6 text-center">No contact inquiries yet.</p>
          )}
        </div>

        {/* Recently Updated Services */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Bug className="w-5 h-5 text-[#BE2320]" />
              Recently Updated Services
            </h3>
            <Link
              href="/admin/services"
              className="text-xs font-semibold text-[#BE2320] hover:underline"
            >
              Manage Services &rarr;
            </Link>
          </div>

          {recentServices.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {recentServices.map((service: any) => (
                <div key={service.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{service.title}</p>
                    <p className="text-xs text-stone-500">/{service.slug}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={service.status} />
                    <Link
                      href={`/admin/services/${service.id}/edit`}
                      className="text-xs font-medium text-stone-600 hover:text-[#BE2320]"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-500 py-6 text-center">No services created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
