import React from "react";
import { auth } from "@/lib/auth";
import { Toaster } from "sonner";
import { AdminLayoutClient } from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#F7F6F5] text-stone-900 font-sans">
      <AdminLayoutClient session={session}>{children}</AdminLayoutClient>
      <Toaster position="top-right" richColors />
    </div>
  );
}
