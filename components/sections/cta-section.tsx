import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { CtaSectionContent } from "@/content/schema"

interface CtaSectionProps {
  content: CtaSectionContent
}

export function CtaSection({ content }: CtaSectionProps) {
  return (
    <section
      id="cta"
      className="border-t border-border bg-primary px-6 py-24 text-primary-foreground"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {content.heading}
        </h2>
        <p className="mt-6 text-balance text-primary-foreground/80">
          {content.description}
        </p>
        <div className="mt-10">
          <Button
            variant={content.button.variant ?? "secondary"}
            size={content.button.size ?? "lg"}
            render={<Link href={content.button.href} />}
          >
            {content.button.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
