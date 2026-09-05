import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Shield, CheckCircle2 } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { SERVICES } from "@/lib/content/services";


interface FooterProps {
  companyDetails?: any;
}

export default function Footer({ companyDetails }: FooterProps) {
  const company = companyDetails || COMPANY_DETAILS;

  return (
    <footer className="bg-ink text-white pt-16 pb-12 border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1C4E75]/50">
          {/* Column 1: Brand & NAP */}
          <div className="space-y-4">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2">
              <div className="inline-flex items-center justify-center w-full sm:w-auto">
                <Image
                  src="/assets/logo.png"
                  alt="K2 Pest Control Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain mx-auto sm:mx-0"
                />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white mt-1 w-full text-center sm:text-left">
                K2 Pest Control
              </span>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              {company.slogan || company.tagline || COMPANY_DETAILS.slogan}
            </p>
            <div className="space-y-2 pt-2 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-1" />
                <span>
                  {company.address?.street || COMPANY_DETAILS.address.street},{" "}
                  {company.address?.city || COMPANY_DETAILS.address.city},{" "}
                  {company.address?.province || COMPANY_DETAILS.address.province}{" "}
                  {company.address?.postalCode || COMPANY_DETAILS.address.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a
                  href={`tel:${company.phoneRaw || COMPANY_DETAILS.phoneRaw}`}
                  className="hover:text-action-yellow transition-colors font-mono-data font-semibold text-white"
                >
                  {company.phone || COMPANY_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a
                  href={`mailto:${company.email || COMPANY_DETAILS.email}`}
                  className="hover:text-action-yellow transition-colors"
                >
                  {company.email || COMPANY_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4 border-b border-[#1C4E75]/50 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-stone-300">
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
                <Link href="/commercial" className="hover:text-action-yellow transition-colors">
                  Commercial Solutions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-action-yellow transition-colors">
                  About K2 Pest Control
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-action-yellow transition-colors">
                  Pest Identification Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-action-yellow transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Pest Services */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4 border-b border-[#1C4E75]/50 pb-2">
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
            <h3 className="font-heading font-bold text-lg text-white mb-4 border-b border-[#1C4E75]/50 pb-2">
              Licensing & Trust
            </h3>
            <div className="bg-[#143D5C] border border-[#1C4E75]/60 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-action-yellow font-bold text-sm">
                <Shield className="w-5 h-5 shrink-0" />
                <span>License No: {company.licenseNumber || COMPANY_DETAILS.licenseNumber}</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Licensed by the {company.provincialBody || COMPANY_DETAILS.provincialBody}. $5M liability insured & WCB certified.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>6-Month Re-treatment Guarantee</span>
              </div>
            </div>

            {/* Social Media Links from Database beneath License Box */}
            <div className="pt-2">
              <span className="text-xs uppercase font-bold tracking-wider text-action-yellow block mb-2.5">
                Follow &amp; Review Us:
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Facebook */}
                {(company.facebookUrl || "https://facebook.com") && (
                  <a
                    href={company.facebookUrl || "https://facebook.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="K2 Pest Control on Facebook"
                    title="Facebook"
                    className="w-9 h-9 rounded-lg bg-[#143D5C] border border-[#1C4E75] flex items-center justify-center text-stone-300 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}

                {/* Instagram */}
                {(company.instagramUrl || "https://instagram.com") && (
                  <a
                    href={company.instagramUrl || "https://instagram.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="K2 Pest Control on Instagram"
                    title="Instagram"
                    className="w-9 h-9 rounded-lg bg-[#143D5C] border border-[#1C4E75] flex items-center justify-center text-stone-300 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}

                {/* X (Twitter) */}
                {(company.twitterUrl || "https://x.com") && (
                  <a
                    href={company.twitterUrl || "https://x.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="K2 Pest Control on X"
                    title="X (Twitter)"
                    className="w-9 h-9 rounded-lg bg-[#143D5C] border border-[#1C4E75] flex items-center justify-center text-stone-300 hover:bg-black hover:text-white hover:border-black hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}

                {/* Google Business Profile / Maps */}
                {(company.googleBusinessUrl || company.googleMapsUrl || COMPANY_DETAILS.googleMapsUrl) && (
                  <a
                    href={company.googleBusinessUrl || company.googleMapsUrl || COMPANY_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="K2 Pest Control on Google Business"
                    title="Google Business Profile"
                    className="w-9 h-9 rounded-lg bg-[#143D5C] border border-[#1C4E75] flex items-center justify-center text-stone-300 hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.067 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                  </a>
                )}

                {/* LinkedIn (if available) */}
                {company.linkedinUrl && (
                  <a
                    href={company.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="K2 Pest Control on LinkedIn"
                    title="LinkedIn"
                    className="w-9 h-9 rounded-lg bg-[#143D5C] border border-[#1C4E75] flex items-center justify-center text-stone-300 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* Bottom Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            © {new Date().getFullYear()} {company.name || COMPANY_DETAILS.name}. All rights reserved. Exterminator &amp; Pest Control Saskatoon &amp; Area.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-stone-200 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
