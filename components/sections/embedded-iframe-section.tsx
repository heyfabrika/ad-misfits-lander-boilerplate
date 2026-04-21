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

function renderNothingOnInvalid(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message)
  }

  return null
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
  const src = buildTypeformSrc(content.formId, traceId)
  const title = content.iframeTitle ?? content.heading ?? "Typeform application"

  try {
    const url = new URL(src)
    if (url.hostname !== "form.typeform.com") {
      return renderNothingOnInvalid("Invalid Typeform host")
    }
  } catch {
    return renderNothingOnInvalid("Invalid Typeform URL")
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
        <EmbedFrame title={title} src={src} height={content.height ?? 400} />
      </div>
    </section>
  )
}

interface CalendlySectionProps {
  content: CalendlySectionContent
}

export function CalendlySection({ content }: CalendlySectionProps) {
  const traceId = useSearchParams().get("trace_id")
  const src = buildCalendlySrc(content.schedulingUrl, traceId)
  const title = content.iframeTitle ?? content.heading ?? "Calendly scheduling"

  if (!src) {
    return renderNothingOnInvalid("Invalid Calendly URL")
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
        <EmbedFrame title={title} src={src} height={content.height ?? 630} />
      </div>
    </section>
  )
}
