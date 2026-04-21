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

export interface NavLink {
  label: string
  href: string
}

export interface SiteHeaderContent {
  logoText: string
  navLinks: NavLink[]
  cta: CtaButton
}

export interface SiteFooterContent {
  contactEmail: string
  legalLinks: NavLink[]
  legalDisclaimer: string
  copyright: string
}

export interface SiteContent {
  brand: string
  header: SiteHeaderContent
  footer: SiteFooterContent
}

// ─── Section content shapes ───────────────────────────────────────────────────

export interface MarqueeContent {
  type: "marquee"
  items: string[]
}

export interface HeroStatItem {
  value: string
  label: string
  detail: string
}

export interface HeroContent {
  type: "hero"
  badge: string
  heading: string
  subheading: string
  primaryCta: CtaButton
  caption: string
  stats: HeroStatItem[]
}

export interface LogoStripImage {
  /** Image URL or path (e.g. `/logos/acme.svg` or `https://…`). */
  src: string
  alt: string
}

export interface LogoStripContent {
  type: "logoStrip"
  label: string
  items: LogoStripImage[]
}

export interface ComparisonBarItem {
  label: string
  value: string
  width: string
  highlight?: boolean
}

export interface OpportunityCard {
  title: string
  stat: string
  subtitle?: string
  description?: string
  comparison?: ComparisonBarItem[]
  bullets?: string[]
}

export interface OpportunityContent {
  type: "opportunity"
  label: string
  heading: string
  cards: OpportunityCard[]
}

export interface ProcessStep {
  title: string
  description: string
}

export interface ProcessContent {
  type: "process"
  label: string
  heading: string
  steps: ProcessStep[]
  tagline: string
}

export interface OfferFeatureItem {
  icon: string
  title: string
  description: string
}

export interface ComparisonColumn {
  title: string
  kicker: string
  items: string[]
}

export interface OfferContent {
  type: "offer"
  heading: string
  subheading: string
  items: OfferFeatureItem[]
  comparison: {
    left: ComparisonColumn
    right: ComparisonColumn
  }
}

export interface FeatureCardStat {
  label: string
  value: string
}

export interface FeatureCard {
  title: string
  description: string
  items?: string[]
  stats?: FeatureCardStat[]
}

export interface CapabilityItem {
  icon: string
  label: string
}

export interface FeaturesContent {
  type: "features"
  heading: string
  subheading: string
  cards: FeatureCard[]
  capabilities: CapabilityItem[]
}

export interface RevenueStatItem {
  value: string
  label: string
  detail: string
}

export interface RoadmapMilestone {
  phase: string
  title: string
  detail: string
}

export interface RevenueContent {
  type: "revenue"
  label: string
  heading: string
  stats: RevenueStatItem[]
  roadmap: RoadmapMilestone[]
  trackRecord: RevenueStatItem[]
  footnote?: string
}

export interface ResultCaseStudy {
  niche: string
  stat: string
  detail: string
  timeline: string
  background: string
  services: string
}

export interface ResultsContent {
  type: "results"
  label: string
  heading: string
  subheading?: string
  items: ResultCaseStudy[]
}

export interface AudienceItem {
  title: string
  subtitle: string
  description: string
  tone?: "default" | "warning"
}

export interface AudienceContent {
  type: "audience"
  heading: string
  items: AudienceItem[]
  cta: CtaButton
}

export interface VideoTestimonialItem {
  videoId: string
  title: string
  label: string
  href: string
}

export interface VideoTestimonialsContent {
  type: "videoTestimonials"
  heading: string
  items: VideoTestimonialItem[]
}

export interface TeamMember {
  name: string
  role: string
  linkedinUrl: string
  avatarLabel: string
}

export interface TeamContent {
  type: "team"
  heading: string
  items: TeamMember[]
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

export interface FinalCtaContent {
  type: "finalCta"
  heading: string
  subheading: string
  cta: CtaButton
  caption: string
}

export interface BookingFieldOption {
  label: string
  value: string
}

export interface BookingField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "select"
  placeholder?: string
  required?: boolean
  options?: BookingFieldOption[]
}

export interface SchedulerConfig {
  provider: "calendly" | "cal" | "placeholder"
  embedUrl?: string
  timezoneLabel: string
  title: string
  description: string
}

export interface BookingContent {
  type: "booking"
  heading: string
  subheading: string
  stepLabel: string
  fields: BookingField[]
  continueButtonLabel: string
  scheduler: SchedulerConfig
}

export interface TypeformSectionContent {
  type: "typeform"
  formId: string
  heading?: string
  subheading?: string
  iframeTitle?: string
  height?: number
}

export interface CalendlySectionContent {
  type: "calendly"
  schedulingUrl: string
  heading?: string
  subheading?: string
  iframeTitle?: string
  height?: number
}

// ─── Discriminated union ──────────────────────────────────────────────────────

export type SectionContent =
  | MarqueeContent
  | HeroContent
  | LogoStripContent
  | OpportunityContent
  | ProcessContent
  | OfferContent
  | FeaturesContent
  | RevenueContent
  | ResultsContent
  | AudienceContent
  | VideoTestimonialsContent
  | TeamContent
  | FaqContent
  | FinalCtaContent
  | BookingContent
  | TypeformSectionContent
  | CalendlySectionContent

// ─── Root page shape ──────────────────────────────────────────────────────────

export interface PageContent {
  site?: SiteContent
  /** Ordered array of sections. Render order matches array order. */
  sections: SectionContent[]
}
