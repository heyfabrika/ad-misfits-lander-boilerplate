import type { ComponentType } from "react"
import * as LucideIcons from "lucide-react"
import type { LucideProps } from "lucide-react"

type LucideIconName = keyof typeof LucideIcons

export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = LucideIcons[name as LucideIconName] as
    | ComponentType<LucideProps>
    | undefined

  if (!Icon || typeof Icon !== "function") {
    return null
  }

  return <Icon {...props} />
}
