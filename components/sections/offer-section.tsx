"use client"

import { motion } from "motion/react"
import type { OfferContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { DynamicIcon } from "./icon"
import { SectionHeading, SectionLead } from "./section-primitives"

interface OfferSectionProps {
  content: OfferContent
}

export function OfferSection({ content }: OfferSectionProps) {
  return (
    <section id="features" className="section-pad">
      <div className="content-shell">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading text={content.heading} />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-5">
            <SectionLead text={content.subheading} />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
        >
          {content.items.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="rounded-[1.75rem] glass-card p-7"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.12)] text-[color:var(--text-gold)]">
                <DynamicIcon name={item.icon} size={20} strokeWidth={1.6} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 lg:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
        >
          {[content.comparison.left, content.comparison.right].map(
            (column, index) => (
              <motion.article
                key={column.title}
                variants={fadeUp}
                className="rounded-[1.8rem] glass-card p-8"
              >
                <div className="flex items-center justify-between gap-4 border-b border-[color:var(--border-subtle)] pb-5">
                  <div>
                    <p className="font-mono text-xs tracking-[0.24em] text-[color:var(--text-muted)] uppercase">
                      {column.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {column.kicker}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase ${
                      index === 0
                        ? "bg-white/6 text-white"
                        : "bg-[rgba(228,82,30,0.14)] text-[color:var(--text-gold)]"
                    }`}
                  >
                    {index === 0 ? "Owner scope" : "Operator scope"}
                  </span>
                </div>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 rounded-full bg-[color:var(--text-gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
