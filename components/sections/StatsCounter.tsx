"use client";

import React, { useEffect, useRef, useState } from "react";
import { COMPANY_DETAILS } from "@/lib/content/company";

interface StatsCounterProps {
  className?: string;
}

function CountUpNumber({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  start,
  duration = 2000,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const value = easedProgress * target;

      setCurrent(value);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, target, duration]);

  const formattedNumber =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString();

  return (
    <span>
      {prefix}
      {start ? formattedNumber : "0"}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ className = "" }: StatsCounterProps) {
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      target: COMPANY_DETAILS.stats.yearsInBusiness || 3,
      decimals: 0,
      suffix: "+",
      label: "Years of Experience",
    },
    {
      target: 1000,
      decimals: 0,
      suffix: "+",
      label: "Homes Protected",
    },
    {
      target: COMPANY_DETAILS.stats.avgResponseMinutes || 120,
      decimals: 0,
      suffix: " Mins",
      label: "Avg. Emergency Response",
    },
    {
      target: 99.9,
      decimals: 1,
      suffix: "%",
      label: "Customer Satisfaction",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`bg-ink text-white py-12 lg:py-14 border-y border-[#1C4E75]/50 relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono-data">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1.5 group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-action-yellow tracking-tight drop-shadow-xs">
                <CountUpNumber
                  target={stat.target}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  start={hasTriggered}
                />
              </div>
              <div className="text-xs sm:text-sm text-stone-300 font-sans font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
