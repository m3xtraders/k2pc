import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Bug, FileText, MessageSquare, Plus, ArrowUpRight, Clock, HelpCircle, Scale, ShieldCheck, CalendarCheck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [servicesCount, publishedPosts, draftPosts, leadsCount, completedCount, faqsCount, recentLeads, recentServices] =
    await Promise.all([
      prisma.service.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.contactSubmission.count({ where: { status: "CLOSED" } }),
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
            Welcome back! Here is a summary of your website bookings, warranties, and content.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/warranties"
            className="px-4 py-2 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-900 text-sm font-semibold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Warranty Records
          </Link>
          <Link
            href="/admin/bookings"
            className="px-4 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CalendarCheck className="w-4 h-4" /> Bookings &amp; Pipeline
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="New Quotes (Action Req.)"
          value={leadsCount}
          description="Inquiries requiring response"
          icon={CalendarCheck}
          trend={leadsCount > 0 ? "Action required" : "All caught up"}
        />
        <StatCard
          title="Completed & Warranty"
          value={completedCount}
          description="6-month guarantee records"
          icon={ShieldCheck}
        />
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
      </div>

      {/* Grid of Recent Activity & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contact Form Leads */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-[#BE2320]" />
              Recent Bookings &amp; Quotes
            </h3>
            <Link
              href="/admin/bookings"
              className="text-xs font-semibold text-[#BE2320] hover:underline"
            >
              Open Bookings Pipeline &rarr;
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
