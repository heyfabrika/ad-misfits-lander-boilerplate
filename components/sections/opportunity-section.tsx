"use client"

import { motion } from "motion/react"
import type { OpportunityContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLabel } from "./section-primitives"

interface OpportunitySectionProps {
  content: OpportunityContent
}

export function OpportunitySection({ content }: OpportunitySectionProps) {
  return (
    <section id="whyus" className="section-pad">
      <div className="content-shell">
        <motion.div
          className="mb-14 space-y-5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{content.label}</SectionLabel>
          </motion.div>
          <motion.div variants={fadeUp} className="max-w-4xl">
            <SectionHeading text={content.heading} />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
        >
          {content.cards.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              className="rounded-[1.75rem] glass-card p-7"
            >
              <p className="font-mono text-xs tracking-[0.24em] text-[color:var(--text-gold)] uppercase">
                {card.title}
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white">
                {card.stat}
              </h3>
              {card.subtitle ? (
                <p className="mt-3 text-sm tracking-[0.12em] text-[color:var(--text-muted)] uppercase">
                  {card.subtitle}
                </p>
              ) : null}
              {card.description ? (
                <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  {card.description}
                </p>
              ) : null}

              {card.comparison ? (
                <div className="mt-6 space-y-4">
                  {card.comparison.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white">{item.label}</span>
                        <span className="text-[color:var(--text-muted)]">
                          {item.value}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/6">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: item.width,
                            background: item.highlight
                              ? "linear-gradient(135deg, #e4521e 0%, #c63f10 100%)"
                              : "rgba(255,255,255,0.18)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {card.bullets ? (
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  {card.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 rounded-full bg-[color:var(--text-gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
