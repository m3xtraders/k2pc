"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface HeroSlide {
  id: number;
  tag: string;
  headline: string;
  headlinePrefix?: string;
  headlineHighlight: string;
  headlineSuffix?: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: "Saskatoon & Surrounding Areas",
    headline: "Certified Pest Control in Saskatoon & Surrounding Areas",
    headlinePrefix: "",
    headlineHighlight: "Certified Pest Control",
    headlineSuffix: " in Saskatoon & Surrounding Areas",
    subtext:
      "Saskatchewan-certified technicians protecting homes and businesses across Saskatoon, Warman, Martensville, and beyond. Trusted, licensed, and built for results.",
    ctaText: "Free Inspection →",
    ctaLink: "/contact",
    imageSrc: "/images/hero/slide-1.webp",
    imageAlt: "Certified pest control services in Saskatoon and surrounding areas",
  },
  {
    id: 2,
    tag: "Complete Pest Protection",
    headline: "Over 30+ Pests. One Certified Solution.",
    headlinePrefix: "Over 30+ Pests. ",
    headlineHighlight: "One Certified Solution.",
    headlineSuffix: "",
    subtext:
      "From bed bugs and rodents to wasps, mosquitoes, and cockroaches — K2 Pest Control handles it all with Saskatchewan-certified treatments safe for your family and pets.",
    ctaText: "View All Services →",
    ctaLink: "/services",
    imageSrc: "/images/hero/slide-2.webp",
    imageAlt: "Over 30 pests eliminated with certified pest control solutions in Saskatoon",
  },
  {
    id: 3,
    tag: "Government Registered & Verified",
    headline: "Certified. Licensed. Insured. Verified.",
    headlinePrefix: "Certified. ",
    headlineHighlight: "Licensed. Insured. Verified.",
    headlineSuffix: "",
    subtext:
      "Our technicians are certified structural pesticide applicators registered with the Saskatchewan Ministry of the Environment. You're protected by real credentials, not empty promises.",
    ctaText: "About Us →",
    ctaLink: "/about",
    imageSrc: "/images/hero/slide-3.webp",
    imageAlt: "Licensed and insured pest control technicians registered in Saskatchewan",
  },
  {
    id: 4,
    tag: "Local Coverage & Same-Day Service",
    headline: "Saskatoon's Trusted Pest Control Experts",
    headlinePrefix: "Saskatoon's Trusted ",
    headlineHighlight: "Pest Control Experts",
    headlineSuffix: "",
    subtext:
      "Serving Saskatoon, Warman, Martensville, Dalmeny, Osler, Langham, Vanscoy, Delisle, Pike Lake, Whitecap, Dundurn, Clavet, Corman Park & surrounding communities. Same-day inspections available.",
    ctaText: "Book Free Inspection →",
    ctaLink: "/contact",
    imageSrc: "/images/hero/slide-4.webp",
    imageAlt: "Saskatoon's trusted pest control experts serving local Saskatchewan communities",
  },
];

interface HeroCarouselProps {
  phone?: string;
  phoneRaw?: string;
  stats?: {
    yearsInBusiness?: number;
    homesProtected?: string;
    avgResponseMinutes?: number;
    googleRating?: number;
    reviewCount?: number;
  };
}

const AUTO_ROTATE_INTERVAL = 5500; // 5.5 seconds per slide

export default function HeroCarousel({
  phone = "(306) 407-0007",
  phoneRaw = "3064070007",
  stats,
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto rotate timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_ROTATE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide, currentSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isSwipeLeft = distance > 50;
    const isSwipeRight = distance < -50;

    if (isSwipeLeft) {
      nextSlide();
    } else if (isSwipeRight) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#0E2F48] text-white min-h-[640px] lg:min-h-[720px] flex items-center border-b border-[#1C4E75]/50 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="K2 Pest Control Saskatoon Showcase"
    >
      {/* Background Images with Smooth Cross-Fade */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 pointer-events-none -z-10"
            }`}
            aria-hidden={!isActive}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={slide.imageSrc}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
                quality={75}
                className={`object-cover object-center transition-transform duration-7000 ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
                sizes="100vw"
              />
            </div>
            {/* Directional left-to-right fade: Petrol blue on the left for text readability, fading smoothly on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E2F48]/95 via-[#0E2F48]/65 via-45% to-transparent max-md:from-[#0E2F48]/95 max-md:via-[#0E2F48]/80 max-md:to-[#0E2F48]/40" />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 text-left">
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-4 h-4 text-action-yellow shrink-0" />
            <span className="text-stone-100">{HERO_SLIDES[currentSlide].tag}</span>
          </div>

          {/* Headline - Smooth fade text with key mobile size requirements (>= 28px) */}
          <div className="relative min-h-[110px] sm:min-h-[140px] lg:min-h-[170px] flex items-center">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  <h1 className="font-heading text-[28px] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {slide.headlinePrefix}
                    <span className="text-brand-red">{slide.headlineHighlight}</span>
                    {slide.headlineSuffix}
                  </h1>
                </div>
              );
            })}
          </div>

          {/* Subtext - Mobile size requirement (>= 16px) */}
          <div className="relative min-h-[84px] sm:min-h-[72px] flex items-center">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <p className="text-[16px] sm:text-lg md:text-xl text-stone-200 leading-relaxed max-w-2xl drop-shadow-sm font-normal">
                    {slide.subtext}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Link
              href={HERO_SLIDES[currentSlide].ctaLink}
              className="inline-flex items-center justify-center font-bold text-base sm:text-lg px-7 py-4 rounded-xl bg-action-yellow text-ink hover:bg-[#E2AB04] active:bg-[#C99803] shadow-lg hover:shadow-action-yellow/20 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-[0.98] min-h-[52px] group"
            >
              <span>{HERO_SLIDES[currentSlide].ctaText}</span>
            </Link>

            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold transition-all duration-200 min-h-[52px] shadow-md hover:border-white/40"
            >
              <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-sm shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs text-stone-300 font-medium">Emergency Line</span>
                <span className="font-mono-data text-base text-action-yellow font-bold">
                  {phone}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows (Left & Right edges) */}
      <div className="hidden md:flex absolute inset-x-4 lg:inset-x-8 top-1/2 -translate-y-1/2 z-20 items-center justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#0E2F48]/80 hover:bg-brand-red border border-white/20 hover:border-brand-red text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-action-yellow"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#0E2F48]/80 hover:bg-brand-red border border-white/20 hover:border-brand-red text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-lg hover:scale-110 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-action-yellow"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Carousel Dot Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                  aria-current={isActive ? "true" : undefined}
                  className="p-1 group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-8 bg-action-yellow shadow-[0_0_10px_rgba(242,183,5,0.7)]"
                        : "w-2.5 bg-white/40 group-hover:bg-white/75 group-hover:scale-110"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
