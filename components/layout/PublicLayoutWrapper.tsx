"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCallBar from "@/components/layout/MobileCallBar";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { DiscountInspectionModal } from "@/components/ui/DiscountInspectionModal";

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
  companyDetails?: any;
  services?: any[];
}

export function PublicLayoutWrapper({ children, companyDetails, services }: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header companyDetails={companyDetails} services={services} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer companyDetails={companyDetails} />
      <MobileCallBar companyDetails={companyDetails} />
      <ChatWidget companyDetails={companyDetails} />
      <DiscountInspectionModal companyDetails={companyDetails} services={services} />
    </>
  );
}
