"use client"

import { motion } from "motion/react"
import type { ResultsContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLabel, SectionLead } from "./section-primitives"

interface ResultsSectionProps {
  content: ResultsContent
}

export function ResultsSection({ content }: ResultsSectionProps) {
  return (
    <section className="section-pad">
      <div className="content-shell">
        <motion.div
          className="max-w-4xl space-y-5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{content.label}</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp}>
            <SectionHeading text={content.heading} />
          </motion.div>
          {content.subheading ? (
            <motion.div variants={fadeUp}>
              <SectionLead text={content.subheading} />
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.items.map((item) => (
            <motion.article
              key={`${item.niche}-${item.stat}`}
              variants={fadeUp}
              className="rounded-[1.8rem] glass-card p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.08)] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[color:var(--text-gold)] uppercase">
                  {item.niche}
                </p>
                <span className="font-mono text-xs tracking-[0.18em] text-[color:var(--text-muted)] uppercase">
                  Case study
                </span>
              </div>
              <h3 className="mt-6 text-3xl leading-tight font-semibold text-white">
                {item.stat}
              </h3>
              <p className="mt-3 text-base leading-8 text-[color:var(--text-muted)]">
                {item.detail}
              </p>
              <dl className="mt-8 space-y-4 text-sm leading-7">
                <div>
                  <dt className="font-mono text-xs tracking-[0.2em] text-[color:var(--text-muted)] uppercase">
                    Timeline
                  </dt>
                  <dd className="mt-1 text-white">{item.timeline}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.2em] text-[color:var(--text-muted)] uppercase">
                    Background
                  </dt>
                  <dd className="mt-1 text-white">{item.background}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs tracking-[0.2em] text-[color:var(--text-muted)] uppercase">
                    Services
                  </dt>
                  <dd className="mt-1 text-white">{item.services}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
