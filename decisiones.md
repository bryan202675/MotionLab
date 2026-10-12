# Project decisions

## 2026-10-12 — Initial architecture

- Use a lightweight pnpm monorepo with `apps/web` for the site and `packages/ui` for independent source components.
- Use the shadcn registry to distribute component source instead of requiring an installed MotionLab runtime package.
- Keep a single component metadata registry as the source for catalog, detail pages, examples, and generated install payloads.
- Use the product-specific editorial brutalist palette from the supplied specification.
- Keep the repository local until remote publication is explicitly authorized; document which install steps become active after publication.

## Context limitation

No project-specific decision/context files or the configured Obsidian vault were present when work began. The initial choices above follow the attached product specification.
