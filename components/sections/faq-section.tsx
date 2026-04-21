"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
          variants={fadeUp}
        >
          <Accordion className="w-full">
            {content.items.map((item, index) => (
              <AccordionItem
                key={`${index}-${item.question}`}
                value={String(index)}
              >
                <AccordionTrigger className="items-center py-4 text-base font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
