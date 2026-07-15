# Code Standards

## TypeScript & Language Rules
1. **Strict Typing**: No using `any`. Write explicit interfaces and types for components, function signatures, and data models.
2. **Components**: Use standard TypeScript functions for React components.
   - Example:
     ```tsx
     interface CardProps {
       title: string;
       description: string;
     }

     export function FeatureCard({ title, description }: CardProps) {
       return (
         <div>
           <h3>{title}</h3>
           <p>{description}</p>
         </div>
       );
     }
     ```

## Next.js & React 19 Patterns
1. **Server vs. Client Components**:
   - By default, all pages and layout files in the App Router are **Server Components**.
   - Add `"use client"` at the very top of files that utilize hooks (e.g. `useState`, `useEffect`), interact with window APIs, or require client interactivity (like button click events, forms).
   - Keep Server Components as ancestors to feed static metadata and layout structure, and place Client Components in leaf nodes.
2. **Metadata**: Set page-level metadata (such as custom `title` and `description`) statically inside Server Component pages.
   - Example:
     ```tsx
     import { Metadata } from "next";

     export const metadata: Metadata = {
       title: "About Us | MSL Biotech",
       description: "Learn about MSL Biotech's mission to save lives through affordable medicine.",
     };
     ```

## File & Folder Conventions
1. **Component Files**: Named in PascalCase (e.g., `Header.tsx`, `EnquiryModal.tsx`).
2. **Page Directories**: Named in lower-case kebab-case (e.g., `products/`, `about/`).
3. **Utility Scripts**: Named in camelCase (e.g., `utils.ts`, `data.ts`).
4. **Styles**: Combine styles using the custom `cn` helper from `@/lib/utils` rather than writing complex ternary string interpolations in classes.
   - Example:
     ```tsx
     import { cn } from "@/lib/utils";

     export function Card({ isActive, className }: { isActive: boolean; className?: string }) {
       return (
         <div className={cn("p-4 bg-white rounded-xl border", isActive && "border-primary", className)}>
           ...
         </div>
       );
     }
     ```
