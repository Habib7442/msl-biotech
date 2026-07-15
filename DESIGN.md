---
name: Clinical Vitality
colors:
  surface: '#faf9ff'
  surface-dim: '#d9d9e1'
  surface-bright: '#faf9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fb'
  surface-container: '#ededf5'
  surface-container-high: '#e8e7ef'
  surface-container-highest: '#e2e2ea'
  on-surface: '#1a1b21'
  on-surface-variant: '#434752'
  inverse-surface: '#2e3036'
  inverse-on-surface: '#f0f0f8'
  outline: '#737783'
  outline-variant: '#c3c6d4'
  surface-tint: '#2b5bb2'
  primary: '#003780'
  on-primary: '#ffffff'
  primary-container: '#184ea4'
  on-primary-container: '#acc4ff'
  inverse-primary: '#afc6ff'
  secondary: '#416900'
  on-secondary: '#ffffff'
  secondary-container: '#a9f541'
  on-secondary-container: '#446e00'
  tertiary: '#2c3a59'
  on-tertiary: '#ffffff'
  tertiary-container: '#435172'
  on-tertiary-container: '#b6c4eb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#afc6ff'
  on-primary-fixed: '#001a43'
  on-primary-fixed-variant: '#004398'
  secondary-fixed: '#acf843'
  secondary-fixed-dim: '#91db24'
  on-secondary-fixed: '#102000'
  on-secondary-fixed-variant: '#304f00'
  tertiary-fixed: '#d9e2ff'
  tertiary-fixed-dim: '#b8c6ed'
  on-tertiary-fixed: '#0b1b38'
  on-tertiary-fixed-variant: '#384666'
  background: '#faf9ff'
  on-background: '#1a1b21'
  surface-variant: '#e2e2ea'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-padding: 80px
---

## Brand & Style
The design system for MSL BIOTECH PRIVATE LIMITED is built on the pillars of "Human-Centric Science." It balances the rigorous precision of biotechnology with a warm, reassuring accessibility. The style is a hybrid of **Corporate Modern** and **Soft Minimalism**, moving away from sterile, cold medical aesthetics toward a "Premium Care" experience. 

The visual language emphasizes clarity and breathability. By utilizing generous whitespace and soft-edged geometry, the UI evokes an emotional response of safety, innovation, and professional reliability. It is designed for patients, healthcare providers, and partners who seek a trustworthy, high-tech pharmaceutical presence that remains deeply approachable.

## Colors
The palette is rooted in **Royal Blue**, signifying authority and stability. This is punctuated by **Lime Green** to inject vitality, growth, and a "living" quality into the brand. 

- **Primary (Royal Blue):** Used for core branding, secondary actions, and structural elements.
- **Accent (Lime Green):** Reserved for primary calls-to-action and success states to maximize visibility and positive reinforcement.
- **Headings (Deep Navy):** Provides high-contrast legibility and a sense of "grounded" professionalism.
- **Section Tint (Soft Green):** Used for large background areas or subtle highlights to soften the interface.
- **Neutrals:** A cool-toned light grey serves as the canvas, ensuring the white cards "pop" with distinct clarity.

## Typography
The typography system uses a dual-font approach to distinguish between brand presence and information density. 

**Montserrat** is used for all headings. Its geometric construction feels modern and confident. Tighten the letter spacing slightly on larger display sizes to maintain a "locked-in" premium feel.

**Inter** is the workhorse for all body copy, labels, and data. It is chosen for its exceptional legibility in medical contexts. Use "Body-MD" as the standard for general content and "Body-LG" for introductory paragraphs to maintain a welcoming, easy-to-read pace.

## Layout & Spacing
The layout follows a **Fluid Grid** model with high-margin "breathing room." A standard 12-column grid is used for desktop, collapsing to 4 columns on mobile. 

To achieve the "reassuring" vibe, vertical spacing between sections should be generous (80px+). Content should never feel cramped. Use an 8px base unit for all internal component spacing (padding, gaps) to ensure a consistent rhythmic scale. Elements should be grouped logically within white cards to create a clear "island" architecture.

## Elevation & Depth
Depth is communicated through **Ambient Shadows** and **Tonal Layering**. 

The background should primarily stay at the lowest level using the Neutral Light Grey (#F4F7FB). Essential content sits on "Level 1" white cards. These cards use a very soft, diffused shadow (0px 10px 30px rgba(18, 33, 63, 0.05)) to create a subtle lift without looking heavy or dated. 

Avoid inner shadows or complex gradients on surfaces. The subtle diagonal Blue-to-Green gradient is used exclusively as an "accent layer" for progress bars, decorative icons, or active-state underlines to lead the eye.

## Shapes
The shape language is defined by **large, friendly radii**. 

- **Primary Containers/Cards:** Use a 24px corner radius (`rounded-xl` equivalent) to maximize the "soft" medical aesthetic.
- **Buttons & Inputs:** Use a 12px radius to balance clickability with the overall soft-geometric theme.
- **Icons:** Should be housed in circular containers to reinforce the "organic/human" feel of the biotech brand. 

Avoid any sharp 90-degree angles in the UI to prevent the design from feeling clinical or aggressive.

## Components

### Buttons
- **Primary:** Lime Green (#7FC700) fill with Deep Navy (#12213F) text. This high-contrast pairing ensures the most important actions are unmistakable. 
- **Secondary:** Royal Blue (#184EA4) 2px outline with Royal Blue text. Used for alternative actions.
- **States:** On hover, primary buttons should shift 10% darker; secondary buttons should gain a very light blue tint fill.

### Cards
Cards are the primary organizational unit. They must be pure White (#FFFFFF) with a 24px radius and the signature soft ambient shadow. Internal padding should be a minimum of 32px to maintain the brand’s "generous" feel.

### Input Fields
Inputs use a Light Grey (#F4F7FB) background with a 1px border that turns Royal Blue on focus. Use the 12px roundedness to match the buttons.

### Icons
Use a "Duotone" or "Line" icon style. Icons should be placed within a circular background—either a subtle Royal Blue tint or the diagonal gradient—to create a consistent visual anchor for feature lists.

### Chips/Badges
Small status indicators should use the "Section Tint" (#EAF4DA) background with Lime Green text for positive/active states, or light blue tints for neutral categories. Keep corners fully rounded (pill-shaped).