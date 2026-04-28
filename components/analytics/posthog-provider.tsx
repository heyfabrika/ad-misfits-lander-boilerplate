"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { captureEvent, initPosthog } from "@/lib/posthog"

interface PosthogProviderProps {
  brand?: string
  apiKey?: string
  apiHost?: string
}

export function PosthogProvider({ brand, apiKey, apiHost }: PosthogProviderProps) {
  const pathname = usePathname()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    initPosthog({ apiKey, apiHost })
  }, [apiKey, apiHost])

  useEffect(() => {
    if (!apiKey || hasTrackedView.current) {
      return
    }

    captureEvent("lander_viewed", {
      brand,
      path: pathname,
    })
    hasTrackedView.current = true
  }, [apiKey, brand, pathname])

  return null
}
