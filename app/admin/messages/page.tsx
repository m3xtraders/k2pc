import React from "react";
import { prisma } from "@/lib/prisma";
import { LeadsInboxClient } from "./LeadsInboxClient";
import { MessageSquare } from "lucide-react";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#BE2320]" />
          Leads & Contact Inquiries Inbox
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Review incoming customer requests, update lead status, and manage inquiries.
        </p>
      </div>

      <LeadsInboxClient initialSubmissions={submissions} />
    </div>
  );
}
