# Project Overview

## Product Description
MSL Biotech Private Limited is a modern, trustworthy, mobile-responsive corporate brand website and product catalog. The tagline is *"Medicine Save Life"*. The primary goal of the website is to establish digital credibility, showcase MSL Biotech's catalog (tablet, capsule, syrup, nutraceutical, pediatric, diabetes, gastro, personal care), and generate qualified business enquiries (via custom contact forms, direct telephone links, and direct WhatsApp messaging) from patients, doctors, chemists, and distribution partners.

## Goals
1. **Digital Credibility**: Project a premium, trustworthy, and compliant pharmaceutical brand image (WHO-GMP / ISO messaging).
2. **Product Directory**: Present a detailed, searchable, and categorizable product catalog with salt compositions, packaging details, and legal disclaimers.
3. **Lead Generation**: Capture qualified enquiries for general contact and PCD-franchise/distribution partnerships.
4. **Accessible Communication**: Provide immediate click-to-call and click-to-WhatsApp channels site-wide.

## Core User Flow
1. **Landing & Trust Assessment**: A user visits the homepage, reviews the hero banner ("Medicine Save Life" theme), stats strip, and quick-trust indicators (WHO-GMP certified).
2. **Catalog Browsing**: The user navigates to the products page, filters by category (e.g., Tablets, Syrups), or searches for a specific product.
3. **Detail Review**: The user selects a product, reviews its salt composition, indications, packaging type, storage rules, and the medical disclaimer.
4. **Action / Enquiry**: The user clicks "Enquire about this product" or "Enquire on WhatsApp", which populates the product details and opens a simple contact form or direct WhatsApp chat.
5. **Contact / Location**: For general enquiries, the user visits the Contact page, views business hours, address, and interactive Google Map, then submits a general enquiry form.

## In Scope (v1)
- Fully responsive marketing pages: Home, About Us, Products Catalog (listing + filters + details), and Contact.
- Floating WhatsApp + call button for quick access.
- Enquiry forms that validate inputs on client-side and post to a mock backend API route.
- Legal utility pages: Privacy Policy (India DPDP compliant), Terms, Disclaimer (Schedule H/prescription warnings).
- Custom 404 page.

## Out of Scope (v1)
- E-commerce cart, checkout, payments, or order processing.
- User authentication, client logins, prescription upload/verification.
- Search autocomplete (Phase 2).
- Downloadable product brochure (PDF).

## Success Criteria
- compiled, warning-free Next.js build.
- Enquiry forms record submissions through API logging and present interactive user success modals.
- All dynamic routes (`products/[id]` and `blog/[id]`) correctly load parameters and show responsive visual cards.
