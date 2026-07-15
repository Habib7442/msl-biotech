# Product Requirements Document (PRD)
## MSL BIOTECH PRIVATE LIMITED — Corporate Pharmaceutical Website

| | |
|---|---|
| **Document title** | MSL Biotech Website — Product Requirements Document |
| **Version** | 1.0 |
| **Status** | Draft for review |
| **Date** | 2026-07-15 |
| **Owner** | MSL Biotech Pvt. Ltd. (Client) |
| **Prepared for** | Design & Development team |
| **Tagline** | *Medicine Save Life* |
| **Primary reference** | https://prohubpharma.com/ (structure) + provided MediHeal design (visual polish) |
| **Design tool** | Google Stitch (stitch.withgoogle.com) → handoff to development |

---

## 1. Executive Summary

MSL Biotech Private Limited is a pharmaceutical manufacturing and healthcare brand. This project delivers a modern, trustworthy, mobile-responsive **corporate brand website** that showcases the company's product portfolio, communicates its quality and care ethos, and generates **enquiries** from customers, doctors, retailers, and distribution partners.

The site is **catalog + enquiry driven** (not a transactional e-commerce store in v1). Visitors browse products, read about the company's quality standards, and get in touch via enquiry forms, phone, or WhatsApp.

The emotional core of the brand — captured by the tagline **"Medicine Save Life"** and the hero imagery of a father cradling his baby — is *care across generations, from the very first breath*.

---

## 2. Goals & Objectives

### 2.1 Business Goals
- Establish a credible, professional online presence for MSL Biotech.
- Communicate trust, quality, and regulatory compliance (WHO-GMP / ISO messaging).
- Showcase the full product range in an organized, searchable catalog.
- Generate qualified leads: product enquiries, distributor/PCD-franchise enquiries, and general contact.
- Support brand recall through consistent visual identity and the "Medicine Save Life" promise.

### 2.2 User Goals
- Quickly understand what MSL Biotech does and whether it is trustworthy.
- Find products by category and view product details (composition, packaging, use).
- Contact the company easily (form, phone, WhatsApp, email).
- (Partners) Understand how to become a distributor / franchise associate.

### 2.3 Non-Goals (v1)
- Online payments / shopping cart / checkout.
- User accounts, login, or order history.
- Prescription upload and fulfillment.
- Multi-language localization (English only in v1).

---

## 3. Success Metrics (KPIs)

| Metric | Target (first 90 days post-launch) |
|---|---|
| Enquiry form submissions | ≥ 40 / month |
| WhatsApp / call click-throughs | ≥ 100 / month |
| Avg. session duration | ≥ 1 min 30 sec |
| Bounce rate (homepage) | ≤ 55% |
| Mobile Lighthouse Performance | ≥ 85 |
| Core Web Vitals | All "Good" (LCP < 2.5s, INP < 200ms, CLS < 0.1) |
| Organic keyword rankings | Brand + 10 product/category terms indexed |

---

## 4. Target Audience & Personas

| Persona | Description | Primary need |
|---|---|---|
| **Concerned Parent / Consumer** | Buys OTC medicines, vitamins, supplements for family | Trust, safety, product info, "is this brand reliable?" |
| **Retail Pharmacist / Chemist** | Stocks products, evaluates supplier | Product range, packaging, quality certs, supply enquiry |
| **Doctor / Healthcare Professional** | Recommends / prescribes | Composition, therapeutic category, credibility |
| **Distributor / PCD Franchise Partner** | Seeks business association | Partnership terms, product portfolio, contact |
| **Job Seeker (secondary)** | Interested in careers | Company info, contact |

---

## 5. Scope

### 5.1 In Scope (v1)
- Responsive marketing website (desktop, tablet, mobile).
- Pages: Home, About Us, Products (listing + filters), Product Detail, Quality & Certifications, Blog (list + post), Contact, plus utility pages (Privacy Policy, Terms, Disclaimer, 404).
- Product catalog managed via CMS.
- Enquiry forms, click-to-call, click-to-WhatsApp, Google Maps embed.
- SEO foundation, analytics, basic blog/CMS.

### 5.2 Optional / Phase 2
- Distributor / PCD-franchise dedicated landing page and enquiry funnel. *(Note: the "Become an MSL Biotech Partner" homepage band was removed per client direction; partnership can live as a standalone page later.)*
- Newsletter subscription (may be included as a small footer signup in v1 if desired).
- Multi-language (Hindi + regional).
- Product search with autocomplete.
- Downloadable product catalog / brochure (PDF).

### 5.3 Out of Scope
- E-commerce transactions, payments, cart, accounts (see Non-Goals).

---

## 6. Brand & Design Guidelines

### 6.1 Logo
- Primary logo: full-color MSL Biotech mark on white (ring + capsule + leaf motif, "MSL" in blue→green gradient, "BIOTECH" in blue, "PRIVATE LIMITED" in grey).
- Reversed/white logo variants (for blue and green backgrounds) available.
- **Asset needs:** transparent-background PNG/WebP and scalable **SVG** for crisp rendering; favicon derived from the ring/capsule/leaf mark.
- Clear space and minimum size to be respected; do not distort or recolor.

### 6.2 Color Palette (sampled from logo)

| Role | Name | Hex |
|---|---|---|
| Primary | Royal Blue | `#184EA4` |
| Accent / CTAs | Lime Green | `#7FC700` |
| Headings & body text | Deep Navy | `#12213F` |
| Section tint | Soft Green | `#EAF4DA` |
| Neutral background | Light Grey | `#F4F7FB` |
| Base | White | `#FFFFFF` |
| Accent gradient | Blue → Green (diagonal) | `#184EA4 → #7FC700` |

- Primary buttons: Lime Green fill with Deep Navy text, pill/rounded shape.
- Secondary buttons: Royal Blue outline.
- Use the blue→green gradient sparingly for accents that echo the logo.

### 6.3 Typography
- **Headings:** modern geometric sans-serif — Poppins or Montserrat (bold, confident).
- **Body:** Inter (clean, highly readable).
- Large, prominent hero headline; clear typographic hierarchy; generous line-height.

### 6.4 Visual Style & Tone
- Clean, professional, medical-grade trust; warm and human — not cold/clinical.
- Generous white space, rounded corners (16–24px), soft shadows, crisp cards, hover-lift on interactive cards.
- Tone of voice: reassuring, caring, credible, plain-spoken (avoid exaggerated medical claims).

---

## 7. Information Architecture (Sitemap)

```
Home
├── About Us
│   ├── Company overview / "What motivates us"
│   ├── Vision & Mission
│   └── Our Values
├── Products
│   ├── Category listing (filter by category)
│   └── Product Detail (per product)
├── Quality & Certifications
├── Blog
│   ├── Blog listing
│   └── Blog post
├── Contact
└── Utility: Privacy Policy · Terms · Disclaimer · 404
```

**Global navigation:** Home · About Us · Products · Quality & Certifications · Blog · Contact + phone number + "Enquire Now" button.

---

## 8. Page-by-Page Requirements

### 8.1 Homepage

Ordered top to bottom (partner/newsletter band removed per client; testimonials flow straight into footer):

1. **Header (sticky)** — white with soft shadow on scroll. Logo left; nav center/right; phone with icon; green "Enquire Now" button. Mobile: hamburger menu.
2. **Hero** — two columns.
   - Left: green eyebrow label "MEDICINE SAVE LIFE"; large headline (e.g., *"Caring for Life, From the Very First Breath"*); supporting sentence; two CTAs ("Explore Products" primary green, "Know More About Us" outline); trust badges (WHO-GMP Certified, ISO 9001, 100% Quality Assured) + rating ("Trusted by 5,000+ families").
   - Right: father-and-baby photo in a rounded card on a soft blue→green gradient, with a small floating badge (e.g., "24×7 Care").
3. **Stats strip** — 4 stats: Years of Trust · Products · States Served · Families Cared For.
4. **Our Product Range** — category cards with icons/labels (Tablets, Capsules, Syrups, Nutraceuticals, Pediatric Care, Diabetes Care, Gastro Care, Personal Care); hover-lift.
5. **Featured Products** — 4-across grid: image, name, category tag, "View Details" button.
6. **About / Why Us** — two columns: image + heading "What Motivates Us to Bring the Best to You" + paragraph + bullets (state-of-the-art manufacturing, certified quality, affordable healthcare, pan-India reach) + "Know More About Us".
7. **Our Values** — 5 icon items: Quality, Empathy, Integrity, Innovation, Customer First.
8. **Care band** — full-width soft-green "Let Us Take Care of Your Health" with warm family image + reassuring copy + CTA.
9. **Testimonials** — 3 cards: avatar, name, 5-star rating, quote.
10. **Footer** — deep navy; white logo + tagline "Medicine Save Life"; quick links; product categories; contact (address, phone, email); social icons; copyright. Green as link/icon accent. *(Optional small newsletter signup row above copyright.)*

### 8.2 About Us
- Company story, "what motivates us", vision & mission, values, manufacturing overview, leadership (optional), key stats. Imagery of facility/team/care.

### 8.3 Products (Listing)
- Grid of product cards with category filter (sidebar or chips): All, Tablets, Capsules, Syrups, Nutraceuticals, Pediatric, Diabetes, Gastro, Personal Care.
- Each card: image, name, category tag, short line, "View Details".
- Pagination or load-more.

### 8.4 Product Detail
- Product image(s), name, category/therapeutic tag.
- Fields: composition/salt, form (tablet/syrup/etc.), packaging, indications/uses (general), storage, and a mandatory **disclaimer** ("For informational purposes; consult your physician before use").
- CTAs: "Enquire about this product" (form / WhatsApp), "Back to products".
- Related products.

### 8.5 Quality & Certifications
- Certifications (WHO-GMP, ISO, etc. — subject to actual credentials), quality process, manufacturing standards, QA/QC narrative, downloadable certificates (optional).

### 8.6 Blog
- Listing: cards with thumbnail, title, excerpt, date, category.
- Post: title, hero image, body (rich text), author/date, share buttons, related posts.

### 8.7 Contact
- Enquiry form (see §9.1), full contact details, Google Maps embed, business hours, WhatsApp + call buttons, social links.

### 8.8 Utility Pages
- Privacy Policy, Terms & Conditions, Medical/Content Disclaimer, custom 404.

---

## 9. Functional Requirements

### 9.1 Enquiry / Contact Forms
- Fields: Name, Email, Phone, Subject/Product (optional), Message; consent checkbox.
- Validation (client + server), spam protection (reCAPTCHA/honeypot).
- On submit: email notification to MSL Biotech inbox + success confirmation to user.
- Store submissions in CMS or forward to CRM/email; GDPR/DPDP-style consent language.

### 9.2 Product Catalog (CMS-managed)
- Admin can create/edit product entries (name, category, image, composition, packaging, description, disclaimer, feature flag for "Featured").
- Category taxonomy managed in CMS.

### 9.3 Click-to-Contact
- Click-to-call (`tel:`) and click-to-WhatsApp (`https://wa.me/<number>`) available site-wide (header + floating button + footer + contact page).

### 9.4 Blog / Content
- CMS-managed posts with categories, media, SEO fields.

### 9.5 Navigation & Search (optional v1)
- Sticky header, mobile menu, breadcrumb on inner pages. Product search = Phase 2.

---

## 10. Non-Functional Requirements

### 10.1 Performance
- Lighthouse ≥ 85 (mobile); Core Web Vitals all "Good".
- Optimized images (WebP/AVIF), lazy-loading, minified assets, caching/CDN.

### 10.2 Responsive & Cross-Browser
- Breakpoints: mobile (≤480), tablet (768), desktop (≥1024), large (≥1440).
- Latest 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari & Android Chrome.

### 10.3 Accessibility
- Target **WCAG 2.1 AA**: sufficient color contrast, keyboard navigation, alt text, focus states, semantic HTML, ARIA where needed.

### 10.4 SEO
- Clean URL structure, unique title/meta per page, Open Graph/Twitter cards, semantic headings, XML sitemap, robots.txt, schema.org markup (Organization, Product, BreadcrumbList, Article), image alt text, canonical tags.

### 10.5 Security
- HTTPS/SSL, form spam protection, secure headers, up-to-date CMS/plugins, backups, hardened admin login.

### 10.6 Analytics & Tracking
- Google Analytics 4; event tracking for enquiry submit, call click, WhatsApp click, product "View Details"; Google Search Console; optional Meta Pixel.

---

## 11. Regulatory & Compliance (Pharma-specific)

- **No misleading medical claims**; avoid guarantees of cure. Product copy must be factual and compliant with India's **Drugs & Cosmetics Act** and **Drugs and Magic Remedies (Objectionable Advertisements) Act**.
- Prominent **medical disclaimer**: content is informational; users must consult a qualified physician; do not self-medicate.
- Schedule-H / prescription products (if listed) must state "To be sold on the prescription of a registered medical practitioner" and must **not** be sold online in v1.
- Clear company identity, registered address, and contact (regulatory transparency).
- Privacy Policy compliant with **India DPDP Act** (and GDPR-style consent for form data).
- Cookie notice if analytics/marketing cookies are used.
- All certification claims (WHO-GMP, ISO, etc.) must reflect **actual, verifiable** credentials before publishing.

---

## 12. Technical Requirements

| Area | Requirement / Recommendation |
|---|---|
| **Platform / CMS** | WordPress (matches reference site, easy content editing) **or** headless (Next.js + CMS) if performance/scale preferred |
| **Hosting** | Reliable managed hosting/CDN with SSL, daily backups, staging environment |
| **Domain / Email** | Company domain + professional email; correct DNS/SPF/DKIM for form deliverability |
| **Forms** | CMS forms plugin or serverless function + email/CRM integration |
| **Integrations** | GA4, Search Console, Google Maps, WhatsApp, reCAPTCHA |
| **Assets** | Logo (SVG + transparent PNG/WebP), brand fonts, product images, hero/family photography (licensed) |
| **Environments** | Local → Staging → Production; version control for custom code |

---

## 13. Content Requirements (Client to provide / Agency to draft)

- Finalized company profile, vision, mission, values copy.
- Verified certifications and quality process details.
- Complete product list with categories, compositions, packaging, images.
- Real testimonials (with consent) or approved placeholder strategy.
- Contact details: registered address, phone(s), WhatsApp number, email, social handles, business hours, map location.
- Licensed hero/lifestyle photography (father-and-baby and family/care imagery).
- Legal copy: Privacy Policy, Terms, Disclaimer (legal review recommended).

---

## 14. Milestones & Timeline (indicative)

| Phase | Deliverable | Est. duration |
|---|---|---|
| 1. Discovery & Content | Finalize sitemap, gather content/assets, confirm compliance | 1 week |
| 2. Design | Stitch/UI designs for homepage + key templates, client approval | 1–2 weeks |
| 3. Development | CMS setup, templates, catalog, forms, integrations | 2–3 weeks |
| 4. Content Load | Products, blog, pages populated | 1 week |
| 5. QA & Compliance | Cross-device/browser, accessibility, SEO, legal review | 1 week |
| 6. Launch | DNS, SSL, analytics, go-live + smoke test | 2–3 days |
| 7. Post-launch | Monitoring, fixes, KPI baseline | Ongoing (30 days) |

---

## 15. Risks & Assumptions

**Assumptions**
- Client provides verified content, product data, real certifications, and licensed imagery on time.
- English-only, catalog+enquiry model (no e-commerce) for v1.
- Contact/enquiry (not online sales) is the primary conversion.

**Risks & Mitigations**
- *Delayed/unverified content* → phased content load; use approved placeholders; block launch only on compliance-critical items.
- *Compliance claims unverifiable* → remove/soften claims until documented; legal review before launch.
- *Photography licensing* → use properly licensed stock or commissioned shoot; avoid unlicensed images.
- *Scope creep toward e-commerce* → hold to v1 scope; log in Phase 2 backlog.

---

## 16. Acceptance Criteria

- All in-scope pages built, responsive, and matching approved designs and brand guidelines.
- Enquiry forms deliver notifications reliably; click-to-call/WhatsApp work on mobile.
- Product catalog manageable via CMS; featured products drive the homepage.
- Passes accessibility (WCAG 2.1 AA spot-check), SEO checklist, and Core Web Vitals targets.
- Compliance items (disclaimers, privacy policy, factual claims) present and legally reviewed.
- Analytics tracking verified for all key events.

---

## 17. Appendix

**A. Reference sites**
- Structure: https://prohubpharma.com/
- Visual polish: provided MediHeal pharmacy design.

**B. Brand quick-reference**
- Primary `#184EA4` · Accent `#7FC700` · Text `#12213F` · Tint `#EAF4DA` · Grey `#F4F7FB` · White `#FFFFFF`.
- Headings: Poppins/Montserrat · Body: Inter.
- Tagline: **Medicine Save Life**.

**C. Open questions for client**
1. Confirm exact certifications MSL Biotech holds (for Quality page & badges).
2. Full product list and categories?
3. Include distributor/PCD-franchise page in v1 or Phase 2?
4. Keep a newsletter signup (footer) in v1?
5. WordPress vs. headless preference?
6. Registered address, phone, WhatsApp, email, and social handles.

---

*End of document — v1.0*
