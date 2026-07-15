# UI Context

This document translates the visual language defined in `DESIGN.md` into concrete Tailwind and style rules.

## Design Tokens

### Color Palette

| Token Name | Hex Code | Tailwind Equivalent | Role |
|---|---|---|---|
| **Primary** | `#184EA4` | `bg-primary`, `text-primary` | Brand color, headers, footer accents, outlines |
| **Accent / CTA** | `#7FC700` | `bg-[oklch(0.74_0.21_125)]` / custom class | Lime Green for primary button fills and highlight states |
| **Neutral Bg** | `#F4F7FB` | `bg-zinc-50` / custom gray | Main canvas background |
| **Headings / Navy** | `#12213F` | `text-slate-900` / custom dark | Deep Navy for maximum visual contrast on titles |
| **Tint / Soft Green** | `#EAF4DA` | `bg-emerald-50` / `bg-[#EAF4DA]` | Soft green backgrounds for highlighted cards / panels |
| **White** | `#FFFFFF` | `bg-white` | White cards and surface overlays |

### Typography

- **Headings (Montserrat)**:
  - Class: `font-heading` (`--font-heading` variable).
  - Weight: Bold (`font-bold`, 700) or Semibold (`font-semibold`, 600).
  - Line Height: Tight (`leading-tight`, `leading-1.2` or `leading-1.3`).
- **Body (Inter)**:
  - Class: `font-sans` (`--font-sans` variable).
  - Weight: Normal (`font-normal`, 400) or Medium (`font-medium`, 500).
  - Line Height: Relaxed (`leading-relaxed`, `leading-1.6`).

### Corner Radii

- **Cards & Primary Containers**: 24px (`rounded-3xl` or custom `rounded-24`).
- **Buttons, Badges & Input Fields**: 12px (`rounded-xl` or custom `rounded-12`).
- **Icons & Decorative Badges**: Circular (`rounded-full`).

### Elevation (Shadows)

- **Ambient Card Shadow**: Diffused soft shadow.
  - Tailored CSS: `box-shadow: 0px 10px 30px rgba(18, 33, 63, 0.05)`
  - Tailwind equivalent: `shadow-md` or a custom class `shadow-premium`.

---

## Component Specifications

### 1. Buttons
- **Primary Action (CTA)**:
  - Styling: Lime Green fill, Deep Navy text, 12px radius, semibold.
  - Tailwind: `bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-semibold rounded-xl px-5 py-2.5 transition-all shadow-sm duration-200`
- **Secondary Action**:
  - Styling: Royal Blue outline, Royal Blue text, no background, 12px radius.
  - Tailwind: `border-2 border-[#184EA4] text-[#184EA4] hover:bg-[#184EA4]/5 font-semibold rounded-xl px-5 py-2.5 transition-all duration-200`

### 2. Information Cards
- Styling: Pure white background, 24px corner radius, 32px padding, ambient shadow, subtle lift on hover.
- Tailwind: `bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(18,33,63,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(18,33,63,0.08)] duration-300`

### 3. Form Input Fields
- Styling: Light grey background, 12px corner radius, 1px light gray border, transitions to Royal Blue border on focus.
- Tailwind: `w-full bg-[#F4F7FB] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#184EA4] focus:ring-2 focus:ring-[#184EA4]/15 transition-all duration-200`

### 4. Badges & Categories (Chips)
- Styling: Fully rounded pill shape, soft green background, lime green or deep navy text.
- Tailwind: `inline-flex items-center rounded-full bg-[#EAF4DA] px-3.5 py-1 text-xs font-semibold text-[#12213F]`
