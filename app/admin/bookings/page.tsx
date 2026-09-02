import React from "react";
import { prisma } from "@/lib/prisma";
import { LeadsInboxClient } from "@/app/admin/messages/LeadsInboxClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminBookingsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <LeadsInboxClient initialSubmissions={submissions} />
    </div>
  );
}
