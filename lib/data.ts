export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  gallery?: string[];
  hasPhoto?: boolean;
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
    id: "flemosel-tablets",
    name: "Flemosel Tablets",
    category: "Tablets",
    image: "/images/products/flemosel-tablets-trypsin-bromelain-rutoside.jpg",
    gallery: [
      "/images/products/flemosel-tablets-trypsin-bromelain-rutoside.jpg",
      "/images/products/flemosel-tablets-pack.jpg"
    ],
    hasPhoto: true,
    composition: "Trypsin BP, Bromelain BP & Rutoside Trihydrate IP",
    form: "Tablet",
    packaging: "10 x 10 Tablets Blister Pack",
    indications: [
      "Reduction of inflammation, swelling, and edema after injury or surgery",
      "Adjunct therapy in ENT and dental infections to control swelling",
      "Management of sports injuries and soft-tissue trauma",
      "Post-operative recovery support"
    ],
    storage: "Store below 25°C in a dry place. Protect from light and moisture.",
    featured: true,
    description: "A proteolytic enzyme combination of Trypsin, Bromelain, and Rutoside Trihydrate formulated to control inflammation, reduce swelling, and accelerate recovery from injury, surgery, and infection."
  },
  {
    id: "flemosel-ds-tablets",
    name: "Flemosel-DS Tablets",
    category: "Tablets",
    image: "/images/products/flemosel-ds-tablets-trypsin-bromelain-rutoside.jpg",
    gallery: [
      "/images/products/flemosel-ds-tablets-trypsin-bromelain-rutoside.jpg",
      "/images/products/flemosel-ds-tablets-pack.jpg"
    ],
    hasPhoto: true,
    composition: "Trypsin BP, Bromelain BP & Rutoside Trihydrate IP (Double Strength)",
    form: "Tablet",
    packaging: "10 x 10 Tablets Blister Pack",
    indications: [
      "Faster reduction of moderate to severe post-traumatic and post-surgical edema",
      "Adjunct therapy in ENT and dental infections to control swelling",
      "Management of sports injuries and soft-tissue trauma",
      "Post-operative recovery support requiring a higher-strength dose"
    ],
    storage: "Store below 25°C in a dry place. Protect from light and moisture.",
    featured: true,
    description: "A double-strength proteolytic enzyme formulation of Trypsin, Bromelain, and Rutoside Trihydrate, delivering a higher dose for faster relief from moderate to severe inflammation and swelling."
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
