"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Shield,
  Menu,
  X,
  Clock,
  ChevronDown,
  Bug,
  Rat,
  Flame,
  Zap,
  Home,
  Building2,
  TreePine,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { SERVICES } from "@/lib/content/services";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  companyDetails?: any;
  services?: any[];
}

// Icon mapper for pest services
function getServiceIcon(slug?: string, iconName?: string) {
  const s = (slug || "").toLowerCase();
  const i = (iconName || "").toLowerCase();

  if (s.includes("ant") || i.includes("ant")) return Bug;
  if (s.includes("rodent") || s.includes("mice") || s.includes("rat") || i.includes("rodent")) return Rat;
  if (s.includes("cockroach") || s.includes("roach") || i.includes("cockroach")) return Flame;
  if (s.includes("bed-bug") || i.includes("bed-bug")) return Flame;
  if (s.includes("wasp") || s.includes("hornet") || i.includes("wasp")) return Zap;
  if (s.includes("spider") || i.includes("spider")) return Sparkles;
  if (s.includes("residential") || s.includes("home") || i.includes("home")) return Home;
  if (s.includes("commercial") || s.includes("building") || i.includes("building")) return Building2;
  if (s.includes("wildlife") || i.includes("wildlife")) return TreePine;
  if (s.includes("season") || i.includes("calendar")) return Calendar;

  return Bug;
}

export default function Header({ companyDetails, services }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const company = companyDetails || COMPANY_DETAILS;
  const publishedServices = services && services.length > 0 ? services : SERVICES;

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
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
              Saskatchewan Licensed: {company.licenseNumber || COMPANY_DETAILS.licenseNumber}
            </span>
            <span className="text-stone-400">|</span>
            <span className="flex items-center gap-1 text-stone-300">
              <Clock className="w-3.5 h-3.5" />
              Avg. Emergency Response: 2 Hours
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-300">
            <span className="truncate max-w-xs">{company.slogan || company.tagline || "Serving Saskatoon & Area"}</span>
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
                Licensed Exterminator
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative py-4"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className={`text-base font-medium transition-colors py-1 flex items-center gap-1.5 ${
                        servicesDropdownOpen
                          ? "text-brand-red font-semibold"
                          : "text-ink hover:text-brand-red"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180 text-brand-red" : "text-stone-400"
                        }`}
                      />
                    </Link>

                    {/* Services Mega Dropdown Panel */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[720px] lg:w-[820px] z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-6 space-y-5 backdrop-blur-md">
                          
                          {/* Dropdown Header */}
                          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                            <div>
                              <h3 className="font-heading font-extrabold text-base text-ink flex items-center gap-2">
                                <span>Licensed Extermination Services</span>
                                <span className="text-[10px] font-mono-data font-bold px-2 py-0.5 rounded-full bg-red-50 text-brand-red border border-red-100">
                                  {publishedServices.length} Treatments Available
                                </span>
                              </h3>
                              <p className="text-xs text-neutral-text mt-0.5">
                                Health Canada approved IPM solutions for residential & commercial properties.
                              </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <Link
                                href="/services?tab=commercial"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="text-xs font-mono-data font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1.5"
                              >
                                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                                <span>Commercial IPM</span>
                              </Link>
                              <Link
                                href="/services"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="text-xs font-bold font-heading text-brand-red hover:underline flex items-center gap-1"
                              >
                                <span>View All Services</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>

                          {/* Services Multi-Column Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                            {publishedServices.map((service: any) => {
                              const IconComponent = getServiceIcon(service.slug, service.icon);
                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="p-3 rounded-xl hover:bg-red-50/70 border border-transparent hover:border-red-100 transition-all flex items-start gap-3 group/item text-left"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-700 group-hover/item:bg-brand-red group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="font-heading font-bold text-xs sm:text-sm text-ink group-hover/item:text-brand-red block truncate transition-colors leading-tight">
                                      {service.title}
                                    </span>
                                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 leading-snug">
                                      {service.shortDescription || "Targeted eradication & warranty"}
                                    </p>
                                    <span className="text-[10px] font-mono-data font-bold text-emerald-700 mt-1 inline-block">
                                      {service.pricingStartsAt ? `From ${service.pricingStartsAt}` : "Custom Quote"}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Bottom Emergency Banner inside Mega Dropdown */}
                          <div className="bg-stone-900 text-white rounded-xl p-3.5 flex items-center justify-between gap-4 shadow-xs">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
                                <Zap className="w-4 h-4 text-action-yellow" />
                              </div>
                              <div>
                                <span className="font-heading font-bold text-xs text-white block">
                                  Need 2-Hour Emergency Pest Dispatch?
                                </span>
                                <span className="text-[11px] text-stone-300">
                                  On-call exterminators standing by 24/7 across Saskatoon &amp; Area.
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <a
                                href={`tel:${company.phoneRaw || COMPANY_DETAILS.phoneRaw}`}
                                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-action-yellow font-mono-data text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{company.phone || COMPANY_DETAILS.phone}</span>
                              </a>
                              <Button href="/contact" variant="primary" size="sm">
                                Book Now
                              </Button>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-ink hover:text-brand-red transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-red hover:after:w-full after:transition-all"
                >
                  {link.name}
                </Link>
              );
            })}
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
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-base font-bold text-ink hover:bg-surface-warm hover:text-brand-red rounded-lg transition-colors"
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border border-stone-200 rounded-xl overflow-hidden my-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full px-4 py-2.5 flex items-center justify-between text-base font-bold text-ink bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                <span>Services ({publishedServices.length})</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform ${
                    mobileServicesOpen ? "rotate-180 text-brand-red" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="p-2 bg-white space-y-1 border-t border-stone-200 max-h-60 overflow-y-auto">
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-xs font-bold text-brand-red hover:bg-red-50 rounded-lg block"
                  >
                    View All Services Overview &rarr;
                  </Link>

                  {publishedServices.map((service: any) => {
                    const IconComponent = getServiceIcon(service.slug, service.icon);
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-3 py-2 text-xs font-semibold text-stone-800 hover:bg-stone-50 hover:text-brand-red rounded-lg flex items-center gap-2.5"
                      >
                        <IconComponent className="w-3.5 h-3.5 text-stone-400" />
                        <span className="truncate">{service.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-base font-bold text-ink hover:bg-surface-warm hover:text-brand-red rounded-lg transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-base font-bold text-ink hover:bg-surface-warm hover:text-brand-red rounded-lg transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-base font-bold text-ink hover:bg-surface-warm hover:text-brand-red rounded-lg transition-colors"
            >
              Contact
            </Link>
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
