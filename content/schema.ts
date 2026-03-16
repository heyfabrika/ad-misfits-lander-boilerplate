/**
 * content/schema.ts
 *
 * TypeScript types for the content.json-driven landing page system.
 *
 * HOW IT WORKS:
 * - PageContent is the root type for content.json
 * - Each section is a discriminated union member identified by `type`
 * - The `sections` array controls both content and render order
 *
 * FOR AGENTS EDITING CONTENT:
 * - Only edit content.json — never hardcode copy in components
 * - Reorder sections by reordering array entries in content.json
 * - Add a new section type by: (1) adding a new interface + union member here,
 *   (2) adding a case in section-renderer.tsx, (3) creating the component
 * - The TypeScript compiler will error if a new union member has no renderer case
 */

// ─── Shared primitives ────────────────────────────────────────────────────────

export interface CtaButton {
  label: string
  href: string
  /** Maps to Button variant prop. Omit to use component default. */
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  /** Maps to Button size prop. Omit to use component default. */
  size?: "xs" | "sm" | "default" | "lg"
}

// ─── Section content shapes ───────────────────────────────────────────────────

export interface HeroContent {
  type: "hero"
  /** Optional eyebrow label above the heading */
  badge?: string
  /** Supports \n for intentional line breaks */
  heading: string
  subheading: string
  buttons: CtaButton[]
}

export interface BenefitItem {
  /** Lucide icon name in PascalCase, e.g. "Zap", "Target", "BarChart2" */
  icon: string
  title: string
  description: string
}

export interface BenefitsContent {
  type: "benefits"
  heading: string
  subheading?: string
  items: BenefitItem[]
}

export interface TestimonialItem {
  quote: string
  author: string
  role: string
  company?: string
}

export interface TestimonialsContent {
  type: "testimonials"
  heading: string
  subheading?: string
  items: TestimonialItem[]
}

export interface CtaSectionContent {
  type: "cta"
  heading: string
  description: string
  button: CtaButton
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqContent {
  type: "faq"
  heading: string
  subheading?: string
  items: FaqItem[]
}

// ─── Discriminated union ──────────────────────────────────────────────────────

export type SectionContent =
  | HeroContent
  | BenefitsContent
  | TestimonialsContent
  | CtaSectionContent
  | FaqContent

// ─── Root page shape ──────────────────────────────────────────────────────────

export interface PageContent {
  /** Ordered array of sections. Render order matches array order. */
  sections: SectionContent[]
}
