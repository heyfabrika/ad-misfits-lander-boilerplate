"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { motion } from "motion/react"
import type { VideoTestimonialsContent } from "@/content/schema"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading } from "./section-primitives"

interface VideoTestimonialsSectionProps {
  content: VideoTestimonialsContent
}

export function VideoTestimonialsSection({
  content,
}: VideoTestimonialsSectionProps) {
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
          className="mt-14 grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.1)}
        >
          {content.items.map((item) => (
            <motion.article
              key={item.videoId}
              variants={fadeUp}
              className="overflow-hidden rounded-[1.9rem] glass-card"
            >
              <Link href={item.href} target="_blank" className="group block">
                <div className="video-thumb relative aspect-video overflow-hidden">
                  <Image
                    src={`https://i.ytimg.com/vi_webp/${item.videoId}/sddefault.webp`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-[rgba(6,8,15,0.78)] text-[color:var(--text-gold)] shadow-[var(--glow-gold)]">
                      <Play size={22} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs tracking-[0.24em] text-[color:var(--text-gold)] uppercase">
                    {item.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                    Watch testimonial
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
