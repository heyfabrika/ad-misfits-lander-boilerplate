"use client"

import Link from "next/link"
import { motion } from "motion/react"
import type { FinalCtaContent } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLead } from "./section-primitives"

interface FinalCtaSectionProps {
  content: FinalCtaContent
}

export function FinalCtaSection({ content }: FinalCtaSectionProps) {
  return (
    <section className="section-pad">
      <motion.div
        className="relative content-shell rounded-[2.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,17,26,0.96),rgba(9,11,17,0.96))] px-6 py-16 text-center shadow-[0_24px_60px_rgba(0,0,0,0.32)] md:px-12"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.08)}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-t-[2.1rem] bg-[radial-gradient(circle_at_50%_0%,rgba(228,82,30,0.1),transparent_70%)]" />
        <motion.div variants={fadeUp}>
          <SectionHeading
            text={content.heading}
            className="mx-auto max-w-4xl"
          />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-5">
          <SectionLead
            text={content.subheading}
            className="mx-auto text-center"
          />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-8">
          <Button
            variant={content.cta.variant ?? "default"}
            size={content.cta.size ?? "lg"}
            render={<Link href={content.cta.href} />}
          >
            {content.cta.label}
          </Button>
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-5 text-sm text-[color:var(--text-muted)]"
        >
          {content.caption}
        </motion.p>
      </motion.div>
    </section>
  )
}
