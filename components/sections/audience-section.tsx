"use client"

import Link from "next/link"
import { motion } from "motion/react"
import type { AudienceContent } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading } from "./section-primitives"

interface AudienceSectionProps {
  content: AudienceContent
}

export function AudienceSection({ content }: AudienceSectionProps) {
  return (
    <section className="section-pad">
      <div className="content-shell">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading text={content.heading} />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.items.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className={`rounded-[1.8rem] border p-7 ${
                item.tone === "warning"
                  ? "border-red-500/20 bg-[rgba(127,29,29,0.14)]"
                  : "glass-card"
              }`}
            >
              <p
                className={`font-mono text-xs tracking-[0.22em] uppercase ${
                  item.tone === "warning"
                    ? "text-red-200"
                    : "text-[color:var(--text-gold)]"
                }`}
              >
                {item.title}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {item.subtitle}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                {item.description}
              </p>
            </motion.article>
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
            render={<Link href={content.cta.href} />}
          >
            {content.cta.label}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
