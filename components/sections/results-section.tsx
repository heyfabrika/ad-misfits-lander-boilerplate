"use client"

import { motion } from "motion/react"
import type { ResultsContent } from "@/content/schema"
import { RichText } from "@/lib/rich-text"
import { fadeUp, stagger, viewport } from "@/lib/motion"

interface ResultsSectionProps {
  content: ResultsContent
}

export function ResultsSection({ content }: ResultsSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-semibold tracking-[0.38em] text-[#FF6B35] uppercase"
          >
            {content.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-balance text-white sm:text-[2.75rem] sm:leading-[1.12] lg:text-5xl lg:leading-[1.08] [&_em]:font-serif [&_em]:font-medium [&_em]:text-[#FF6B35] [&_em]:italic"
          >
            <RichText text={content.heading} />
          </motion.h2>
          {content.subheading ? (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-pretty text-[#A1A1AA] sm:text-[0.9375rem] sm:leading-8"
            >
              {content.subheading}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
        >
          {content.items.map((item) => (
            <motion.article
              key={`${item.niche}-${item.stat}`}
              variants={fadeUp}
              className="rounded-xl border border-white/10 bg-[#111111] p-6 sm:p-8"
            >
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[#6366F1] uppercase">
                {item.niche}
              </p>
              <h3 className="mt-5 text-[1.625rem] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[1.75rem]">
                {item.stat}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-7 text-[#A1A1AA]">
                {item.detail}
              </p>
              <dl className="mt-8 space-y-3.5">
                <div className="flex items-start justify-between gap-4 text-[13px] leading-snug">
                  <dt className="shrink-0 font-medium tracking-[0.14em] text-[#A1A1AA] uppercase">
                    Timeline
                  </dt>
                  <dd className="text-right font-normal text-white">
                    {item.timeline}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 text-[13px] leading-snug">
                  <dt className="shrink-0 font-medium tracking-[0.14em] text-[#A1A1AA] uppercase">
                    Background
                  </dt>
                  <dd className="text-right font-normal text-white">
                    {item.background}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 text-[13px] leading-snug">
                  <dt className="shrink-0 font-medium tracking-[0.14em] text-[#A1A1AA] uppercase">
                    Services
                  </dt>
                  <dd className="text-right font-normal text-white">
                    {item.services}
                  </dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
