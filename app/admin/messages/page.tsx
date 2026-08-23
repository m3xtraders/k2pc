import React from "react";
import { prisma } from "@/lib/prisma";
import { LeadsInboxClient } from "./LeadsInboxClient";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <LeadsInboxClient initialSubmissions={submissions} />
    </div>
  );
}
