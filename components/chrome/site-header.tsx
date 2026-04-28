"use client"

import Link from "next/link"
import type { SiteHeaderContent } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { captureEvent } from "@/lib/posthog"

interface SiteHeaderProps {
  brand: string
  content: SiteHeaderContent
}

export function SiteHeader({ brand, content }: SiteHeaderProps) {
  const handleCtaClick = () => {
    captureEvent("lander_cta_clicked", {
      placement: "header",
      cta_label: content.cta.label,
      cta_href: content.cta.href,
    })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-background backdrop-blur-xl">
      <div className="content-shell flex min-h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.06)] px-3 py-1 font-mono text-[0.65rem] tracking-[0.26em] text-[color:var(--text-gold)] uppercase">
            AI
          </span>
          <div className="flex flex-col">
            <span className="text-[1.05rem] leading-none font-[family:var(--font-display)] tracking-[0.02em] text-white">
              {content.logoText}
            </span>
            <span className="text-[0.62rem] tracking-[0.22em] text-[color:var(--text-muted)] uppercase">
              {brand}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-[0.84rem] text-[color:var(--text-muted)] lg:flex">
          {content.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          variant={content.cta.variant ?? "default"}
          size={content.cta.size ?? "default"}
          render={<Link href={content.cta.href} />}
          onClick={handleCtaClick}
          className="hidden lg:inline-flex lg:h-9 lg:px-4 lg:text-sm"
        >
          {content.cta.label}
        </Button>
      </div>
    </header>
  )
}
