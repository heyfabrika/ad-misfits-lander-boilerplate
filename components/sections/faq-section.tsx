"use client"

import { Collapsible } from "@base-ui/react/collapsible"
import { Minus, Plus } from "lucide-react"
import { motion } from "motion/react"
import type { FaqContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLead } from "./section-primitives"

interface FaqSectionProps {
  content: FaqContent
}

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <section id="faq" className="section-pad">
      <div className="content-shell max-w-4xl">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div variants={fadeUp}>
            <SectionHeading text={content.heading} />
          </motion.div>
          {content.subheading ? (
            <motion.div variants={fadeUp} className="mt-5">
              <SectionLead
                text={content.subheading}
                className="mx-auto text-center"
              />
            </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger(0.07)}
          className="space-y-4"
        >
          {content.items.map((item) => (
            <motion.div key={item.question} variants={fadeUp}>
              <Collapsible.Root className="rounded-[1.6rem] glass-card px-5">
                <Collapsible.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left outline-none">
                  <span className="text-base leading-snug font-semibold text-white">
                    {item.question}
                  </span>
                  <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.08)] text-[color:var(--text-gold)]">
                    <Plus
                      size={16}
                      strokeWidth={1.6}
                      className="transition-all duration-200 group-data-[open]:scale-0 group-data-[open]:opacity-0"
                    />
                    <Minus
                      size={16}
                      strokeWidth={1.6}
                      className="absolute scale-0 opacity-0 transition-all duration-200 group-data-[open]:scale-100 group-data-[open]:opacity-100"
                    />
                  </span>
                </Collapsible.Trigger>
                <Collapsible.Panel className="overflow-hidden data-[ending-style]:animate-[collapsible-close_200ms_ease] data-[starting-style]:animate-[collapsible-open_200ms_ease]">
                  <p className="border-t border-[color:var(--border-subtle)] pt-5 pb-6 text-sm leading-7 text-[color:var(--text-muted)]">
                    {item.answer}
                  </p>
                </Collapsible.Panel>
              </Collapsible.Root>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
