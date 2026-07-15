# Unit 03: Shared Global Layout

## Goal
Implement the shared website layouts, including a sticky responsive `<Header />` with a mobile hamburger overlay drawer, a premium Deep Navy `<Footer />` showing category quick-links and mandatory medical disclaimers, and a floating WhatsApp CTA.

## Design
- **Header**: Sticky white background, border-b border-gray-100, backdrop-blur support, containing the MSL logo (left), central navigation text links (Home, About Us, Products, Quality & Certs, Blog, Contact), and a Lime Green "Enquire Now" CTA button (right). On scroll, apply a subtle shadow.
- **Footer**: Background: Deep Navy `#12213F`, Text: White/Grey. Features four columns on desktop (Brand & Tagline, Category Index, Corporate Info, Quick Links), newsletter sign-up line, and the official medical disclaimer:
  > *Disclaimer: The information provided on this website is for educational and informational purposes only and is not intended to substitute professional medical advice, diagnosis, or treatment. Always consult your physician before taking any medication.*
- **WhatsApp Floater**: A circular pulsing green button at the bottom-right viewport with the WhatsApp logo, which opens wa.me.

## Implementation

### 1. `components/Header.tsx` (Client Component)
- Implement sticky navigation bar with responsiveness.
- Use state to toggle mobile drawer visibility.
- Navigation links must map correctly to router paths.
- Add phone link with call icon: `tel:+919999999999`.

### 2. `components/Footer.tsx` (Server/Client Component)
- Multi-column layout.
- Newsletter input field with simulated subscription action (and confirmation checkmark).
- Medical disclaimer text displayed prominently in full-width banner at bottom.

### 3. `components/FloatingContact.tsx` (Client Component)
- Floating button sitting at bottom-right corner.
- Custom WhatsApp icon with a hover label: "Chat on WhatsApp".
- Trigger link: `https://wa.me/919999999999?text=Hello%20MSL%20Biotech,%20I%20have%20an%20enquiry.`

### 4. `app/layout.tsx`
- Import and wrap `{children}` inside `<Header />` and `<Footer />` components.
- Include `<FloatingContact />` in the DOM tree.

## Dependencies
- `lucide-react` (already in `package.json` for icons)

## Verify when done
- [ ] Header sticks to the top during scroll and toggles mobile drawer cleanly.
- [ ] Links navigate without causing full browser refresh.
- [ ] Footer prints the medical disclaimer accurately on all screens.
- [ ] Clicking the WhatsApp logo opens wa.me with correct query parameters.
