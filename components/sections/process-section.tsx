"use client"

import { motion } from "motion/react"
import type { ProcessContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLabel } from "./section-primitives"

interface ProcessSectionProps {
  content: ProcessContent
}

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section id="how-it-works" className="section-pad">
      <div className="content-shell">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{content.label}</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-5">
            <SectionHeading text={content.heading} />
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 max-w-4xl space-y-6"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
        >
          {content.steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="grid gap-5 rounded-[1.8rem] glass-card p-7 md:grid-cols-[auto_1fr]"
            >
              <div className="flex items-start">
                <div className="flex size-16 items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.12)] text-2xl font-semibold text-[color:var(--text-gold)]">
                  {index + 1}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[color:var(--text-muted)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mx-auto mt-10 max-w-3xl text-center text-lg leading-8 text-[color:var(--text-secondary)]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55 }}
        >
          {content.tagline}
        </motion.p>
      </div>
    </section>
  )
}
