import * as LucideIcons from "lucide-react"
import type { LucideProps } from "lucide-react"
import type { BenefitsContent } from "@/content/schema"

// ─── Icon lookup ──────────────────────────────────────────────────────────────
// Resolves a Lucide icon by name string. Returns null for unknown names.
// Add any PascalCase Lucide icon name to content.json — no code changes needed.

type LucideIconName = keyof typeof LucideIcons

function BenefitIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = LucideIcons[name as LucideIconName] as
    | React.ComponentType<LucideProps>
    | undefined
  if (!Icon || typeof Icon !== "function") return null
  return <Icon {...props} />
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BenefitsSectionProps {
  content: BenefitsContent
}

export function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <section id="benefits" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="mt-4 text-muted-foreground">{content.subheading}</p>
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 border border-border p-6"
            >
              <div className="flex size-10 items-center justify-center border border-border text-foreground">
                <BenefitIcon name={item.icon} size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
