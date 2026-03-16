import { pageContent } from "@/content/load-content"
import { SectionRenderer } from "@/components/sections/section-renderer"

/**
 * Landing page — rendered entirely from content/content.json.
 *
 * To edit copy: modify content/content.json
 * To reorder sections: reorder the `sections` array in content.json
 * To add/remove sections: add/remove entries and update section-renderer.tsx
 */
export default function Page() {
  return (
    <main>
      {pageContent.sections.map((section, i) => (
        <SectionRenderer key={`${section.type}-${i}`} section={section} />
      ))}
    </main>
  )
}
