"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import type { HeroContent } from "@/content/schema"
import { fadeUp, stagger } from "@/lib/motion"
import { captureEvent } from "@/lib/posthog"
import { RichText } from "@/lib/rich-text"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const container = stagger(0.09, 0.1)
const item = fadeUp

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  const handleCtaClick = () => {
    captureEvent("lander_cta_clicked", {
      placement: "hero",
      cta_label: content.primaryCta.label,
      cta_href: content.primaryCta.href,
    })
  }

  return (
    <section className="page-shell section-pad pt-14 md:pt-20">
      <div className="bg-[radial-gradient(circle_at_50%_12%,rgba(18, 8, 4, 0.07),transparent_55%)] pointer-events-none absolute inset-x-0 top-0 h-[22rem]" />
      <motion.div
        className="flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="text-sm text-muted-foreground">
          {content.badge}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-8 text-4xl leading-[0.92] font-[family:var(--font-display)] font-medium tracking-[-0.04em] text-balance text-white sm:text-5xl"
        >
          <RichText text={content.heading} />
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-3xl text-lg leading-8 text-balance text-[color:var(--text-muted)]"
        >
          {content.subheading}
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <Button
            variant={content.primaryCta.variant ?? "default"}
            size={content.primaryCta.size ?? "lg"}
            render={<Link href={content.primaryCta.href} />}
            onClick={handleCtaClick}
          >
            {content.primaryCta.label}
          </Button>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-4 text-sm text-[color:var(--text-muted)]"
        >
          {content.caption}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-14 grid w-full max-w-5xl scale-85 gap-8 lg:grid-cols-4"
        >
          {content.stats.map((stat) => (
            <Card
              key={stat.label}
              className="justify-center gap-2 rounded-lg px-6 py-4 text-left"
            >
              <CardHeader className="px-2 py-0 text-center">
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <CardDescription className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2 py-0 text-center">
                <CardDescription className="text-sm">
                  {stat.detail}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
