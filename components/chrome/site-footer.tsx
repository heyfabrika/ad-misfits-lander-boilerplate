import Link from "next/link"
import type { SiteFooterContent } from "@/content/schema"

interface SiteFooterProps {
  brand: string
  content: SiteFooterContent
}

export function SiteFooter({ brand, content }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/6 bg-[rgba(5,5,5,0.96)] px-5 py-20 md:px-6">
      <div className="content-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.28em] text-[color:var(--text-gold)] uppercase">
              {brand}
            </p>
            <h3 className="text-3xl leading-none font-[family:var(--font-display)] text-white">
              {brand}
            </h3>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-[color:var(--text-muted)]">
            {content.legalDisclaimer}
          </p>
        </div>

        <div className="space-y-6 lg:justify-self-end lg:text-right">
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.24em] text-[color:var(--text-muted)] uppercase">
              Contact
            </p>
            <a
              href={`mailto:${content.contactEmail}`}
              className="text-lg font-medium text-white transition-colors hover:text-[color:var(--text-gold)]"
            >
              {content.contactEmail}
            </a>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[color:var(--text-muted)] lg:justify-end">
            {content.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs tracking-[0.18em] text-[color:var(--text-muted)] uppercase">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
