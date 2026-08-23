import React from "react";
import { prisma } from "@/lib/prisma";
import { FaqsTableClient } from "./FaqsTableClient";
import { HelpCircle } from "lucide-react";

export const revalidate = 0;

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#BE2320]" />
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage, reorder, create, and edit customer FAQs displayed across the homepage, contact page, and rich search snippets.
          </p>
        </div>
      </div>

      <FaqsTableClient faqs={faqs} />
    </div>
  );
}
