"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import type { TeamContent, TeamMember } from "@/content/schema"
import { RichText } from "@/lib/rich-text"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface TeamSectionProps {
  content: TeamContent
}

function initials(label: string) {
  return label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function TeamAvatar({ item }: { item: TeamMember }) {
  if (item.avatarSrc) {
    return (
      <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
        <Image
          src={item.avatarSrc}
          alt={item.name}
          fill
          className="object-cover"
          sizes="5.5rem"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex size-[5.5rem] shrink-0 items-center justify-center rounded-full",
        "bg-gradient-to-br from-zinc-600 to-zinc-900 text-xl font-semibold text-white",
        "ring-1 ring-white/10"
      )}
      aria-label={item.name}
    >
      {initials(item.avatarLabel)}
    </div>
  )
}

export function TeamSection({ content }: TeamSectionProps) {
  const label = content.label ?? "Leadership team"

  return (
    <section className="section-pad">
      <div className="content-shell">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[0.68rem] font-medium tracking-[0.28em] text-[color:var(--text-gold)] uppercase"
          >
            {label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className={cn(
              "text-4xl font-[family:var(--font-display)] font-semibold text-balance",
              "tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[0.98]",
              "[&_em]:font-serif [&_em]:text-[color:var(--text-gold)] [&_em]:italic"
            )}
          >
            <RichText text={content.heading} />
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.items.map((item) => (
            <motion.div key={item.name} variants={fadeUp} className="h-full">
              <Card
                className={cn(
                  "h-full gap-0 rounded-2xl border border-white/[0.08] py-0",
                  "bg-card/50 text-center shadow-none ring-1 ring-white/[0.06]",
                  "has-data-[slot=card-footer]:pb-0"
                )}
              >
                <CardContent className="flex flex-col items-center gap-4 px-7 pt-8 pb-2">
                  <TeamAvatar item={item} />
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-[color:var(--text-gold)]">
                    {item.role}
                  </p>
                  <p className="text-sm leading-relaxed text-[#9ca3af]">
                    {item.bio}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center border-0 bg-transparent px-7 pt-2 pb-8">
                  <Link
                    href={item.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#3b82f6] transition-colors hover:text-[#60a5fa]"
                  >
                    Connect on LinkedIn →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
