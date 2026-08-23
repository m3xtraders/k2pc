"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bug,
  FileText,
  Settings,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Bug },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Form Messages & Leads", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white border-r border-stone-200">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-stone-200">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="relative h-9 w-auto flex items-center shrink-0">
            <Image
              src="/assets/logo.png"
              alt="K2 Pest Control Logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-stone-900 tracking-tight text-sm block leading-none">
              K2 Pest Control
            </span>
            <span className="text-[10px] text-[#BE2320] uppercase tracking-widest font-semibold">
              Admin CMS
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-stone-400 hover:text-stone-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-red-50 text-[#BE2320] border-l-4 border-[#BE2320] shadow-2xs font-semibold"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${active ? "text-[#BE2320]" : "text-stone-500"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer link to public site */}
      <div className="p-4 border-t border-stone-200">
        <Link
          href="/"
          target="_blank"
          className="block w-full py-2 px-3 text-center text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
        >
          View Public Site &rarr;
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 z-30">
        {navContent}
      </aside>

      {/* Mobile Off-canvas Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
