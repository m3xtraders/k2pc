"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCallBar from "@/components/layout/MobileCallBar";
import { ChatWidget } from "@/components/ui/ChatWidget";

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
  companyDetails?: any;
}

export function PublicLayoutWrapper({ children, companyDetails }: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header companyDetails={companyDetails} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer companyDetails={companyDetails} />
      <MobileCallBar />
      <ChatWidget companyDetails={companyDetails} />
    </>
  );
}
