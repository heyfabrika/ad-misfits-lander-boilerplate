import posthog from "posthog-js"

interface PosthogInitConfig {
  apiKey?: string
  apiHost?: string
}

let isPosthogInitialized = false

export function initPosthog({ apiKey, apiHost }: PosthogInitConfig) {
  if (typeof window === "undefined" || isPosthogInitialized || !apiKey) {
    return
  }

  posthog.init(apiKey, {
    api_host: apiHost ?? "https://us.i.posthog.com",
    capture_pageview: false,
    persistence: "localStorage+cookie",
  })

  isPosthogInitialized = true
}

export function captureEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | null | undefined>
) {
  if (typeof window === "undefined" || !isPosthogInitialized) {
    return
  }

  posthog.capture(eventName, properties)
}
