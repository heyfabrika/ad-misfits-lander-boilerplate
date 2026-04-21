"use client"

import { motion } from "motion/react"
import type { RevenueContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLabel } from "./section-primitives"

interface RevenueSectionProps {
  content: RevenueContent
}

export function RevenueSection({ content }: RevenueSectionProps) {
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
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
        >
          {content.stats.map((item) => (
            <motion.article
              key={item.label}
              variants={fadeUp}
              className="rounded-[1.8rem] glass-card p-7"
            >
              <p className="text-3xl font-semibold text-[color:var(--text-gold)]">
                {item.value}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                {item.detail}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 rounded-[2rem] glass-card p-8"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between gap-4 border-b border-[color:var(--border-subtle)] pb-5"
          >
            <h3 className="text-2xl font-semibold text-white">
              Launch timeline
            </h3>
            <p className="font-mono text-xs tracking-[0.22em] text-[color:var(--text-muted)] uppercase">
              Historical roadmap
            </p>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            variants={stagger(0.08)}
          >
            {content.roadmap.map((milestone, index) => (
              <motion.article
                key={milestone.phase}
                variants={fadeUp}
                className="rounded-[1.6rem] border border-[color:var(--border-subtle)] bg-white/4 p-5"
              >
                <p className="font-mono text-xs tracking-[0.24em] text-[color:var(--text-gold)] uppercase">
                  {milestone.phase}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.12)] text-sm font-semibold text-[color:var(--text-gold)]">
                    {index + 1}
                  </span>
                  <h4 className="text-lg font-semibold text-white">
                    {milestone.title}
                  </h4>
                </div>
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  {milestone.detail}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.trackRecord.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="rounded-[1.6rem] border border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.03)] px-5 py-5 text-center"
            >
              <p className="text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-xs tracking-[0.18em] text-[color:var(--text-muted)] uppercase">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {content.footnote ? (
          <p className="mt-6 text-sm leading-7 text-[color:var(--text-muted)]">
            {content.footnote}
          </p>
        ) : null}
      </div>
    </section>
  )
}
