"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"
import type { FeaturesContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { RichText } from "@/lib/rich-text"
import { cn } from "@/lib/utils"

interface FeaturesSectionProps {
  content: FeaturesContent
}

const kicker =
  "text-center text-[11px] font-medium tracking-[0.22em] text-[#ff6b2b] uppercase"
const categoryLabel =
  "text-[11px] font-semibold tracking-[0.18em] text-[#2563eb] uppercase"
const cardShell =
  "rounded-2xl border border-white/10 bg-[#111111] p-8 md:p-9 lg:p-10"
const rowDivider = "border-t border-white/[0.06] first:border-t-0"

export function FeaturesSection({ content }: FeaturesSectionProps) {
  return (
    <section id="features" className="">
      <div className="content-shell">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.label ? (
            <motion.p variants={fadeUp} className={kicker}>
              {content.label}
            </motion.p>
          ) : null}
          <motion.h2
            variants={fadeUp}
            className={cn(
              "text-4xl font-[family:var(--font-display)] font-semibold tracking-[-0.03em] text-balance text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[0.98]",
              content.label ? "mt-5" : "",
              "[&_em]:font-semibold [&_em]:text-[#ff6b2b] [&_em]:italic"
            )}
          >
            <RichText text={content.heading} />
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#94a3b8] sm:text-[1.06rem] sm:leading-8"
          >
            <RichText text={content.subheading} />
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
        >
          {content.cards.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              className={cardShell}
            >
              {card.category ? (
                <p className={categoryLabel}>{card.category}</p>
              ) : null}
              <h3
                className={cn(
                  "max-w-xl text-2xl leading-snug font-semibold tracking-[-0.02em] text-white md:text-[1.65rem]",
                  card.category ? "mt-3" : ""
                )}
              >
                {card.title}
              </h3>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-7 text-[#94a3b8]">
                {card.description}
              </p>

              {card.items?.length ? (
                <ul className="mt-8">
                  {card.items.map((item) => (
                    <li
                      key={`${item.label}-${item.status}`}
                      className={cn(
                        rowDivider,
                        "flex items-center justify-between gap-4 py-4 first:pt-0"
                      )}
                    >
                      <span className="text-[0.9375rem] text-white">
                        {item.label}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 text-[0.9375rem] font-medium text-[#22c55e]">
                        <Check
                          className="size-[1.05rem] stroke-[2.5]"
                          aria-hidden
                        />
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {card.stats?.length ? (
                <div className="mt-8">
                  {card.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={cn(
                        rowDivider,
                        "flex items-center justify-between gap-4 py-4 first:pt-0"
                      )}
                    >
                      <span className="text-[0.9375rem] text-[#94a3b8]">
                        {stat.label}
                      </span>
                      <span className="text-[0.9375rem] font-semibold text-white tabular-nums">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.capabilities.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="flex gap-3.5 text-left"
            >
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-[#22c55e]"
                aria-hidden
              >
                <Check className="size-5 stroke-[2.5]" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.9375rem] leading-snug font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#94a3b8]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
