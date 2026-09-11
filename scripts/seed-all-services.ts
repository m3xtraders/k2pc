import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface FullServiceData {
  title: string;
  slug: string;
  icon: string;
  pestCategory: "insects" | "rodents" | "wildlife" | "birds" | "commercial" | "prevention";
  shortDescription: string;
  content: string;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  pricingStartsAt: string;
  warranty: string;
  targetPests: string[];
  signsOfInfestation: string[];
  treatmentProcess: Array<{ step: number; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const ALL_SERVICES_DATA: FullServiceData[] = [
  // 1. ANTS
  {
    title: "Ant Control & Colony Elimination",
    slug: "ant-control",
    icon: "ant",
    pestCategory: "insects",
    shortDescription: "Targeted extermination of carpenter ants, pavement ants, and pharaoh ants across Saskatoon homes with exterior barrier defense.",
    content: `Ant infestations in Saskatoon and surrounding Saskatchewan communities present serious structural and sanitary threats to homeowners. From moisture-seeking carpenter ants excavating nesting tunnels into load-bearing wooden framing to aggressive pavement and pharaoh ants invading kitchens in neighbourhoods like Nutana, Silverwood Heights, and Stonebridge, standard grocery store sprays only disperse the colony.

At K2 Pest Control, our certified Saskatchewan technicians implement systematic Integrated Pest Management (IPM). We begin with a non-destructive moisture and acoustic audit to uncover satellite colonies inside wall voids, subfloors, and foundation perimeter cracks. Our specialists apply Health Canada-registered, non-repellent transfer baits that worker ants transport directly to the subterranean queen. We reinforce this with a low-odour exterior foundation barrier and silica-based void treatments to guarantee total colony eradication.`,
    featuredImage: "/images/pests/ant.jpg",
    metaTitle: "Ant Control & Exterminator Saskatoon | K2 Pest Control",
    metaDescription: "Licensed ant extermination in Saskatoon & Area. Fast eradication of carpenter, pavement, and pharaoh ants. 100% Money-Back Guarantee. Call 306-715-1217.",
    pricingStartsAt: "$189",
    warranty: "3-Month Eradication Guarantee",
    targetPests: ["Carpenter Ants", "Pavement Ants", "Pharaoh Ants", "Odorous House Ants", "Thief Ants"],
    signsOfInfestation: [
      "Piles of fine wood shavings (frass) beneath baseboards, window ledges, or joists",
      "Noticeable foraging trails along kitchen counters, sinks, and foundation edges",
      "Winged swarmer ants emerging indoors during early spring and summer months",
      "Faint rustling sounds inside insulated hollow walls or door frames"
    ],
    treatmentProcess: [
      { step: 1, title: "Thermal & Nest Inspection", description: "Comprehensive search of foundation weep holes, plumbing penetrations, and landscape timbers to locate parent and satellite ant nests." },
      { step: 2, title: "Dominion Bait Placement", description: "Strategic distribution of sweet and protein matrix non-repellent baits that workers carry back to eliminate the queen." },
      { step: 3, title: "Perimeter Shield Application", description: "Applying a continuous low-odour barrier along external foundation lines, basement windows, and entry thresholds." },
      { step: 4, title: "Exclusion & Follow-Up", description: "Sealing vulnerable expansion joints and confirming complete colony termination with our 3-month eradication guarantee." }
    ],
    faqs: [
      { question: "How dangerous are carpenter ants to Saskatoon homes?", answer: "Carpenter ants don't eat wood; they hollow it out to build nests. Over time, large colonies can cause structural damage comparable to termites in Saskatchewan properties." },
      { question: "Do my pets and children need to leave during ant treatment?", answer: "Exterior foundation treatments and micro-gel baiting require zero relocation. If interior baseboard spraying is necessary, treated areas are completely safe once dry (typically 2-3 hours)." }
    ]
  },

  // 2. BED BUGS
  {
    title: "Bed Bug Thermal & Chemical Eradication",
    slug: "bed-bug-control",
    icon: "bed-bug",
    pestCategory: "insects",
    shortDescription: "Advanced thermal heat treatments and multi-stage residual extermination eliminating bed bugs and eggs across Saskatoon.",
    content: `Bed bugs (Cimex lectularius) are among the most persistent indoor parasites in urban Saskatoon, thriving in multi-family apartments, residential townhomes, and single-family houses from Riversdale to University Heights. Bed bugs can survive months without feeding and have developed widespread resistance to over-the-counter pyrethroid chemicals.

K2 Pest Control provides dual-action eradication protocols combining lethal thermal convection heat (122°F - 135°F / 50°C - 57°C) with advanced micro-encapsulated residual insecticides. Our industrial-grade electric heaters circulate superheated dry air through mattresses, headboards, electrical outlets, and baseboards, instantly dehydrating adult bed bugs, nymphs, and eggs in a single treatment. Backed by commercial mattress encasements and written eradication guarantees, we restore your peace of mind immediately.`,
    featuredImage: "/images/pests/bed-bug.jpg",
    metaTitle: "Bed Bug Heat Treatment & Exterminator Saskatoon | K2PC",
    metaDescription: "Complete bed bug heat treatment & chemical eradication in Saskatoon, SK. Kills all life stages including eggs in one day. 100% Guaranteed. Free Quote.",
    pricingStartsAt: "$349",
    warranty: "90-Day Eradication Guarantee",
    targetPests: ["Bed Bugs (Cimex lectularius)", "Bat Bugs"],
    signsOfInfestation: [
      "Clusters or linear patterns of itchy, red bite marks upon waking up",
      "Tiny rust-coloured fecal spots on mattress seams, sheets, or headboards",
      "Translucent shed nymph skins and tiny pearl-white egg casings in bed frame crevices",
      "Sweet, musty almond-like odor in heavily infested bedrooms"
    ],
    treatmentProcess: [
      { step: 1, title: "360° Bed & Furniture Audit", description: "Intensive inspection using high-lumen detection lights and thermal cameras across box springs, dressers, and baseboards." },
      { step: 2, title: "Lethal Thermal Convection", description: "Deploying commercial mobile heating units that penetrate fabrics, wall voids, and furniture to kill adults and eggs." },
      { step: 3, title: "Residual Barrier Injection", description: "Applying long-lasting botanical and micro-encapsulated residuals inside electrical switchplates and baseboard perimeters." },
      { step: 4, title: "Certified Encasement & Warranty", description: "Sealing box springs and mattresses with lab-tested bug-proof encasements and performing follow-up validation." }
    ],
    faqs: [
      { question: "Can bed bug eggs survive professional heat treatment?", answer: "No. Industrial heat treatments hold temperatures above 122°F (50°C), which denatures proteins in bed bugs at every biological stage, including unhatched eggs." },
      { question: "How should I prepare my Saskatoon home for treatment?", answer: "Our team provides a simple prep checklist: wash linens on high heat, declutter floor surfaces, and remove sensitive electronics, candles, and houseplants before heating begins." }
    ]
  },

  // 3. COCKROACHES
  {
    title: "Cockroach Control & Extermination",
    slug: "cockroach-control",
    icon: "cockroach",
    pestCategory: "insects",
    shortDescription: "High-intensity flush treatments, Insect Growth Regulators, and domino gel baits to eradicate German and Oriental roaches in Saskatoon.",
    content: `Cockroaches reproduce at staggering speeds in Saskatoon kitchens, restaurants, and basements. German cockroaches (Blattella germanica) carry dangerous foodborne pathogens including Salmonella, E. coli, and allergens that exacerbate childhood asthma. Because a single female egg capsule (ootheca) produces up to 40 nymphs, superficial store sprays only drive roaches deeper into wall cavities and appliances.

K2 Pest Control deploys an aggressive 3-stage IPM protocol designed for Saskatchewan homes and commercial facilities. We combine targeted flushing agents to expose hidden nesting harborages behind stoves and dishwashers with non-repellent domino-effect gel baits and Insect Growth Regulators (IGRs) that permanently break the insect's reproductive lifecycle.`,
    featuredImage: "/images/pests/cockroach.jpg",
    metaTitle: "Cockroach Exterminator Saskatoon | K2 Pest Control",
    metaDescription: "Effective German cockroach extermination in Saskatoon. Fast knockdown, domino gel baiting, and IGR breeding disruption. Guaranteed results.",
    pricingStartsAt: "$249",
    warranty: "90-Day Clean Home Guarantee",
    targetPests: ["German Cockroaches", "Oriental Cockroaches", "American Cockroaches", "Brown-Banded Cockroaches"],
    signsOfInfestation: [
      "Dark pepper-like droppings scattered inside kitchen cupboards, drawers, and under sinks",
      "Oval brown egg cases (oothecae) hidden in cabinet hinges or behind refrigerator motors",
      "Pungent, oily or musty odor lingering in warm kitchen and pantry corners",
      "Live roaches scattering rapidly when kitchen or bathroom lights are turned on at night"
    ],
    treatmentProcess: [
      { step: 1, title: "Harborage Mapping", description: "Deploying sticky pheromone monitors and flushing agents behind kitchen appliances to map colony epicenters." },
      { step: 2, title: "Low-Volume Flush & IGR", description: "Applying targeted micro-mists combined with chitin-synthesis inhibitors that prevent nymphs from maturing into breeding adults." },
      { step: 3, title: "Precision Domino Baiting", description: "Placing hundreds of micro-droplets of irresistible matrix bait in cracks where roaches feed and pass toxicant to the colony." },
      { step: 4, title: "Two-Week Re-Inspection", description: "Inspecting trap counts and performing secondary spot-treatments to guarantee 100% elimination of late-hatching nymphs." }
    ],
    faqs: [
      { question: "Why are German cockroaches so difficult to eliminate?", answer: "German roaches carry their egg cases until right before hatching and develop rapid immunity to off-the-shelf sprays. Professional multi-mode IGRs and cascading baits are essential." },
      { question: "How long until my Saskatoon home is completely roach-free?", answer: "You will notice a dramatic 80-90% drop within 48 to 72 hours. Complete eradication of all hidden cycles is achieved within 14 to 21 days." }
    ]
  },

  // 4. SPIDERS
  {
    title: "Spider Control & De-Webbing",
    slug: "spider-control",
    icon: "spider",
    pestCategory: "insects",
    shortDescription: "Interior and exterior spider reduction, eave de-webbing, and perimeter crawling insect barrier treatments in Saskatoon.",
    content: `While most spiders native to Saskatchewan are beneficial outdoor predators, heavy spider infestations around siding, soffits, window screens, and basements create unsightly webbing and unwanted indoor bites. Spiders like the common cellar spider, wolf spider, yellow sac spider, and funnel weaver thrive in Saskatoon properties, especially in river-adjacent communities like Silverwood Heights, City Park, and Lawson Heights.

K2 Pest Control provides complete interior and exterior spider defense. We begin by mechanically sweeping and vacuuming webs and egg sacs from roof peaks, eaves, and foundation lines. We then apply micro-encapsulated exterior foundation barriers that eliminate crawling prey insects—depriving spiders of their primary food supply and maintaining a clean, spider-free home.`,
    featuredImage: "/images/pests/spider.jpg",
    metaTitle: "Spider Control & Exterminator Saskatoon | K2 Pest Control",
    metaDescription: "Professional spider removal & eave de-webbing in Saskatoon. Long-lasting exterior perimeter defense and indoor treatment. 100% Guaranteed.",
    pricingStartsAt: "$169",
    warranty: "90-Day Pest-Free Guarantee",
    targetPests: ["Cellar Spiders", "Yellow Sac Spiders", "Wolf Spiders", "House Spiders", "Fishing Spiders", "Orb Weavers"],
    signsOfInfestation: [
      "Dense, sticky webs accumulating along exterior soffits, light fixtures, and window frames",
      "Spiders scurrying across basement concrete, baseboards, or near floor drains",
      "Silken egg sacs tucked behind stored boxes, deck furniture, or unfinished basement rafters",
      "Minor localized skin welts caused by yellow sac spider nighttime encounters"
    ],
    treatmentProcess: [
      { step: 1, title: "High-Reach De-Webbing", description: "Mechanical sweep of all roof eaves, exterior siding, gutters, and patio overhangs using telescopic brushes to remove webs and egg sacs." },
      { step: 2, title: "Perimeter Barrier Spray", description: "Applying micro-encapsulated, weather-resistant insecticide around foundation perimeters, basement windows, and crawl spaces." },
      { step: 3, title: "Prey Insect Elimination", description: "Treating exterior lighting zones and mulch beds to dramatically reduce the flying and crawling insects spiders feed upon." },
      { step: 4, title: "Indoor Crevice Dusting", description: "Injecting desiccant dust into basement rim joists and dark storage corners for season-long residual control." }
    ],
    faqs: [
      { question: "Are spiders in Saskatoon dangerous to people or dogs?", answer: "Most Saskatchewan spiders have mild venom harmless to humans. Yellow sac spiders can deliver a mildly painful pinch with localized redness, but dangerous species like black widows are extremely rare." },
      { question: "How do you stop spiders from building webs on my outdoor lights?", answer: "Our exterior micro-encapsulated treatments coat surfaces where spiders anchor their webbing and eliminate the moths and midges attracted to the bulbs." }
    ]
  },

  // 5. MOSQUITOES
  {
    title: "Mosquito Control & Yard Protection",
    slug: "mosquito-control",
    icon: "mosquito",
    pestCategory: "insects",
    shortDescription: "Exclusive mosquito barrier yard treatments and standing water larvicide programs along the South Saskatchewan River valley.",
    content: `Summers in Saskatoon are meant to be enjoyed outdoors, but swarms of aggressive mosquitoes often turn backyard barbecues and patio evenings into an ordeal. Because Saskatoon sits in the South Saskatchewan River basin surrounded by agricultural drainage sloughs and parklands, mosquito populations surge rapidly following spring snowmelt and early summer rains.

K2 Pest Control offers the premier mosquito yard barrier program in Saskatoon. Our certified technicians utilize commercial backpack mist-blowers to apply botanical and micro-encapsulated barrier sprays to the undersides of dense foliage, shrubs, tall grass, and shaded deck overhangs where adult mosquitoes rest during the heat of the day. Combined with eco-friendly BTI larvicide briquettes in non-draining standing water, our treatments reduce yard mosquito activity by over 90% for weeks at a time.`,
    featuredImage: "/images/pests/wasp.jpg",
    metaTitle: "Mosquito Control Saskatoon | Backyard Yard Barrier Spray",
    metaDescription: "Saskatoon's premier mosquito yard control program. Knock down mosquitoes, ticks, and gnats. Enjoy your backyard all summer. 100% Guaranteed.",
    pricingStartsAt: "$149/visit",
    warranty: "Season-Long Outdoor Guarantee",
    targetPests: ["Culex Mosquitoes (West Nile carriers)", "Aedes Floodwater Mosquitoes", "Biting Midges / No-See-Ums"],
    signsOfInfestation: [
      "Inability to enjoy your backyard or patio in the morning or evening without bug spray",
      "Swarms rising from tall shrubs, cedar hedges, or shaded lawn perimeters when disturbed",
      "Presence of standing water in bird baths, rain barrels, or low-lying lawn depressions with wriggling larvae",
      "Frequent painful, itchy mosquito welts on children and pets"
    ],
    treatmentProcess: [
      { step: 1, title: "Property Water Audit", description: "Mapping standing water hazards, clogged gutters, and shade rest zones throughout your lawn and garden." },
      { step: 2, title: "Canopy Mist Application", description: "Applying micro-droplet barrier sprays directly to the undersides of leaves, tall grasses, deck substructures, and fence lines." },
      { step: 3, title: "BTI Biological Larvicide", description: "Treating unavoidable standing water with biological larvicide briquettes that eliminate mosquito larvae without harming wildlife or pets." },
      { step: 4, title: "Scheduled Summer Refresh", description: "Automatic 21 to 28-day retreatments throughout June, July, and August to maintain continuous barrier defense." }
    ],
    faqs: [
      { question: "Is the mosquito yard spray safe for my children, dogs, and pollinators?", answer: "Yes. Once the treatment has fully dried (about 30-45 minutes), your lawn and deck are completely safe for kids and pets. We strictly avoid flowering plants and vegetable gardens to protect bees." },
      { question: "Do you offer one-time mosquito treatments for outdoor weddings or events?", answer: "Yes! We provide specialized special event sprays 24 to 48 hours before your wedding, family reunion, or backyard party in Saskatoon and surrounding acreages." }
    ]
  },

  // 6. WASPS & HORNETS
  {
    title: "Wasp & Hornet Nest Removal",
    slug: "wasp-removal",
    icon: "wasp",
    pestCategory: "insects",
    shortDescription: "Same-day eradication and safe detachment of yellowjacket, bald-faced hornet, and paper wasp nests from eaves, decks, and walls.",
    content: `Wasps and hornets represent an urgent stinging hazard for Saskatoon homeowners, especially late in summer when colonies reach peak populations of several thousand aggressive defenders. Yellowjackets frequently build concealed nests inside exterior wall voids, soffits, and brick weep holes, while bald-faced hornets construct massive football-shaped paper nests in trees and overhangs.

Never attempt to plug a wasp entry hole in your siding—this forces angry wasps directly into your interior living rooms. K2 Pest Control provides prompt same-day wasp removal across Saskatoon. Equipped with protective bee suits and pressurized injection equipment, our exterminators neutralize active nests immediately, remove physical structures, and apply residual repellent dusts to prevent rebuilding.`,
    featuredImage: "/images/pests/wasp.jpg",
    metaTitle: "Wasp & Hornet Nest Removal Saskatoon | Same-Day Service",
    metaDescription: "Same-day wasp and hornet removal in Saskatoon, SK. Safe detachment of eaves, soffit, and wall void nests. Call 306-715-1217 for fast relief.",
    pricingStartsAt: "$159",
    warranty: "Full-Season Nest Guarantee",
    targetPests: ["Yellowjackets (Vespula)", "Bald-Faced Hornets (Dolichovespula maculata)", "Paper Wasps (Polistes)", "Mud Daubers"],
    signsOfInfestation: [
      "Consistent flight paths of wasps disappearing into roof soffits, siding gaps, or brick weep holes",
      "Visible grey paper nests hanging from fascia boards, porch ceilings, shed eaves, or trees",
      "Faint buzzing, clicking, or scratching sounds coming from interior drywall or ceiling vents",
      "Aggressive wasp activity near outdoor dining tables, trash cans, or barbecues"
    ],
    treatmentProcess: [
      { step: 1, title: "Species & Entry Identification", description: "Locating all primary and secondary flight cavities to distinguish between aerial hornet nests and concealed wall-void yellowjackets." },
      { step: 2, title: "Pressurized Injection", description: "Injecting fast-acting Health Canada knockdown agents directly into the nest core to eliminate queens, workers, and larvae." },
      { step: 3, title: "Physical Detachment & Removal", description: "Safely scraping down the physical nest and scraping away pheromone anchor points to prevent colony re-establishment." },
      { step: 4, title: "Residual Soffit Dusting", description: "Applying micro-fine repellent dust into void openings to guarantee wasps do not rebuild in the treated location." }
    ],
    faqs: [
      { question: "What should I do if wasps are coming inside my home through a light fixture or vent?", answer: "Do NOT spray store aerosol into the hole or tape it shut. Leave the room, close interior doors, and call our emergency dispatch at 306-715-1217 for immediate priority service." },
      { question: "How fast will the wasps disappear after treatment?", answer: "Activity inside the nest stops immediately within minutes. Any foraging wasps returning from outdoors will encounter the residual treatment and expire within a few hours." }
    ]
  },

  // 7. FLIES
  {
    title: "Fly Control & Drain Bio-Sanitation",
    slug: "fly-control",
    icon: "bug",
    pestCategory: "insects",
    shortDescription: "Comprehensive elimination of fruit flies, drain flies, house flies, and cluster flies for Saskatoon homes and food facilities.",
    content: `Flies are far more than a minor domestic nuisance; they are active vectors for pathogenic bacteria including Salmonella, Listeria, and Staphylococcus. In Saskatoon, properties face distinct seasonal fly challenges: spring cluster flies overwintering in attic spaces, summer house flies clustering around waste bins, and persistent fruit flies or drain flies infesting organic grease buildup in kitchen sinks and commercial bar lines.

K2 Pest Control provides specialized multi-stage fly eradication. Rather than relying on temporary foggers, we target the root breeding sources with specialized bacterial foam bio-sanitation that breaks down organic gelatinous film inside plumbing drains. Combined with insect light traps (ILTs), tamper-resistant fly baits, and exterior entry exclusion, we ensure your residential kitchen or restaurant stays sanitary and audit-compliant.`,
    featuredImage: "/images/services/generated/fly-control.jpg",
    metaTitle: "Fly Control & Drain Treatment Saskatoon | K2 Pest Control",
    metaDescription: "Professional fly extermination in Saskatoon, SK. Fast elimination of fruit flies, drain flies, and house flies for homes & restaurants. Call today.",
    pricingStartsAt: "$179",
    warranty: "60-Day Guarantee",
    targetPests: ["Drain Flies (Psychodidae)", "Fruit Flies (Drosophila melanogaster)", "House Flies (Musca domestica)", "Cluster Flies (Pollenia)", "Blow Flies"],
    signsOfInfestation: [
      "Small moth-like flies hovering consistently around bathroom or kitchen sink drains",
      "Persistent clouds of tiny gnats hovering over fruit bowls, garbage disposals, or recycling bins",
      "Large sluggish cluster flies collecting in windows and sunrooms during warm autumn or spring days",
      "Fly specking (small dark droppings) visible on light fixtures, ceiling fans, and upper wall trim"
    ],
    treatmentProcess: [
      { step: 1, title: "Drain & Organic Waste Audit", description: "Using optical scopes to inspect floor drains, grease traps, under-counter refrigeration pans, and trash storage." },
      { step: 2, title: "Bio-Enzymatic Foam Treatment", description: "Injecting expanding bio-enzymatic foam deep into plumbing lines to digest decaying organic sludge where fly larvae thrive." },
      { step: 3, title: "UV Light & Pheromone Trapping", description: "Installing discreet electronic fly capture units and targeted non-toxic insect attractants in high-traffic commercial zones." },
      { step: 4, title: "Attic & Window Void Dusting", description: "Applying long-lasting botanical dusts into window frames and attic eaves to combat overwintering cluster fly invasions." }
    ],
    faqs: [
      { question: "Why do pouring bleach or boiling water down the drain fail to kill drain flies?", answer: "Bleach and hot water run right over the thick gelatinous scum lining pipes without penetrating it. Our bio-enzymatic foam clings to pipe walls and digests the organic sludge where fly eggs and larvae live." },
      { question: "Are fruit flies a sign of a dirty kitchen?", answer: "Not necessarily. Fruit fly eggs are frequently brought home undetected on supermarket produce. Once inside, they reproduce in wine corks, mop buckets, and recycling bins." }
    ]
  },

  // 8. SILVERFISH
  {
    title: "Silverfish & Firebrat Control",
    slug: "silverfish-control",
    icon: "bug",
    pestCategory: "insects",
    shortDescription: "Precision micro-dust and desiccant treatments eliminating silverfish and firebrats from Saskatoon basements and bathrooms.",
    content: `Silverfish (Lepisma saccharina) and firebrats are nocturnal, wingless prehistoric insects that thrive in Saskatoon's high-humidity indoor zones, including damp basements, bathroom vanities, laundry rooms, and insulated attics. Because they consume carbohydrates, starches, and dextrin, silverfish can cause irreversible damage to wallpaper, book bindings, archival documents, cardboard storage, and natural fiber clothing like silk and linen.

K2 Pest Control provides complete silverfish eradication tailored to Saskatchewan homes. We utilize low-toxicity desiccant dusts, micro-encapsulated perimeter residuals, and targeted moisture-reduction recommendations to eliminate existing populations and prevent re-infestation behind baseboards and drywall voids.`,
    featuredImage: "/images/services/generated/silverfish-control.jpg",
    metaTitle: "Silverfish Control Saskatoon | K2 Pest Control SK",
    metaDescription: "Licensed silverfish & firebrat extermination in Saskatoon. Protect books, wallpaper, and clothing from moisture-loving pests. 100% Guaranteed.",
    pricingStartsAt: "$169",
    warranty: "90-Day Guarantee",
    targetPests: ["Common Silverfish (Lepisma saccharina)", "Firebrats (Thermobia domestica)", "Booklice"],
    signsOfInfestation: [
      "Silver, carrot-shaped insects darting quickly across bathroom tiles or basement concrete when lights turn on",
      "Irregular notched feeding holes and yellowish stains on wallpaper, cardboard boxes, or cotton fabrics",
      "Tiny dark pepper-like droppings nestled inside storage bins, bookshelves, or linen closets",
      "Shed silvery scales visible under magnifying inspection along baseboards"
    ],
    treatmentProcess: [
      { step: 1, title: "Moisture & Harborage Audit", description: "Inspecting plumbing chases, under-sink cabinets, floor drains, and attic insulation using hygrometers." },
      { step: 2, title: "Precision Crevice Injection", description: "Applying micro-fine desiccant dusts (such as amorphous silica) deep into wall voids, subfloors, and hollow baseboards." },
      { step: 3, title: "Perimeter Barrier Shield", description: "Applying non-staining residual barriers along perimeter transitions, door thresholds, and utility pipe penetrations." },
      { step: 4, title: "Dehumidification Strategy", description: "Providing homeowners with specific moisture-control guidance to eliminate the damp environment silverfish require to survive." }
    ],
    faqs: [
      { question: "Do silverfish bite humans or transmit diseases?", answer: "No. Silverfish do not bite humans or carry dangerous pathogens. However, they contaminate food products, trigger indoor dust allergies in sensitive individuals, and cause costly property damage." },
      { question: "Why do silverfish keep appearing in my new Saskatoon build?", answer: "New construction lumber and drywall drywall mud retain high moisture during the first few years, creating an ideal incubation microclimate for silverfish." }
    ]
  },

  // 9. FLEAS & TICKS
  {
    title: "Flea & Tick Extermination",
    slug: "flea-tick-control",
    icon: "paw",
    pestCategory: "insects",
    shortDescription: "Complete indoor and yard flea & tick extermination with Insect Growth Regulators protecting Saskatoon families and pets.",
    content: `Fleas (Ctenocephalides felis) and ticks (including American Dog Ticks and Blacklegged Deer Ticks) pose serious medical risks across Saskatchewan. Ticks found in river valleys, Meewasin trails, and regional dog parks can transmit Lyme disease and Rocky Mountain spotted fever, while indoor flea outbreaks cause relentless itching, flea allergy dermatitis, and tapeworm transmission in domestic pets.

K2 Pest Control provides a coordinated indoor-outdoor eradication strategy. Inside your home, we apply dual-action residual insecticides combined with medical-grade Insect Growth Regulators (IGRs) that penetrate carpet fibers, furniture pleats, and pet bedding to stop egg hatching. Outdoors, we create protective perimeter yard barriers along turf edges and brush lines to keep your yard safe for play.`,
    featuredImage: "/images/services/generated/flea-tick-control.jpg",
    metaTitle: "Flea & Tick Exterminator Saskatoon | K2 Pest Control",
    metaDescription: "Guaranteed flea and tick control in Saskatoon & Area. Comprehensive indoor carpet treatments and outdoor yard barriers. Protect pets and family.",
    pricingStartsAt: "$219",
    warranty: "90-Day Guarantee",
    targetPests: ["Cat & Dog Fleas (Ctenocephalides)", "American Dog Ticks (Dermacentor variabilis)", "Blacklegged Deer Ticks (Ixodes scapularis)", "Brown Dog Ticks"],
    signsOfInfestation: [
      "Pets incessantly scratching, biting their paws, or exhibiting red patchy fur loss",
      "Tiny black 'flea dirt' specks on pet bedding, rugs, or white socks",
      "Small, itchy red bites clustered around human ankles and lower calves",
      "Engorged ticks found attached to pet fur after walks near tall grass or riverbank trails"
    ],
    treatmentProcess: [
      { step: 1, title: "Infestation Mapping", description: "Identifying pet resting hubs, carpet pile density, and outdoor shaded yard perimeters harboring flea pupae and questing ticks." },
      { step: 2, title: "IGR & Residual Application", description: "Broad-spectrum low-toxicity application targeting carpets, under-furniture recesses, and baseboards to arrest pupal development." },
      { step: 3, title: "Lawn & Perimeter Barrier", description: "Spraying property fence lines, patio borders, and dog run perimeters with weather-resistant tick insecticides." },
      { step: 4, title: "Coordination & Follow-Up", description: "Advising veterinary flea medication synchronisation and performing follow-up monitoring to confirm complete disruption." }
    ],
    faqs: [
      { question: "Why are fleas still jumping after the initial extermination?", answer: "Flea pupae are protected inside silken cocoons impervious to spray. As they emerge over the next 10-14 days due to room vibrations, they contact our residual IGR treatment and perish before reproducing." },
      { question: "Do I have to wash all bedding when getting flea treatment?", answer: "Yes. All human bedsheets, pet blankets, and washable rugs should be laundered in hot soapy water and dried on the highest heat cycle on the day of service." }
    ]
  },

  // 10. NUISANCE BUGS
  {
    title: "Boxelder, Elm Seed & Nuisance Bug Control",
    slug: "nuisance-bugs",
    icon: "bug",
    pestCategory: "insects",
    shortDescription: "Targeted exterior barrier sprays stopping boxelder bugs, elm seed bugs, centipedes, and sowbugs from invading Saskatoon homes.",
    content: `Saskatoon's mature urban canopy of Manchurian elms, Manitoba maples, and boxelder trees creates a seasonal boom in nuisance insects. As summer turns to autumn, tens of thousands of boxelder bugs and invasive elm seed bugs swarm warm south- and west-facing exterior siding, window casings, and door thresholds in neighbourhoods from Varsity View to Buena Vista, seeking shelter to overwinter inside your attic and wall insulation.

K2 Pest Control provides specialized exterior barrier defense against nuisance invaders. By timing treatments during peak congregating periods in late summer and early autumn, we apply micro-encapsulated residual barriers around roof eaves, foundation lines, and window frames—stopping these bugs before they penetrate your home's envelope.`,
    featuredImage: "/images/services/generated/nuisance-bugs.jpg",
    metaTitle: "Boxelder & Elm Seed Bug Control Saskatoon | K2PC",
    metaDescription: "Stop swarms of boxelder bugs, elm seed bugs, centipedes, and sowbugs in Saskatoon. High-power exterior barrier sprays. Guaranteed seasonal protection.",
    pricingStartsAt: "$169",
    warranty: "Full-Season Protection Guarantee",
    targetPests: ["Boxelder Bugs (Boisea trivittata)", "Elm Seed Bugs (Arocatus melanocephalus)", "House Centipedes", "Sowbugs / Pillbugs", "Earwigs"],
    signsOfInfestation: [
      "Large congregating clusters of black-and-red bugs covering sunny exterior house siding and porches",
      "Bugs squeezing through window screen corners, door sweeps, and attic vents",
      "Pungent almond-like odor emitted when elm seed bugs are disturbed or crushed indoors",
      "Unsightly orange or reddish stains left on curtains, light vinyl siding, and window sills"
    ],
    treatmentProcess: [
      { step: 1, title: "Perimeter & Siding Audit", description: "Identifying host Manitoba maple and elm trees on the property and mapping sunny wall voids where bugs aggregate." },
      { step: 2, title: "High-Volume Power Spray", description: "Applying heavy-duty micro-encapsulated residual barrier up exterior siding, under fascia boards, and around window perimeters." },
      { step: 3, title: "Foundation & Threshold Seal", description: "Sealing ground-level foundation cracks, utility pipes, and installing weather-stripping guidance." },
      { step: 4, title: "Attic & Window Void Treatment", description: "Dusting interior attic crawlspaces and window void gaps with repellent desiccant dust to neutralize any bugs that entered previously." }
    ],
    faqs: [
      { question: "Do boxelder bugs or elm seed bugs damage my house or bite?", answer: "They do not bite humans or cause structural wood damage, but their sheer numbers are overwhelming and their excretions stain curtains, paint, and upholstery." },
      { question: "When is the best time to treat for boxelder bugs in Saskatoon?", answer: "Late August through early October is the optimal window when adult bugs gather on warm exterior walls before finding overwintering entry points inside your home." }
    ]
  },

  // 11. OTHER INSECTS
  {
    title: "Pantry Pests, Beetles & General Insect Control",
    slug: "insect-control",
    icon: "bug",
    pestCategory: "insects",
    shortDescription: "Comprehensive elimination of carpet beetles, pantry moths, flour weevils, earwigs, and crawling insects across Saskatoon.",
    content: `Unidentified crawling insects and stored-product pests can silently compromise your pantry dry goods, wool carpeting, and upholstered furniture. Common Saskatoon invaders include varied carpet beetles feeding on natural fibres, Indian meal moths infesting grains and pet food, and moisture-loving earwigs invading basement crawl spaces during wet Prairie springs.

K2 Pest Control provides accurate species identification and targeted IPM eradication. We trace the exact epicenter of your infestation, remove contaminated harborage materials, apply precision crack-and-crevice residual treatments, and install pheromone monitors to ensure your home remains clean, healthy, and insect-free.`,
    featuredImage: "/images/services/generated/insect-control.jpg",
    metaTitle: "General Insect & Pantry Pest Control Saskatoon | K2PC",
    metaDescription: "Eradicate pantry moths, carpet beetles, flour weevils, earwigs, and crawling insects in Saskatoon, SK. Safe, certified pest management. Call 306-715-1217.",
    pricingStartsAt: "$179",
    warranty: "90-Day Guarantee",
    targetPests: ["Indian Meal Moths", "Varied Carpet Beetles", "Confused Flour Beetles", "Grain Weevils", "European Earwigs", "Crickets"],
    signsOfInfestation: [
      "Silken webbing, cocoons, or tiny crawling larvae found inside cereal boxes, flour, or dried pet food",
      "Small oval beetles congregating on window sills or irregular holes in wool rugs and suits",
      "Earwigs discovered under potted plants, basement rugs, or around bathroom drains",
      "Small moths fluttering erratically in kitchen pantries or food prep areas"
    ],
    treatmentProcess: [
      { step: 1, title: "Microscopic Species ID", description: "Accurately identifying the exact insect species to determine dietary targets, whether stored grains or keratin fabric fibers." },
      { step: 2, title: "Pantry & Closet Sanitation", description: "Assisting homeowners with isolating infested products and vacuuming hidden larvae from shelf crevices and drawer runners." },
      { step: 3, title: "Targeted Botanical Residual", description: "Applying Health Canada-approved residual insecticides and desiccant dusts behind baseboards and storage perimeters." },
      { step: 4, title: "Pheromone Trap Monitoring", description: "Placing specialized species-specific pheromone lure monitors to detect and prevent future breeding cycles." }
    ],
    faqs: [
      { question: "How did pantry moths or carpet beetles get into my clean kitchen?", answer: "Most pantry pests arrive inside pre-packaged flour, birdseed, or rice from grocery distribution warehouses. Carpet beetles frequently enter through open windows or on cut flowers." },
      { question: "Do I have to throw out all food in my pantry during treatment?", answer: "Only items with active evidence of webbing, larvae, or damaged packaging need disposal. Unopened airtight glass or hard plastic containers are completely safe." }
    ]
  },

  // 12. SLUGS & SNAILS
  {
    title: "Slug & Snail Garden Control",
    slug: "slug-snail-control",
    icon: "bug",
    pestCategory: "insects",
    shortDescription: "Organic, pet-safe slug and snail treatments protecting Saskatoon gardens, hostas, vegetable beds, and decorative landscaping.",
    content: `During wet Saskatchewan springs and humid summer months along irrigation zones, grey garden slugs (Deroceras reticulatum) and snails multiply rapidly, devouring hostas, vegetable gardens, strawberries, and tender landscape foliage overnight. Traditional metaldehyde slug pellets pose severe poisoning risks to neighbourhood dogs, cats, and birds.

K2 Pest Control provides pet-safe, organic iron phosphate baiting programs across Saskatoon and surrounding acreages. Our treatments attract and eliminate destructive slugs beneath mulch beds, rock gardens, and patio pavers while breaking down naturally into soil nutrients with zero risk to pets, children, or beneficial earthworms.`,
    featuredImage: "/images/services/generated/slug-snail-control.jpg",
    metaTitle: "Slug & Snail Control Saskatoon | Pet-Safe Garden Defense",
    metaDescription: "Pet-safe and eco-friendly slug and snail control for Saskatoon gardens, hostas, and vegetable beds. Protect your landscape with K2 Pest Control.",
    pricingStartsAt: "$149",
    warranty: "60-Day Garden Guarantee",
    targetPests: ["Grey Garden Slugs (Deroceras reticulatum)", "Banded Wood Snails", "Amber Snails"],
    signsOfInfestation: [
      "Silvery, glistening slime trails crossing sidewalk pavers, deck boards, and garden beds",
      "Large ragged holes chewed into hosta leaves, lettuce, petunias, and vegetable foliage",
      "Seedlings severed completely at ground level overnight",
      "Live slugs hidden under planters, landscape rocks, wooden deck steps, and thick mulch"
    ],
    treatmentProcess: [
      { step: 1, title: "Habitat Assessment", description: "Identifying damp irrigation zones, over-mulched beds, and daytime harborage shelters beneath rocks and landscape timbers." },
      { step: 2, title: "Pet-Safe Bait Distribution", description: "Evenly broadcasting organic iron phosphate micro-granules around vulnerable flower beds and garden borders." },
      { step: 3, title: "Perimeter Foundation Shield", description: "Applying safe mineral barrier lines preventing slugs from crawling up damp stucco, concrete foundations, and siding." },
      { step: 4, title: "Moisture & Cultural Guidance", description: "Advising on drip irrigation timing and mulching practices to eliminate the high-humidity microclimate slugs require." }
    ],
    faqs: [
      { question: "Is your slug bait safe if my dog eats it or licks the garden soil?", answer: "Yes! We use organic iron phosphate formulations approved by Health Canada that affect only the digestive systems of mollusks, leaving dogs, cats, birds, and earthworms completely unharmed." },
      { question: "How long does a garden slug treatment last in Saskatchewan weather?", answer: "Our commercial-grade rain-resistant bait pellets withstand heavy rain and lawn sprinklers, providing active protection for up to 3 to 4 weeks per application." }
    ]
  },

  // 13. MICE & RATS
  {
    title: "Mice & Rat Extermination",
    slug: "mice-rat-control",
    icon: "rodent",
    pestCategory: "rodents",
    shortDescription: "Rapid mice and rat eradication, attic sanitation, and guaranteed exclusion sealing for Saskatoon homes and businesses.",
    content: `As temperatures drop across Saskatchewan each autumn, house mice (Mus musculus), deer mice (Peromyscus maniculatus), and Norway rats seek warmth, food, and nesting shelter inside Saskatoon buildings. Deer mice in rural and acreage properties around Corman Park, Warman, and Martensville are known carriers of Hantavirus Pulmonary Syndrome, while rodents chewing on electrical insulation cause devastating house fires.

K2 Pest Control delivers an intensive 4-phase rodent elimination system. We conduct an exhaustive 360° building inspection to locate exterior entry points down to 1/4 inch, deploy child- and pet-proof tamper-resistant bait stations, set high-speed mechanical trapping networks in travel runs, and exclude rodents permanently with commercial steel mesh.`,
    featuredImage: "/images/services/generated/mice-rat-control.jpg",
    metaTitle: "Mice & Rat Exterminator Saskatoon | K2 Pest Control",
    metaDescription: "Licensed mice & rat removal in Saskatoon, SK. Fast eradication, safe tamper-proof trapping, and permanent exclusion sealing. 100% Guaranteed.",
    pricingStartsAt: "$229",
    warranty: "1-Year Exclusion Guarantee",
    targetPests: ["House Mice (Mus musculus)", "Deer Mice (Peromyscus maniculatus)", "Norway Rats (Rattus norvegicus)", "Roof Rats"],
    signsOfInfestation: [
      "Small dark spindle-shaped droppings inside kitchen cabinets, pantries, basements, or attic insulation",
      "Scratching, scurrying, or squeaking noises inside walls or overhead ceilings at night",
      "Gnaw marks on food packaging, plastic pipes, structural baseboards, or electrical wiring",
      "Greasy dark rub marks along basement baseboards and wall openings"
    ],
    treatmentProcess: [
      { step: 1, title: "360° Foundation Inspection", description: "Inspecting air conditioner chases, gas lines, garage door corner seals, and rooflines for entry holes down to 1/4 inch." },
      { step: 2, title: "High-Capacity Trapping & Baits", description: "Installing locked, tamper-resistant exterior rodent bait stations and interior mechanical snap-trapping lines." },
      { step: 3, title: "Heavy Exclusion Sealing", description: "Sealing all structural gaps with stainless steel wire mesh, galvanized flashing, and commercial silicone sealants." },
      { step: 4, title: "Sanitation & Bio-Wash", description: "Disinfecting contaminated areas and neutralizing rodent pheromone trails to ensure zero return." }
    ],
    faqs: [
      { question: "How small of a hole can a mouse squeeze through into my house?", answer: "A common house mouse can squeeze through an opening as small as 6 millimeters (1/4 inch)—about the diameter of a standard pencil. Our technicians inspect and seal every gap." },
      { question: "Are your rodent bait stations safe around dogs and toddlers?", answer: "Yes. All rodenticides are installed strictly within heavy-duty, tamper-resistant locking stations anchored in place, preventing access by pets, children, or non-target wildlife." }
    ]
  },

  // 14. RODENT CONTROL (STRUCTURAL PROOFING)
  {
    title: "Rodent Control & Structural Proofing",
    slug: "rodent-control",
    icon: "rodent",
    pestCategory: "rodents",
    shortDescription: "Long-term architectural rodent-proofing, attic exclusion, crawl space sanitation, and perimeter monitoring across Saskatoon.",
    content: `Trapping mice inside your home without repairing structural access points is a never-ending cycle. In Saskatoon's climate with extreme seasonal freeze-thaw cycles, building foundations, siding transitions, and utility penetrations shift and crack, inviting continuous rodent re-entry year after year.

K2 Pest Control specializes in architectural rodent exclusion and building proofing. We combine high-density copper and stainless steel mesh, heavy-gauge galvanized hardware cloth, and pest-proof hydraulic sealants to permanently lock rodents out of attics, crawl spaces, and wall cavities. Backed by our multi-year exclusion guarantee, your home remains fortified against Prairie winters.`,
    featuredImage: "/images/pests/rodent.jpg",
    metaTitle: "Rodent Proofing & Exclusion Saskatoon | K2 Pest Control",
    metaDescription: "Permanent rodent exclusion & structural mouse proofing in Saskatoon. Heavy-gauge metal sealing, attic decontamination, and multi-year guarantees.",
    pricingStartsAt: "$249",
    warranty: "1-Year Structural Exclusion Guarantee",
    targetPests: ["House Mice", "Deer Mice", "Norway Rats", "Field Voles"],
    signsOfInfestation: [
      "Recurring rodent activity every autumn despite setting store-bought traps",
      "Cracked mortar, gaps beneath exterior siding, or degraded rubber garage door bottom sweeps",
      "Trampled tunnel trails and shredded insulation in attic spaces or crawlspaces",
      "Burrow holes excavated alongside concrete walkways, air conditioning pads, or deck pillars"
    ],
    treatmentProcess: [
      { step: 1, title: "Architectural Vulnerability Audit", description: "Detailed structural audit of roofline soffits, chimney flashing, weep vents, and utility entry points." },
      { step: 2, title: "Heavy Metal Exclusion", description: "Installing rust-proof stainless mesh, expanded steel lath, and heavy-gauge flashing over all potential entryways." },
      { step: 3, title: "Internal Colony Extraction", description: "Setting professional mechanical traps to eliminate any rodents remaining inside the building envelope." },
      { step: 4, title: "Attic Cleanout & Deodorization", description: "Safely removing contaminated droppings and applying enzymatic disinfectant to eliminate pheromone attractants." }
    ],
    faqs: [
      { question: "What materials do you use for rodent exclusion?", answer: "We use heavy-gauge galvanized steel wire mesh, copper mesh, sheet metal flashings, and specialized polyurethane chew-proof sealants that rodents cannot penetrate." },
      { question: "Does rodent proofing include my detached garage and shed?", answer: "Yes, we can inspect and rodent-proof attached garages, detached shops, garden sheds, and acreage outbuildings across Saskatoon and area." }
    ]
  },

  // 15. GOPHERS / GROUND SQUIRRELS
  {
    title: "Gopher & Ground Squirrel Control",
    slug: "gopher-control",
    icon: "bug",
    pestCategory: "wildlife",
    shortDescription: "Professional Richardson ground squirrel and pocket gopher eradication for Saskatoon lawns, acreages, and commercial grounds.",
    content: `Pocket gophers and Richardson ground squirrels (commonly called gophers across the Canadian Prairies) cause severe destruction to residential lawns, golf courses, commercial turf, and rural acreages in Saskatoon and surrounding municipalities like Corman Park, Warman, and Martensville. Their extensive underground tunneling systems undermine concrete sidewalks, damage underground utility cables, destroy lawn mower blades, and present tripping and fracture hazards for children, athletes, and livestock.

K2 Pest Control provides licensed, humane, and highly effective gopher control. We deploy specialized sub-surface pressurized burrow treatments, precision mechanical trapping, and targeted agricultural-grade control systems that eliminate the burrow network quickly without hazardous above-ground secondary poisoning risks for family pets.`,
    featuredImage: "/images/services/generated/gopher-control.jpg",
    metaTitle: "Gopher Control & Exterminator Saskatoon | Ground Squirrels",
    metaDescription: "Expert gopher and Richardson ground squirrel eradication in Saskatoon & Area. Protect lawns, acreages, and commercial turf. Licensed & Guaranteed.",
    pricingStartsAt: "$239",
    warranty: "Full-Season Turf Guarantee",
    targetPests: ["Richardson's Ground Squirrels (Urocitellus richardsonii)", "Northern Pocket Gophers (Thomomys talpoides)", "Thirteen-lined Ground Squirrels"],
    signsOfInfestation: [
      "Fan-shaped or circular mounds of fresh excavated soil appearing overnight across your green lawn",
      "Burrow holes (2 to 4 inches in diameter) dotting turf, garden borders, and fence lines",
      "Yellowing or dying grass patches caused by underground root system damage",
      "Audible high-pitched warning chirps from ground squirrels standing upright in the yard"
    ],
    treatmentProcess: [
      { step: 1, title: "Burrow Network Mapping", description: "Surveying the property to locate active fresh mounds and identify main lateral tunnels versus abandon burrows." },
      { step: 2, title: "Sub-Surface Injection", description: "Administering licensed pressurized carbon monoxide or targeted burrow bait systems deep into active underground galleries." },
      { step: 3, title: "High-Speed Mechanical Trapping", description: "Setting concealed subterranean traps inside primary travel tunnels for rapid non-chemical removal in sensitive yard areas." },
      { step: 4, title: "Mound Leveling & Monitoring", description: "Collapsing active mounds to monitor for any secondary migration from neighbouring prairie fields." }
    ],
    faqs: [
      { question: "What is the difference between a pocket gopher and a ground squirrel in Saskatoon?", answer: "Pocket gophers live almost entirely underground, leaving fan-shaped plugged dirt mounds with no open hole. Richardson ground squirrels live in open holes and are seen above ground chirping during daylight." },
      { question: "Is your gopher treatment safe for my dogs and cats playing on the lawn?", answer: "Yes. Our sub-surface techniques are applied deep underground inside tunnels, ensuring pets and non-target wildlife have zero access to products." }
    ]
  },

  // 16. SQUIRRELS
  {
    title: "Humane Squirrel Removal & Proofing",
    slug: "squirrel-removal",
    icon: "bug",
    pestCategory: "wildlife",
    shortDescription: "Safe 1-way door eviction, attic nest removal, and roofline exclusion for tree squirrels across Saskatoon homes.",
    content: `Eastern grey squirrels and red squirrels frequently turn Saskatoon attics, soffits, and chimneys into noisy nesting sites. Once inside an attic in mature neighbourhoods like Nutana, City Park, or Grosvenor Park, squirrels cause extensive damage: trampling and contaminating fiberglass insulation, shredding vapor barriers, and gnawing on timber framing and high-voltage electrical wires, posing severe fire hazards.

K2 Pest Control provides 100% humane, Saskatchewan Ministry-compliant wildlife removal. We never poison or trap squirrels inside wall voids. Instead, our specialists locate primary roofline entry points, install heavy-duty spring-loaded one-way eviction doors that allow squirrels to exit safely while blocking re-entry, and reinforce all roof vents and fascia with heavy galvanized steel mesh.`,
    featuredImage: "/images/services/generated/squirrel-removal.jpg",
    metaTitle: "Humane Squirrel Removal Saskatoon | Attic Exclusion & Proofing",
    metaDescription: "Humane squirrel removal from attics, roofs, and chimneys in Saskatoon. Spring-loaded 1-way doors and steel mesh proofing. 100% Guaranteed.",
    pricingStartsAt: "$269",
    warranty: "2-Year Wildlife Exclusion Guarantee",
    targetPests: ["Eastern Grey Squirrels", "American Red Squirrels", "Northern Flying Squirrels"],
    signsOfInfestation: [
      "Loud running, scampering, or rolling walnut sounds in your attic early in the morning or late afternoon",
      "Chewed fascia boards, roof vent plastic caps, or gnawed wooden soffits",
      "Shredded fiberglass insulation, cardboard, and leaves gathered in warm attic corners",
      "Foul ammonia-like urine odors penetrating upper floor ceiling drywall"
    ],
    treatmentProcess: [
      { step: 1, title: "Roofline & Attic Audit", description: "Climbing rooflines to inspect ridge vents, plumbing boots, eave junctions, and checking for nursing baby squirrel litters." },
      { step: 2, title: "One-Way Door Installation", description: "Securing a heavy-gauge one-way eviction door over the primary exit, allowing squirrels to leave safely without return." },
      { step: 3, title: "Galvanized Steel Screening", description: "Reinforcing roof vents, dormers, and soffit edges with commercial chew-proof galvanized steel hardware cloth." },
      { step: 4, title: "Door Removal & Permanent Seal", description: "Confirming attic vacancy, removing the eviction door, and permanently sealing the primary opening with heavy metal flashing." }
    ],
    faqs: [
      { question: "What happens if there are baby squirrels in my attic?", answer: "During spring and summer nesting seasons, our technicians carefully locate the baby nest, safely remove the pups, place them in a heated reunion box, and allow the mother squirrel to relocate them to a secondary nest." },
      { question: "Why can't I just block the hole when the squirrel leaves for the day?", answer: "If you seal the hole without professional exclusion, mother squirrels will chew violently through roofing shingles or drywall to reach trapped young, causing thousands of dollars in damage." }
    ]
  },

  // 17. BATS
  {
    title: "Humane Bat Removal & Attic Exclusion",
    slug: "bat-removal",
    icon: "bug",
    pestCategory: "wildlife",
    shortDescription: "Certified humane bat exclusion valves, guano bio-remediation, and maternity season-compliant roof sealing in Saskatoon.",
    content: `Big brown bats (Eptesicus fuscus) and little brown bats frequently roost inside residential attics, roof soffits, and chimney flues across Saskatoon and the South Saskatchewan River valley. While bats play an invaluable ecological role controlling night-flying mosquitoes and agricultural moths, living with a bat colony in your home carries severe health risks: histoplasmosis fungal spores proliferating in accumulated guano and potential rabies transmission.

Bats in Saskatchewan are protected wildlife species, and it is illegal to poison or trap them inside buildings. K2 Pest Control uses certified humane exclusion techniques compliant with provincial wildlife conservation regulations. We install specialized one-way bat cones and netting valves that allow bats to fly out on warm summer evenings while barring re-entry, followed by complete roofline exclusion and biological guano cleanout.`,
    featuredImage: "/images/services/generated/bat-removal.jpg",
    metaTitle: "Humane Bat Removal Saskatoon | Attic Bat Exclusion & Cleanup",
    metaDescription: "Licensed humane bat exclusion & guano removal in Saskatoon. 1-way bat doors, roof sealing, and histoplasmosis cleanup. Provincial compliant.",
    pricingStartsAt: "$299",
    warranty: "2-Year Bat-Free Guarantee",
    targetPests: ["Big Brown Bats (Eptesicus fuscus)", "Little Brown Myotis (Myotis lucifugus)"],
    signsOfInfestation: [
      "Bats observed fluttering out from roof peaks, fascia boards, or chimneys at dusk",
      "High-pitched clicking, squeaking, or scratching noises coming from walls or attic spaces",
      "Dark brown, crumbly guano droppings accumulating on window sills, siding, or attic insulation",
      "Oily brown rub marks around exterior cracks or roof vents as small as 3/8 of an inch"
    ],
    treatmentProcess: [
      { step: 1, title: "Twilight Emergence Survey", description: "Conducting sunset audits to identify exact flight exit cavities and assessing colony size and maternity status." },
      { step: 2, title: "One-Way Bat Cone Fitting", description: "Installing specialized one-way exclusion valves that permit bats to drop and fly out during nightly feeding while preventing return." },
      { step: 3, title: "Full Roofline Bat-Proofing", description: "Sealing all secondary crevices, ridge vents, flashing gaps, and soffit voids down to 3/8 inch with premium siliconized sealant." },
      { step: 4, title: "Guano Bio-Remediation", description: "Safely vacuuming hazardous guano with HEPA filtration and applying antimicrobial fogging to neutralize histoplasmosis spores." }
    ],
    faqs: [
      { question: "When can bat removal legally be performed in Saskatchewan?", answer: "Humane bat exclusion must not be done during the June/July maternity season when flightless pups are inside the colony. Exclusion is safely carried out in late summer or early autumn before hibernation." },
      { question: "Is bat guano in my attic hazardous to my health?", answer: "Yes. Bat droppings can harbor the fungus Histoplasma capsulatum, which causes histoplasmosis—a serious respiratory infection if airborne spores are inhaled." }
    ]
  },

  // 18. SKUNKS & RACCOONS
  {
    title: "Skunk & Raccoon Humane Eviction",
    slug: "skunk-raccoon-removal",
    icon: "paw",
    pestCategory: "wildlife",
    shortDescription: "Humane live-trapping, under-deck wire trenching, and scent eviction for skunks and raccoons in Saskatoon.",
    content: `Striped skunks (Mephitis mephitis) and northern raccoons frequently establish dens beneath backyard decks, garden sheds, concrete porches, and structural foundations throughout Saskatoon, including older tree-lined neighbourhoods and newer acreage developments. Skunks excavate deep burrows and spray foul-smelling thiol fluids that penetrate building foundations when startled by pets, while raccoons tear open soffits, rip into shingles, and carry roundworm parasites.

K2 Pest Control provides professional, humane wildlife eviction. We utilize non-lethal scented eviction pastes, professional live catch-and-release traps, and durable under-deck 'L-footing' galvanized steel mesh trenching that buries wire deep into the earth to prevent burrowing animals from ever digging back beneath your structures.`,
    featuredImage: "/images/services/generated/skunk-raccoon-removal.jpg",
    metaTitle: "Skunk & Raccoon Removal Saskatoon | Humane Eviction",
    metaDescription: "Humane skunk and raccoon removal in Saskatoon, SK. Safe live trapping, under-deck exclusion trenching, and odor removal. 100% Guaranteed.",
    pricingStartsAt: "$279",
    warranty: "2-Year Wildlife Trenching Guarantee",
    targetPests: ["Striped Skunks (Mephitis mephitis)", "Northern Raccoons (Procyon lotor)"],
    signsOfInfestation: [
      "Overwhelming skunk musk odor lingering near basement windows, porches, or backyard decks",
      "Large excavated dirt piles spilling out from underneath deck steps, garden sheds, or concrete slabs",
      "Overturned lawn turf and torn garbage bags left behind by nocturnal foraging raccoons",
      "Heavy thumping, purring, or vocal growling sounds emerging from under floors or decks at night"
    ],
    treatmentProcess: [
      { step: 1, title: "Den Inspection & Species ID", description: "Confirming active den occupation and checking for baby kits beneath decks, crawlspaces, or outbuildings." },
      { step: 2, title: "Humane Eviction & Live Trapping", description: "Deploying humane one-way exclusion doors or live-capture wire cages shaded and padded for stress-free handling." },
      { step: 3, title: "Underground 'L-Mesh' Barrier", description: "Trenching heavy-gauge galvanized steel hardware cloth 12 inches deep and 12 inches out around deck and shed perimeters." },
      { step: 4, title: "Deodorization & Sanitization", description: "Treating the contaminated den with heavy-duty enzymatic skunk odor neutralizers and parasitic disinfectants." }
    ],
    faqs: [
      { question: "How do you catch a skunk without it spraying my house?", answer: "Our technicians use specialized solid-walled, covered skunk traps that keep the animal in total darkness, preventing it from raising its tail or spraying during capture and humane release." },
      { question: "Can a skunk dig back under my deck after you remove it?", answer: "Not with our underground trenching! We install buried heavy-gauge wire mesh bent in an 'L' shape that completely blocks burrowing claws from digging past the barrier." }
    ]
  },

  // 19. PIGEONS
  {
    title: "Pigeon Control & Roosting Deterrents",
    slug: "pigeon-control",
    icon: "bird",
    pestCategory: "birds",
    shortDescription: "High-durability stainless steel pigeon spikes, stealth solar panel exclusion netting, and humane roost deterrence across Saskatoon.",
    content: `Feral pigeons (Columba livia) cause severe architectural and aesthetic damage across Saskatoon commercial storefronts, warehouse canopies, and residential solar panel arrays. A single pigeon generates over 25 pounds of acidic guano annually. This corrosive droppings degrade metal roofing, etch paint, clog downspouts, and harbor pathogenic fungi and parasites including Salmonella and pigeon mites.

K2 Pest Control provides professional, non-lethal pigeon control and architectural exclusion. We thoroughly power-wash and sanitize accumulated droppings with bio-hazard neutralizers before installing commercial-grade UV-stabilized bird netting, marine-grade stainless steel bird spikes, and specialized solar panel mesh guards that eliminate roosting and nesting without harming birds.`,
    featuredImage: "/images/services/generated/pigeon-control.jpg",
    metaTitle: "Pigeon Control & Bird Spikes Saskatoon | K2 Pest Control",
    metaDescription: "Professional pigeon control in Saskatoon. Stainless bird spikes, solar panel netting, and commercial roost deterrence. Long-term guarantee.",
    pricingStartsAt: "$249",
    warranty: "3-Year Bird Exclusion Guarantee",
    targetPests: ["Feral Pigeons (Rock Doves)", "Mourning Doves"],
    signsOfInfestation: [
      "Piles of corrosive white-and-grey droppings staining sidewalks, roof valleys, window ledges, or solar panels",
      "Persistent cooing and flapping sounds outside bedroom windows or under rooftop HVAC units",
      "Stick-and-feather nests clogging roof gutters, downspouts, and balcony corners",
      "Flocks consistently gathering on roof peaks, parapet walls, and commercial signage"
    ],
    treatmentProcess: [
      { step: 1, title: "Site Architecture Survey", description: "Evaluating roof ledge dimensions, solar panel layouts, warehouse rafters, and high-pressure nesting niches." },
      { step: 2, title: "Bio-Wash & Guano Sanitization", description: "Power-washing and sterilizing toxic droppings with antimicrobial agents to remove pheromone attractants." },
      { step: 3, title: "Spike & Netting Installation", description: "Installing stainless steel anti-roosting spikes along ledges and tensioned stealth netting across recessed canopies." },
      { step: 4, title: "Solar Array Wire Guarding", description: "Securing galvanized PVC-coated mesh clips around solar panel perimeters to permanently lock pigeons out." }
    ],
    faqs: [
      { question: "Do bird spikes hurt or impale pigeons?", answer: "No. Pigeon spikes feature blunted tips designed purely as an uninviting physical barrier that prevents birds from finding stable footing to land or roost." },
      { question: "Why do pigeons love nesting under rooftop solar panels in Saskatoon?", answer: "Solar panels provide an ideal microclimate: shade from summer heat, shelter from Saskatchewan blizzards, and protection from predators like hawks and owls." }
    ]
  },

  // 20. NUISANCE BIRDS
  {
    title: "Nuisance Bird Exclusion & Deterrents",
    slug: "bird-exclusion",
    icon: "bird",
    pestCategory: "birds",
    shortDescription: "Commercial netting, optical bird gels, and physical exclusion for starlings, sparrows, swallows, and gulls in Saskatoon.",
    content: `Beyond pigeons, Saskatoon businesses, grain handling facilities, warehouses, and residential porches face aggressive invasions from European starlings, house sparrows, mud swallows, and ring-billed gulls. These pest birds nest in structural eaves, warehouse structural steel beams, ventilation exhausts, and loading docks—causing severe health code infractions, fire hazards from dried straw nesting, and slip hazards on walkways.

K2 Pest Control delivers comprehensive commercial bird management programs. We engineer discrete, heavy-duty exclusion systems including structural polyethylene bird netting, invisible electric deterrent tracks, optical multisensory repellent discs, and specialized eave guards that deter pest birds while complying with Canadian migratory bird regulations.`,
    featuredImage: "/images/services/generated/bird-exclusion.jpg",
    metaTitle: "Commercial Bird Control & Netting Saskatoon | K2PC",
    metaDescription: "Audit-ready bird exclusion, netting, and deterrent systems in Saskatoon for warehouses, retail, and homes. Protect against starlings, sparrows & gulls.",
    pricingStartsAt: "$289",
    warranty: "Multi-Year Commercial Guarantee",
    targetPests: ["European Starlings", "House Sparrows", "Cliff & Barn Swallows", "Ring-Billed Gulls", "Crows"],
    signsOfInfestation: [
      "Large quantities of straw, twigs, and feathers stuffed into building exhaust vents or exterior sign letters",
      "Mud nests constructed along stucco overhangs, porch ceilings, and bridge underpasses",
      "Noisy chattering colonies echoing inside warehouse steel rafters and retail vestibules",
      "Health inspection warnings due to bird droppings over food manufacturing or storage bays"
    ],
    treatmentProcess: [
      { step: 1, title: "Species & Behavior Assessment", description: "Identifying bird species, flight routines, feeding proximity, and nesting pressure to choose optimal deterrents." },
      { step: 2, title: "Exhaust Vent & Cavity Sealing", description: "Installing heavy-gauge galvanized wire cages and one-way bird flappers over dryer vents and louvers." },
      { step: 3, title: "Tensioned Structural Netting", description: "Suspending industrial UV-treated polyethylene netting to completely seal off overhead beams and loading docks." },
      { step: 4, title: "Optical & Sensory Repellents", description: "Deploying multisensory optical gels and reflective deterrent discs in sensitive architectural areas where spikes are impractical." }
    ],
    faqs: [
      { question: "Can you remove mud swallow nests from under our commercial roofline?", answer: "Yes, once nesting and fledging periods conclude. We clean and sanitize the surface and install sleek angle flashings to prevent swallows from adhering mud nests in the future." },
      { question: "Will bird netting look ugly on our commercial storefront?", answer: "Not at all. We use ultra-thin, low-profile stealth netting in black or stone colours with stainless steel tensioning wire that is practically invisible from street level." }
    ]
  },

  // 21. RESIDENTIAL PEST CONTROL (PROGRAM)
  {
    title: "Residential Pest Control",
    slug: "residential-pest-control",
    icon: "home",
    pestCategory: "prevention",
    shortDescription: "Comprehensive year-round home defense plans for houses, townhomes, and acreages across Saskatoon & surrounding area.",
    content: `Your home is your family's sanctuary, but Saskatchewan's dramatic seasonal climate swings force insects and rodents indoors throughout the year. From carpenter ants and wasps in spring and summer to mice and boxelder bugs in autumn, untreated homes remain vulnerable to recurring pest invasions.

K2 Pest Control provides all-inclusive residential pest protection plans. Our certified technicians perform thorough foundation inspections, seal entry vulnerabilities, and apply pet- and child-safe Integrated Pest Management treatments. Backed by our 100% money-back guarantee, if pests return between visits, so do we—completely free of charge.`,
    featuredImage: "/images/services/residential.jpg",
    metaTitle: "Residential Pest Control Saskatoon | Home Exterminator",
    metaDescription: "Trusted residential pest control in Saskatoon, SK. Safe, eco-friendly protection against ants, mice, spiders, and wasps. 100% Money-Back Guarantee.",
    pricingStartsAt: "$199",
    warranty: "100% Money-Back Guarantee",
    targetPests: ["Ants", "Mice", "Spiders", "Cockroaches", "Wasps", "Earwigs", "Centipedes"],
    signsOfInfestation: [
      "Any unwanted insect or rodent sightings inside kitchens, bathrooms, or living spaces",
      "Pest damage to stored pantry food items, electrical cords, or baseboards",
      "Unexplained scratching or scampering sounds in ceilings and wall cavities",
      "Spider webs, wasp nests, or ant trails multiplying along exterior house walls"
    ],
    treatmentProcess: [
      { step: 1, title: "Whole-Home Risk Audit", description: "Thorough inspection of interior living spaces, basements, crawlspaces, attics, and exterior perimeter foundations." },
      { step: 2, title: "Customized IPM Plan", description: "Formulating low-toxicity, Health Canada-approved treatment protocols specifically calibrated for homes with children and pets." },
      { step: 3, title: "Interior & Exterior Application", description: "Applying targeted micro-baiting inside and protective liquid barrier sprays along exterior foundation lines." },
      { step: 4, title: "Exclusion & Ongoing Defense", description: "Sealing visible entry holes and scheduling seasonal checkups with unlimited free re-treatments." }
    ],
    faqs: [
      { question: "Are your residential treatments safe for pets and children?", answer: "Absolutely. We prioritize eco-friendly IPM methods and low-odour formulations. Pets and children can safely re-enter treated rooms as soon as liquid sprays dry (usually 2 to 3 hours)." },
      { question: "Do you service acreages and towns outside of Saskatoon?", answer: "Yes! We proudly service Warman, Martensville, Corman Park, Dalmeny, Langham, Osler, Dundurn, Clavet, and surrounding acreages with zero hidden travel surcharges." }
    ]
  },

  // 22. COMMERCIAL PEST CONTROL (PROGRAM)
  {
    title: "Commercial Pest Control & Food Safety",
    slug: "commercial-pest-control",
    icon: "building",
    pestCategory: "commercial",
    shortDescription: "Audit-ready commercial IPM programs for restaurants, warehouses, food processing, and healthcare facilities in Saskatoon.",
    content: `For Saskatoon businesses, a single pest sighting can trigger devastating public health infractions, inventory destruction, failed audit inspections, and severe brand damage. Commercial establishments require far more than generic spraying; they require rigorous, audit-ready Integrated Pest Management (IPM) documented to the highest regulatory standards.

K2 Pest Control partners with restaurants, food processing plants, hospitality venues, multi-family property managers, and commercial logistics hubs across Saskatoon. We operate an unmarked fleet for absolute discretion, provide digital trend reporting, and maintain 100% compliance with DineSafe, HACCP, CFIA, and provincial health safety codes.`,
    featuredImage: "/images/services/commercial.jpg",
    metaTitle: "Commercial Pest Control Saskatoon | Audit-Ready IPM Solutions",
    metaDescription: "Certified commercial pest control in Saskatoon, SK. HACCP & DineSafe compliant IPM programs for restaurants, warehouses & offices. Unmarked fleet.",
    pricingStartsAt: "Custom Quote",
    warranty: "Audit-Ready Guarantee",
    targetPests: ["Rodents (Mice/Rats)", "German Cockroaches", "Flies & Drain Pests", "Stored Product Beetles", "Pigeons & Birds"],
    signsOfInfestation: [
      "Health department inspection infractions or customer pest complaints",
      "Rodent droppings, gnawed packaging, or damaged stored goods in warehouses or pantries",
      "Flies buzzing around kitchen food prep lines, floor drains, or waste bins",
      "Cockroaches sighted behind kitchen equipment or in utility closets"
    ],
    treatmentProcess: [
      { step: 1, title: "Facility Risk Assessment", description: "Comprehensive audit of receiving docks, food production areas, refuse enclosures, and building perimeters." },
      { step: 2, title: "Discreet Implementation", description: "Servicing facilities during scheduled off-hours using our 100% unmarked vehicle fleet to protect business reputation." },
      { step: 3, title: "Electronic Barcode Logbooks", description: "Barcoding all interior and exterior monitoring stations with real-time digital trend logs, SDS sheets, and inspection records." },
      { step: 4, title: "Preventative Facility Sealing", description: "Partnering with facility maintenance teams on door sweep adjustments, dock seals, and structural exclusion." }
    ],
    faqs: [
      { question: "Do you provide digital audit documentation for health inspectors?", answer: "Yes! Every commercial client receives a digital logbook containing pesticide usage records, SDS sheets, applicator certifications, and station activity trend reports." },
      { question: "Can you service our Saskatoon business outside of regular operating hours?", answer: "Yes. We offer 24/7 flexible scheduling for restaurants, grocery stores, and corporate offices so treatments occur without any customer or employee disruption." }
    ]
  },

  // 23. TERMITE INSPECTION
  {
    title: "Termite Inspection & Barrier Treatment",
    slug: "termite-inspection",
    icon: "shield",
    pestCategory: "insects",
    shortDescription: "Subterranean termite detection, moisture mapping, and liquid trenching structural protection across Saskatoon.",
    content: `Wood-destroying insects represent a hidden financial disaster for property owners. While true subterranean termites are less frequent than carpenter ants in Saskatchewan, localized infestations and wood-boring beetles can cause catastrophic structural damage inside subfloors, crawlspaces, and basement sills before any external symptoms appear.

K2 Pest Control provides specialized wood-destroying organism (WDO) audits across Saskatoon. We utilize acoustic listening technology, thermal moisture mapping, and soil trenching liquid termiticides to create an impenetrable barrier around structural foundations, protecting the integrity and value of your home.`,
    featuredImage: "/images/services/default-service.jpg",
    metaTitle: "Termite Inspection & Treatment Saskatoon | K2PC",
    metaDescription: "Certified subterranean termite and wood-boring insect inspections in Saskatoon. Advanced thermal detection and liquid trenching protection.",
    pricingStartsAt: "$299",
    warranty: "5-Year Structural Guarantee",
    targetPests: ["Subterranean Termites", "Wood-Boring Beetles", "Carpenter Ants"],
    signsOfInfestation: [
      "Mud shelter tubes climbing concrete foundation walls or wooden floor joists",
      "Hollow, papery-sounding wood framing or spongy, blistered hardwood flooring",
      "Discarded translucent swarmer wings found along interior basement window sills",
      "Fine sawdust-like frass or tiny exit pinholes in structural structural lumber"
    ],
    treatmentProcess: [
      { step: 1, title: "Acoustic & Moisture Mapping", description: "Using non-invasive thermal imaging and acoustic sensors to detect insect galleries inside finished walls." },
      { step: 2, title: "Foundation Soil Trenching", description: "Excavating a continuous soil trench around the exterior foundation and injecting non-repellent termiticide." },
      { step: 3, title: "Sub-Slab Pressure Injection", description: "Precision drilling and injecting termiticide barriers beneath garage pads and basement concrete slabs." },
      { step: 4, title: "Monitoring Station Placement", description: "Installing exterior in-ground termite detection monitors for long-term preventative surveillance." }
    ],
    faqs: [
      { question: "How do I know whether I have termites or carpenter ants?", answer: "Termites consume wood completely, leaving mud tubes behind. Carpenter ants excavate wood to create smooth galleries and kick out piles of sawdust (frass). Our certified inspectors determine the exact species instantly." },
      { question: "Does homeowners insurance cover termite damage in Saskatchewan?", answer: "Standard Canadian home insurance policies typically exclude insect or termite damage, making routine preventative inspections essential to protect your property." }
    ]
  },

  // 24. SEASONAL PREVENTION PLANS
  {
    title: "Seasonal Pest Prevention Plans",
    slug: "seasonal-prevention-plans",
    icon: "calendar",
    pestCategory: "prevention",
    shortDescription: "4-season proactive exterior barrier defense protecting Saskatoon homes year-round from spring ants to winter mice.",
    content: `Pest management is most effective when proactive rather than reactive. In Saskatchewan's continental climate, different pests pose threats with each changing season: spring thaw awakens carpenter ants and spiders, summer heats up wasps and mosquitoes, autumn triggers rodent and boxelder bug indoor migrations, and winter concentrates mice in warm basements and attics.

K2 Pest Control's 4-Season Home Protection Plan delivers scheduled, proactive exterior treatments tailored to seasonal pest lifecycles. By maintaining a continuous protective barrier around your property, we stop pests outside before they ever cross your threshold. If any pest enters your home between scheduled visits, your technician returns and treats it completely free of charge.`,
    featuredImage: "/images/services/residential.jpg",
    metaTitle: "4-Season Pest Prevention Plans Saskatoon | K2PC",
    metaDescription: "Year-round pest protection in Saskatoon, SK. Scheduled quarterly exterior barriers against ants, wasps, mice & spiders. Unlimited free re-treatments.",
    pricingStartsAt: "$39/mo",
    warranty: "Unlimited Free Re-Visits Guarantee",
    targetPests: ["Spring Ants", "Summer Wasps & Mosquitoes", "Fall Rodents & Spiders", "Winter Mice"],
    signsOfInfestation: [
      "Homeowners seeking peace of mind with zero surprise indoor pest emergencies",
      "Acreage and suburban properties bordered by fields, parks, or the river valley",
      "History of seasonal ant invasions every spring or mice every autumn",
      "Desire for eco-friendly exterior barriers without indoor chemical applications"
    ],
    treatmentProcess: [
      { step: 1, title: "Spring Awakening Visit", description: "Exterior perimeter ant barrier, spider de-webbing, and foundation spray following the winter snowmelt." },
      { step: 2, title: "Summer Shield Visit", description: "Soffit and eave wasp prevention, crawling insect defense, and patio perimeter mosquito and tick barrier." },
      { step: 3, title: "Fall Exclusion Visit", description: "Reinforcing rodent bait stations, exterior mouse-proofing checks, and boxelder bug siding protection." },
      { step: 4, title: "Winter Fortification Visit", description: "Attic and basement interior rodent inspection, mechanical monitor checks, and winter pest monitoring." }
    ],
    faqs: [
      { question: "What happens if pests appear inside my home between seasonal visits?", answer: "Under our 4-Season Guarantee, if pests breach the perimeter between scheduled visits, call us and your technician will return to resolve the issue free of charge." },
      { question: "Can I cancel my seasonal plan at any time?", answer: "Yes. Our residential plans offer flexible monthly billing with straightforward terms and no hidden cancellation penalties." }
    ]
  }
];

async function main() {
  console.log("Starting database seeding for all 24 K2 Pest Control services...");
  
  let order = 0;
  for (const s of ALL_SERVICES_DATA) {
    console.log(`Upserting service: [${s.slug}] - ${s.title}`);
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        icon: s.icon,
        pestCategory: s.pestCategory,
        shortDescription: s.shortDescription,
        content: s.content,
        featuredImage: s.featuredImage,
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        displayOrder: order,
        status: "PUBLISHED",
        pricingStartsAt: s.pricingStartsAt,
        warranty: s.warranty,
        signsOfInfestation: s.signsOfInfestation,
        treatmentProcess: s.treatmentProcess,
        faqs: s.faqs,
      },
      create: {
        title: s.title,
        slug: s.slug,
        icon: s.icon,
        pestCategory: s.pestCategory,
        shortDescription: s.shortDescription,
        content: s.content,
        featuredImage: s.featuredImage,
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
        displayOrder: order,
        status: "PUBLISHED",
        pricingStartsAt: s.pricingStartsAt,
        warranty: s.warranty,
        signsOfInfestation: s.signsOfInfestation,
        treatmentProcess: s.treatmentProcess,
        faqs: s.faqs,
      },
    });
    order++;
  }

  const count = await prisma.service.count();
  console.log(`Successfully seeded! Total services in database: ${count}`);
}

main()
  .catch((e) => {
    console.error("Error seeding services:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
