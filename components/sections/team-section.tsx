"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import type { TeamContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading } from "./section-primitives"

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

export function TeamSection({ content }: TeamSectionProps) {
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
          <motion.div variants={fadeUp}>
            <SectionHeading text={content.heading} />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {content.items.map((item) => (
            <motion.article
              key={item.name}
              variants={fadeUp}
              className="flex flex-col gap-6 rounded-[1.8rem] glass-card p-7"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.14)] text-lg font-semibold text-[color:var(--text-gold)]">
                  {initials(item.avatarLabel)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                    {item.role}
                  </p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-[color:var(--border-subtle)] pt-5">
                <p className="text-sm text-[color:var(--text-muted)]">
                  Infrastructure team
                </p>
                <Link
                  href={item.linkedinUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[color:var(--text-gold)]"
                >
                  LinkedIn
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
