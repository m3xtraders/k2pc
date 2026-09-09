import React from "react";

export default function ContactLoading() {
  return (
    <div className="w-full bg-surface-white animate-pulse">
      {/* Header Banner Skeleton */}
      <section className="bg-ink py-14 border-b border-[#1C4E75]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-block h-6 w-56 rounded-full bg-white/10 mx-auto" />
          <div className="h-10 sm:h-12 w-80 sm:w-96 rounded-xl bg-white/20 mx-auto" />
          <div className="h-5 w-72 sm:w-2/3 max-w-xl rounded-lg bg-white/10 mx-auto" />
        </div>
      </section>

      {/* Main Grid Skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-8">
              {/* Emergency Banner Skeleton */}
              <div className="bg-red-50/70 border-2 border-red-200 p-6 rounded-2xl space-y-3">
                <div className="h-6 w-52 rounded-lg bg-red-200" />
                <div className="h-4 w-full rounded bg-red-100" />
                <div className="h-4 w-4/5 rounded bg-red-100" />
                <div className="h-10 w-44 rounded-lg bg-red-300" />
              </div>

              {/* NAP Details Skeleton */}
              <div className="bg-surface-warm p-6 rounded-2xl border border-stone-200 space-y-5">
                <div className="h-6 w-48 rounded-lg bg-stone-200 border-b border-stone-200 pb-3" />
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-stone-200 shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-4 w-32 rounded bg-stone-200" />
                      <div className="h-3 w-48 rounded bg-stone-200" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-stone-200 shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 w-20 rounded bg-stone-200" />
                      <div className="h-4 w-36 rounded bg-stone-200" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-stone-200 shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 w-24 rounded bg-stone-200" />
                      <div className="h-4 w-44 rounded bg-stone-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form Skeleton */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="space-y-2">
                  <div className="h-7 w-64 rounded-lg bg-stone-200" />
                  <div className="h-4 w-80 max-w-full rounded bg-stone-100" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="h-12 rounded-xl bg-stone-100 border border-stone-200" />
                  <div className="h-12 rounded-xl bg-stone-100 border border-stone-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-12 rounded-xl bg-stone-100 border border-stone-200" />
                  <div className="h-12 rounded-xl bg-stone-100 border border-stone-200" />
                </div>
                <div className="h-28 rounded-xl bg-stone-100 border border-stone-200" />
                <div className="h-14 rounded-xl bg-action-yellow/40" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
