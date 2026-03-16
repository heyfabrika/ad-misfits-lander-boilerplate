"use client"

import { Collapsible } from "@base-ui/react/collapsible"
import { ChevronDown } from "lucide-react"
import type { FaqContent } from "@/content/schema"

interface FaqSectionProps {
  content: FaqContent
}

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="mt-4 text-muted-foreground">{content.subheading}</p>
          )}
        </div>
        <div className="divide-y divide-border">
          {content.items.map((item) => (
            <Collapsible.Root key={item.question}>
              <Collapsible.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium outline-none transition-colors hover:text-muted-foreground focus-visible:text-muted-foreground">
                <span>{item.question}</span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform duration-200 group-data-[open]:rotate-180"
                />
              </Collapsible.Trigger>
              <Collapsible.Panel className="overflow-hidden data-[ending-style]:animate-[collapsible-close_200ms_ease] data-[starting-style]:animate-[collapsible-open_200ms_ease]">
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </Collapsible.Panel>
            </Collapsible.Root>
          ))}
        </div>
      </div>
    </section>
  )
}
