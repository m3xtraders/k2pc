export interface PestType {
  id: string;
  name: string;
  scientificName?: string;
  slug: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  icon: 'ant' | 'rodent' | 'cockroach' | 'bed-bug' | 'wasp' | 'spider';
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: 'ant' | 'rodent' | 'cockroach' | 'bed-bug' | 'wasp' | 'spider' | 'shield' | 'building' | 'home' | 'calendar' | 'bug';
  pestCategory: 'insects' | 'rodents' | 'wildlife' | 'commercial' | 'prevention';
  targetPests: string[];
  signsOfInfestation: string[];
  treatmentProcess: {
    step: number;
    title: string;
    description: string;
  }[];
  pricingStartsAt: string;
  warranty: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  featuredImage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Seasonal Advice' | 'Prevention Tips' | 'Tenant Guides' | 'Eco-Friendly IPM' | 'Commercial Safety';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  relatedSlugs: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  serviceReceived: string;
  comment: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Safety & Eco' | 'Pricing & Guarantees' | 'Preparation';
}


export interface LocationCity {
  name: string;
  region: string;
  slug: string;
  population?: string;
  description: string;
  heroTagline?: string;
  badge?: string;
  neighborhoods?: string[];
  commonPests?: string[];
  landmarks?: string[];
  postalCodes?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  serviceNeeded: string;
  addressOrCity: string;
  message: string;
}
