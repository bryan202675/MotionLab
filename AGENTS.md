# MotionLab repository guidance

- Use the sequence: search, inspect, patch, verify, summarize.
- Use TypeScript strict mode. Do not add `any` without a narrowly scoped justification comment.
- Keep each component in its own file under `packages/ui/src/components/`.
- Preserve the editorial Paper/Ink/Acid/Electric/Signal identity and responsive layouts.
- Animated UI must respect reduced-motion preferences; pointer effects must remain usable with keyboard and touch.
- Async/browser resources need cleanup. Use semantic controls and visible focus states.
- Registry metadata is centralized in `apps/web/src/lib/component-registry.ts`; regenerate JSON with `pnpm registry:build` and validate with `pnpm registry:check`.
- Update tests and docs when changing component behavior or public props.
- Do not publish remote repositories, deployments, releases, or credentials without explicit authorization.
