import type { TestimonialsContent } from "@/content/schema"

interface TestimonialsSectionProps {
  content: TestimonialsContent
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section className="border-t border-border bg-muted/40 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.heading}
          </h2>
          {content.subheading && (
            <p className="mt-4 text-muted-foreground">{content.subheading}</p>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <figure
              key={item.author}
              className="flex flex-col justify-between gap-6 border border-border bg-card p-6"
            >
              <blockquote className="text-sm leading-relaxed text-card-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="border-t border-border pt-4">
                <p className="text-sm font-medium">{item.author}</p>
                <p className="text-xs text-muted-foreground">
                  {item.role}
                  {item.company && `, ${item.company}`}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
