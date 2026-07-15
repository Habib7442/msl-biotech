# Unit 10: Utility Pages & 404

## Goal
Implement the legal compliance pages (`app/privacy/page.tsx`, `app/terms/page.tsx`, `app/disclaimer/page.tsx`) referencing Indian DPDP / clinical drug warning guidelines, and set up a custom styled 404 not found page (`app/not-found.tsx`).

## Design
- **Legal Content Pages**: Light grey background, pure white main card container (`rounded-3xl` / 24px) holding rich typography layout. Large Montserrat headings, clear readable Inter body text.
- **Custom 404 Page**: Clean, centered visual layout. Features a large stylized "404" indicator, an illustration or icon, a Montserrat title (*"Page Not Found"*), a reassuring subtitle (*"The healthcare file you are looking for has been moved or does not exist"*), and a Lime Green button to return Home.

## Implementation

### 1. `app/privacy/page.tsx`
- Layout compliant privacy statements detailing cookie settings, data encryption, and Indian Digital Personal Data Protection (DPDP) consent language.

### 2. `app/terms/page.tsx`
- Highlight general conditions of website usage.

### 3. `app/disclaimer/page.tsx`
- Elaborate the medical disclaimer advising against self-medication, warning about Schedule H/prescription drugs, and clarifying company limits of liability.

### 4. `app/not-found.tsx` (Client / Server Component)
- Styled custom error page that prevents site breakage.
- Redirect button returning to `/`.

## Dependencies
None.

## Verify when done
- [ ] Direct navigation to `/privacy`, `/terms`, and `/disclaimer` renders layout blocks cleanly.
- [ ] Navigating to a non-existent route triggers the custom `not-found.tsx` visual page instead of the default Next.js screen.
- [ ] Compile check passes without errors.
