import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Shield, CheckCircle2 } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { SERVICES } from "@/lib/content/services";

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-12 border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & NAP */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-red text-white flex items-center justify-center font-bold text-base">
                K2
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                K2PC
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {COMPANY_DETAILS.tagline}
            </p>
            <div className="space-y-2 pt-2 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-1" />
                <span>
                  {COMPANY_DETAILS.address.street}, {COMPANY_DETAILS.address.city},{" "}
                  {COMPANY_DETAILS.address.province} {COMPANY_DETAILS.address.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="hover:text-action-yellow transition-colors font-mono-data font-semibold text-white"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-action-yellow transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4 border-b border-stone-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <Link href="/" className="hover:text-action-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-action-yellow transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-action-yellow transition-colors">
                  About K2PC & Licensing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-action-yellow transition-colors">
                  Pest Guides & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-action-yellow transition-colors">
                  Get Free Quote & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Pest Services */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4 border-b border-stone-800 pb-2">
              Pest Extermination
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-action-yellow transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brand-red">›</span> {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Licensing & Trust Badges */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-white mb-4 border-b border-stone-800 pb-2">
              Licensing & Trust
            </h3>
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-action-yellow font-bold text-sm">
                <Shield className="w-5 h-5 shrink-0" />
                <span>Ontario License #{COMPANY_DETAILS.licenseNumber}</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Licensed by the {COMPANY_DETAILS.provincialBody}. $5M liability insured & WCB certified.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>6-Month Re-treatment Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Areas Served Row */}
        <div className="py-6 border-b border-stone-800 text-xs text-stone-400">
          <span className="font-semibold text-white mr-2">Service Areas Across GTA:</span>
          {COMPANY_DETAILS.regionsServed.join(" • ")}
        </div>

        {/* Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved. Exterminator & Pest Control Toronto & GTA.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-stone-200">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-stone-200">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-stone-200">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
