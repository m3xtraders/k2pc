import React from "react";
import Hero from "@/components/sections/Hero";
import PestStrip from "@/components/sections/PestStrip";
import ServiceGrid from "@/components/sections/ServiceGrid";
import WhyUs from "@/components/sections/WhyUs";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServiceArea from "@/components/sections/ServiceArea";
import Testimonials from "@/components/sections/Testimonials";
import BlogGrid from "@/components/sections/BlogGrid";
import CTABand from "@/components/sections/CTABand";
import FAQAccordion from "@/components/sections/FAQAccordion";
import LocationMapWidget from "@/components/sections/LocationMapWidget";
import { GLOBAL_FAQS } from "@/lib/content/faqs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PestStrip />
      <ServiceGrid limit={6} />
      <WhyUs />
      <ProcessSteps />
      <ServiceArea />
      <LocationMapWidget />
      <Testimonials />
      <BlogGrid limit={3} />
      <FAQAccordion items={GLOBAL_FAQS.slice(0, 4)} />
      <CTABand />
    </>
  );
}
