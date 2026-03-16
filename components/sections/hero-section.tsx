import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { HeroContent } from "@/content/schema"

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      {content.badge && (
        <span className="mb-6 inline-block border border-border px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {content.badge}
        </span>
      )}
      <h1 className="max-w-3xl whitespace-pre-line text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
        {content.heading}
      </h1>
      <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
        {content.subheading}
      </p>
      {content.buttons.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {content.buttons.map((btn) => (
            <Button
              key={btn.label}
              variant={btn.variant ?? "default"}
              size={btn.size ?? "default"}
              render={<Link href={btn.href} />}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </section>
  )
}
