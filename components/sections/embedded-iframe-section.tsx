"use client"

import { useSearchParams } from "next/navigation"
import type {
  CalendlySectionContent,
  TypeformSectionContent,
} from "@/content/schema"
import { SectionHeading, SectionLead } from "./section-primitives"

function appendParam(url: string, key: string, value: string) {
  return `${url}${url.includes("?") ? "&" : "?"}${key}=${encodeURIComponent(value)}`
}

function devWarn(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message)
  }
}

function isAllowedCalendlyHost(hostname: string) {
  return hostname === "calendly.com" || hostname === "www.calendly.com"
}

function buildTypeformSrc(formId: string, traceId: string | null) {
  const baseUrl = `https://form.typeform.com/to/${encodeURIComponent(formId)}`

  if (!traceId) {
    return baseUrl
  }

  return appendParam(baseUrl, "hidden[trace_id]", traceId)
}

function buildCalendlySrc(schedulingUrl: string, traceId: string | null) {
  try {
    const url = new URL(schedulingUrl)

    if (!isAllowedCalendlyHost(url.hostname)) {
      return null
    }

    const src = url.toString()
    return traceId ? appendParam(src, "trace_id", traceId) : src
  } catch {
    return null
  }
}

/** Full `src` from JSON: validate host and append `trace_id` hidden field. */
function withTypeformTraceIfValid(
  rawSrc: string,
  traceId: string | null
): string | null {
  try {
    const url = new URL(rawSrc)
    if (url.hostname !== "form.typeform.com") {
      return null
    }
    const src = url.toString()
    return traceId ? appendParam(src, "hidden[trace_id]", traceId) : src
  } catch {
    return null
  }
}

/** Full `src` from JSON: validate host and append `trace_id` query param. */
function withCalendlyTraceIfValid(
  rawSrc: string,
  traceId: string | null
): string | null {
  try {
    const url = new URL(rawSrc)
    if (!isAllowedCalendlyHost(url.hostname)) {
      return null
    }
    const src = url.toString()
    return traceId ? appendParam(src, "trace_id", traceId) : src
  } catch {
    return null
  }
}

interface ResolvedEmbed {
  src: string
  title: string
  height: number
}

function resolveTypeformEmbeds(
  content: TypeformSectionContent,
  traceId: string | null
): ResolvedEmbed[] {
  const sectionDefaultHeight = content.height ?? 400
  const fallbackTitle =
    content.iframeTitle ?? content.heading ?? "Typeform application"

  if (content.frames?.length) {
    const out: ResolvedEmbed[] = []
    for (const frame of content.frames) {
      const src = withTypeformTraceIfValid(frame.src, traceId)
      if (!src) {
        devWarn(
          "Invalid Typeform frame URL or host (expected form.typeform.com)"
        )
        continue
      }
      out.push({
        src,
        title: frame.title ?? fallbackTitle,
        height: frame.height ?? sectionDefaultHeight,
      })
    }
    return out
  }

  const formId = content.formId?.trim()
  if (!formId) {
    devWarn("Typeform section: set `frames` or `formId`")
    return []
  }

  const built = buildTypeformSrc(formId, traceId)
  try {
    const url = new URL(built)
    if (url.hostname !== "form.typeform.com") {
      devWarn("Invalid Typeform host")
      return []
    }
  } catch {
    devWarn("Invalid Typeform URL")
    return []
  }

  return [
    {
      src: built,
      title: fallbackTitle,
      height: sectionDefaultHeight,
    },
  ]
}

function resolveCalendlyEmbeds(
  content: CalendlySectionContent,
  traceId: string | null
): ResolvedEmbed[] {
  const sectionDefaultHeight = content.height ?? 630
  const fallbackTitle =
    content.iframeTitle ?? content.heading ?? "Calendly scheduling"

  if (content.frames?.length) {
    const out: ResolvedEmbed[] = []
    for (const frame of content.frames) {
      const src = withCalendlyTraceIfValid(frame.src, traceId)
      if (!src) {
        devWarn("Invalid Calendly frame URL or host (expected calendly.com)")
        continue
      }
      out.push({
        src,
        title: frame.title ?? fallbackTitle,
        height: frame.height ?? sectionDefaultHeight,
      })
    }
    return out
  }

  const schedulingUrl = content.schedulingUrl?.trim()
  if (!schedulingUrl) {
    devWarn("Calendly section: set `frames` or `schedulingUrl`")
    return []
  }

  const src = buildCalendlySrc(schedulingUrl, traceId)
  if (!src) {
    devWarn("Invalid Calendly URL")
    return []
  }

  return [
    {
      src,
      title: fallbackTitle,
      height: sectionDefaultHeight,
    },
  ]
}

interface EmbedFrameProps {
  title: string
  src: string
  height: number
}

function EmbedFrame({ title, src, height }: EmbedFrameProps) {
  return (
    <iframe
      title={title}
      src={src}
      loading="lazy"
      className="w-full rounded-[1.5rem] border border-[color:var(--border-subtle)] bg-[#05070d]"
      style={{ height }}
    />
  )
}

interface TypeformSectionProps {
  content: TypeformSectionContent
}

export function TypeformSection({ content }: TypeformSectionProps) {
  const traceId = useSearchParams().get("trace_id")
  const embeds = resolveTypeformEmbeds(content, traceId)

  if (embeds.length === 0) {
    return null
  }

  return (
    <section id="typeform" className="section-pad pt-10">
      <div className="content-shell">
        {(content.heading || content.subheading) && (
          <div className="mx-auto mb-8 max-w-3xl text-center">
            {content.heading ? <SectionHeading text={content.heading} /> : null}
            {content.subheading ? (
              <SectionLead
                text={content.subheading}
                className="mx-auto mt-4 text-center"
              />
            ) : null}
          </div>
        )}
        <div className="space-y-6">
          {embeds.map((embed, i) => (
            <EmbedFrame
              key={`${embed.src}-${i}`}
              title={embed.title}
              src={embed.src}
              height={embed.height}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface CalendlySectionProps {
  content: CalendlySectionContent
}

export function CalendlySection({ content }: CalendlySectionProps) {
  const traceId = useSearchParams().get("trace_id")
  const embeds = resolveCalendlyEmbeds(content, traceId)

  if (embeds.length === 0) {
    return null
  }

  return (
    <section id="calendly" className="section-pad pt-10">
      <div className="content-shell">
        {(content.heading || content.subheading) && (
          <div className="mx-auto mb-8 max-w-3xl text-center">
            {content.heading ? <SectionHeading text={content.heading} /> : null}
            {content.subheading ? (
              <SectionLead
                text={content.subheading}
                className="mx-auto mt-4 text-center"
              />
            ) : null}
          </div>
        )}
        <div className="space-y-6">
          {embeds.map((embed, i) => (
            <EmbedFrame
              key={`${embed.src}-${i}`}
              title={embed.title}
              src={embed.src}
              height={embed.height}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
