"use client";

import React, { useEffect, useState } from "react";
import { FAQItem } from "@/lib/types";
import { ChevronDown, HelpCircle, PhoneCall, Sparkles } from "lucide-react";
import Link from "next/link";

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

function FAQSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="bg-stone-100 rounded-2xl border border-stone-200/80 p-5 sm:p-6 flex items-center justify-between gap-4"
        >
          <div className="space-y-2 w-full max-w-lg">
            <div className="h-5 bg-stone-200 rounded-md w-3/4" />
            <div className="h-3 bg-stone-200/60 rounded-md w-1/2" />
          </div>
          <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0" />
        </div>
      ))}
    </div>
  );
}

export default function FAQAccordion({
  items: initialItems,
  title = "Frequently Asked Questions",
  subtitle = "Clear answers about extermination safety, Saskatchewan pricing, and written guarantees.",
}: FAQAccordionProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialItems || []);
  const [loading, setLoading] = useState<boolean>(!initialItems || initialItems.length === 0);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faqs", {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            const fetched = Array.isArray(data.faqs) ? data.faqs : [];
            setFaqs(fetched);
            if (fetched.length > 0) {
              setOpenId(fetched[0].id);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load FAQs:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFaqs();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-24 bg-surface-white border-t border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full border border-red-200/70 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-brand-red" />
            <span>Got Questions?</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-neutral-text max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Area: Skeleton Loader or Real FAQs */}
        {loading ? (
          <FAQSkeleton />
        ) : faqs.length === 0 ? (
          <div className="bg-surface-warm rounded-2xl border border-stone-200/90 p-8 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-red-50 text-brand-red flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-ink">
              Have questions about our Saskatoon pest treatments?
            </h3>
            <p className="text-sm text-neutral-text max-w-md mx-auto">
              Our licensed exterminators are standing by to answer any questions regarding treatment methods, safety, or pricing.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red hover:bg-brand-red-dark text-white text-xs sm:text-sm font-heading font-bold rounded-xl shadow-md transition-transform hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Our Dispatch Team</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-surface-warm rounded-2xl border border-stone-200/90 overflow-hidden transition-all duration-300 shadow-2xs hover:border-brand-red/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-ink hover:text-brand-red transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <div
                      className={`w-8 h-8 rounded-full bg-white text-stone-600 flex items-center justify-center shrink-0 border border-stone-200 transition-transform duration-200 shadow-2xs ${
                        isOpen ? "rotate-180 text-brand-red border-brand-red bg-red-50" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-sm text-neutral-text leading-relaxed border-t border-stone-200/60 pt-4 animate-in fade-in-50">
                      <p className="whitespace-pre-line">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
