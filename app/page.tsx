import React from "react";
import Hero from "@/components/sections/Hero";
import PestStrip from "@/components/sections/PestStrip";
import AboutSection from "@/components/sections/AboutSection";
import ServiceGrid from "@/components/sections/ServiceGrid";
import WhyUs from "@/components/sections/WhyUs";
import StatsCounter from "@/components/sections/StatsCounter";
import ProcessSteps from "@/components/sections/ProcessSteps";
import BenefitsSection from "@/components/sections/BenefitsSection";
import EcoFriendlyCTA from "@/components/sections/EcoFriendlyCTA";
import ServiceArea from "@/components/sections/ServiceArea";
import Testimonials from "@/components/sections/Testimonials";
import BlogGrid from "@/components/sections/BlogGrid";
import CTABand from "@/components/sections/CTABand";
import FAQAccordion from "@/components/sections/FAQAccordion";
import LocationMapWidget from "@/components/sections/LocationMapWidget";
import { getPublishedFaqs } from "@/lib/content-db";

export default async function HomePage() {
  const faqs = await getPublishedFaqs();

  return (
    <>
      <Hero />
      <PestStrip />
      <AboutSection />
      <ServiceGrid limit={6} />
      <WhyUs />
      <StatsCounter />
      <ProcessSteps />
      <BenefitsSection />
      <EcoFriendlyCTA />
      <Testimonials />
      <ServiceArea />
      <LocationMapWidget />
      <BlogGrid limit={3} />
      <FAQAccordion items={faqs.slice(0, 6)} />
      <CTABand />
    </>
  );
}
