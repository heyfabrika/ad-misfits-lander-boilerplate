"use client"

import Link from "next/link"
import { motion } from "motion/react"
import type { AudienceContent } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { captureEvent } from "@/lib/posthog"
import { cn } from "@/lib/utils"
import { RichText } from "@/lib/rich-text"
import { fadeUp, stagger, viewport } from "@/lib/motion"

interface AudienceSectionProps {
  content: AudienceContent
}

export function AudienceSection({ content }: AudienceSectionProps) {
  const handleCtaClick = () => {
    captureEvent("lander_cta_clicked", {
      placement: "audience",
      cta_label: content.cta.label,
      cta_href: content.cta.href,
    })
  }

  return (
    <section className="py-16">
      <div className="flex flex-col items-center justify-center gap-16">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-semibold tracking-[0.38em] text-[#E45D25] uppercase"
          >
            {"WHO IT'S FOR"}
          </motion.p>
          <motion.div variants={fadeUp}>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-white sm:text-[2.75rem] sm:leading-[1.12] lg:text-5xl lg:leading-[1.08] [&_em]:font-medium [&_em]:text-[#E45D25] [&_em]:italic">
              <RichText text={content.heading} />
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.items.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="max-w-md">
              <Card
                className={cn(
                  "gap-0 rounded-lg bg-card/30 py-0 text-left ring-0",
                  "shadow-none"
                )}
              >
                <div className="flex gap-4 p-6 sm:p-8">
                  <div
                    className={cn(
                      "w-0.5 shrink-0 rounded-full",
                      item.tone === "warning" ? "bg-[#f87171]" : "bg-[#3B82F6]"
                    )}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-xs font-semibold tracking-[0.22em] uppercase",
                        item.tone === "warning"
                          ? "text-[#f87171]"
                          : "text-[#3B82F6]"
                      )}
                    >
                      {item.title}
                    </p>
                    <h3 className="mt-5 text-xl font-semibold text-white">
                      {item.subtitle}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-7 text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant={content.cta.variant ?? "default"}
            size={content.cta.size ?? "lg"}
            className="rounded-full px-9 text-[0.92rem] font-semibold tracking-wide shadow-[0_10px_28px_rgba(228,93,37,0.35)]"
            render={<Link href={content.cta.href} />}
            onClick={handleCtaClick}
          >
            {content.cta.label}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
