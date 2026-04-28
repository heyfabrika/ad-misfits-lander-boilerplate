"use client"

import Link from "next/link"
import { motion } from "motion/react"
import type { FinalCtaContent } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { captureEvent } from "@/lib/posthog"
import { RichText } from "@/lib/rich-text"
import { cn } from "@/lib/utils"

interface FinalCtaSectionProps {
  content: FinalCtaContent
}

export function FinalCtaSection({ content }: FinalCtaSectionProps) {
  const handleCtaClick = () => {
    captureEvent("lander_cta_clicked", {
      placement: "final_cta",
      cta_label: content.cta.label,
      cta_href: content.cta.href,
    })
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden section-pad",
        "py-32 md:py-[8.75rem]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_48%_at_50%_90%,rgba(249,115,22,0.26)_0%,rgba(234,88,12,0.1)_0%,transparent_72%)]"
        aria-hidden
      />
      <motion.div
        className="relative content-shell flex flex-col items-center text-center"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.08)}
      >
        <motion.h2
          variants={fadeUp}
          className={cn(
            "mx-auto font-[family:var(--font-display)] text-balance",
            "text-[2.125rem] leading-[1.12] font-bold tracking-[-0.03em] text-white",
            "sm:text-[2.5rem] sm:leading-[1.1]",
            "md:text-[2.75rem] md:leading-[1.08]",
            "[&_em]:font-semibold [&_em]:text-[#f97316] [&_em]:italic"
          )}
        >
          <RichText text={content.heading} />
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className={cn(
            "mx-auto mt-5 max-w-[37.5rem] text-lg leading-[1.55] font-normal text-balance",
            "text-[#a1a1aa]"
          )}
        >
          <RichText text={content.subheading} />
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12">
          <Button
            variant={content.cta.variant ?? "default"}
            size={content.cta.size ?? "lg"}
            render={<Link href={content.cta.href} />}
            onClick={handleCtaClick}
            className={cn(
              "h-auto min-h-12 rounded-full border-0 px-8 py-3.5 text-base font-bold",
              "bg-[linear-gradient(180deg,#fb923c_0%,#ea580c_100%)] text-white",
              "shadow-[0_16px_36px_rgba(234,88,12,0.42),0_0_0_1px_rgba(255,255,255,0.06)_inset,0_0_56px_rgba(249,115,22,0.28)]",
              "hover:scale-[1.02] hover:shadow-[0_18px_42px_rgba(234,88,12,0.5),0_0_0_1px_rgba(255,255,255,0.08)_inset,0_0_72px_rgba(249,115,22,0.32)] hover:brightness-[1.03]",
              "active:translate-y-px"
            )}
          >
            {content.cta.label}
          </Button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-lg text-sm leading-relaxed font-normal text-[#52525b]"
        >
          {content.caption}
        </motion.p>
      </motion.div>
    </section>
  )
}
