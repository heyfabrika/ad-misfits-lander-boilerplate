import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { RichText } from "@/lib/rich-text"

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return <p className={cn("section-label", className)}>{children}</p>
}

interface SectionHeadingProps {
  text: string
  className?: string
}

export function SectionHeading({ text, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-4xl font-[family:var(--font-display)] font-semibold tracking-[-0.03em] text-balance text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[0.98]",
        className
      )}
    >
      <RichText text={text} />
    </h2>
  )
}

interface SectionLeadProps {
  text: string
  className?: string
}

export function SectionLead({ text, className }: SectionLeadProps) {
  return (
    <p
      className={cn(
        "max-w-3xl text-base leading-8 text-balance text-[color:var(--text-muted)] sm:text-[1.06rem]",
        className
      )}
    >
      <RichText text={text} />
    </p>
  )
}
