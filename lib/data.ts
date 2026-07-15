export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  composition: string;
  form: string;
  packaging: string;
  indications: string[];
  storage: string;
  featured: boolean;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const CATEGORIES = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Nutraceuticals",
  "Pediatric Care",
  "Diabetes Care",
  "Gastro Care",
  "Personal Care"
];

export const PRODUCTS: Product[] = [
  {
    id: "amoxigen-500",
    name: "Amoxigen 500mg Capsules",
    category: "Capsules",
    image: "/images/products/capsule_generic.jpg",
    composition: "Amoxicillin Trihydrate IP equivalent to Amoxicillin 500 mg",
    form: "Capsule",
    packaging: "10 x 10 Alu-Alu Blister Pack",
    indications: [
      "Bacterial infections of the ears, nose, and throat",
      "Lower and upper respiratory tract infections",
      "Skin and soft tissue bacterial infections",
      "Urinary tract infections (UTIs)"
    ],
    storage: "Store below 25°C in a dry place. Protect from moisture.",
    featured: true,
    description: "A premium, broad-spectrum penicillin antibiotic formulated to target and halt the replication of pathogenic bacteria. Made in state-of-the-art facilities obeying GMP standards."
  },
  {
    id: "paracit-500",
    name: "Paracit-500 Tablets",
    category: "Tablets",
    image: "/images/products/tablet_generic.jpg",
    composition: "Paracetamol IP 500 mg",
    form: "Tablet",
    packaging: "10 x 15 Blister Pack",
    indications: [
      "Fever reduction (Antipyretic)",
      "Headache and migraine relief",
      "Muscle and joint aches",
      "Toothache relief"
    ],
    storage: "Store below 30°C. Protect from direct heat and light.",
    featured: true,
    description: "Our high-purity Paracetamol tablet provides quick, dependable relief from fever and mild to moderate pain. Essential first-line therapy for family medicine cabinets."
  },
  {
    id: "kof-relief-expectorant",
    name: "Kof-Relief Expectorant Syrup",
    category: "Syrups",
    image: "/images/products/syrup_generic.jpg",
    composition: "Ambroxol Hydrochloride IP 30 mg, Guaiphenesin IP 100 mg, Terbutaline Sulphate IP 1.25 mg, Menthol IP 2.5 mg per 5 ml",
    form: "Syrup",
    packaging: "100 ml PET Bottle with Measuring Cap",
    indications: [
      "Productive (wet) cough",
      "Acute and chronic bronchitis",
      "Chest congestion and thick mucus",
      "Asthmatic bronchitis spasms"
    ],
    storage: "Store in a cool, dark place. Keep bottle tightly closed.",
    featured: true,
    description: "A scientifically formulated expectorant syrup combining a mucolytic agent to break up thick phlegm and a bronchodilator to relax airways for smoother breathing."
  },
  {
    id: "cal-d3-max",
    name: "Cal-D3 Max Tablets",
    category: "Nutraceuticals",
    image: "/images/products/nutra_generic.jpg",
    composition: "Calcium Carbonate IP 1250 mg (equivalent to Elemental Calcium 500 mg), Vitamin D3 (Cholecalciferol) IP 250 IU",
    form: "Tablet",
    packaging: "30 Tablets Bottle",
    indications: [
      "Calcium and Vitamin D3 deficiency support",
      "Bone and joint strength maintenance",
      "Prevention of osteoporosis in elderly adults",
      "Pregnancy and lactation dietary supplement"
    ],
    storage: "Store in a cool, dry place. Protect from light and moisture.",
    featured: true,
    description: "Enriched with high-grade elemental calcium and Vitamin D3 to guarantee optimal intestinal calcium absorption, fostering healthy bone mineralization and density."
  },
  {
    id: "pedia-safe-drops",
    name: "Pedia-Safe Drops",
    category: "Pediatric Care",
    image: "/images/products/pediatric_drops.jpg",
    composition: "Paracetamol IP 125 mg per 1 ml",
    form: "Oral Drops",
    packaging: "15 ml Amber Glass Bottle with Calibrated Dropper",
    indications: [
      "Infant pyrexia (fever)",
      "Post-vaccination soreness and fever",
      "Mild pediatric pain and discomfort"
    ],
    storage: "Store below 25°C in a dry place. Keep out of reach of children.",
    featured: false,
    description: "Specially formulated for infants, these drops come with a calibrated pipette to allow accurate, stress-free dosage delivery according to the child's weight."
  },
  {
    id: "dia-control-500",
    name: "Dia-Control 500 SR Tablets",
    category: "Diabetes Care",
    image: "/images/products/tablet_generic.jpg",
    composition: "Metformin Hydrochloride IP 500 mg (Sustained Release)",
    form: "Tablet",
    packaging: "10 x 10 Blister Pack",
    indications: [
      "Type 2 Diabetes Mellitus glycemic control",
      "Monotherapy or adjunct to diet and exercise to lower blood glucose"
    ],
    storage: "Store below 25°C. Protect from light and moisture.",
    featured: false,
    description: "A sustained-release formulation of Metformin, releasing the active drug gradually to optimize blood sugar control over 24 hours while minimizing gastric discomfort."
  },
  {
    id: "gastro-shield-dsr",
    name: "Gastro-Shield DSR Capsules",
    category: "Gastro Care",
    image: "/images/products/capsule_generic.jpg",
    composition: "Pantoprazole Sodium IP equivalent to Pantoprazole 40 mg, Domperidone IP 30 mg (Sustained Release)",
    form: "Capsule",
    packaging: "10 x 10 Alu-Alu Pack",
    indications: [
      "Gastroesophageal Reflux Disease (GERD)",
      "Hyperacidity and heartburn relief",
      "Gastric and duodenal ulcers",
      "Reflux associated nausea or vomiting"
    ],
    storage: "Store in a dry place below 30°C. Protect from direct light.",
    featured: false,
    description: "A powerful combination of a proton-pump inhibitor (Pantoprazole) to cut acid production and a prokinetic (Domperidone) to accelerate gastric emptying and prevent reflux."
  },
  {
    id: "aloe-gentle-skin-gel",
    name: "Aloe-Gentle Skin Gel",
    category: "Personal Care",
    image: "/images/products/gel_generic.jpg",
    composition: "Pure Aloe Vera Extract 90% w/w, Vitamin E Acetate 0.5% w/w, Tea Tree Oil 0.1% w/w",
    form: "Gel",
    packaging: "150g Squeeze Tube",
    indications: [
      "Dry skin moisturizing",
      "Soothing sunburns and mild heat rashes",
      "Calming minor insect bites and skin inflammation"
    ],
    storage: "Store in a cool place. Keep tube cap tightly sealed.",
    featured: false,
    description: "A therapeutic-grade personal care gel utilizing fresh Aloe Vera gel fortified with Vitamin E and Tea Tree oil to hydrate, restore, and sanitize irritated skin."
  },
  {
    id: "azith-msl-500",
    name: "Azith-MSL 500 Tablets",
    category: "Tablets",
    image: "/images/products/tablet_generic.jpg",
    composition: "Azithromycin Dihydrate IP equivalent to anhydrous Azithromycin 500 mg",
    form: "Tablet",
    packaging: "1 x 3 Blister Pack",
    indications: [
      "Community-acquired pneumonia",
      "Streptococcal pharyngitis / Tonsillitis",
      "Acute bacterial sinusitis",
      "Uncomplicated skin structure infections"
    ],
    storage: "Store below 30°C. Protect from excessive humidity.",
    featured: false,
    description: "A high-efficacy macrolide antibiotic providing a standard 3-day course for rapid clearance of upper and lower respiratory bacterial infections."
  },
  {
    id: "multi-vita-active",
    name: "Multi-Vita Active Tablets",
    category: "Nutraceuticals",
    image: "/images/products/tablet_generic.jpg",
    composition: "Ginseng Extract, Multivitamins (A, B1, B2, B6, B12, C, D3, E), and Minerals (Zinc, Iron, Calcium, Selenium)",
    form: "Tablet",
    packaging: "10 x 10 Blister Pack",
    indications: [
      "Physical and mental fatigue reduction",
      "Daily nutritional gap supplementation",
      "Immune system support",
      "Convalescence / general weakness recovery"
    ],
    storage: "Store in a cool, dark, and dry place.",
    featured: false,
    description: "An advanced nutritional supplement that combines high-potency multivitamins, essential trace minerals, and premium Siberian Ginseng to promote vitality and cognitive alertness."
  },
  {
    id: "cofi-dry-cough-syrup",
    name: "Cofi-Dry Cough Syrup",
    category: "Syrups",
    image: "/images/products/syrup_generic.jpg",
    composition: "Dextromethorphan Hydrobromide IP 10 mg, Chlorpheniramine Maleate IP 2 mg per 5 ml",
    form: "Syrup",
    packaging: "100 ml Bottle with Dosage Cap",
    indications: [
      "Dry, hacking, non-productive coughs",
      "Cough associated with common cold or respiratory allergies",
      "Nasal allergy symptoms (sneezing, runny nose)"
    ],
    storage: "Store below 25°C. Protect from light. Keep cap closed.",
    featured: false,
    description: "An alcohol-free antitussive syrup designed to block dry cough reflexes in the brainstem, paired with an antihistamine to alleviate dry throat irritation and allergy triggers."
  },
  {
    id: "pedia-safe-zinc-solution",
    name: "Pedia-Safe Zinc Oral Solution",
    category: "Pediatric Care",
    image: "/images/products/syrup_generic.jpg",
    composition: "Zinc Gluconate USP equivalent to elemental Zinc 20 mg per 5 ml",
    form: "Oral Solution",
    packaging: "60 ml Bottle with Dispenser Cup",
    indications: [
      "Pediatric zinc deficiency",
      "Adjuvant therapy in pediatric acute diarrhea management",
      "Childhood immunity boosting"
    ],
    storage: "Store at room temperature. Shake well before use.",
    featured: false,
    description: "An essential trace mineral supplement for growing children, flavored with sweet orange. Clinically critical in accelerating recovery from acute digestive and respiratory illnesses in kids."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "understanding-who-gmp-standards",
    title: "Why WHO-GMP Standards Matter in Modern Pharmaceuticals",
    category: "Quality Standards",
    excerpt: "Discover what World Health Organization Good Manufacturing Practices (WHO-GMP) entail, and why they represent the ultimate gold standard of consumer safety.",
    content: "When it comes to human health, quality is non-negotiable. World Health Organization Good Manufacturing Practices (WHO-GMP) constitute a rigorous regulatory framework designed to ensure that pharmaceutical products are consistently produced and controlled according to strict international quality baselines. \n\n### The Pillars of GMP\n\nWHO-GMP covers all aspects of production from the starting raw materials, facilities, and equipment to the training and personal hygiene of staff. At MSL Biotech, compliance means:\n\n1. **Validated Processes**: Every step of chemical formulation, blending, tableting, and packaging is pre-defined and tested for repeatability.\n2. **Facility Hygiene**: Air quality, humidity, and temperature in our production modules are tightly monitored with advanced HVAC units to exclude cross-contamination.\n3. **Meticulous Record Keeping**: Every batch is documented from raw chemical certificates of analysis to physical box shipment serials, guaranteeing 100% trace-ability.\n\nBy adhering strictly to these benchmarks, we make sure that every capsule of Amoxigen or tablet of Paracit-500 that leaves our inventory is safe, active, and compliant.",
    image: "/images/blog/blog_who_gmp.jpg",
    date: "July 12, 2026",
    readTime: "4 min read",
    author: "Dr. A. K. Sharma (QA Director)"
  },
  {
    id: "managing-type2-diabetes",
    title: "Glycemic Control & Lifestyle Management in Type 2 Diabetes",
    category: "Health & Wellness",
    excerpt: "A comprehensive guide on maintaining optimal blood sugar balance, detailing glycemic monitoring, clinical therapies, and diet fundamentals.",
    content: "Managing Type 2 diabetes successfully goes beyond just popping medications. It demands a holistic blend of glycemic self-monitoring, balanced eating, daily physical workouts, and prescribed therapeutic agents.\n\n### Knowing Glycemic Control\n\nTherapies like Metformin (as in our Dia-Control 500 SR) work by decreasing liver glucose production and making tissues more sensitive to insulin. To complement this:\n\n- **Eat Fibrous Complex Carbs**: Ditch refined flour and simple sugars. Opt for whole oats, legumes, and green vegetables that release glucose gradually.\n- **Stay Physically Active**: Aim for 150 minutes of moderate activity weekly (e.g. brisk walking). Muscles burn glucose directly during active exercise.\n- **Frequent Testing**: Check fasting and post-meal glucose to recognize patterns and adapt lifestyle factors accordingly.\n\nConsult your primary physician to outline a custom diabetes control matrix tailored to your body.",
    image: "/images/blog/blog_diabetes.jpg",
    date: "June 28, 2026",
    readTime: "6 min read",
    author: "Dr. Ritu Mehra (Consulting Endocrinologist)"
  },
  {
    id: "role-of-calcium-vitamin-d3",
    title: "The Silent Duo: Calcium & Vitamin D3 for Lifelong Bone Strength",
    category: "Nutrition",
    excerpt: "Learn how calcium and Vitamin D3 collaborate to maintain bone density, prevent osteoporosis, and support skeletal vitality as you age.",
    content: "Bones are living tissues that constantly remodel themselves. As we age, especially past 35, bone resorption can outpace bone generation, leading to fragile skeletal structures. To slow this down, the synergistic intake of Calcium and Vitamin D3 is absolutely critical.\n\n### The Absorption Pathway\n\nCalcium is the raw building block of bones, but your gut cannot absorb it effectively without active Vitamin D3. Think of Vitamin D3 as the biological 'key' that opens cellular pathways in the small intestine, allowing calcium ions to enter the blood stream and bind to the bone matrix.\n\n### Getting the Right Balance\n\nAdults generally require between 1000 mg to 1200 mg of elemental calcium daily. Dietary sources like dairy, kale, and almonds are helpful. However, for those with gaps, clinical supplements (such as Cal-D3 Max) ensure reliable daily intake. Pair supplement regimes with weight-bearing workouts to prompt your bones to strengthen naturally.",
    image: "/images/blog/blog_calcium.jpg",
    date: "May 15, 2026",
    readTime: "5 min read",
    author: "Ms. Neha Verma (Chief Clinical Dietician)"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Sandeep Jha",
    role: "Senior Pediatrician, Hope Clinic",
    quote: "I regularly recommend MSL Biotech's pediatric drops and supplements. The formulation quality, especially the taste profile of Pedia-Safe drops, makes patient adherence much easier. The packaging is robust and dosage-precise.",
    rating: 5,
    avatar: "/images/testimonials/avatar1.jpg"
  },
  {
    id: "t2",
    name: "Rajesh Singhal",
    role: "Owner, Singhal Medicos",
    quote: "As a retail pharmacist, stocking MSL Biotech products has been an excellent business decision. Customers often ask for repeat purchases because of the transparent pricing and consistent relief they provide. Delivery is always punctual.",
    rating: 5,
    avatar: "/images/testimonials/avatar2.jpg"
  },
  {
    id: "t3",
    name: "Anjali Deshmukh",
    role: "Consumer & Mother of Two",
    quote: "The tagline 'Medicine Save Life' is truly reflected in their products. When my children had post-vaccination fever, the Pedia-Safe drops worked within minutes. It is a brand we trust implicitly in our family.",
    rating: 5,
    avatar: "/images/testimonials/avatar3.jpg"
  }
];
