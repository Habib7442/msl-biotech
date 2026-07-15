# Unit 09: Contact Page

## Goal
Implement the Contact page (`app/contact/page.tsx`) showing corporate address locations, support lines, business hours, Google maps coordinates, and an interactive contact enquiry form.

## Design
- **Subpage Header Banner**: Background: Deep Navy `#12213F`, Text: White. Title: *"Contact Our Team"*, subtitle: *"Get in touch for pricing queries, partnerships, and clinical support."*
- **Layout**: Two columns. Left: Contact cards (Address, Phone, Email, Hours) with circular icon placeholders. Right: Premium white card (`rounded-3xl` / 24px) containing the interactive contact form.
- **Form Fields**:
  - Name (required)
  - Email (required)
  - Phone (required)
  - Subject (optional selector: "Product Inquiry", "Distributor Partnership", "General Enquiry")
  - Message (required, min 10 characters)
  - Consent Checkbox
- **Google Map Embed**: Full width stylized map placeholder or iframe showing MSL Biotech Corporate Headquarters in Chandigarh.

## Implementation

### 1. `app/contact/page.tsx` (Client Component)
- Maintain react state for form validation and API posting.
- Handle state flags for loading spinners and success panels.
- Display cards with direct call links: `tel:+919999999999` and email triggers: `mailto:info@mslbiotech.com`.
- Embed a clean Google Maps iframe target centered on Chandigarh Industrial Area.

## Dependencies
None.

## Verify when done
- [ ] Direct navigation to `/contact` loads form elements cleanly.
- [ ] Missing required inputs raise validation errors.
- [ ] Valid submission outputs success notification and clears fields.
- [ ] Map frame renders correctly on mobile and desktop layout containers.
