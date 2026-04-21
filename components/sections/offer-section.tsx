"use client"

import { motion } from "motion/react"
import type { OfferContent } from "@/content/schema"
import { RichText } from "@/lib/rich-text"
import { cn } from "@/lib/utils"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { DynamicIcon } from "./icon"

interface OfferSectionProps {
  content: OfferContent
}

export function OfferSection({ content }: OfferSectionProps) {
  return (
    <section id="features" className="relative overflow-hidden py-16 md:py-20">
      <div className="content-shell">
        <motion.div
          className="mx-auto max-w-[49rem] text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[0.62rem] font-semibold tracking-[0.24em] text-[color:var(--text-gold)] uppercase"
          >
            What You Sell
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[1.8rem] leading-[1.08] font-[family:var(--font-display)] font-semibold text-balance text-white sm:text-[2.15rem] lg:text-[3rem]"
          >
            <RichText text={content.heading} />
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-[38rem] text-[0.92rem] leading-7 text-balance text-[color:var(--text-muted)]"
          >
            <RichText text={content.subheading} />
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mt-8 border-y border-[rgba(255,255,255,0.06)]"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.09)}
        >
          <div className="grid md:grid-cols-2">
            {content.items.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className={cn(
                  "px-4 py-4 sm:px-6",
                  index > 1 && "border-t border-[rgba(255,255,255,0.06)]",
                  index % 2 === 1 &&
                    "md:border-l md:border-[rgba(255,255,255,0.06)]"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[color:var(--text-gold)]">
                    <DynamicIcon
                      name={item.icon}
                      size={16}
                      strokeWidth={1.95}
                    />
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] leading-tight font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[0.83rem] leading-5 text-[color:var(--text-muted)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-7 max-w-[50rem]"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
        >
          <motion.article
            variants={fadeUp}
            className="bg-[linear-gradient(180deg,rgba(22, 15, 13, 0.94),rgba(8,9,13,0.98))] relative rounded-[1rem] border border-[rgba(255,255,255,0.08)] px-4 py-4 shadow-[0_20px_36px_rgba(0,0,0,0.42)] sm:px-5 sm:py-5"
          >
            <span className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[0.8rem] font-semibold tracking-[0.18em] text-[rgba(255,255,255,0.24)] uppercase md:block">
              vs
            </span>

            <div className="grid gap-5 md:grid-cols-2 md:gap-7">
              {[content.comparison.left, content.comparison.right].map(
                (column, index) => (
                  <div
                    key={column.title}
                    className={cn(
                      "relative",
                      index === 1 &&
                        "md:border-l md:border-[rgba(255,255,255,0.08)] md:pl-7"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 font-mono text-[0.6rem] font-semibold tracking-[0.12em] uppercase",
                          index === 0
                            ? "bg-[rgba(31,91,255,0.26)] text-[rgba(100,145,255,1)]"
                            : "bg-[rgba(228,82,30,0.24)] text-[color:var(--text-gold)]"
                        )}
                      >
                        {column.title}
                      </span>
                      <span className="text-[0.83rem] text-[rgba(255,255,255,0.56)]">
                        {column.kicker}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {column.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[0.81rem] leading-5 text-[rgba(255,255,255,0.52)]"
                        >
                          <span className="mt-[0.42rem] size-1 rounded-full bg-[rgba(255,255,255,0.25)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}
