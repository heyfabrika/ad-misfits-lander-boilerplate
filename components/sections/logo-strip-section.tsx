"use client"

import { motion } from "motion/react"
import Image from "next/image"
import type { LogoStripContent, LogoStripImage } from "@/content/schema"
import { cn } from "@/lib/utils"
import { fadeUp, stagger, viewport } from "@/lib/motion"

interface LogoStripSectionProps {
  content: LogoStripContent
}

function usableImages(items: LogoStripImage[]) {
  return items.filter((item) => item.src.trim().length > 0)
}

export function LogoStripSection({ content }: LogoStripSectionProps) {
  const images = usableImages(content.items)
  if (images.length === 0) return null

  return (
    <section className="bg-neutral-900/20 bg-full border border-white/6 py-12">
      <motion.div
        className="content-shell"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={stagger(0.08)}
      >
        <motion.p
          variants={fadeUp}
          className="text-center font-mono text-xs tracking-[0.28em] text-[color:var(--text-gold)] uppercase"
        >
          {content.label}
        </motion.p>
        <motion.ul
          variants={fadeUp}
          className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-7"
        >
          {images.map((item, index) => (
            <li
              key={`${item.src}-${index}`}
              className="flex h-12 items-center justify-center sm:h-14"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={160}
                height={48}
                sizes="(max-width: 1024px) 50vw, 9rem"
                className={cn(
                  "h-auto max-h-full w-auto max-w-[min(100%,9rem)] object-contain",
                  "opacity-80 grayscale transition-[opacity,filter] duration-200",
                  "hover:opacity-100 hover:grayscale-0"
                )}
              />
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
