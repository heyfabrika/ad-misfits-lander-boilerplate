"use client"

import { motion } from "motion/react"
import type { FeaturesContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { DynamicIcon } from "./icon"
import { SectionHeading, SectionLead } from "./section-primitives"

interface FeaturesSectionProps {
  content: FeaturesContent
}

export function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section className="section-pad">
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
          className="mt-14 grid gap-6 xl:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
        >
          {content.cards.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              className="rounded-[2rem] glass-card p-8"
            >
              <h3 className="max-w-xl text-3xl leading-tight font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--text-muted)]">
                {card.description}
              </p>

              {card.items ? (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-[color:var(--border-subtle)] bg-white/4 px-4 py-4 text-sm font-medium text-white"
                    >
                      <span className="mr-2 text-[color:var(--text-gold)]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {card.stats ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {card.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[color:var(--border-subtle)] bg-white/4 px-4 py-5"
                    >
                      <p className="text-2xl font-semibold text-[color:var(--text-gold)]">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs tracking-[0.16em] text-[color:var(--text-muted)] uppercase">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.capabilities.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="flex items-center gap-4 rounded-2xl glass-card px-5 py-4"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.1)] text-[color:var(--text-gold)]">
                <DynamicIcon name={item.icon} size={18} strokeWidth={1.6} />
              </div>
              <p className="text-sm font-medium text-white">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
