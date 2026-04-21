"use client"

import { motion } from "motion/react"
import type { ProcessContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLabel } from "./section-primitives"

interface ProcessSectionProps {
  content: ProcessContent
}

export function ProcessSection({ content }: ProcessSectionProps) {
  const steps = content.steps

  return (
    <section id="how-it-works" className="">
      <div className="content-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="border-0 bg-transparent px-0 py-0 text-[0.65rem] tracking-[0.22em] text-[color:var(--text-gold)]">
              {content.label}
            </SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-4">
            <SectionHeading
              text={content.heading}
              className="text-3xl sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto mt-11 flex max-w-2xl flex-col gap-7 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="flex gap-4 md:gap-5"
            >
              <div className="flex w-8 shrink-0 flex-col items-center self-stretch md:w-9">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ff7a3b_0%,#e4521e_100%)] text-sm font-semibold text-white shadow-[0_0_16px_rgba(228,82,30,0.32)] ring-1 ring-white/15 md:size-9 md:text-[0.95rem]">
                  <span className="sr-only">Step {index + 1}</span>
                  <span aria-hidden>{index + 1}</span>
                </div>
                {index < steps.length - 1 ? (
                  <div
                    aria-hidden
                    className="mx-auto mt-2 min-h-[1.75rem] w-px flex-1 bg-gradient-to-b from-[rgba(228,82,30,0.55)] via-[rgba(228,82,30,0.28)] to-[rgba(228,82,30,0.1)] md:mt-2.5 md:min-h-[2rem]"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1 space-y-1.5 pb-1">
                <h3 className="text-xl font-semibold tracking-tight text-white md:text-[1.35rem] md:leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-muted)] md:text-[0.95rem] md:leading-7">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mx-auto mt-9 max-w-2xl text-center text-sm leading-relaxed text-[color:var(--text-secondary)] italic md:mt-10 md:text-base"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          {content.tagline}
        </motion.p>
      </div>
    </section>
  )
}
