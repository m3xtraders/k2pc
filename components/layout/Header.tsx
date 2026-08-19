"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Shield, Menu, X, Clock } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  companyDetails?: any;
}

export default function Header({ companyDetails }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const company = companyDetails || COMPANY_DETAILS;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner - Provincial License & Emergency Info */}
      <div className="bg-ink text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-mono-data">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-action-yellow font-semibold">
              <Shield className="w-3.5 h-3.5" />
              Ontario Licensed: {company.licenseNumber || COMPANY_DETAILS.licenseNumber}
            </span>
            <span className="text-stone-400">|</span>
            <span className="flex items-center gap-1 text-stone-300">
              <Clock className="w-3.5 h-3.5" />
              Avg. Emergency Response: 2 Hours
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span className="truncate max-w-xs">{company.slogan || company.tagline || "Serving Toronto & GTA"}</span>
            <a
              href={`tel:${company.phoneRaw || COMPANY_DETAILS.phoneRaw}`}
              className="text-action-yellow hover:underline font-bold"
            >
              Call: {company.phone || COMPANY_DETAILS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-auto max-w-[160px] flex items-center shrink-0">
              <Image
                src="/assets/logo.png"
                alt="K2 Pest Control Logo"
                width={48}
                height={48}
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-stone-200 pl-3">
              <span className="font-heading font-extrabold text-lg text-ink leading-tight tracking-tight">
                K2 Pest Control
              </span>
              <span className="text-[11px] font-semibold text-brand-red tracking-wider uppercase font-mono-data">
                GTA Exterminator
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-ink hover:text-brand-red transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-red hover:after:w-full after:transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Callouts */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${company.phoneRaw || COMPANY_DETAILS.phoneRaw}`}
              className="flex items-center gap-2 text-ink hover:text-brand-red transition-colors group px-3 py-2 rounded-lg hover:bg-surface-warm"
            >
              <div className="w-9 h-9 rounded-full bg-red-100 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-neutral-text font-medium">Emergency Line</span>
                <span className="text-sm font-bold font-mono-data text-ink group-hover:text-brand-red">
                  {company.phone || COMPANY_DETAILS.phone}
                </span>
              </div>
            </a>

            <Button href="/contact" variant="primary" size="sm">
              Get Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${company.phoneRaw || COMPANY_DETAILS.phoneRaw}`}
              className="p-2 text-brand-red hover:bg-red-50 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Call emergency phone line"
            >
              <Phone className="w-6 h-6" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink hover:bg-stone-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-lg font-semibold text-ink hover:bg-surface-warm hover:text-brand-red rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
            <a
              href={`tel:${company.phoneRaw || COMPANY_DETAILS.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-3 bg-red-50 text-brand-red font-bold rounded-lg text-center"
            >
              <Phone className="w-5 h-5" />
              Call Now: {company.phone || COMPANY_DETAILS.phone}
            </a>
            <Button
              href="/contact"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
