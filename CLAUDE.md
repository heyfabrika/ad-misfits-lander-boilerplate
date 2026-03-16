# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server with Turbopack
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
bun run format   # Format with Prettier (Tailwind plugin included)
bun run typecheck # Type-check without emitting
```

To add shadcn/ui components:
```bash
npx shadcn@latest add <component>
```

## Architecture

**Next.js App Router** project using React 19, TypeScript, and Tailwind CSS v4.

### Key Conventions

- **Path alias**: `@/*` maps to the project root — use `@/components/...`, `@/lib/...`, etc.
- **Styling**: Utility-first Tailwind with CSS custom properties (oklch color space) defined in `app/globals.css`. Zero border radius by default (`rounded-none`).
- **Class merging**: Always use `cn()` from `@/lib/utils` (combines `clsx` + `tailwind-merge`).
- **Components**: UI primitives in `components/ui/` are built on `@base-ui/react` headless components with CVA variants — follow the same pattern when adding new ones.
- **Theme**: Dark mode via `next-themes`. A keyboard shortcut (`d`) toggles the theme — see `components/theme-provider.tsx`.
- **Formatting**: Prettier enforces no semicolons, double quotes, 80-char width, and auto-sorts Tailwind classes. Run `bun run format` before committing.

### shadcn/ui Setup

`components.json` configures shadcn with style `"base-lyra"`, RSC enabled, Lucide icons, and neutral base color. New shadcn components land in `components/ui/`.
