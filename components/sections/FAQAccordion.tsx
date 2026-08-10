"use client";

import React, { useState } from "react";
import { FAQItem } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Clear answers about extermination safety, GTA pricing, and written guarantees.",
}: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-surface-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Got Questions?
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-base text-neutral-text">{subtitle}</p>}
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-surface-warm rounded-xl border border-stone-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-ink hover:text-brand-red transition-colors focus-visible:ring-2 focus-visible:ring-brand-red"
                >
                  <span>{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white text-stone-600 flex items-center justify-center shrink-0 border border-stone-200 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-red border-brand-red" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-neutral-text leading-relaxed border-t border-stone-200/60 pt-4 animate-in fade-in-50">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
