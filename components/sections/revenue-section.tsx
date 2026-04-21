"use client"

import { motion } from "motion/react"
import type { RevenueContent, RoadmapMilestone } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { RichText } from "@/lib/rich-text"
import { cn } from "@/lib/utils"

interface RevenueSectionProps {
  content: RevenueContent
}

function roadmapCaption(milestone: RoadmapMilestone): string {
  const title = milestone.title.trim()
  const detail = milestone.detail.trim()
  if (title && detail) {
    if (detail.startsWith("(")) return `${title} ${detail}`
    return `${title} — ${detail}`
  }
  return title || detail
}

function trackRecordDescription(item: {
  label: string
  detail: string
}): string {
  const d = item.detail.trim()
  return d || item.label
}

export function RevenueSection({ content }: RevenueSectionProps) {
  const journeyLabel = content.journeyLabel ?? "Typical partner journey"
  const trackHeading = content.trackRecordHeading ?? "SCALELOGIX TRACK RECORD"
  const trackVerified = content.trackRecordVerified ?? "Verified"
  const lastRoadmapIndex = content.roadmap.length - 1

  return (
    <section className="py-16">
      <div className="content-shell">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.06)}
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.8125rem] font-medium tracking-[0.22em] text-[color:var(--text-gold)] uppercase"
          >
            {content.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] font-[family:var(--font-display)] font-semibold tracking-[-0.03em] text-balance text-white"
          >
            <RichText text={content.heading} />
          </motion.h2>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 max-w-5xl md:mt-20"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col divide-y divide-[#27272A] md:flex-row md:divide-x md:divide-y-0"
          >
            {content.stats.map((item) => (
              <div
                key={item.label}
                className="flex flex-1 flex-col items-center px-5 py-8 text-center first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                <p className="text-[clamp(1.625rem,3.6vw,2.375rem)] leading-none font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-4 text-sm font-medium text-[color:var(--text-gold)]">
                  {item.label}
                </p>
                <p className="mt-2 max-w-[14rem] text-[0.8125rem] leading-relaxed text-[#a1a1aa]">
                  {item.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 max-w-5xl md:mt-24"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
        >
          <p className="text-center text-sm text-[#a1a1aa]">{journeyLabel}</p>

          <div className="mt-8 hidden md:block">
            <div className="grid grid-cols-4 gap-x-2">
              {content.roadmap.map((milestone) => (
                <p
                  key={`${milestone.phase}-phase`}
                  className="text-center text-sm font-medium text-[color:var(--text-gold)]"
                >
                  {milestone.phase}
                </p>
              ))}
            </div>

            <div className="relative mt-5 h-2">
              <div
                className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-[#27272A]"
                aria-hidden
              />
              <div className="relative grid h-full grid-cols-4">
                {content.roadmap.map((milestone, index) => (
                  <div
                    key={`${milestone.phase}-dot`}
                    className="flex items-center justify-center"
                  >
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full ring-4 ring-[#000000]",
                        index === lastRoadmapIndex
                          ? "bg-[color:var(--primary)]"
                          : "bg-[#52525b]"
                      )}
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-x-3">
              {content.roadmap.map((milestone) => (
                <p
                  key={`${milestone.phase}-cap`}
                  className="text-center text-[0.8125rem] leading-snug text-[#a1a1aa]"
                >
                  {roadmapCaption(milestone)}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 md:hidden">
            {content.roadmap.map((milestone, index) => (
              <div
                key={milestone.phase}
                className={cn(
                  "flex gap-4",
                  index < lastRoadmapIndex ? "pb-10" : "pb-0"
                )}
              >
                <div className="flex w-5 shrink-0 flex-col items-center pt-1">
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      index === lastRoadmapIndex
                        ? "bg-[color:var(--primary)]"
                        : "bg-[#52525b]"
                    )}
                    aria-hidden
                  />
                  {index < lastRoadmapIndex ? (
                    <div
                      className="mt-2 min-h-8 w-px flex-1 bg-[#27272A]"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div>
                  <p className="text-sm font-medium text-[color:var(--text-gold)]">
                    {milestone.phase}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[#a1a1aa]">
                    {roadmapCaption(milestone)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {content.footnote ? (
            <p className="mx-auto mt-8 max-w-2xl text-center text-[0.6875rem] leading-relaxed text-[#a1a1aa] italic md:mt-10 md:text-xs">
              {content.footnote}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          className="mx-auto mt-14 max-w-5xl md:mt-20"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
        >
          <div className="rounded-xl border border-[#27272A] bg-[#09090B] px-5 py-7 md:px-10 md:py-9">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272A] pb-5">
              <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-[#a1a1aa] uppercase md:text-[0.7rem]">
                {trackHeading}
              </p>
              <p className="text-xs font-medium text-[#22c55e]">
                <span aria-hidden>• </span>
                {trackVerified}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
              {content.trackRecord.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center lg:px-2"
                >
                  <p className="text-2xl font-semibold text-white md:text-[1.75rem]">
                    {item.value}
                  </p>
                  <p className="mt-3 max-w-[11.5rem] text-[0.8125rem] leading-snug text-[#a1a1aa] md:max-w-none">
                    {trackRecordDescription(item)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
