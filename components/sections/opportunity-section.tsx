"use client"

import { motion } from "motion/react"
import type { OpportunityCard, OpportunityContent } from "@/content/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLabel } from "./section-primitives"

interface OpportunitySectionProps {
  content: OpportunityContent
}

function OrangeBarBullet({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-0.5 h-4 w-0.5 shrink-0 bg-[color:var(--text-gold)]",
        className
      )}
    />
  )
}

function OpportunityBullets({
  items,
  divided,
}: {
  items: string[]
  divided: boolean
}) {
  if (divided) {
    return (
      <div className="mt-6 border-t border-white/[0.08] pt-6">
        <div className="divide-y divide-white/[0.08]">
          {items.map((item) => (
            <div key={item} className="flex gap-3 py-4">
              <OrangeBarBullet className="mt-1" />
              <p className="text-sm leading-7 text-neutral-400">{item}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <ul className="mt-6 space-y-5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <OrangeBarBullet className="mt-1" />
          <span className="text-sm leading-7 text-neutral-400">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function OpportunityCardView({
  card,
  index,
  total,
}: {
  card: OpportunityCard
  index: number
  total: number
}) {
  const isHighlighted = index === total - 1
  const hasDividedBullets = Boolean(
    card.description && card.bullets && card.bullets.length > 0
  )
  const statLine2 = card.statKicker ?? card.subtitle

  return (
    <Card
      className={cn(
        "relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111] py-0 text-white shadow-none ring-0",
        isHighlighted && "border-blue-500/45 ring-1 ring-blue-500/25"
      )}
    >
      <CardHeader className="relative z-10 gap-0 px-6 pt-6 pb-0">
        <p className="text-[0.65rem] font-medium tracking-[0.2em] text-blue-500 uppercase">
          {card.title}
        </p>
        <CardTitle className="mt-3 text-3xl leading-none font-bold tracking-tight text-white">
          {card.stat}
        </CardTitle>
        {statLine2 ? (
          <p className="mt-2 text-sm text-neutral-400">{statLine2}</p>
        ) : null}
      </CardHeader>

      <CardContent className="relative z-10 flex flex-1 flex-col px-6 pt-5 pb-6">
        {card.description ? (
          <p
            className={cn(
              "text-sm leading-7 text-neutral-400",
              hasDividedBullets && "text-neutral-300"
            )}
          >
            {card.description}
          </p>
        ) : null}

        {card.comparison?.length ? (
          <div className="mt-6 flex flex-col gap-5">
            {card.comparison.map((item) => (
              <Progress
                key={item.label}
                value={item.progress}
                className="w-full flex-col gap-2"
                trackClassName="h-2 rounded-full bg-white/10"
                indicatorClassName={cn(
                  "rounded-full transition-[transform,width] duration-500",
                  item.highlight
                    ? "bg-gradient-to-r from-orange-500 to-orange-600"
                    : "bg-white/20"
                )}
              >
                <div className="flex w-full items-center justify-between text-xs text-neutral-400">
                  <span>{item.label}</span>
                  <span className="tabular-nums">{item.value}</span>
                </div>
              </Progress>
            ))}
          </div>
        ) : null}

        {card.marketBand ? (
          <div className="mt-6 flex flex-1 flex-col">
            <Progress
              value={card.marketBand.progress}
              className="w-full flex-col gap-2"
              trackClassName="h-2 rounded-full bg-white/10"
              indicatorClassName="rounded-full bg-gradient-to-r from-blue-500 to-orange-500"
            >
              <div className="flex w-full items-center justify-between text-xs">
                <span className="text-neutral-400">
                  {card.marketBand.leftLabel}
                </span>
                <span className="font-medium text-blue-500 tabular-nums">
                  {card.marketBand.rightLabel}
                </span>
              </div>
            </Progress>
            {card.footnote ? (
              <p className="mt-auto pt-10 text-xs leading-relaxed text-neutral-400">
                {card.footnote}
              </p>
            ) : null}
          </div>
        ) : card.footnote ? (
          <p className="mt-6 text-xs text-neutral-400">{card.footnote}</p>
        ) : null}

        {card.bullets?.length ? (
          <OpportunityBullets
            items={card.bullets}
            divided={hasDividedBullets}
          />
        ) : null}
      </CardContent>
    </Card>
  )
}

export function OpportunitySection({ content }: OpportunitySectionProps) {
  const n = content.cards.length

  return (
    <section id="whyus" className="py-16 text-white">
      <div className="content-shell">
        <motion.div
          className="mb-14 space-y-5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel className="mx-auto block w-fit border-0 bg-transparent px-0 py-0 text-[0.72rem] tracking-[0.2em] text-[color:var(--text-gold)]">
              {content.label}
            </SectionLabel>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mx-auto max-w-5xl text-center"
          >
            <SectionHeading
              text={content.heading}
              className="text-4xl sm:text-5xl"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-5 lg:grid-cols-3 lg:items-stretch"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.12)}
        >
          {content.cards.map((card, index) => (
            <motion.div key={card.title} variants={fadeUp} className="h-full">
              <OpportunityCardView card={card} index={index} total={n} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
