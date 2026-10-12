# Contributing to MotionLab

Thanks for considering a contribution. MotionLab is an original React component library and an interactive documentation site.

## Before you start

- Search existing issues and pull requests before opening a new one.
- For a significant feature or API change, open an issue first so the scope can be discussed.
- Do not copy, port, or package third-party component source. Clearly identify any new runtime dependency.

## Local setup

Use Node.js 22+ and pnpm 11:

```sh
pnpm install
pnpm dev
```

Before opening a pull request, run:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm registry:check
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

## Component guidelines

- Keep each component in its own TypeScript file and export its public props.
- Preserve strict types; avoid `any`.
- Provide semantic HTML, keyboard behavior, and an accessible name for controls.
- Respect reduced-motion preferences for animated effects.
- Keep animation work bounded and clean up event listeners, timers, observers, and animation frames.
- Keep the visual system consistent with the Paper, Ink, Acid, Electric, and Signal tokens.
- Add or update the component metadata, example, documentation, and registry output when changing a public component.
- Do not introduce pretend usage, performance, or coverage statistics.

## Pull requests

Keep changes focused. Describe the behavior change, the reason, and how you verified it. Include screenshots for visible changes at desktop and mobile sizes. Update `CHANGELOG.md` for user-facing changes.
