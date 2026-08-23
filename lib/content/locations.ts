import { LocationCity } from "../types";

export const LOCATIONS: LocationCity[] = [
  {
    name: "Toronto",
    region: "City of Toronto",
    slug: "toronto",
    population: "2.9M+",
    badge: "2h Emergency Dispatch",
    heroTagline: "Licensed, Rapid Exterminator Services Across Downtown & All Toronto Boroughs",
    description:
      "Full-service residential and commercial extermination for high-rise condos, heritage Victorian homes, restaurants, and retail spaces across Downtown Toronto, the Annex, Leslieville, and High Park.",
    neighborhoods: [
      "Downtown Core",
      "The Annex",
      "Leslieville",
      "Liberty Village",
      "Yorkville",
      "High Park",
      "The Beaches",
      "Roncesvalles",
      "Danforth",
      "Cabbagetown",
    ],
    commonPests: [
      "Bed Bugs (Condo & Multi-unit Heat Treatment)",
      "Mice & Brown Rats (Old Sewer & Brick Exclusion)",
      "German Cockroaches (Kitchens & Basements)",
      "Carpenter Ants & Pavement Ants",
      "Wasps & Yellowjackets",
    ],
    landmarks: ["CN Tower", "Yonge & Dundas", "Eaton Centre", "Bloor-Yorkville", "Exhibition Place"],
    postalCodes: ["M5V", "M5R", "M4K", "M6P", "M6K", "M4J", "M5A", "M4Y", "M5T", "M6J"],
    faqs: [
      {
        question: "How fast can K2 Pest Control dispatch an exterminator in Toronto?",
        answer:
          "We have mobile extermination units stationed across Toronto and can dispatch a licensed applicator to your location within 2 hours for active emergencies.",
      },
      {
        question: "Are your pest treatments safe for Toronto condo buildings and pets?",
        answer:
          "Yes! We specialize in low-volatility, Health Canada-approved Integrated Pest Management (IPM) formulations that are 100% safe for domestic pets, children, and multi-unit condo ventilation standards.",
      },
      {
        question: "Do you offer unmarked vans for discrete pest control in Toronto?",
        answer:
          "Yes, upon request we dispatch unmarked vehicles to protect your privacy in residential neighborhoods and commercial businesses.",
      },
    ],
  },
  {
    name: "North York",
    region: "City of Toronto",
    slug: "north-york",
    population: "670k+",
    badge: "2h Fast Response",
    heroTagline: "Trusted Exterminators for North York Homes, Townhouses & Commercial Plazas",
    description:
      "Fast ant, rodent, bed bug, and cockroach treatments for single-family residences, suburban townhomes, and commercial plazas near Yonge & Finch, Willowdale, and Don Mills.",
    neighborhoods: [
      "Willowdale",
      "Bayview Village",
      "Don Mills",
      "York Mills",
      "Newtonbrook",
      "Bridle Path",
      "Downsview",
      "Bathurst Manor",
      "Pleasant View",
    ],
    commonPests: [
      "Mice & Norway Rats",
      "Carpenter Ants",
      "Bed Bugs",
      "German Cockroaches",
      "Paper Wasps & Hornets",
    ],
    landmarks: ["Fairview Mall", "Yorkdale Shopping Centre", "Mel Lastman Square", "CF Shops at Don Mills"],
    postalCodes: ["M2N", "M2K", "M3C", "M2P", "M2M", "M3H", "M3J", "M2J"],
    faqs: [
      {
        question: "Do you treat residential attic mice and roof infestations in North York?",
        answer:
          "Yes. Our North York technicians provide full exterior exclusion, attic sanitization, and heavy-duty one-way door proofing to permanently eliminate mice and squirrels.",
      },
      {
        question: "What guarantee comes with North York pest treatments?",
        answer:
          "All our full-treatment residential and commercial exterminations in North York come with a 6-month written warranty and free re-treatment guarantee.",
      },
    ],
  },
  {
    name: "Etobicoke",
    region: "City of Toronto",
    slug: "etobicoke",
    population: "365k+",
    badge: "Local Unit on Standby",
    heroTagline: "Effective, Guaranteed Pest Defense for Etobicoke Waterfront & Suburban Properties",
    description:
      "Perimeter ant barriers, wasp nest removal, raccoon proofing, and rat exclusion for homes near Humber Bay, The Kingsway, Mimico, and Rexdale.",
    neighborhoods: [
      "The Kingsway",
      "Mimico",
      "Humber Bay Shores",
      "Long Branch",
      "Islington Village",
      "Rexdale",
      "Richview",
      "Markland Wood",
    ],
    commonPests: [
      "Norway Rats (Waterfront & Ravine Areas)",
      "Pavement & Carpenter Ants",
      "Wasp & Hornet Nests (Eaves & Decks)",
      "Mice Infestations",
      "Spiders & Centipedes",
    ],
    landmarks: ["Sherway Gardens", "Humber Bay Park", "Centennial Park", "Islington Golf Club"],
    postalCodes: ["M8V", "M8X", "M8Y", "M8Z", "M9A", "M9B", "M9C", "M9R", "M9V"],
    faqs: [
      {
        question: "Why are waterfront homes in Etobicoke prone to rats and spiders?",
        answer:
          "Proximity to Lake Ontario and Humber River creates natural pest corridors. We implement heavy-duty perimeter barrier defense and mesh-sealing to block pests before they enter.",
      },
      {
        question: "How do you handle dangerous wasp and hornet nests in Etobicoke?",
        answer:
          "Our Ontario-certified exterminators safely remove overhead and in-ground nests using instant-knockdown aerosols and residual protective barriers.",
      },
    ],
  },
  {
    name: "Scarborough",
    region: "City of Toronto",
    slug: "scarborough",
    population: "630k+",
    badge: "2h Fast Response",
    heroTagline: "Reliable Extermination Solutions Across Scarborough & Rouge Valley Neighborhoods",
    description:
      "Specialized carpenter ant colonies, bed bug elimination, and rodent proofing across Agincourt, Guildwood, Rouge, Milliken, and the Scarborough Bluffs.",
    neighborhoods: [
      "Agincourt",
      "Scarborough Bluffs",
      "Guildwood",
      "Rouge",
      "Milliken",
      "Malvern",
      "Woburn",
      "Birch Cliff",
      "Highland Creek",
    ],
    commonPests: [
      "Carpenter Ants (Wood Structural Damage)",
      "Mice & Rats",
      "Bed Bugs",
      "Cockroaches",
      "Yellowjackets & Mud Daubers",
    ],
    landmarks: ["Scarborough Town Centre", "Bluffer's Park", "Toronto Zoo / Rouge National Park", "Centennial College"],
    postalCodes: ["M1B", "M1C", "M1E", "M1G", "M1H", "M1K", "M1L", "M1M", "M1N", "M1P", "M1S", "M1V"],
    faqs: [
      {
        question: "How do you detect carpenter ant nests in Scarborough homes?",
        answer:
          "We use thermal imaging and non-destructive acoustic sensors to trace satellite nests inside wall cavities and apply targeted non-repellent micro-baits that eliminate the queen.",
      },
      {
        question: "Do you offer same-day pest service in Scarborough?",
        answer:
          "Yes, we have dedicated mobile crews servicing Scarborough daily with 2-hour dispatch for urgent pest issues.",
      },
    ],
  },
  {
    name: "Mississauga",
    region: "Peel Region",
    slug: "mississauga",
    population: "720k+",
    badge: "2h Emergency Dispatch",
    heroTagline: "Top-Rated Pest Control & Exterminators in Mississauga & Peel Region",
    description:
      "Same-day emergency pest response for Port Credit, Square One, Streetsville, Lorne Park, Meadowvale, and industrial logistics parks across Mississauga.",
    neighborhoods: [
      "City Centre / Square One",
      "Port Credit",
      "Streetsville",
      "Lorne Park",
      "Meadowvale",
      "Cooksville",
      "Erin Mills",
      "Clarkson",
      "Churchill Meadows",
      "Lakeview",
    ],
    commonPests: [
      "Bed Bugs (Heat & Steam Treatment)",
      "Mice & Rats (Subdivisions & Warehouses)",
      "Cockroaches (Apartments & Restaurants)",
      "Ants (Carpenter & Pavement)",
      "Wasps & Hornets",
    ],
    landmarks: ["Square One Shopping Centre", "Port Credit Lighthouse", "Celebration Square", "Living Arts Centre"],
    postalCodes: ["L5B", "L5G", "L5M", "L5N", "L5K", "L5L", "L5H", "L4T", "L4W", "L4Z"],
    faqs: [
      {
        question: "Do you service commercial warehouses and food facilities in Mississauga?",
        answer:
          "Yes, we provide audit-ready commercial IPM programs with detailed digital logs, HACCP compliance, and scheduled monitoring for Mississauga businesses.",
      },
      {
        question: "What is your bed bug treatment protocol in Mississauga condos?",
        answer:
          "We provide eco-friendly thermal heat treatments and residual treatments that eliminate all bed bug life cycles (eggs, nymphs, and adults) in a single visit.",
      },
    ],
  },
  {
    name: "Brampton",
    region: "Peel Region",
    slug: "brampton",
    population: "650k+",
    badge: "2h Fast Response",
    heroTagline: "Comprehensive Exterminator & Pest Defense Plans Across Brampton",
    description:
      "Effective home defense programs, basement apartment pest protection, and commercial solutions across Bramalea, Heart Lake, Mount Pleasant, and Castlemore.",
    neighborhoods: [
      "Bramalea",
      "Heart Lake",
      "Mount Pleasant",
      "Castlemore",
      "Downtown Brampton",
      "Fletcher's Meadow",
      "Snelgrove",
      "Goreway",
    ],
    commonPests: [
      "Mice & Rats (Basement Suites & Subdivisions)",
      "Cockroaches (German & Oriental)",
      "Bed Bugs",
      "Carpenter Ants",
      "Wasps & Bees",
    ],
    landmarks: ["Bramalea City Centre", "Rose Theatre", "Gage Park", "Chinguacousy Park"],
    postalCodes: ["L6T", "L6R", "L6P", "L6X", "L6Y", "L6Z", "L6V", "L6W", "L6S"],
    faqs: [
      {
        question: "How do you treat pest issues in Brampton multi-tenant & basement apartments?",
        answer:
          "We perform synchronized inspections of shared utility lines, plumbing penetrations, and walls to eliminate pest nesting corridors without causing pests to scatter into neighboring units.",
      },
      {
        question: "Are your Brampton exterminators licensed by Ontario Ministry?",
        answer:
          "Yes, all technicians carry valid Ontario Structural Pesticide Applicator licenses (#ON-849201-P) and $5M liability insurance.",
      },
    ],
  },
  {
    name: "Vaughan",
    region: "York Region",
    slug: "vaughan",
    population: "320k+",
    badge: "Local Unit on Standby",
    heroTagline: "Premier Pest Control for Woodbridge, Thornhill, Maple & Kleinburg Estates",
    description:
      "Wasp removal, spider de-webbing, termite protection, and discreet rodent control for Woodbridge, Maple, Thornhill, Kleinburg, and the Vaughan Metropolitan Centre.",
    neighborhoods: [
      "Woodbridge",
      "Thornhill",
      "Maple",
      "Kleinburg",
      "Vellore Village",
      "Patterson",
      "Concord",
      "Vaughan Metropolitan Centre",
    ],
    commonPests: [
      "Wasps & Hornets (Decks, Sheds & Rooflines)",
      "Mice & Rats (Garages & Basements)",
      "Spiders & Earwigs",
      "Carpenter Ants",
      "Bed Bugs",
    ],
    landmarks: ["Vaughan Mills", "Canada's Wonderland", "McMichael Canadian Art Collection", "Kortright Centre"],
    postalCodes: ["L4L", "L4J", "L6A", "L0J", "L4H", "L4K"],
    faqs: [
      {
        question: "Do you offer exterior seasonal pest barriers for luxury estates in Kleinburg & Vaughan?",
        answer:
          "Yes, our seasonal barrier defense programs protect outdoor entertaining spaces, cabanas, and large estates against spiders, wasps, ants, and ticks.",
      },
      {
        question: "Can you remove wasp nests high on roof peaks in Vaughan?",
        answer:
          "Our technicians are equipped with extension poles and specialized equipment to safely reach 2nd and 3rd story rooflines, overhangs, and soffits.",
      },
    ],
  },
  {
    name: "Markham",
    region: "York Region",
    slug: "markham",
    population: "340k+",
    badge: "2h Fast Response",
    heroTagline: "Science-Backed Eco-Friendly Pest Control in Markham & Unionville",
    description:
      "Eco-friendly IPM solutions, mouse prevention, and ant nest eradication for heritage homes in Unionville, suburban communities in Cornell, and Markham business parks.",
    neighborhoods: [
      "Unionville",
      "Cornell",
      "Markham Village",
      "Milliken Mills",
      "Angus Glen",
      "Cachet",
      "Berczy Village",
      "Thornlea",
    ],
    commonPests: [
      "Mice & Voles",
      "Carpenter & Sugar Ants",
      "Wasp Nests",
      "Bed Bugs",
      "Cockroaches",
    ],
    landmarks: ["CF Markville", "Historic Main Street Unionville", "Markham Pan Am Centre", "Toogood Pond Park"],
    postalCodes: ["L3R", "L3P", "L6B", "L6C", "L6E", "L3T", "L3S"],
    faqs: [
      {
        question: "Are your treatments safe for historic homes on Main Street Unionville?",
        answer:
          "Absolutely. We utilize non-staining, non-corrosive micro-treatments and non-invasive exclusion techniques specifically calibrated for heritage timber and stonework.",
      },
      {
        question: "How long does a mouse extermination treatment take in Markham?",
        answer:
          "Initial inspection and baiting/exclusion takes 45 to 75 minutes, with total eradication achieved within 5 to 10 days.",
      },
    ],
  },
  {
    name: "Oakville",
    region: "Halton Region",
    slug: "oakville",
    population: "215k+",
    badge: "2h Fast Response",
    heroTagline: "Discreet, Premium Exterminator Services Across Oakville & Halton Region",
    description:
      "Premium pest management, termite inspection, spider de-webbing, and wildlife exclusion in Old Oakville, Bronte, Glen Abbey, and River Oaks.",
    neighborhoods: [
      "Old Oakville",
      "Bronte",
      "Glen Abbey",
      "River Oaks",
      "West Oak Trails",
      "Clearview",
      "Joshua Creek",
      "Falgarwood",
    ],
    commonPests: [
      "Spiders & Centipedes (Lakefront Residences)",
      "Wasps & Hornets",
      "Mice & Rats",
      "Carpenter Ants",
      "Subterranean Termites",
    ],
    landmarks: ["Downtown Oakville", "Bronte Harbour", "Glen Abbey Golf Club", "Oakville Place"],
    postalCodes: ["L6K", "L6L", "L6M", "L6H", "L6J"],
    faqs: [
      {
        question: "Do you provide termite inspections for real estate buyers in Oakville?",
        answer:
          "Yes, we provide official wood-destroying insect (WDI) inspection reports and treatment plans for Oakville real estate transactions.",
      },
      {
        question: "What is the best way to keep spiders off lakefront homes in Bronte?",
        answer:
          "Our exterior power-misting and micro-encapsulated residual barrier prevents spiders and midges from clinging to siding, windows, and boat docks.",
      },
    ],
  },
  {
    name: "Richmond Hill",
    region: "York Region",
    slug: "richmond-hill",
    population: "205k+",
    badge: "Local Unit on Standby",
    heroTagline: "Comprehensive Extermination & Seasonal Pest Defense in Richmond Hill",
    description:
      "Preventative seasonal pest defense programs, wasp elimination, and rodent exclusion for residential communities along the Yonge Street and Bayview corridors.",
    neighborhoods: [
      "Oak Ridges",
      "Bayview Hill",
      "Jefferson",
      "Mill Pond",
      "Langstaff",
      "Crosby",
      "Rouge Woods",
      "Headford",
    ],
    commonPests: [
      "Mice & Field Rodents",
      "Carpenter Ants",
      "Yellowjackets & Wasps",
      "Cockroaches",
      "Spiders",
    ],
    landmarks: ["Hillcrest Mall", "David Dunlap Observatory", "Richmond Green", "Lake Wilcox"],
    postalCodes: ["L4C", "L4S", "L4E", "L4B"],
    faqs: [
      {
        question: "Why do homes near Oak Ridges Moraine experience high mouse activity in autumn?",
        answer:
          "As temperatures drop, field mice migrate toward heated foundations. We seal weeping holes, foundation cracks, and pipe entries with copper mesh and industrial sealant.",
      },
      {
        question: "Do you guarantee wasp removal in Richmond Hill?",
        answer:
          "Yes, our wasp eradication comes with a season-long guarantee: if wasps rebuild in the treated location, we return and re-treat at zero cost.",
      },
    ],
  },
  {
    name: "Burlington",
    region: "Halton Region",
    slug: "burlington",
    population: "185k+",
    badge: "2h Fast Response",
    heroTagline: "Trusted Local Exterminator & Pest Removal in Burlington, Ontario",
    description:
      "Residential and commercial pest solutions along Lake Ontario, Millcroft, Tyandaga, Aldershot, and Orchard neighborhoods.",
    neighborhoods: [
      "Downtown Burlington",
      "Millcroft",
      "Aldershot",
      "Tyandaga",
      "The Orchard",
      "Alton Village",
      "Roseland",
      "Headon Forest",
    ],
    commonPests: [
      "Norway Rats & House Mice",
      "Carpenter Ants",
      "Wasps & Hornets",
      "Spiders & Silverfish",
      "Bed Bugs",
    ],
    landmarks: ["Burlington Waterfront / Spencer Smith Park", "Royal Botanical Gardens", "Mapleview Mall", "Burlington Centre"],
    postalCodes: ["L7P", "L7R", "L7S", "L7T", "L7L", "L7M"],
    faqs: [
      {
        question: "How do you stop rats from entering Burlington properties near the lake?",
        answer:
          "We carry out a complete perimeter smoke and dye evaluation to identify compromised sewer vents and burrows, followed by exterior tamper-proof rodent stations.",
      },
      {
        question: "Can I book a same-day emergency exterminator in Burlington?",
        answer:
          "Yes, call our emergency hotline directly for immediate dispatch within 2 hours across Burlington and Halton.",
      },
    ],
  },
];
