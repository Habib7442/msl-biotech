# Unit 04: Form API & Enquiry Modal

## Goal
Create an interactive, accessible product and partnership enquiry form mechanism. This includes a mock backend endpoint (`app/api/enquiry/route.ts`) and a pop-up `<EnquiryModal />` component that accepts context (such as a specific product name) to pre-populate form fields.

## Design
- **Enquiry Modal**: Rounded card (`rounded-3xl` / 24px) centered on screen. Dark overlay backdrop with blur (`bg-slate-900/40 backdrop-blur-sm`). Close button in the top-right corner.
- **Form Fields**:
  - Full Name (required)
  - Email Address (required, email format check)
  - Phone Number (required, digits-only format check)
  - Subject / Product Name (pre-populated and disabled if opened from a product page)
  - Message details (required, min 10 characters)
  - GDPR/DPDP Consent Checkbox (required)
- **Submit Button**: Lime Green styling. During loading state, show a spinning loader icon and disable input.
- **Success State**: Inside the modal card, clear out the form and display a green success circle checkmark with smooth micro-animations and confirmation text: *"Enquiry submitted successfully! Our team will contact you shortly."*

## Implementation

### 1. `app/api/enquiry/route.ts` (Next.js API Route)
- Define a `POST` handler function.
- Parse JSON body containing `name`, `email`, `phone`, `subject`, and `message`.
- Add simple server-side validation. If fields are missing or email is invalid, return `status: 400` with descriptive error.
- Simulate database/network delay using `new Promise((resolve) => setTimeout(resolve, 1000))`.
- Log the enquiry payload to the server terminal.
- Return `Response.json({ success: true, message: "Enquiry logged successfully" })`.

### 2. `components/EnquiryModal.tsx` (Client Component)
- Implement modal overlay.
- Form inputs mapped to React state.
- Validate values on-the-fly and display red error texts.
- On submit, POST to `/api/enquiry`.
- Show success panel on successful response.

## Dependencies
None.

## Verify when done
- [ ] Submitting invalid inputs triggers visual validation warnings.
- [ ] Valid inputs transition the modal into a loading state, followed by the success state.
- [ ] Submissions successfully print logged structures to the server console.
- [ ] Escape key and clicking overlay backdrop closes the modal cleanly.
