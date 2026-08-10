"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, LogOut, User } from "lucide-react";

interface TopbarProps {
  userName?: string | null;
  onOpenMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ userName, onOpenMobileMenu }) => {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/services")) {
      if (pathname.includes("/new")) return "Services / Add New Service";
      if (pathname.includes("/edit")) return "Services / Edit Service";
      return "Services Management";
    }
    if (pathname.startsWith("/admin/blog")) {
      if (pathname.includes("/new")) return "Blog Posts / Write New Post";
      if (pathname.includes("/edit")) return "Blog Posts / Edit Post";
      return "Blog Posts Management";
    }
    if (pathname.startsWith("/admin/settings")) return "Business Info Settings";
    if (pathname.startsWith("/admin/messages")) return "Leads Inbox";
    return "Admin";
  };

  return (
    <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden text-stone-600 hover:text-stone-900 p-1.5 rounded-lg border border-stone-200"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-stone-900 tracking-tight">{getBreadcrumb()}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-sm text-stone-800">
          <div className="w-7 h-7 rounded-full bg-[#BE2320] text-white flex items-center justify-center text-xs font-semibold">
            {userName ? userName.charAt(0).toUpperCase() : "A"}
          </div>
          <span className="font-medium hidden sm:inline">{userName || "Admin User"}</span>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-[#BE2320] hover:bg-stone-100 rounded-lg transition-colors border border-stone-200"
          title="Log out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
