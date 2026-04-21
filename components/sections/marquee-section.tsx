"use client"

import { motion } from "motion/react"
import type { MarqueeContent } from "@/content/schema"
import { Check } from "lucide-react"

interface MarqueeSectionProps {
  content: MarqueeContent
}

export function MarqueeSection({ content }: MarqueeSectionProps) {
  const items = [...content.items, ...content.items]

  return (
    <section className="overflow-hidden bg-muted py-3">
      <motion.div
        className="marquee-track flex min-w-max items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-8 text-sm font-medium text-[color:var(--text-muted)]"
          >
            <span>{item}</span>
            <Check className="size-4 text-[color:var(--text-gold)]" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
