/**
 * section-renderer.tsx
 *
 * Maps a section's `type` discriminant to its component.
 * The switch statement is the only place that needs updating when adding a
 * new section type. The `never` fallback enforces exhaustiveness at compile time:
 * if a new type is added to SectionContent without a matching case, tsc errors.
 */

import type { SectionContent } from "@/content/schema"
import { HeroSection } from "./hero-section"
import { BenefitsSection } from "./benefits-section"
import { TestimonialsSection } from "./testimonials-section"
import { CtaSection } from "./cta-section"
import { FaqSection } from "./faq-section"

interface SectionRendererProps {
  section: SectionContent
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section.type) {
    case "hero":
      return <HeroSection content={section} />
    case "benefits":
      return <BenefitsSection content={section} />
    case "testimonials":
      return <TestimonialsSection content={section} />
    case "cta":
      return <CtaSection content={section} />
    case "faq":
      return <FaqSection content={section} />
    default: {
      // Exhaustiveness check: this line errors if a new union member has no case
      const _exhaustive: never = section
      return null
    }
  }
}
