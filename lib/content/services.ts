import { Service, PestType } from "../types";

export const CORE_PESTS: PestType[] = [
  {
    id: "ant",
    name: "Ant Control",
    scientificName: "Formicidae / Camponotus",
    slug: "ant-control",
    description: "Carpenter ants, pavement ants, and pharaoh ants targeted with exterior defense & nest elimination.",
    severity: "High",
    icon: "ant",
    image: "/images/pests/ant.jpg",
  },
  {
    id: "rodent",
    name: "Rodent Control",
    scientificName: "Rattus norvegicus / Mus musculus",
    slug: "rodent-control",
    description: "Humane removal, entry point exclusion sealing, and sanitation for mice & rats in GTA homes.",
    severity: "High",
    icon: "rodent",
    image: "/images/pests/rodent.jpg",
  },
  {
    id: "cockroach",
    name: "Cockroach Control",
    scientificName: "Blattella germanica",
    slug: "cockroach-control",
    description: "German & Oriental cockroach eradication using gel baits, IGRs, and thorough flush treatments.",
    severity: "High",
    icon: "cockroach",
    image: "/images/pests/cockroach.jpg",
  },
  {
    id: "bed-bug",
    name: "Bed Bug Control",
    scientificName: "Cimex lectularius",
    slug: "bed-bug-treatment",
    description: "Thermal heat treatments and chemical residual applications eliminating bed bugs at all life stages.",
    severity: "High",
    icon: "bed-bug",
    image: "/images/pests/bed-bug.jpg",
  },
  {
    id: "wasp",
    name: "Wasps & Hornets",
    scientificName: "Vespula vulgaris",
    slug: "wasp-hornet-removal",
    description: "Safe nest removal and protective barrier sprays for yellowjackets, hornets, and paper wasps.",
    severity: "Medium",
    icon: "wasp",
    image: "/images/pests/wasp.jpg",
  },
  {
    id: "spider",
    name: "Spider Control",
    scientificName: "Araneae",
    slug: "spider-control",
    description: "De-webbing, perimeter barrier treatments, and prey insect reduction for indoor/outdoor spiders.",
    severity: "Low",
    icon: "spider",
    image: "/images/pests/spider.jpg",
  },
];

export const SERVICES: Service[] = [
  {
    id: "ant-control",
    title: "Ant Control & Colony Elimination",
    slug: "ant-control",
    shortDescription: "Targeted extermination of carpenter ants, pavement ants, and pharaoh ants with exterior barrier defense.",
    fullDescription: "Ant infestations in Southern Ontario range from moisture-loving carpenter ants damaging structural timbers to stubborn pharaoh ants colonizing heating conduits. Our IPM approach combines non-repellent baiting systems that worker ants carry straight back to the queen with perimeter liquid barriers to stop re-entry.",
    icon: "ant",
    pestCategory: "insects",
    targetPests: ["Carpenter Ants", "Pavement Ants", "Pharaoh Ants", "Odorous House Ants"],
    signsOfInfestation: [
      "Sawdust-like frass accumulated near baseboards or wooden structures.",
      "Visible trails of ants along kitchen counters or foundation lines.",
      "Winged swarmer ants appearing indoors during spring months.",
      "Faint rustling noises within hollow walls or window frames.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Comprehensive Inspection",
        description: "We locate moisture sources, entry gaps, and parent colony nest locations in landscaping or wall voids.",
      },
      {
        step: 2,
        title: "Precision Micro-Baiting",
        description: "Strategic placement of slow-acting gel baits designed to infect and eliminate the entire subterranean queen colony.",
      },
      {
        step: 3,
        title: "Perimeter Defense Spray",
        description: "Application of a low-odour, non-repellent barrier along your home's foundation, doors, and window sills.",
      },
      {
        step: 4,
        title: "Follow-up & Prevention Seal",
        description: "Inspecting bait consumption rates and sealing structural gaps to ensure permanent colony destruction.",
      },
    ],
    pricingStartsAt: "$189",
    warranty: "6-Month Written Warranty",
    faqs: [
      {
        question: "Are carpenter ants dangerous to my house?",
        answer: "Yes. Unlike termites that eat wood, carpenter ants excavate smooth tunnels into damp structural lumber to build nests, weakening house framing over time if left untreated.",
      },
      {
        question: "Do I need to leave my house during ant treatment?",
        answer: "For exterior perimeter sprays and gel baiting, you usually do not need to leave. If indoor spot applications are required, we advise staying out of treated rooms for 2-4 hours while products dry.",
      },
    ],
  },
  {
    id: "rodent-control",
    title: "Rodent Control & Proofing",
    slug: "rodent-control",
    shortDescription: "Complete mice & rat eradication, attic inspection, and guaranteed entry-point exclusion sealing.",
    fullDescription: "As Canadian temperatures drop in autumn, field mice and Norway rats seek heat, shelter, and food inside GTA homes. K2PC Pest Control provides a multi-phase solution: rapid removal via tamper-resistant baiting and mechanical trapping, followed by heavy-duty exclusion sealing of entry holes down to 1/4 inch.",
    icon: "rodent",
    pestCategory: "rodents",
    targetPests: ["House Mice", "Deer Mice", "Norway Rats", "Roof Rats"],
    signsOfInfestation: [
      "Dark rod-shaped droppings in kitchen cabinets, basements, or attic insulation.",
      "Gnaw marks on food packaging, electrical wiring, or wooden baseboards.",
      "Scratching or scampering sounds in ceilings and wall cavities at night.",
      "Greasy rub marks along walls and foundation access points.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "360° Structural Inspection",
        description: "Identifying entry points along utility pipes, rooflines, garage doors, and foundation vents.",
      },
      {
        step: 2,
        title: "Trapping & Eradication",
        description: "Deploying secure, child-proof tamper-resistant bait stations and high-speed mechanical traps in high-traffic runs.",
      },
      {
        step: 3,
        title: "Exclusion & Sealing",
        description: "Sealing gaps with steel mesh, galvanized metal flashings, and commercial-grade silicone sealant.",
      },
      {
        step: 4,
        title: "Sanitation & Odour Treatment",
        description: "Disinfecting contaminated areas and neutralizing rodent pheromone trails.",
      },
    ],
    pricingStartsAt: "$229",
    warranty: "1-Year Exclusion Warranty",
    faqs: [
      {
        question: "How small of a hole can a mouse squeeze through?",
        answer: "A house mouse can fit through an opening as small as 1/4 inch (about the width of a pencil). Our technicians inspect and seal even the smallest structural gaps.",
      },
      {
        question: "Is rodent bait safe around pets and children?",
        answer: "Yes. All rodenticides are installed exclusively inside heavy-duty, lockable, tamper-resistant bait stations that children and household pets cannot open.",
      },
    ],
  },
  {
    id: "cockroach-control",
    title: "Cockroach Control & Extermination",
    slug: "cockroach-control",
    shortDescription: "High-intensity flush treatments and cockroach gel baits to eradicate German & Oriental roaches.",
    fullDescription: "Cockroaches reproduce rapidly in kitchens and bathrooms, carrying foodborne pathogens like Salmonella and E. coli. Our extermination protocols combine flushing agents, Insect Growth Regulators (IGRs) that halt breeding cycles, and attractive domino-effect gel baits.",
    icon: "cockroach",
    pestCategory: "insects",
    targetPests: ["German Cockroaches", "Oriental Cockroaches", "American Cockroaches"],
    signsOfInfestation: [
      "Pepper-like dark specks or droppings behind appliances and under sinks.",
      "Egg capsules (othecae) hidden in cabinet hinges or behind drawer slides.",
      "A distinct musty, oily odour in enclosed kitchen spaces.",
      "Live cockroaches scurrying when room lights are turned on.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Infestation Mapping",
        description: "Using sticky monitors and flushing agents to trace harborage zones behind stoves, dishwashers, and wall outlets.",
      },
      {
        step: 2,
        title: "Flush & IGR Application",
        description: "Targeted low-volume misting combined with chitin-synthesis inhibitors to disrupt egg development.",
      },
      {
        step: 3,
        title: "Dominion Gel Baiting",
        description: "Applying non-repellent matrix gel dots in hidden cracks where roaches feed and share food.",
      },
      {
        step: 4,
        title: "2-Week Re-Inspection",
        description: "Monitoring catch counts and applying secondary treatments if residual egg hatches occur.",
      },
    ],
    pricingStartsAt: "$249",
    warranty: "90-Day Guarantee",
    faqs: [
      {
        question: "Why do German cockroaches keep coming back?",
        answer: "German cockroach egg cases contain up to 40 nymphs and are resistant to standard store-bought bug sprays. Professional IGRs and domino gel baits are needed to stop the breeding cycle.",
      },
    ],
  },
  {
    id: "bed-bug-treatment",
    title: "Bed Bug Thermal & Chemical Eradication",
    slug: "bed-bug-treatment",
    shortDescription: "Advanced heat treatment & multi-stage residual applications with 100% mattress & furniture protection.",
    fullDescription: "Bed bugs are among the most distressing household pests in urban environments. We offer dual eradication approaches: whole-structure heat treatment (reaching lethal temperatures of 122°F/50°C) and precision chemical residual applications with mattress encasements.",
    icon: "bed-bug",
    pestCategory: "insects",
    targetPests: ["Bed Bugs (Cimex lectularius)"],
    signsOfInfestation: [
      "Itchy red bites appearing in lines or clusters on arms, neck, or back.",
      "Tiny rust-coloured blood spots on bed sheets, pillowcases, or mattress seams.",
      "Shed nymph skins and tiny pale eggs along box spring corners and baseboards.",
      "A sweet, sickly sweet almond-like scent in heavily infested bedrooms.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Detailed Room Audit",
        description: "Inspecting headboards, mattress piping, baseboards, picture frames, and carpet edges.",
      },
      {
        step: 2,
        title: "Thermal or Chemical Eradication",
        description: "Deploying industrial thermal heaters or triple-action residual insecticides targeting adults and eggs.",
      },
      {
        step: 3,
        title: "Steam & Dust Application",
        description: "Superheated dry steam on delicate fabrics, followed by desiccant dust in electrical outlets.",
      },
      {
        step: 4,
        title: "Encasement & Re-certification",
        description: "Installing commercial bed bug mattress encasements and conducting follow-up verification.",
      },
    ],
    pricingStartsAt: "$349",
    warranty: "6-Month Eradication Guarantee",
    faqs: [
      {
        question: "How long does a bed bug treatment take?",
        answer: "Thermal heat treatments take approximately 6 to 8 hours for a single day, whereas chemical treatments involve two visits spaced 10-14 days apart.",
      },
    ],
  },
  {
    id: "wasp-hornet-removal",
    title: "Wasp & Hornet Nest Removal",
    slug: "wasp-hornet-removal",
    shortDescription: "Same-day removal of aggressive yellowjacket, hornet, and paper wasp nests from eaves and structures.",
    fullDescription: "Wasp nests around eaves, decks, and soffits pose severe sting hazards to families and pets. Our licensed technicians safely neutralize and detach nests, treating wall voids to prevent seasonal return.",
    icon: "wasp",
    pestCategory: "insects",
    targetPests: ["Yellowjackets", "Bald-faced Hornets", "Paper Wasps", "Mud Daubers"],
    signsOfInfestation: [
      "Frequent insect activity around soffits, overhangs, shed roofs, or hollow trees.",
      "Visible grey paper nests attached to structural eaves, porches, or branches.",
      "Wasps entering hidden gaps under roof shingles or exterior brick weep holes.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Species Identification",
        description: "Determining whether wasps are aerial nest builders or underground yellowjacket colonies.",
      },
      {
        step: 2,
        title: "Rapid Neutralization",
        description: "Injecting fast-acting knockdown agents directly into nest cavities using protective gear.",
      },
      {
        step: 3,
        title: "Physical Nest Removal",
        description: "Scraping down nest structures and cleaning attachment sites to prevent pheromone re-attraction.",
      },
      {
        step: 4,
        title: "Eave Barrier Treatment",
        description: "Applying seasonal repellent dust to high-risk soffit voids.",
      },
    ],
    pricingStartsAt: "$159",
    warranty: "Season-Long Guarantee",
    faqs: [
      {
        question: "What if the wasp nest is inside my wall void?",
        answer: "Never plug the outside hole! Doing so forces wasps inside your home. We use pressurized dust injection through exterior access points to neutralize the nest safely.",
      },
    ],
  },
  {
    id: "spider-control",
    title: "Spider Control & De-Webbing",
    slug: "spider-control",
    shortDescription: "Interior and exterior spider reduction, webbing removal, and perimeter insect prey control.",
    fullDescription: "High spider activity is typically a symptom of an underlying insect population. K2PC provides complete perimeter de-webbing combined with micro-encapsulated treatments to keep siding, overhangs, and basements spider-free.",
    icon: "spider",
    pestCategory: "insects",
    targetPests: ["House Spiders", "Yellow Sac Spiders", "Wolf Spiders", "Cellar Spiders"],
    signsOfInfestation: [
      "Abundant webs around exterior lighting, eaves, window screens, and basements.",
      "Visible spider egg sacs attached to furniture or corners.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "De-Webbing & Sweep",
        description: "Physical removal of webs and egg sacs using specialized extension poles.",
      },
      {
        step: 2,
        title: "Perimeter Barrier Treatment",
        description: "Applying micro-encapsulated spray along foundation lines and upper soffit perimeters.",
      },
      {
        step: 3,
        title: "Prey Reduction",
        description: "Treating perimeter light fixtures and gardens to eliminate the spider's primary food source.",
      },
    ],
    pricingStartsAt: "$169",
    warranty: "90-Day Guarantee",
    faqs: [
      {
        question: "Are spiders in Ontario venomous to humans?",
        answer: "Most common Ontario spiders (like cellar spiders and house spiders) are harmless. Black widows are extremely rare. However, yellow sac spider bites can cause mild localized irritation.",
      },
    ],
  },
  {
    id: "residential-pest-control",
    title: "Residential Pest Control",
    slug: "residential-pest-control",
    shortDescription: "Comprehensive home defense plans for houses, townhomes, and condos across the GTA.",
    fullDescription: "Protect your sanctuary with year-round pest defense tailored to Canadian climate cycles. From ants and mice to spiders and seasonal invaders, our licensed exterminators keep your family safe using eco-conscious Integrated Pest Management (IPM).",
    icon: "home",
    pestCategory: "prevention",
    targetPests: ["Ants", "Mice", "Cockroaches", "Spiders", "Earwigs", "Centipedes"],
    signsOfInfestation: [
      "Pest sightings in kitchens, basements, or attics.",
      "Unexplained noises in walls or ceilings.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Full Property Inspection",
        description: "Evaluating interior rooms, basements, attics, and exterior foundations.",
      },
      {
        step: 2,
        title: "Custom IPM Treatment Plan",
        description: "Applying safe, targeted treatments designed for homes with children and pets.",
      },
      {
        step: 3,
        title: "Exclusion & Sealing",
        description: "Sealing entry points to create a long-term pest barrier.",
      },
    ],
    pricingStartsAt: "$199",
    warranty: "Full Home Guarantee",
    faqs: [
      {
        question: "Is residential treatment safe for pets?",
        answer: "Yes! We use eco-friendly IPM methods and low-toxicity formulations. Pets and children can safely re-enter treated spaces as soon as sprays dry (typically 2-4 hours).",
      },
    ],
  },
  {
    id: "commercial-pest-control",
    title: "Commercial Pest Control & Food Safety",
    slug: "commercial-pest-control",
    shortDescription: "Audit-ready IPM programs for restaurants, warehouses, food processing facilities, and office buildings.",
    fullDescription: "Maintain regulatory compliance, protect your reputation, and prevent revenue loss with K2PC's commercial IPM programs. Designed for health-department audit standards with complete digital logbooks.",
    icon: "building",
    pestCategory: "commercial",
    targetPests: ["Rodents", "Cockroaches", "Flies", "Stored Product Insects"],
    signsOfInfestation: [
      "Health inspection infractions or customer sightings.",
      "Damage to stored inventory or food packaging.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Facility Risk Assessment",
        description: "Auditing waste areas, receiving docks, food prep lines, and storage zones.",
      },
      {
        step: 2,
        title: "Discrete Execution",
        description: "Off-hours or scheduled service minimizing business disruption.",
      },
      {
        step: 3,
        title: "Digital Audit Documentation",
        description: "Providing trend logs, SDS sheets, and inspection sign-offs.",
      },
    ],
    pricingStartsAt: "Custom Quote",
    warranty: "Audit-Ready Guarantee",
    faqs: [
      {
        question: "Do you provide documentation for public health inspectors?",
        answer: "Yes. Every commercial client receives a binder and digital binder with trend reports, bait station maps, pesticide records, and applicator credentials.",
      },
    ],
  },
  {
    id: "termite-inspection",
    title: "Termite Inspection & Barrier Treatment",
    slug: "termite-inspection",
    shortDescription: "Subterranean termite detection, moisture mapping, and liquid trenching protection.",
    fullDescription: "Eastern subterranean termites cause severe structural damage in specific GTA pockets like Toronto East and Peel Region. K2PC provides non-invasive thermal detection and subterranean liquid termiticide barriers.",
    icon: "shield",
    pestCategory: "insects",
    targetPests: ["Subterranean Termites"],
    signsOfInfestation: [
      "Mud tubes along basement foundation walls or floor joists.",
      "Hollow-sounding wood studs or blistered wood flooring.",
      "Discarded swarmer termite wings near windows in spring.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Acoustic & Moisture Audit",
        description: "Pinpointing subterranean termite gallery locations behind drywall.",
      },
      {
        step: 2,
        title: "Liquid Soil Trenching",
        description: "Creating an uninterrupted chemical barrier around the exterior foundation.",
      },
      {
        step: 3,
        title: "Annual Monitoring",
        description: "Installing in-ground monitoring stations to detect new termite activity.",
      },
    ],
    pricingStartsAt: "$299",
    warranty: "5-Year Structural Warranty",
    faqs: [
      {
        question: "How do I know if I have termites or carpenter ants?",
        answer: "Termites eat wood and leave mud tubes; carpenter ants hollow out wood and throw out sawdust (frass). Our licensed inspector can differentiate them immediately.",
      },
    ],
  },
  {
    id: "wildlife-removal",
    title: "Humane Wildlife Removal",
    slug: "wildlife-removal",
    shortDescription: "Humane 1-way door eviction and roofline exclusion for raccoons, squirrels, skunks, and opossums.",
    fullDescription: "GTA wildlife often nests in attics, chimneys, and under decks. We utilize Ministry-approved 1-way door eviction systems and heavy-gauge wire mesh sealing to ensure animals exit safely without harm.",
    icon: "bug",
    pestCategory: "wildlife",
    targetPests: ["Raccoons", "Squirrels", "Skunks", "Opossums", "Bats"],
    signsOfInfestation: [
      "Loud thumping or heavy scratching in attics at dusk or dawn.",
      "Torn roof soffits, chewed fascia boards, or damaged shingles.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Roof & Attic Audit",
        description: "Checking for active baby animal nests and identifying primary entry points.",
      },
      {
        step: 2,
        title: "1-Way Door Installation",
        description: "Installing a specialized one-way eviction door allowing animals to exit but not re-enter.",
      },
      {
        step: 3,
        title: "Heavy Mesh Screening",
        description: "Reinforcing roof vents, soffits, and chimneys with heavy-duty galvanized steel mesh.",
      },
    ],
    pricingStartsAt: "$279",
    warranty: "2-Year Wildlife Exclusion Warranty",
    faqs: [
      {
        question: "Do you kill the raccoons or squirrels?",
        answer: "Never. All wildlife removal is 100% humane, using one-way eviction doors and release protocols in accordance with Ontario wildlife protection laws.",
      },
    ],
  },
  {
    id: "seasonal-prevention-plans",
    title: "Seasonal Pest Prevention Plans",
    slug: "seasonal-prevention-plans",
    shortDescription: "4-season proactive exterior barriers protecting your home year-round from spring to winter.",
    fullDescription: "Prevent pests before they breach your home's perimeter. Our 4-season protection program delivers exterior barrier sprays, rodent station servicing, and soffit treatments tailored to each Ontario season.",
    icon: "calendar",
    pestCategory: "prevention",
    targetPests: ["Spring Ants", "Summer Wasps", "Fall Rodents", "Winter Spiders & Mice"],
    signsOfInfestation: [
      "Proactive protection for homeowners wanting zero pest surprises.",
    ],
    treatmentProcess: [
      {
        step: 1,
        title: "Spring Refresh",
        description: "Exterior ant barrier & de-webbing after winter thaw.",
      },
      {
        step: 2,
        title: "Summer Shield",
        description: "Wasp eave prevention and perimeter crawling insect barrier.",
      },
      {
        step: 3,
        title: "Fall Exclusion",
        description: "Exterior rodent station setup and window/door seal checks.",
      },
      {
        step: 4,
        title: "Winter Check",
        description: "Attic & basement monitoring to guarantee a pest-free home.",
      },
    ],
    pricingStartsAt: "$39/mo",
    warranty: "Year-Round Unlimited Free Re-visits",
    faqs: [
      {
        question: "What happens if pests return between seasonal visits?",
        answer: "If pests appear between scheduled visits, your technician will return and re-treat your property free of charge under our Year-Round Guarantee.",
      },
    ],
  },
];
