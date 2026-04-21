"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react"
import { motion } from "motion/react"
import type { BookingContent } from "@/content/schema"
import { Button } from "@/components/ui/button"
import { fadeUp, stagger, viewport } from "@/lib/motion"
import { SectionHeading, SectionLead } from "./section-primitives"

interface BookingSectionProps {
  content: BookingContent
  hasEmbeddedBookingFlow?: boolean
  nextEmbeddedSectionHref?: string
}

const placeholderTimes = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
]

export function BookingSection({
  content,
  hasEmbeddedBookingFlow = false,
  nextEmbeddedSectionHref,
}: BookingSectionProps) {
  const [values, setValues] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        content.fields.map((field) => [field.name, ""])
      ) as Record<string, string>
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(1)

  function updateValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function continueToScheduler() {
    const nextErrors: Record<string, string> = {}

    for (const field of content.fields) {
      if (field.required && !values[field.name]?.trim()) {
        nextErrors[field.name] = "This field is required."
      }
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setStep(2)
    }
  }

  return (
    <section id="book" className="section-pad pb-28">
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
          <motion.div variants={fadeUp} className="mt-5">
            <SectionLead
              text={content.subheading}
              className="mx-auto text-center"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-14 rounded-[2rem] glass-card p-6 md:p-10"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border-subtle)] pb-6"
          >
            <span className="section-label">{content.stepLabel}</span>
            <p className="text-sm text-[color:var(--text-muted)]">
              {step === 1
                ? "Qualification details"
                : hasEmbeddedBookingFlow
                  ? "Step 2 continues below"
                  : "Scheduling shell ready"}
            </p>
          </motion.div>

          {step === 1 ? (
            <motion.div
              variants={fadeUp}
              className="mt-8 grid gap-5 md:grid-cols-2"
            >
              {content.fields.map((field) => (
                <label key={field.name} className="space-y-3">
                  <span className="text-sm font-medium text-white">
                    {field.label}
                  </span>
                  {field.type === "select" ? (
                    <select
                      value={values[field.name]}
                      onChange={(event) =>
                        updateValue(field.name, event.target.value)
                      }
                      className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white transition-colors outline-none ${
                        errors[field.name]
                          ? "border-red-400/50"
                          : "border-[color:var(--border-subtle)] focus:border-[color:var(--border-gold-strong)]"
                      }`}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        updateValue(field.name, event.target.value)
                      }
                      className={`w-full rounded-xl border bg-white/5 px-4 py-3.5 text-sm text-white transition-colors outline-none placeholder:text-white/35 ${
                        errors[field.name]
                          ? "border-red-400/50"
                          : "border-[color:var(--border-subtle)] focus:border-[color:var(--border-gold-strong)]"
                      }`}
                    />
                  )}
                  {errors[field.name] ? (
                    <span className="block text-xs text-red-200">
                      {errors[field.name]}
                    </span>
                  ) : null}
                </label>
              ))}

              <div className="flex justify-start pt-2 md:col-span-2">
                <Button size="lg" onClick={continueToScheduler}>
                  {content.continueButtonLabel}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </motion.div>
          ) : hasEmbeddedBookingFlow ? (
            <motion.div variants={fadeUp} className="mt-8">
              <div className="rounded-[1.8rem] border border-[color:var(--border-subtle)] bg-white/4 p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.08)] text-[color:var(--text-gold)]">
                  <ArrowDown size={18} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">
                  Step 2 is ready below
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">
                  Your qualification details are complete. Continue to the
                  application form or calendar section below to finish the flow.
                </p>
                {nextEmbeddedSectionHref ? (
                  <div className="mt-6 flex justify-center">
                    <Button
                      size="lg"
                      render={<Link href={nextEmbeddedSectionHref} />}
                    >
                      Continue to Step 2
                      <ArrowDown size={18} />
                    </Button>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={fadeUp}
              className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]"
            >
              <div className="space-y-5 rounded-[1.8rem] border border-[color:var(--border-subtle)] bg-white/4 p-6">
                <div className="flex items-center gap-3 text-[color:var(--text-gold)]">
                  <CalendarDays size={18} />
                  <p className="font-mono text-xs tracking-[0.22em] uppercase">
                    Submitted details
                  </p>
                </div>
                <div className="space-y-4">
                  {content.fields.map((field) => (
                    <div
                      key={field.name}
                      className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(6,8,15,0.5)] px-4 py-3"
                    >
                      <p className="text-xs tracking-[0.18em] text-[color:var(--text-muted)] uppercase">
                        {field.label}
                      </p>
                      <p className="mt-2 text-sm text-white">
                        {values[field.name] || "Not provided"}
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} />
                  Back to details
                </Button>
              </div>

              <div className="rounded-[1.8rem] border border-[color:var(--border-subtle)] bg-[rgba(6,8,15,0.54)] p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--border-subtle)] pb-5">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {content.scheduler.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      {content.scheduler.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.08)] px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-[color:var(--text-gold)] uppercase">
                    <Clock3 size={14} />
                    {content.scheduler.timezoneLabel}
                  </div>
                </div>

                {content.scheduler.embedUrl &&
                content.scheduler.provider !== "placeholder" ? (
                  <iframe
                    src={content.scheduler.embedUrl}
                    title={content.scheduler.title}
                    className="mt-6 h-[680px] w-full rounded-[1.5rem] border border-[color:var(--border-subtle)] bg-[#05070d]"
                  />
                ) : (
                  <div className="scheduler-grid mt-6 rounded-[1.5rem] border border-[color:var(--border-subtle)] bg-[rgba(255,255,255,0.03)] p-5">
                    <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(6,8,15,0.56)] px-4 py-4">
                          <p className="font-mono text-xs tracking-[0.18em] text-[color:var(--text-muted)] uppercase">
                            Consultation window
                          </p>
                          <p className="mt-3 text-lg font-semibold text-white">
                            Private strategy call
                          </p>
                          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                            Scheduler-ready shell. Drop in a Calendly or Cal.com
                            URL to replace this placeholder without changing the
                            page layout.
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {placeholderTimes.map((time) => (
                            <div
                              key={time}
                              className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(6,8,15,0.56)] px-4 py-3 text-sm font-medium text-white"
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[rgba(6,8,15,0.56)] p-4">
                        <p className="font-mono text-xs tracking-[0.18em] text-[color:var(--text-muted)] uppercase">
                          Next step
                        </p>
                        <div className="mt-4 rounded-2xl border border-dashed border-[color:var(--border-gold)] bg-[rgba(228,82,30,0.08)] p-5">
                          <p className="text-sm leading-7 text-white">
                            Embed slot reserved for your live scheduler.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
